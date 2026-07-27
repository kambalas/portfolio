import { useEffect, useRef } from 'react';
import { trackSectionView, trackSectionTime } from '../lib/analytics';

// A section counts as "being read" while it crosses the middle band of the
// viewport. Trimming 45% off the top and bottom leaves a thin strip through
// the centre, so exactly one section is active at any moment.
const READING_BAND = '-45% 0px -45% 0px';

// A quarter of a section on screen counts as "seen".
const SEEN_RATIO = 0.25;

// Below this, dwell time is scroll-through noise rather than reading.
const MIN_REPORTABLE_MS = 1000;

/**
 * Measures which part of the page each visitor spends their time in.
 *
 * Emits `section_view` the first time a section appears, and a batched
 * `section_time` per section when the visitor leaves. Time only accumulates
 * while the tab is actually in the foreground — a page left open in a
 * background tab does not inflate the numbers.
 *
 * @param {string[]} sectionIds - element ids to observe, in page order
 * @returns {import('react').MutableRefObject<string>} the section on screen now
 */
export function useSectionTracking(sectionIds) {
  const currentSectionRef = useRef('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (elements.length === 0) return undefined;

    const pageStart = performance.now();
    const dwellMs = new Map(); // section id -> accumulated ms
    const seen = new Set();
    let activeSection = '';
    let activeSince = 0;

    const closeActiveSpan = () => {
      if (!activeSection) return;
      const elapsed = performance.now() - activeSince;
      dwellMs.set(activeSection, (dwellMs.get(activeSection) || 0) + elapsed);
      activeSection = '';
    };

    const openSpan = (id) => {
      activeSection = id;
      activeSince = performance.now();
      currentSectionRef.current = id;
    };

    // ── Observer 1: first sighting of each section ──
    const seenObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!entry.isIntersecting || seen.has(id)) continue;
          seen.add(id);
          trackSectionView(id, (performance.now() - pageStart) / 1000);
          seenObserver.unobserve(entry.target);
        }
      },
      { threshold: SEEN_RATIO }
    );

    // ── Observer 2: which section holds the reading band right now ──
    const readingObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            closeActiveSpan();
            openSpan(entry.target.id);
          } else if (entry.target.id === activeSection) {
            closeActiveSpan();
          }
        }
      },
      { rootMargin: READING_BAND, threshold: 0 }
    );

    elements.forEach((el) => {
      seenObserver.observe(el);
      readingObserver.observe(el);
    });

    // Pause the clock when the tab goes to the background, resume on return.
    const pausedSection = { id: '' };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        pausedSection.id = activeSection;
        closeActiveSpan();
        flush();
      } else if (pausedSection.id) {
        openSpan(pausedSection.id);
        pausedSection.id = '';
      }
    };

    // Sending on 'hidden' rather than 'unload' is the only reliable option on
    // mobile Safari, where unload frequently never fires. The map is cleared
    // after each flush so a visitor who tabs away and back is not counted twice.
    function flush() {
      for (const [id, ms] of dwellMs) {
        if (ms >= MIN_REPORTABLE_MS) trackSectionTime(id, ms / 1000);
      }
      dwellMs.clear();
    }

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', flush);

    return () => {
      closeActiveSpan();
      flush();
      seenObserver.disconnect();
      readingObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', flush);
    };
  }, [sectionIds]);

  return currentSectionRef;
}

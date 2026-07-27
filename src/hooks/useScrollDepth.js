import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../lib/analytics';

// Milestones that tell you how far down the page people actually get.
const THRESHOLDS = [25, 50, 75, 90, 100];

function currentScrollPercent() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100; // page fits the viewport — fully seen
  return Math.min(100, Math.round((window.scrollY / scrollable) * 100));
}

/**
 * Fires a `scroll_depth` event the first time each milestone is crossed,
 * and keeps a running maximum for the end-of-visit summary.
 *
 * @param {string} resetKey - changing this (e.g. the pathname) starts fresh
 * @returns {import('react').MutableRefObject<number>} max percent reached
 */
export function useScrollDepth(resetKey) {
  const maxScrollRef = useRef(0);

  useEffect(() => {
    maxScrollRef.current = 0;
    const reached = new Set();
    let frame = 0;

    const measure = () => {
      frame = 0;
      const percent = currentScrollPercent();
      if (percent > maxScrollRef.current) maxScrollRef.current = percent;

      for (const threshold of THRESHOLDS) {
        if (percent >= threshold && !reached.has(threshold)) {
          reached.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    };

    // rAF-throttled: at most one measurement per painted frame, so the
    // listener never becomes the reason scrolling stutters.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure(); // short pages are "100% seen" from the start
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [resetKey]);

  return maxScrollRef;
}

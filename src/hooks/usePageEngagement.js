import { useEffect } from 'react';
import { trackPageEngagement } from '../lib/analytics';

// No input for this long and the visitor is considered away from the keyboard,
// even though the tab is still in front.
const IDLE_MS = 30_000;
const TICK_MS = 1000;

const ACTIVITY_EVENTS = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'];

/**
 * End-of-visit summary: how long they were actually engaged, how far they
 * scrolled, and which section they were looking at when they left.
 *
 * `exit_section` is the useful one — it tells you where people give up.
 *
 * @param {object} refs
 * @param {import('react').MutableRefObject<number>} refs.maxScrollRef
 * @param {import('react').MutableRefObject<string>} refs.currentSectionRef
 * @param {string} resetKey - changing this starts a new measurement
 */
export function usePageEngagement({ maxScrollRef, currentSectionRef, resetKey }) {
  useEffect(() => {
    const startedAt = Date.now();
    let lastActivityAt = Date.now();
    let activeSeconds = 0;
    let hasReported = false;

    const markActive = () => {
      lastActivityAt = Date.now();
    };

    // Count a second of engagement only when the tab is in front and the
    // visitor has done something recently. This is much closer to real
    // attention than GA4's own engagement_time_msec.
    const ticker = setInterval(() => {
      const isForeground = document.visibilityState === 'visible';
      const isRecentlyActive = Date.now() - lastActivityAt < IDLE_MS;
      if (isForeground && isRecentlyActive) activeSeconds += TICK_MS / 1000;
    }, TICK_MS);

    const report = () => {
      if (hasReported) return;
      hasReported = true;
      trackPageEngagement({
        activeSeconds,
        totalSeconds: (Date.now() - startedAt) / 1000,
        maxScroll: maxScrollRef.current,
        exitSection: currentSectionRef.current || 'top',
      });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') report();
    };

    ACTIVITY_EVENTS.forEach((type) =>
      window.addEventListener(type, markActive, { passive: true })
    );
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', report);

    return () => {
      clearInterval(ticker);
      report();
      ACTIVITY_EVENTS.forEach((type) => window.removeEventListener(type, markActive));
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', report);
    };
  }, [maxScrollRef, currentSectionRef, resetKey]);
}

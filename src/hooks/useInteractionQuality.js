import { useEffect } from 'react';
import { trackRageClick, trackDeadClick, trackCopy, trackPrint, trackError } from '../lib/analytics';

// Three clicks inside this radius and this window = frustration, not intent.
const RAGE_CLICK_COUNT = 3;
const RAGE_WINDOW_MS = 1000;
const RAGE_RADIUS_PX = 30;

// Anything the browser treats as clickable.
const INTERACTIVE = 'a, button, input, textarea, select, label, summary, [role="button"], [role="link"], [tabindex]';

// Per page view, so one confused visitor cannot flood the reports.
const MAX_DEAD_CLICKS = 3;

/** A short, non-identifying label for whatever was clicked. */
function describeElement(el) {
  if (!el || !el.tagName) return 'unknown';
  const label = el.getAttribute?.('aria-label') || el.textContent?.trim();
  if (label) return label.slice(0, 60);
  return el.tagName.toLowerCase();
}

/**
 * Frustration and friction signals: rage clicks, clicks on things that only
 * look clickable, copied text, print attempts, and JS errors hitting real
 * visitors.
 *
 * These are the events worth alerting on — they mean the site is failing
 * someone right now.
 *
 * @param {import('react').MutableRefObject<string>} currentSectionRef
 */
export function useInteractionQuality(currentSectionRef) {
  useEffect(() => {
    const section = () => currentSectionRef?.current || 'unknown';
    let recentClicks = [];
    let deadClickCount = 0;

    const onClick = (event) => {
      const now = Date.now();
      const point = { x: event.clientX, y: event.clientY, t: now };

      // ── Rage clicks ──
      recentClicks = recentClicks.filter((c) => now - c.t < RAGE_WINDOW_MS);
      recentClicks.push(point);
      const clustered = recentClicks.filter(
        (c) => Math.hypot(c.x - point.x, c.y - point.y) <= RAGE_RADIUS_PX
      );
      if (clustered.length >= RAGE_CLICK_COUNT) {
        trackRageClick(describeElement(event.target), section());
        recentClicks = []; // one event per burst, not one per extra click
      }

      // ── Dead clicks ──
      const isInteractive = event.target?.closest?.(INTERACTIVE);
      const isSelectingText = window.getSelection()?.toString().length > 0;
      if (!isInteractive && !isSelectingText && deadClickCount < MAX_DEAD_CLICKS) {
        deadClickCount += 1;
        trackDeadClick(describeElement(event.target), section());
      }
    };

    // Copying is almost always the email address — a real intent signal that
    // otherwise looks like a bounce.
    const onCopy = () => {
      const length = window.getSelection()?.toString().length || 0;
      if (length > 0) trackCopy(section(), length);
    };

    const onBeforePrint = () => trackPrint();

    const onError = (event) => {
      trackError(event.message || 'unknown error', event.filename || 'unknown');
    };

    const onRejection = (event) => {
      const reason = event.reason;
      trackError(String(reason?.message || reason || 'unknown'), 'unhandled_promise');
    };

    document.addEventListener('click', onClick, true);
    document.addEventListener('copy', onCopy);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onRejection);

    return () => {
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('copy', onCopy);
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onRejection);
    };
  }, [currentSectionRef]);
}

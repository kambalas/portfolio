import { useEffect } from 'react';
import { trackWebVital } from '../lib/analytics';

// Google's own good/needs-improvement/poor boundaries.
const THRESHOLDS = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

function rate(metric, value) {
  const [good, poor] = THRESHOLDS[metric];
  if (value <= good) return 'good';
  return value <= poor ? 'needs_improvement' : 'poor';
}

/** Subscribe to a performance entry type, ignoring unsupported ones. */
function observe(type, callback, options = {}) {
  try {
    const observer = new PerformanceObserver((list) => list.getEntries().forEach(callback));
    observer.observe({ type, buffered: true, ...options });
    return observer;
  } catch {
    // Type unsupported in this browser (e.g. LCP in Safari) — skip silently.
    return null;
  }
}

/**
 * Core Web Vitals from real visits, not a lab run.
 *
 * Measured with native PerformanceObserver rather than the web-vitals package
 * so this costs zero extra bundle bytes. Values are reported once, when the
 * page is hidden, since LCP and CLS are only final at that point.
 *
 * INP here is the slowest interaction rather than the true p98 — good enough
 * to spot a genuinely janky page, not a substitute for CrUX data.
 */
export function useWebVitals() {
  useEffect(() => {
    if (typeof PerformanceObserver === 'undefined') return undefined;

    let largestPaintMs = 0;
    let layoutShiftScore = 0;
    let slowestInteractionMs = 0;

    const observers = [
      observe('largest-contentful-paint', (entry) => {
        largestPaintMs = entry.startTime;
      }),
      observe('layout-shift', (entry) => {
        // Shifts within 500ms of a click/keypress are the visitor's doing.
        if (!entry.hadRecentInput) layoutShiftScore += entry.value;
      }),
      observe('event', (entry) => {
        if (entry.interactionId && entry.duration > slowestInteractionMs) {
          slowestInteractionMs = entry.duration;
        }
      }, { durationThreshold: 40 }),
      observe('paint', (entry) => {
        if (entry.name === 'first-contentful-paint') {
          trackWebVital('FCP', entry.startTime, rate('FCP', entry.startTime));
        }
      }),
      observe('navigation', (entry) => {
        trackWebVital('TTFB', entry.responseStart, rate('TTFB', entry.responseStart));
      }),
    ].filter(Boolean);

    let hasReported = false;
    const report = () => {
      if (hasReported) return;
      hasReported = true;
      if (largestPaintMs) trackWebVital('LCP', largestPaintMs, rate('LCP', largestPaintMs));
      trackWebVital('CLS', layoutShiftScore, rate('CLS', layoutShiftScore));
      if (slowestInteractionMs) {
        trackWebVital('INP', slowestInteractionMs, rate('INP', slowestInteractionMs));
      }
    };

    // pagehide always means the visit is over; visibilitychange only counts
    // when the page is actually going away, not when it comes back.
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') report();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', report);

    return () => {
      observers.forEach((o) => o.disconnect());
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', report);
    };
  }, []);
}

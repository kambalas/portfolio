/**
 * Public analytics API. Import everything from '../lib/analytics'.
 *
 * Two systems, deliberately split:
 *   GA4     — counts discrete events ("what happened", aggregated)
 *   Clarity — heatmaps + session replay ("how it felt", individual)
 *
 * Both are started together from App.jsx during browser idle time.
 */
export { initGA, track, trackPageView, setUserProperties, isAnalyticsDisabled } from './core';
export { initClarity, clarityTag, clarityUpgrade } from './clarity';
export * from './events';

import { initGA } from './core';
import { initClarity } from './clarity';

/** Start both trackers. Safe to call more than once. */
export function initAnalytics() {
  initGA();
  initClarity();
}

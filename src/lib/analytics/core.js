import ReactGA from 'react-ga4';

// GA4 Measurement ID for udevelops.com
const MEASUREMENT_ID = 'G-3GTMHSF5XR';

// Set localStorage.analytics_opt_out = '1' in your own browser so your visits
// never pollute the data. Clear it to start being counted again.
const OPT_OUT_KEY = 'analytics_opt_out';

// GA4 hard limits: string param values are truncated past 100 chars, and an
// event carries at most 25 params. We clamp locally so nothing is silently
// dropped server-side.
const MAX_PARAM_CHARS = 100;
const MAX_PARAMS = 25;

let isInitialized = false;
let isDisabled = false;
const pendingEvents = [];

function readOptOut() {
  try {
    return localStorage.getItem(OPT_OUT_KEY) === '1';
  } catch {
    // Private mode / blocked storage — assume opted in.
    return false;
  }
}

/**
 * Trim a single param value to something GA4 will actually store.
 * Booleans become 1/0 so they aggregate as metrics rather than strings.
 */
function normalizeValue(value) {
  if (typeof value === 'boolean') return value ? 1 : 0;
  if (typeof value === 'number') return Number.isFinite(value) ? Math.round(value * 100) / 100 : null;
  if (typeof value === 'string') return value.slice(0, MAX_PARAM_CHARS);
  return null;
}

function sanitizeParams(params) {
  const out = {};
  let count = 0;
  for (const [key, raw] of Object.entries(params)) {
    if (count >= MAX_PARAMS) break;
    const value = normalizeValue(raw);
    if (value === null || value === '') continue;
    out[key] = value;
    count += 1;
  }
  return out;
}

function sendOrQueue(send) {
  if (isDisabled) return;
  if (isInitialized) {
    send();
  } else {
    pendingEvents.push(send);
  }
}

/**
 * Initialize GA4. Called once from App.jsx during browser idle time so
 * analytics never competes with first paint. Events fired before init are
 * queued above and flushed here.
 */
export function initGA() {
  if (isInitialized || isDisabled) return;

  if (readOptOut()) {
    isDisabled = true;
    pendingEvents.length = 0;
    return;
  }

  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      // debug_mode routes hits to GA4 DebugView instead of your live reports.
      debug_mode: import.meta.env.DEV,
      // Explicit events below replace GA4's guesswork for outbound links and
      // scrolling; leaving both on would double-count.
      enhanced_measurement: false,
    },
  });

  isInitialized = true;
  pendingEvents.forEach((send) => send());
  pendingEvents.length = 0;
}

/**
 * Fire a GA4 custom event.
 *
 * NEVER pass personally identifiable information here. GA4's terms forbid it
 * and it is not recoverable once sent — use lengths, booleans and categories
 * instead of names, emails or message bodies.
 *
 * @param {string} name   - snake_case event name, e.g. "book_call_click"
 * @param {object} params - flat key/value params (strings, numbers, booleans)
 */
export function track(name, params = {}) {
  sendOrQueue(() => ReactGA.event(name, sanitizeParams(params)));
}

/**
 * Track a page view. GA4 pulls UTM params straight out of the URL string,
 * so always pass pathname + search.
 *
 * @param {string} path - e.g. "/?utm_source=github&utm_medium=referral"
 */
export function trackPageView(path) {
  sendOrQueue(() => ReactGA.send({ hitType: 'pageview', page: path }));
}

/**
 * Attach a durable property to every subsequent event from this visitor
 * (e.g. preferred theme). Register these under Admin → Custom definitions →
 * User-scoped to see them in reports.
 */
export function setUserProperties(properties) {
  sendOrQueue(() => ReactGA.gtag('set', 'user_properties', sanitizeParams(properties)));
}

export function isAnalyticsDisabled() {
  return isDisabled;
}

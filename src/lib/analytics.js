import ReactGA from 'react-ga4';

// Your GA4 Measurement ID
const MEASUREMENT_ID = 'G-3GTMHSF5XR';

/**
 * Initialize GA4. Called once at app startup (module load time).
 * debug_mode is enabled only in development so test events appear
 * in GA4 DebugView without polluting your production data.
 */
export function initGA() {
  ReactGA.initialize(MEASUREMENT_ID, {
    gtagOptions: {
      debug_mode: import.meta.env.DEV,
    },
  });
}

/**
 * Track a page view. Called on every route change via RouteTracker.
 * GA4 automatically extracts UTM params (utm_source, utm_medium,
 * utm_campaign, utm_content, utm_term) directly from the URL string.
 *
 * @param {string} path - pathname + search string, e.g. "/?utm_source=github"
 */
export function trackPageView(path) {
  ReactGA.send({ hitType: 'pageview', page: path });
}

/**
 * Track when a visitor opens a project detail page.
 * Appears in GA4 reports as the custom event "project_details_click".
 *
 * @param {string} projectTitle - Human-readable name, e.g. "My Cool App"
 * @param {string} projectSlug  - URL slug, e.g. "my-cool-app"
 */
export function trackProjectClick(projectTitle, projectSlug) {
  ReactGA.event('project_details_click', {
    project_title: projectTitle,
    project_slug: projectSlug,
  });
}

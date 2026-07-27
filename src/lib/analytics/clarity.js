/**
 * Microsoft Clarity — heatmaps, click/scroll maps and session replay.
 *
 * This is what answers "where is their mouse, what did they hover, where did
 * they hesitate". GA4 cannot do it: mousemove fires ~60x/second and would
 * blow past GA4's event quota within one session. Clarity batches those
 * coordinates natively and replays them visually. It is free with no traffic
 * cap.
 *
 * Setup: create a project at https://clarity.microsoft.com, then put the
 * project ID in a .env file at the repo root:
 *
 *   VITE_CLARITY_ID=abc123xyz
 *
 * and add it as a repository secret + workflow env var for the GitHub Pages
 * build. Without the ID this module does nothing at all.
 */

const CLARITY_ID = import.meta.env.VITE_CLARITY_ID;

let isLoaded = false;

export function initClarity() {
  if (isLoaded || !CLARITY_ID || typeof document === 'undefined') return;

  try {
    if (localStorage.getItem('analytics_opt_out') === '1') return;
  } catch {
    // Blocked storage — proceed.
  }

  // Official Clarity bootstrap: create the command queue immediately so calls
  // made before the tag downloads are replayed once it loads.
  window.clarity =
    window.clarity ||
    function queueClarityCall(...args) {
      (window.clarity.q = window.clarity.q || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);

  isLoaded = true;
}

/**
 * Tag the current Clarity session so you can filter recordings later — e.g.
 * jump straight to the sessions where someone clicked "Book a call".
 */
export function clarityTag(key, value) {
  if (typeof window.clarity === 'function') {
    window.clarity('set', key, String(value));
  }
}

/**
 * Mark a session as important so Clarity prioritises keeping the recording.
 * Use sparingly — on conversions and on rage clicks.
 */
export function clarityUpgrade(reason) {
  if (typeof window.clarity === 'function') {
    window.clarity('upgrade', reason);
  }
}

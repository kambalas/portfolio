import { track } from './core';
import { clarityTag, clarityUpgrade } from './clarity';

/**
 * Named GA4 events for every meaningful interaction on the site.
 *
 * Convention: every event carries a `location` param naming the surface it
 * fired from (nav, hero, cta_band, contact, footer, project_detail...). That
 * is what lets you answer "which Book-a-call button actually converts?"
 * rather than just "how many people booked".
 */

/** Pull a readable hostname out of a URL for grouping outbound traffic. */
function domainOf(url) {
  try {
    return new URL(url, window.location.origin).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}

/* ── Conversions ─────────────────────────────────────────────── */

/**
 * Booking-CTA click — the primary conversion on this site.
 *
 * @param {string} location    - which button: nav, cta_band, contact
 * @param {'calendly'|'contact_section'} destination - where it actually goes.
 *   The nav button scrolls to the contact form rather than opening Calendly,
 *   so it is intent, not a completed booking. Only Calendly clicks are
 *   flagged as conversions in the session replays.
 */
export function trackBookCall(location, destination = 'calendly') {
  track('book_call_click', { location, destination });
  if (destination === 'calendly') {
    // Flag the Clarity recording so you can watch exactly what this visitor
    // did before booking, instead of scrubbing through every session.
    clarityTag('converted', 'book_call');
    clarityUpgrade('book_call');
  }
}

export function trackEmailClick(location) {
  track('email_click', { location });
}

/** Any link leaving udevelops.com (socials, Upwork, project demos). */
export function trackOutbound(url, label, location) {
  track('outbound_click', {
    link_domain: domainOf(url),
    link_url: url,
    link_text: label,
    location,
  });
}

/* ── Projects ────────────────────────────────────────────────── */

/** Opening a project detail page. */
export function trackProjectClick(projectTitle, projectSlug) {
  track('project_details_click', {
    project_title: projectTitle,
    project_slug: projectSlug,
  });
}

/** Demo / GitHub link on a project, from the list or the detail page. */
export function trackProjectLink(kind, projectTitle, url, location) {
  track(kind === 'github' ? 'project_github_click' : 'project_demo_click', {
    project_title: projectTitle,
    link_domain: domainOf(url),
    location,
  });
}

/**
 * Sustained hover over a project card. Fires once per card per page view
 * after HOVER_INTENT_MS, so it measures interest rather than mouse transit.
 */
export function trackProjectHover(projectTitle, durationMs) {
  track('project_hover', {
    project_title: projectTitle,
    hover_seconds: durationMs / 1000,
  });
}

/* ── Navigation & chrome ─────────────────────────────────────── */

export function trackNavClick(label, href, isMobileMenu) {
  track('nav_click', { link_text: label, link_href: href, menu: isMobileMenu ? 'mobile' : 'desktop' });
}

export function trackMobileMenuToggle(isOpening) {
  track('mobile_menu_toggle', { action: isOpening ? 'open' : 'close' });
}

export function trackThemeToggle(toTheme) {
  track('theme_toggle', { to_theme: toTheme });
}

export function trackBackToProjects() {
  track('back_to_projects_click', { location: 'project_detail' });
}

/* ── Contact form funnel ─────────────────────────────────────── */
/* Field VALUES are never sent — only whether a field was filled and how long
   the message was. Names, emails and message bodies are PII and stay local. */

/** First interaction with any form field — the top of the form funnel. */
export function trackFormStart() {
  track('contact_form_start', { location: 'contact' });
}

/** A field was filled and blurred. Tells you where people abandon. */
export function trackFormFieldComplete(fieldName, wasFilled) {
  track('contact_form_field', { field_name: fieldName, filled: wasFilled });
}

/**
 * Terminal state of a submit attempt.
 * @param {'success'|'error'|'ratelimited'|'spam'} status
 * @param {number} secondsToComplete - from first field focus to submit
 * @param {number} messageLength - character count only, never the text
 */
export function trackFormSubmit(status, secondsToComplete, messageLength) {
  track('contact_form_submit', {
    status,
    seconds_to_complete: secondsToComplete,
    message_length: messageLength,
  });
  if (status === 'success') {
    clarityTag('converted', 'contact_form');
    clarityUpgrade('contact_form');
  }
}

/** Someone started the form but left without submitting. */
export function trackFormAbandon(lastFieldTouched, fieldsFilled) {
  track('contact_form_abandon', {
    last_field: lastFieldTouched,
    fields_filled: fieldsFilled,
  });
}

/* ── Reading behaviour ───────────────────────────────────────── */

/** Fired once per threshold crossed: 25 / 50 / 75 / 90 / 100. */
export function trackScrollDepth(percent) {
  track('scroll_depth', { percent_scrolled: percent });
}

/** A section entered the viewport for the first time this page view. */
export function trackSectionView(section, secondsUntilSeen) {
  track('section_view', { section_id: section, seconds_until_seen: secondsUntilSeen });
}

/**
 * How long a section was actually on screen with the tab focused.
 * Batched and flushed when the page is hidden — this is your "where do
 * people spend their time" report.
 */
export function trackSectionTime(section, seconds) {
  track('section_time', { section_id: section, engaged_seconds: seconds });
}

/** End-of-visit summary. Sent on page hide, so it survives tab closes. */
export function trackPageEngagement({ activeSeconds, totalSeconds, maxScroll, exitSection }) {
  track('page_engagement', {
    active_seconds: activeSeconds,
    total_seconds: totalSeconds,
    max_scroll: maxScroll,
    exit_section: exitSection,
  });
}

/* ── Frustration & quality signals ───────────────────────────── */

/** 3+ clicks in the same spot within a second — something looks broken. */
export function trackRageClick(elementLabel, section) {
  track('rage_click', { element: elementLabel, section_id: section });
  // Keep the recording — a frustrated session is worth watching in full.
  clarityUpgrade('rage_click');
}

/** A click on something that isn't interactive — a false affordance. */
export function trackDeadClick(elementLabel, section) {
  track('dead_click', { element: elementLabel, section_id: section });
}

/** Text copied — usually the email address. */
export function trackCopy(section, charCount) {
  track('text_copy', { section_id: section, char_count: charCount });
}

export function trackPrint() {
  track('print_page', {});
}

/** Uncaught JS error or rejected promise. */
export function trackError(message, source) {
  track('js_error', { error_message: message, error_source: source });
}

/**
 * Core Web Vitals measured on real visits.
 * @param {'LCP'|'CLS'|'INP'|'FCP'|'TTFB'} name
 */
export function trackWebVital(name, value, rating) {
  track('web_vital', { metric_name: name, metric_value: value, rating });
}

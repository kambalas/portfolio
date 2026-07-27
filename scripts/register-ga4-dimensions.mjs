#!/usr/bin/env node
/**
 * Registers every custom dimension and metric the site sends, via the GA4
 * Admin API — instead of ~33 rounds of clicking through the GA4 UI.
 *
 * GA4 collects event params from day one but will not show them in reports
 * until they are registered, and it does NOT backfill. Run this before you
 * start caring about the data.
 *
 * Auth: a service account key, because Google blocks the generic gcloud OAuth
 * client from the sensitive `analytics.edit` scope ("This app is blocked").
 * A service account sidesteps the consent screen entirely — you just grant its
 * email Editor access on the GA4 property.
 *
 * Prerequisites (one-off):
 *   1. A service account with the Analytics Admin API enabled on its project.
 *   2. Its email added under GA4 → Admin → Property access management,
 *      with the **Editor** role.
 *   3. Point GA4_KEY_FILE at its JSON key.
 *
 * Usage:
 *   GA4_KEY_FILE=/path/to/key.json node scripts/register-ga4-dimensions.mjs --dry-run
 *   GA4_KEY_FILE=/path/to/key.json node scripts/register-ga4-dimensions.mjs
 *
 * Safe to re-run: anything already registered is skipped, never duplicated
 * or overwritten.
 */

import { readFileSync } from 'node:fs';
import { createSign } from 'node:crypto';

const MEASUREMENT_ID = 'G-3GTMHSF5XR';
const API = 'https://analyticsadmin.googleapis.com/v1beta';
const isDryRun = process.argv.includes('--dry-run');

// GA4 caps: 50 event-scoped dimensions, 25 user-scoped, 50 metrics.
const DIMENSIONS = [
  ['location', 'Location', 'EVENT', 'Which surface the click came from (nav, cta_band, contact, footer)'],
  ['section_id', 'Section ID', 'EVENT', 'Page section the event happened in'],
  ['project_title', 'Project Title', 'EVENT', 'Human-readable project name'],
  ['project_slug', 'Project Slug', 'EVENT', 'URL slug of the project'],
  ['link_domain', 'Link Domain', 'EVENT', 'Hostname of an outbound link'],
  ['link_url', 'Link URL', 'EVENT', 'Full outbound link URL'],
  ['link_text', 'Link Text', 'EVENT', 'Visible text of the link clicked'],
  ['link_href', 'Link Href', 'EVENT', 'Target of an internal nav link'],
  ['status', 'Form Status', 'EVENT', 'Contact form outcome: success, error, ratelimited, spam'],
  ['field_name', 'Field Name', 'EVENT', 'Contact form field that was completed'],
  ['last_field', 'Last Field Touched', 'EVENT', 'Field focused before abandoning the form'],
  ['element', 'Element Label', 'EVENT', 'Label of the element in a rage or dead click'],
  ['metric_name', 'Web Vital Name', 'EVENT', 'LCP, CLS, INP, FCP or TTFB'],
  ['rating', 'Web Vital Rating', 'EVENT', 'good, needs_improvement or poor'],
  ['percent_scrolled', 'Percent Scrolled', 'EVENT', 'Scroll milestone reached (25/50/75/90/100)'],
  ['exit_section', 'Exit Section', 'EVENT', 'Section on screen when the visitor left'],
  ['destination', 'CTA Destination', 'EVENT', 'calendly (real booking) or contact_section (scroll only)'],
  ['menu', 'Menu Type', 'EVENT', 'desktop or mobile navigation'],
  ['action', 'Action', 'EVENT', 'open or close for the mobile menu'],
  ['to_theme', 'Theme Switched To', 'EVENT', 'light or dark'],
  ['missing_path', 'Missing Path', 'EVENT', 'URL that produced a 404'],
  ['referrer', 'Referrer', 'EVENT', 'Where a 404 was linked from'],
  ['error_message', 'Error Message', 'EVENT', 'Uncaught JS error text'],
  ['error_source', 'Error Source', 'EVENT', 'File or unhandled_promise'],
  ['preferred_theme', 'Preferred Theme', 'USER', 'Theme this visitor uses'],
];

const METRICS = [
  ['engaged_seconds', 'Section Engaged Seconds', 'SECONDS', 'Time a section was on screen with the tab focused'],
  ['active_seconds', 'Active Seconds', 'SECONDS', 'Foreground time with recent input — real attention'],
  ['total_seconds', 'Total Seconds', 'SECONDS', 'Wall-clock time on page'],
  ['hover_seconds', 'Hover Seconds', 'SECONDS', 'Dwell time on a project card'],
  ['seconds_to_complete', 'Seconds To Complete Form', 'SECONDS', 'First field focus to submit'],
  ['seconds_until_seen', 'Seconds Until Section Seen', 'SECONDS', 'Page load to first sighting of a section'],
  ['message_length', 'Message Length', 'STANDARD', 'Character count of the form message (never the text)'],
  ['max_scroll', 'Max Scroll Percent', 'STANDARD', 'Furthest scroll depth reached'],
  ['char_count', 'Copied Characters', 'STANDARD', 'Length of copied text'],
  ['fields_filled', 'Fields Filled', 'STANDARD', 'Form fields filled before abandoning'],
  ['filled', 'Field Filled', 'STANDARD', '1 if the field had a value on blur, else 0'],
  ['metric_value', 'Web Vital Value', 'STANDARD', 'Measured value (ms, or unitless for CLS)'],
];

function fail(message) {
  console.error(`\n✗ ${message}\n`);
  process.exit(1);
}

const base64url = (input) =>
  Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * Exchange the service account key for an access token (RS256 JWT bearer
 * flow). Done by hand so the script needs no npm dependencies.
 */
async function accessToken() {
  const keyPath = process.env.GA4_KEY_FILE;
  if (!keyPath) fail('Set GA4_KEY_FILE to the path of the service account JSON key.');

  let key;
  try {
    key = JSON.parse(readFileSync(keyPath, 'utf8'));
  } catch (error) {
    fail(`Could not read key file ${keyPath}: ${error.message}`);
  }

  const now = Math.floor(Date.now() / 1000);
  const claims = {
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.edit',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };

  const unsigned = `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(
    JSON.stringify(claims)
  )}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(key.private_key, 'base64');
  const jwt = `${unsigned}.${signature.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const body = await res.json();
  if (!res.ok) fail(`Token exchange failed: ${body.error_description || body.error}`);
  return { token: body.access_token, email: key.client_email };
}

async function api(token, path, options = {}) {
  const res = await fetch(`${API}/${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const reason = body?.error?.message || res.statusText;
    if (res.status === 403) {
      fail(
        `Access denied: ${reason}\n\n` +
          'Most likely the service account has not been granted access yet.\n' +
          'GA4 → Admin → Property access management → + → add:\n' +
          `  ${process.env.GA4_SA_EMAIL || '<service account email>'}\n` +
          'with the Editor role, then re-run.'
      );
    }
    throw new Error(`${res.status} ${reason}`);
  }
  return body;
}

/** Find the numeric property id behind the public G-XXXX measurement id. */
async function resolveProperty(token) {
  const { accountSummaries = [] } = await api(token, 'accountSummaries?pageSize=200');
  const properties = accountSummaries.flatMap((a) => a.propertySummaries || []);
  if (properties.length === 0) {
    fail(
      'This service account cannot see any GA4 property yet.\n\n' +
        'GA4 → Admin → Property access management → + → Add users, paste:\n' +
        `  ${process.env.GA4_SA_EMAIL}\n` +
        'give it the Editor role, untick "Notify by email", then re-run.'
    );
  }

  for (const summary of properties) {
    const { dataStreams = [] } = await api(token, `${summary.property}/dataStreams?pageSize=200`);
    const match = dataStreams.find(
      (s) => s.webStreamData?.measurementId === MEASUREMENT_ID
    );
    if (match) return { name: summary.property, displayName: summary.displayName };
  }

  fail(
    `No property found with measurement ID ${MEASUREMENT_ID}. Visible properties:\n` +
      properties.map((p) => `  ${p.displayName} (${p.property})`).join('\n')
  );
}

async function listExisting(token, property, kind) {
  const key = kind === 'customDimensions' ? 'customDimensions' : 'customMetrics';
  const body = await api(token, `${property}/${kind}?pageSize=200`);
  return new Set((body[key] || []).map((d) => d.parameterName));
}

async function main() {
  const { token, email } = await accessToken();
  process.env.GA4_SA_EMAIL = email; // used in the 403 hint above
  console.log(`\nAuthenticated as ${email}`);
  const property = await resolveProperty(token);
  console.log(`\nProperty: ${property.displayName} (${property.name})`);
  console.log(isDryRun ? 'Mode: DRY RUN — nothing will be created\n' : 'Mode: CREATE\n');

  const existingDims = await listExisting(token, property.name, 'customDimensions');
  const existingMetrics = await listExisting(token, property.name, 'customMetrics');

  const results = { created: 0, skipped: 0, failed: 0 };

  for (const [parameterName, displayName, scope, description] of DIMENSIONS) {
    if (existingDims.has(parameterName)) {
      console.log(`  = ${parameterName.padEnd(22)} already registered`);
      results.skipped += 1;
      continue;
    }
    if (isDryRun) {
      console.log(`  + ${parameterName.padEnd(22)} would create (dimension, ${scope})`);
      results.created += 1;
      continue;
    }
    try {
      await api(token, `${property.name}/customDimensions`, {
        method: 'POST',
        body: JSON.stringify({ parameterName, displayName, scope, description }),
      });
      console.log(`  + ${parameterName.padEnd(22)} created (dimension, ${scope})`);
      results.created += 1;
    } catch (error) {
      console.log(`  ✗ ${parameterName.padEnd(22)} ${error.message}`);
      results.failed += 1;
    }
  }

  for (const [parameterName, displayName, measurementUnit, description] of METRICS) {
    if (existingMetrics.has(parameterName)) {
      console.log(`  = ${parameterName.padEnd(22)} already registered`);
      results.skipped += 1;
      continue;
    }
    if (isDryRun) {
      console.log(`  + ${parameterName.padEnd(22)} would create (metric, ${measurementUnit})`);
      results.created += 1;
      continue;
    }
    try {
      await api(token, `${property.name}/customMetrics`, {
        method: 'POST',
        body: JSON.stringify({
          parameterName,
          displayName,
          scope: 'EVENT',
          measurementUnit,
          description,
        }),
      });
      console.log(`  + ${parameterName.padEnd(22)} created (metric, ${measurementUnit})`);
      results.created += 1;
    } catch (error) {
      console.log(`  ✗ ${parameterName.padEnd(22)} ${error.message}`);
      results.failed += 1;
    }
  }

  console.log(
    `\n${isDryRun ? 'Would create' : 'Created'}: ${results.created}   ` +
      `Skipped: ${results.skipped}   Failed: ${results.failed}\n`
  );
  if (results.failed > 0) process.exit(1);
}

main().catch((error) => fail(error.message));

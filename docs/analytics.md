# Analytics

Two systems, deliberately split by what they are good at.

| | Google Analytics 4 | Microsoft Clarity |
|---|---|---|
| Answers | *What* happened, aggregated | *How* it felt, per session |
| Gives you | Event counts, funnels, traffic sources | Heatmaps, click/scroll maps, session replay |
| Where | https://analytics.google.com — property `G-3GTMHSF5XR` | https://clarity.microsoft.com |
| Cost | Free | Free, no traffic cap |

**Why not put mouse tracking in GA4?** `mousemove` fires ~60×/second — roughly 50,000 events in a 15-minute session. GA4 caps you at 500 distinct event names, degrades on high-cardinality params, and renders everything as tables. Clarity batches coordinates natively and replays them visually. Use each for what it does.

**What is not possible:** eye tracking. Knowing where someone is *looking* requires webcam access, which no analytics tool has and which would destroy trust if requested. Mouse position and hover dwell are the closest available proxies, and they are weak ones — treat "hovered for 2s" as a hint, not proof of attention.

---

## Setup

### 1. GA4 custom dimensions (required)

GA4 collects event params immediately but **will not show them in reports until you register each one**, and it does not backfill. Do this before you start collecting, or you lose the early data.

There is no Google Analytics MCP server, so this is done through the GA4 Admin API.

**Automated (recommended)** — 25 dimensions and 12 metrics in one command:

```bash
# One-off: grant your gcloud credentials the Analytics scope (opens a browser)
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/analytics.edit,https://www.googleapis.com/auth/cloud-platform

yarn ga4:dimensions:dry   # preview — creates nothing
yarn ga4:dimensions       # create them
```

The script finds the property behind `G-3GTMHSF5XR` automatically, skips anything already registered, and is safe to re-run. If it reports the Admin API is disabled, run `gcloud services enable analyticsadmin.googleapis.com` first.

Parameter names, display names, scopes and units live in `scripts/register-ga4-dimensions.mjs` — add new ones there when you add new events.

**Manual fallback** — Admin → Data display → Custom definitions. Scope **Event**:

`location`, `section_id`, `project_title`, `project_slug`, `link_domain`, `link_url`, `link_text`, `link_href`, `status`, `field_name`, `last_field`, `element`, `metric_name`, `rating`, `percent_scrolled`, `exit_section`, `destination`, `menu`, `action`, `to_theme`, `missing_path`, `referrer`, `error_message`, `error_source`

Scope **User**: `preferred_theme`

**Custom metrics** tab, unit *Seconds*: `engaged_seconds`, `active_seconds`, `total_seconds`, `hover_seconds`, `seconds_to_complete`, `seconds_until_seen`. Unit *Standard*: `message_length`, `max_scroll`, `char_count`, `fields_filled`, `filled`, `metric_value`.

> GA4 allows 50 event-scoped and 25 user-scoped custom dimensions plus 50 metrics, so this fits with room to spare.

### 2. Mark conversions

**Admin → Events → Mark as key event** for `book_call_click` and `contact_form_submit`. Until you do, GA4 will not treat them as conversions or attribute them to traffic sources.

### 3. Microsoft Clarity

1. Create a project at https://clarity.microsoft.com for `udevelops.com`.
2. Copy the project ID into `.env` locally: `VITE_CLARITY_ID=xxxxxxxx`
3. Add it in GitHub: **Settings → Secrets and variables → Actions → Variables → New** → name `VITE_CLARITY_ID`.

Without the ID nothing breaks — Clarity just never loads.

### 4. Exclude yourself

In your own browser console on udevelops.com:

```js
localStorage.setItem('analytics_opt_out', '1')
```

Neither GA4 nor Clarity will load at all. Remove with `localStorage.removeItem('analytics_opt_out')`.

---

## Event reference

### Conversions
| Event | Params | Meaning |
|---|---|---|
| `book_call_click` | `location`, `destination` | Booking CTA clicked. `destination=calendly` is a real booking intent; `contact_section` is the nav button, which only scrolls |
| `contact_form_submit` | `status`, `seconds_to_complete`, `message_length` | `status` is `success` / `error` / `ratelimited` / `spam` |
| `email_click` | `location` | mailto: clicked |
| `outbound_click` | `link_domain`, `link_url`, `link_text`, `location` | Any link leaving the site |

### Contact form funnel
`contact_form_start` → `contact_form_field` (per field, on blur) → `contact_form_submit` or `contact_form_abandon`.

**No field values are ever sent.** Only the field *name*, whether it was filled, and the message *length*. Names, emails and message bodies never leave the browser — GA4's terms forbid PII and it is unrecoverable once sent. The form also carries `data-clarity-mask="true"` so it cannot appear in a session replay either.

### Projects
| Event | Params |
|---|---|
| `project_details_click` | `project_title`, `project_slug` |
| `project_demo_click` / `project_github_click` | `project_title`, `link_domain`, `location` |
| `project_hover` | `project_title`, `hover_seconds` — 800ms+ dwell, once per card per page view, desktop only |
| `back_to_projects_click` | `location` |

### Reading behaviour
| Event | Params | Meaning |
|---|---|---|
| `scroll_depth` | `percent_scrolled` | Fires at 25 / 50 / 75 / 90 / 100 |
| `section_view` | `section_id`, `seconds_until_seen` | First time a section appears |
| `section_time` | `section_id`, `engaged_seconds` | **Where people spend their time.** Only counts while the section crosses the middle of the viewport *and* the tab is in the foreground |
| `page_engagement` | `active_seconds`, `total_seconds`, `max_scroll`, `exit_section` | End-of-visit summary. `exit_section` shows where people give up |

Tracked sections: `about`, `metrics`, `brands`, `projects`, `services`, `reviews`, `experience`, `skills`, `cta`, `contact`.

### Friction
| Event | Params | Meaning |
|---|---|---|
| `rage_click` | `element`, `section_id` | 3+ clicks within 30px in 1s — something looks broken |
| `dead_click` | `element`, `section_id` | Click on a non-interactive element. Capped at 3/page |
| `js_error` | `error_message`, `error_source` | Real visitors hitting real errors |
| `page_not_found` | `missing_path`, `referrer` | Broken link. `referrer` tells you if it is your own |

### Other
`nav_click`, `mobile_menu_toggle`, `theme_toggle`, `text_copy`, `print_page`, `not_found_recovery_click`, `web_vital`.

`web_vital` carries `metric_name` (LCP/CLS/INP/FCP/TTFB), `metric_value`, `rating`. Measured with native `PerformanceObserver` — no extra bundle cost. **Caveat:** `INP` here is the slowest interaction, not the true p98, so treat it as a smoke alarm rather than a precise figure.

---

## Where to look

| Question | Report |
|---|---|
| Is anyone booking? | Reports → Engagement → Events → `book_call_click`, split by `location` |
| Which button converts? | Explore → Free form. Rows `location`, metric `Event count` filtered to `book_call_click` |
| Where do people spend time? | Explore → Free form. Rows `section_id`, metric `engaged_seconds` (avg) |
| Where do they give up? | Explore. Rows `exit_section`, metric `Event count` on `page_engagement` |
| Which project is most interesting? | Compare `project_hover` vs `project_details_click` by `project_title` |
| Where do they abandon the form? | `contact_form_abandon` by `last_field` |
| Is anything broken? | `rage_click`, `dead_click`, `js_error`, `page_not_found` |
| Where is their mouse? | Clarity → Heatmaps → Click / Scroll / Area |
| What did one person actually do? | Clarity → Recordings, filter by the `converted` tag |

Conversions and rage clicks call `clarity.upgrade()`, so those recordings are prioritised — you can jump straight to the sessions that matter instead of scrubbing through everything.

---

## Compliance

**There is currently no cookie consent banner.** GA4 and Clarity both set cookies on first load with no opt-in. For an EU-facing site operated from Lithuania this is a GDPR/ePrivacy exposure — a known, deliberate gap, not an oversight. Options when you want to close it:

- Add a consent banner and gate `initAnalytics()` behind acceptance (costs you data from anyone who declines).
- Or switch to a cookieless analytics tool such as Plausible or Fathom, which do not require consent under most EU guidance, but which cannot do session replay.

## Architecture

```
src/lib/analytics/
├── index.js     public API — import everything from '../lib/analytics'
├── core.js      GA4 init, event queue, param sanitising, opt-out
├── events.js    one named function per tracked event
└── clarity.js   Clarity loader + session tagging

src/hooks/
├── useScrollDepth.js         scroll milestones + running max
├── useSectionTracking.js     section views + dwell time
├── usePageEngagement.js      active time, exit section
├── useInteractionQuality.js  rage/dead clicks, copy, print, errors
├── useHoverIntent.js         dwell-based hover, not mouse transit
└── useWebVitals.js           LCP/CLS/INP/FCP/TTFB
```

Both trackers start from `App.jsx` inside `requestIdleCallback`, so analytics never competes with first paint. Events fired before init are queued in `core.js` and flushed on init — the first `page_view` is never lost.

All flushes happen on `visibilitychange → hidden` and `pagehide`, never `unload`, which mobile Safari frequently never fires.

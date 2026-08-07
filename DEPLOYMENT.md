# Urban Goodz — Production Deployment

## Architecture

```
Visitor
  │
  ▼
Urban Goodz website  (TanStack Start · React 19 · prerendered + SSR)
  │   /join?as=app|business|driver|samaritan
  ▼
submitSignup  (server function · POST /_serverFn/<id>)
  │   CSRF-guarded · Zod-validated · server-only
  ▼
processLead  (src/server/lead/pipeline.ts)
  │
  ├─ 1. Spam detection      honeypot · timing · disposable domains · links · rate limit
  ├─ 2. Normalisation       name split · city/state · UA parse · interest mapping · UTM
  ├─ 3. Storage adapters    retry ×3 exponential → dead-letter queue → admin alert
  ├─ 4. CRM adapter         best-effort, never blocks a stored lead
  ├─ 5. Email adapter       branded confirmation + admin notification
  ├─ 6. Analytics adapters  server-side events, provider-agnostic
  └─ 7. Notification        admin email, plus failure alert with the raw lead
```

The frontend only ever calls `submitSignup`. Changing storage, CRM, email or
analytics providers is an environment change — no component is touched.

## Storage destinations

Set `LEAD_STORAGE` to a comma-separated list; they are tried in order and any
one succeeding counts as stored.

| id | Status | Notes |
|---|---|---|
| `google-sheets` | **Implemented** | Service-account JWT signed with `node:crypto`, no SDK |
| `airtable` | Implemented | Same column names as the sheet |
| `webhook` | Implemented | POSTs the full lead JSON anywhere |
| `console` | Dev only | Never use in production |

CRM (`LEAD_CRM`): `hubspot` implemented (upsert by email), `salesforce` is a
stub that throws loudly rather than silently dropping leads, `none` default.

## Google Sheets setup

1. Google Cloud → create a project → **enable the Google Sheets API**.
2. Create a **service account**, then create a **JSON key** for it.
3. Create the spreadsheet. Add a tab named `Leads`.
4. Paste this header row into row 1, left to right:

   `Timestamp · First Name · Last Name · Email · Phone · City · State · ZIP ·
   Business Owner · Customer · Driver · Freight · Medical Courier · Creator ·
   Marketplace · Services · Stranded · Investor · Partner · Referral Source ·
   UTM Source · UTM Medium · UTM Campaign · Landing Page · Browser · Device ·
   IP · Submission ID · Status · Notes`

5. **Share the sheet with the service-account email as an Editor.** This is the
   step that is most often missed — without it every append returns 403.
6. Set `GOOGLE_SHEET_ID` (from the sheet URL), `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   and `GOOGLE_PRIVATE_KEY` (the whole PEM; `\n` escapes are handled).

## Deploy

Requires a **Node server**. Static hosting will not run the API.

```bash
npm ci
npm run build          # vite build + tsc --noEmit
npm run preflight      # verifies configuration before you go live
npm start              # node .output/server/index.mjs
```

Put it behind a reverse proxy terminating TLS, forwarding `X-Forwarded-For`.
Set `PORT` and all secrets in the process environment (systemd unit, Docker
env-file, or your platform's secret store) — never commit `.env`.

Run under a supervisor that restarts on exit (systemd, PM2, Docker `restart:
unless-stopped`) and persist `LEAD_QUEUE_DIR` on a real volume, since that is
the dead-letter store.

## Operations

| Command | Purpose |
|---|---|
| `npm run preflight` | Config audit; exits non-zero on blocking issues |
| `npm run queue:list` | Show dead-lettered leads (dry run) |
| `npm run queue:replay` | Replay them into storage once it recovers |
| `npm run smoke:signup` | Post real submissions at a running server |

## Failure behaviour

| Failure | Behaviour |
|---|---|
| Storage call fails | Retry 3× with exponential backoff |
| All storage fails | Written to `.queue/pending.jsonl`, user still succeeds |
| Queue write fails too | Admin emailed the full lead JSON; user told to email us |
| CRM / email / analytics fails | Logged; the stored lead is unaffected |
| Server unreachable | Form shows a mailto fallback pre-filled with the entry |

A lead is never silently discarded.

## Security

- CSRF + origin validation on every server-function call (framework default)
- All secrets read server-side only; verified absent from client bundles
- Honeypot with **silent** acceptance so bots do not retry
- Rate limit: 5 submissions per IP per 10 minutes (configurable)
- Disposable-email blocking, link-in-name detection, sub-1.2s submit rejection
- Zod validation on the server, independent of the client
- IP capture **off by default** (`LEAD_STORE_IP`)

## Analytics

Client (`src/lib/analytics.ts`) pushes to whichever of `dataLayer`, `gtag`,
`plausible`, `posthog` or `fathom` exists — a silent no-op when none do.
Server mirrors the conversion events via GA4 Measurement Protocol so
ad-blockers cannot hide them.

Events: Signup Started · Signup Completed · Email Confirmed · Waitlist Joined ·
Driver / Business / Marketplace / Medical / Freight / Services / Stranded /
Creator / Investor / Partner Interest.

## Web push notifications

`src/lib/firebaseConfig.ts`, `src/lib/push.ts`, `public/firebase-messaging-sw.js`,
`src/components/PushOptIn.tsx`. Uses the same Firebase project ("urbangoodz")
the mobile apps already use — the web config values are safe to ship client-side
and are already wired in.

The opt-in banner stays **hidden** until both of these are set at build time:

| Env var | From |
|---|---|
| `VITE_FIREBASE_VAPID_KEY` | Firebase console → Project settings → Cloud Messaging → Web configuration → Generate key pair. Not yet generated — the admin panel's `push_notification_key` business setting exists but is empty. |
| `VITE_PUSH_SUBSCRIBE_WEBHOOK_URL` | A public-write endpoint (Zapier/Make webhook, Google Apps Script, etc.) that accepts a POSTed `{ type: 'push_subscription', token, landingPage, timestamp }` JSON body and stores it somewhere useful. There's no Node server behind this static deployment to host a server function, so the client POSTs directly — same reasoning as `LEAD_STORAGE=webhook` for leads. |

If a webhook host other than `fcmregistrations.googleapis.com` /
`firebaseinstallations.googleapis.com` is used, add it to the `connect-src` CSP
directive in `vite.config.ts` or the browser will silently block the request.

## App store links

`src/lib/appstore.ts`. Both buttons route to `/join?as=app` until
`VITE_APP_STORE_URL` / `VITE_GOOGLE_PLAY_URL` are set at build time.

## Extending

New lead types (investor, partner, franchise, employment, ambassador, vendor
onboarding) reuse the whole pipeline: add an entry to `audienceConfig` in
`src/lib/signup.ts` and, if needed, a mapping in `audienceInterests` in
`pipeline.ts`. No new endpoint, no new storage code.

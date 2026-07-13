# Kilig — Landing Page + Validation Kit

A mobile-first landing page for **Kilig** (interactive Filipino short-drama app) with a
fake-door signup funnel and a password-protected results dashboard. Built to
validate paid/organic ad conversion before the app exists.

See the concept in `../Documentation/Product Spec.md`. Screenshots live in
`../Reference Images/` (optimized copies in `public/shots/`).

## Run locally

```bash
npm run dev
# Landing page:  http://localhost:3000
# Dashboard:     http://localhost:3000/dashboard   (password required)
```

The dashboard password is set by `DASHBOARD_PASSWORD` in `.env.local`
(default: `kilig-sprint-2026`). Change it before sharing any URL.

## How it works

- **Landing page** (`app/page.tsx`) — hero + the highest-viral-potential features
  (Ikaw ang Bida share cards, Sagot Mo choices, Team voting, The Other Path, Kilig
  Meter), each with a CTA that opens the signup form.
- **Progressive signup** (`app/signup-form.tsx`) — one-tap questions first
  (gender → age → vibe → frequency → location), **email captured last**. Order is
  defined in `lib/types.ts`.
- **Funnel tracking** (`app/track.tsx`, `/api/track`) — logs a page-view per session
  and a form-open event, so the dashboard shows a real conversion rate. UTM params +
  referrer are captured for per-ad attribution.
- **Dashboard** (`app/dashboard/`) — cookie-gated. Shows visits → opens → signups →
  conversion, per-answer breakdowns, ad-source split, the full submissions table, and
  a **CSV export**.

## Data storage

All responses are saved as newline-delimited JSON:

- `data/submissions.jsonl` — completed signups (all answers + email + UTM)
- `data/events.jsonl` — page views + form opens

This lives entirely behind `lib/store.ts` (four functions).

## Deploying to Vercel (later)

Vercel serverless functions have an **ephemeral, read-only filesystem**, so the
local JSONL files will **not** persist in production. Before deploying:

1. Provision a store from the Vercel Marketplace — **Neon Postgres** (recommended)
   or **Upstash Redis**, or use **Vercel Blob**.
2. Reimplement the four functions in `lib/store.ts`
   (`saveSubmission` / `getSubmissions` / `saveEvent` / `getEvents`) against it.
   Nothing else changes — pages, API routes, and the dashboard only import those.
3. Set `DASHBOARD_PASSWORD` (and the DB connection env vars) in
   **Vercel → Project → Settings → Environment Variables**.
4. Point the project root at `landing/` and deploy.

No app code outside `lib/store.ts` needs to change.

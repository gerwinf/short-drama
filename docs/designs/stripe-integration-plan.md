# Stripe Integration Plan — Kilig (2026-08-15)

Requested products: Payments, Billing, Invoicing. Plan is phased to match the
project's evidence gates (CEO review 2026-08-15: no software beyond what the
current test needs). Stripe is the **diaspora USD rail only** — the PH mass
rail is GCash/Maya directly (Stripe can't take GCash for a non-PH merchant,
and PH cards are the wrong rail for this audience; see the market deep-dive
payments section).

## Phase 1 — NOW: Payments (the founding pre-order, D5)

What: one Product ("Kilig Founding Member"), one $9.99 one-time Price, one
Payment Link. Copy on the link states the honest-billing terms in plain
words: refundable any time before launch, no subscription starts today,
deposit credits to the first month.

- Script: `landing/scripts/stripe-founding-preorder.sh` (idempotence: safe to
  re-run; it just creates a fresh link — deactivate old ones in the
  dashboard). Run once with `sk_test_…`, verify with card `4242 4242 4242
  4242`, **refund that test payment from the dashboard** (this is the D5
  refund-path test), then run again with `sk_live_…` for the real link.
- Email collection: on by default on Payment Links — satisfies the "collect
  email at payment" requirement for joining payers back to signups.
- No webhooks, no server code, no DB: at a 4–21-person cohort the Stripe
  dashboard + the ledger CSV is the integration. Resist building more.
- Metadata `cohort=founding-preorder-2026-08` marks these payments for later
  reconciliation when Billing starts.
- Refunds: manual, dashboard, full amount — matches the pre-registration's
  refund promise.

## Phase 2 — AT LAUNCH GATE: Billing (only if the pre-order passes)

The subscription product exists only after the Phase 2 pilot is green-lit.
Design it as the *implementation of the anti-coin-trap brand promise* — the
billing configuration IS the positioning (deep-dive blind spot 1):

- One $9.99/mo subscription Price (anchor $19.99 as a separate display
  price, never a fake strikethrough).
- Founding members: their deposit converts via a one-month credit (customer
  balance credit or 100%-off-first-month coupon at migration), price
  guaranteed by subscribing them at a grandfathered $9.99 Price object.
- **Monthly only — no weekly plans** (the #1 "scam" pattern in the customer
  research is weekly auto-renew).
- Customer Portal ON with one-click self-serve cancel; email receipts ON;
  upcoming-renewal emails ON. Cancellation must be easier than sign-up.
- Checkout via Payment Links / Stripe Checkout — no custom payment UI.
- Webhooks enter here (subscription created/canceled → the opt-in list), and
  only here.

## Phase 3 — DEFERRED: Invoicing

Consumer flows never need it. It becomes relevant only for B2B: partner
co-productions or licensing (Beetzee/VMX conversations, D7). Zero setup now.

## Explicitly not doing

- No Stripe for PH-mass payments (GCash/Maya link is that rail, created
  directly in GCash/Maya Business — see D5 rails checklist).
- No coin/credit system, ever, under the honest-billing positioning.
- No custom checkout code while Payment Links suffice.

## Keys hygiene

Test keys may be pasted around; **live keys never** — env vars only
(`STRIPE_SECRET_KEY`), and the publishable key is the only one that may ever
appear client-side. The test secret key that appeared in chat on 2026-08-15
should be rolled in the dashboard out of hygiene (Developers → API keys →
Roll) — costless in test mode.

## Environment note

The Claude Code remote environment's network policy currently blocks
`api.stripe.com` (proxy 403). To run the script from a session: allow
`api.stripe.com` in the environment's network settings at claude.ai/code.
Otherwise run it from any laptop — it needs only bash, curl, python3.

# Founding Pre-Order — Pre-Registration (P0/D5, 2026-08-15)

The real-money escalation of the WTP fake door (playbook check Gap A; CEO
review D5). This document is written **blind**: the author has never seen the
production dashboard numbers, so the thresholds below are uncontaminated.
Founder rule: adopt or adjust these numbers BEFORE opening the dashboard's
segment card; after looking, they freeze as-is.

## 1. Trigger (when the test fires)

- **Primary:** reachable-only reservations (dashboard "Lead reachability"
  section) reach **≥ 30 total AND ≥ 10 in at least one segment** (segment =
  the D1 card: PH / OFW / abroad-other).
- **Fallback:** if not crossed by **2026-09-30**, run anyway if reachable
  reservations ≥ 15 — labeled a *directional* read, not a gate. Below 15 by
  that date, do not run: treat the fake door itself as under-powered and fix
  funnel volume first.
- The test fires **once**, to the whole reserved cohort at that moment. No
  re-sends to the same person.

## 2. The offer (unchanged from what they reserved)

A **refundable founding deposit of exactly one founding month** — ₱149 (PH
plan) or $9.99 (diaspora plan), matching the price each person reserved.
It locks the founding price for life and credits in full against the first
month at launch. Refundable any time before launch, no questions.

Explicitly rejected (deep-dive rule: don't change the offer mid-test):
annual passes, discounts below the reserved price, and any non-refundable
framing. The variable being measured is *will the same yes become money* —
nothing else may move.

## 3. Pass/fail bars (pre-registered)

This cohort already said yes to this exact price — the bar is accordingly
demanding. All rates are computed on **reachable, delivered** emails
(bounces excluded from the denominator), read after a **14-day** window with
one reminder at day 7.

| Read | Bar | Meaning |
|------|-----|---------|
| Blended reserved→paid | **≥ 15%** | PASS — real-money demand confirmed; satisfies the money half of the Phase 2 gate |
| Blended | 5–15% | MIXED — interview 3 non-payers before any conclusion; one re-read only |
| Blended | **< 5%** | FAIL — the fake-door reserve signal does not convert to money; re-scope monetization thesis before production spend |
| Any single segment (n ≥ 10) | **≥ 20%** | GTM anchor — build acquisition around this segment (OFW cell if abroad; sachet/GCash path if PH) |

Payment friction is part of the measurement, not noise: if PH fails while
diaspora passes, that includes the rails reality — which is itself the answer.

## 4. Rails checklist (prep now, before the trigger)

- [ ] **PH:** GCash payment link (GCash for Business / Maya Business payment
  link — either; must show "Kilig" as recipient name, not a personal name).
  Fallback: Maya checkout link. Test with a ₱1 self-payment first.
- [ ] **Diaspora:** Stripe Payment Link, $9.99 one-time, description
  "Kilig Founding Member deposit — refundable, credits to first month."
- [ ] Both links collect **email** at payment so payers join back to signups.
- [ ] Refund path tested once (₱1 / $0.50 self-refund) before any send.
- [ ] Ledger: one CSV (`email, segment, plan, paid_at, amount, refunded`) —
  no tooling beyond a spreadsheet (CEO review: no new software for this).
- [ ] Privacy/consumer basics: the payment page or email states what the
  deposit is, the refund promise, and the deletion contact — same PH Data
  Privacy Act posture as the bio-link page.

## 5. Send mechanics

The dashboard Broadcast tool sends the fixed campaign to **all** signups — do
NOT use it for this. Instead: CSV export → filter WTP = `reserved`, drop
known-bad addresses, split by plan → send the two drafts below individually
(BCC batches are fine at this list size). Day-7 reminder: one line, same
thread, only to non-payers.

### PH draft (₱149)

> Subject: Buksan na ang founding slot mo — ₱149 na naka-lock 💖
>
> Hi [Name]! Ikaw ang isa sa mga unang nag-reserve ng Kilig founding price na
> ₱149/buwan. Bubuksan na namin ang aktwal na founding slots — at dahil
> naka-reserve ka, sa'yo ang unang pila.
>
> Para i-lock ang ₱149 habambuhay: mag-deposit ka ng ₱149 (GCash o Maya).
> Ito na rin ang unang buwan mo pag-launch. Kung magbago ang isip mo bago
> mag-launch — full refund agad, walang tanong.
>
> 👉 [GCash/Maya link]
>
> Limitado ang founding slots. Salamat sa tiwala — ikaw ang dahilan kung
> bakit ginagawa namin 'to.

### Diaspora draft ($9.99)

> Subject: Your founding slot is open — $9.99 locked in 💖
>
> Hi [Name], you were one of the first to reserve Kilig's founding price of
> $9.99/mo. We're opening the actual founding slots now, and reservers go
> first.
>
> To lock the price for life: a one-time $9.99 deposit — it becomes your
> first month at launch. Change your mind before launch? Full refund,
> no questions.
>
> 👉 [Stripe link]
>
> Founding slots are limited. Thank you — a piece of home is coming.

## 6. Outcomes → actions

- **PASS:** money half of the Phase 2 gate satisfied → proceed to the pilot
  redesign inputs (TODOS "Gated" block) with the winning segment named.
- **Segment-skewed pass:** invert GTM per the D1 decision rule before any
  further spend (OFW cell, creative POV, pricing emphasis).
- **MIXED:** 3 non-payer interviews (reuse the reserver kit, section C), one
  revised send permitted (copy only, never price), then final read.
- **FAIL:** the reserve tap was social compliance, not intent. Do not produce.
  Back to office-hours with this data — the monetization thesis, not the
  content thesis, is what failed.

Payers are not just data: they are the founding cohort. Whatever the
outcome, every payer gets named recognition at launch (opening credits of
the first season — "Founding Barkada") and refunds are honored forever.

---

## Decision log

**2026-08-30 — Email round result: 0/21 payments. Email retired as the
conversion channel; campaign moved in-funnel.**
Per the frozen bars this is a FAIL of the email-mediated test — logged as
such, no goalpost moves. But the bars' own precondition ("computed on
reachable, **delivered** emails") was unverifiable: the send was a BCC blast
from a personal Gmail to cold Gmail inboxes with no open tracking, to an
audience the D1 read shows is 35–60 and Facebook-native (their real inbox is
Messenger; the email address was a quiz-completion artifact). Channel
failure and demand failure are indistinguishable in this data, so the FAIL
branch's own instruction applies: **re-scope the monetization test, not the
thesis** — one channel-corrected retest, and it is the last.

The re-scope: the payment step moves into the funnel at peak intent —
reserve tap → Success screen shows the refundable-deposit CTA immediately
(`preorder_view` / `preorder_click` events; `PreorderClick` Meta custom
event for later ad optimization). Gated per plan on
`NEXT_PUBLIC_PREORDER_DIASPORA_URL` (Stripe link exists) and
`NEXT_PUBLIC_PREORDER_PH_URL` (GCash link still to be created — PH arm dark
until then). **Bars unchanged in spirit, denominator restated:** paid ÷
`preorder_view` ≥ 15% blended passes; PH segment ≥ 20% (n ≥ 10) is the GTM
anchor. n accrues only with new traffic, so a small PH ad push (~$50–100,
the original Option B) now serves both volume and the retest. Payments
reconcile from Stripe/GCash dashboards into the ledger CSV against
`preorder_click` events by email.

**2026-08-15 — Option A invoked (founder decision): fallback triggered early.**
State at decision time: 25 unique reachable reservers (< 30 primary trigger);
paid traffic stopped ~Jul 27, so the count was static and the primary trigger
unreachable without new spend. The ≥15 fallback count was already satisfied;
only its date (2026-09-30) was pulled forward, on the argument that lead decay
strictly worsens the read with every waiting week. **The run is labeled
DIRECTIONAL per the fallback's own terms.** Deviation logged here before any
results exist. Pass bars unchanged (≥15% blended; ≥20% single-segment n≥10 —
only the PH segment is gate-grade this run, diaspora n<10 is directional
inside a directional run). Send-list filters applied per the D1 read: dedup
by email, aquarian0216 alias cluster excluded, under-18 reservers excluded
from the payment ask → 17 PH + 4 diaspora sendable (1 diaspora flagged
dubious). Cadence from send day: day-7 one-line reminder to non-payers,
day-14 read, log payments in the ledger CSV as they arrive.

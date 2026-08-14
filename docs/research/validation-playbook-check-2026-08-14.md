# Validation-Playbook Check — 2026-08-14

Input: founder-supplied transfer analysis ("sell → validate → build → scale"
principles applied to content businesses, Netflix framing). Checked against the
repo's actual state as of `edeec16` (privacy page). Verdict up front: **the
project already runs most of the playbook.** The check surfaced three real
gaps, all in the "money and conversation" half, none in the funnel mechanics.
Actions are logged in TODOS.md under "Validation-playbook check (2026-08-14)".

## Scoreboard

| # | Principle | Status | Evidence in repo |
|---|-----------|--------|------------------|
| 1 | Sell it before you build it | **PARTIAL** | WTP fake door live: founding-member price reservation ₱149/mo (anchor ₱299) and $9.99 diaspora variant, `reserve_click`/`reserve_skip` tracked per email (`landing/lib/types.ts`). But no peso/dollar has ever changed hands — intent is measured, money is not. |
| 2 | Painfully specific customer | **HOLDING** | Filipina women 18–34, heavy TikTok/FB, teleserye/K-drama; OFW diaspora as separately-priced secondary (design doc; `resolvePlan()` splits PH vs diaspora by answer + `?price=`). |
| 3 | Intent signals over cold lists | **HOLDING** | Story discovery mines Reddit top-monthly (r/ChikaPH etc. — reddit-story-scoreboard); ads target lookalikes of the behavior, not demographics; verdict step measures per-premise dilemma engagement. |
| 4 | Lead with value | **HOLDING** | Free playable episodes (`/play/rich-boy`, `/play/enemies`), free finished film (`/watch/sa-ulan`), vibe-matched verdict quiz. Email is the *last* step of the form, value comes first — the exact "Blueprint-Mail before the pitch" pattern. |
| 5 | One channel deep first | **HOLDING** | Facebook is the deep channel: serial Kabanata drops + share cards, Meta pixel `Lead` optimization, FB traffic split in the dashboard. TikTok explicitly waits. Keep it that way until the FB loop (view → follow → signup → reservation) is reliable. |
| 6 | Talk to customers daily | **GAP** | The 10-conversation muscle ran once (sprint). Nothing in the repo points conversations at the *highest-intent* people we now have: the `reserve_click` emails. |
| 7 | Build only when paid | **PARTIAL** | App is gated behind Phase 3 (premise 1 holding). But Phase 2 production spend is currently gated on engagement signals only — the playbook's version gates it on collected money/commitments. |
| 8 | 12 months relentless | **HOLDING** | Weekly-drop serial cadence exists; compounding is audience → trust → reservation, as the analysis predicts for content. |

## The three real gaps → actions

### Gap A — Reservations are free; the next rung is real money (principle 1 + 7)
The fake door was the right first rung: it measures intent without payment
infrastructure. But a ₱0 reservation is still a click. The playbook's core
claim — avoid producing the wrong season by taking money first — needs one
escalation: offer the **reserved** cohort (and only them) a real founding
pre-order (GCash/Maya link or Stripe Payment Link; season pass or 12-mo
early-bird, refundable). Trigger, not calendar: when reservations cross a
pre-registered threshold, run it as a one-shot broadcast through the existing
`/api/dashboard/broadcast` tool. Conversion of reserved → paid is the single
strongest evidence this project can produce before Phase 2 production spend.

### Gap B — Nobody is talking to the reservers (principle 6)
The people who tapped "I-reserve ang founding price ko" are the named,
reachable, highest-intent users the sprint went looking for. Five short calls
(or async voice notes — lower friction for the audience): why did you reserve,
what were you watching instead this week, what would make you cancel. Their
verbatims also feed ad creative and Kabanata beats. This restarts the
conversation loop with better-selected people than the original 10.

### Gap C — Story feedback isn't formally closing the loop (principle 6/7, content flavor)
The analysis's line "statt Feature-Requests bekommst du Story-/Format-Feedback"
is exactly what `watch_vote` / `play_choice` / verdict answers are. The data is
collected and dashboarded, but no rule says production decisions must cite it.
Add the rule: every next-Kabanata/next-episode decision logs which vote/choice
data backed it (one line in the production log is enough). Costs nothing,
prevents drift back to producing on instinct.

## Explicitly checked and NOT adopted

- **Crowdfunding (Kickstarter-style)** for season 1 — rejected for now. The
  audience is PH-mass on GCash, not Kickstarter users; the founding pre-order
  (Gap A) is the culturally correct equivalent.
- **Discord/community server** — premature. The FB Page comments + email list
  *are* the community at this size; a group adds moderation load before it adds
  signal. Revisit when Kabanata comment volume sustains itself for a month.
- **Second channel (TikTok relaunch)** — the analysis itself says one channel
  deep first. FB hasn't been saturated; TikTok stays queued.
- **Annual-pass pre-sell as the *first* offer** — the WTP door tests monthly
  pricing; changing the offer mid-test would invalidate the reserve-rate read.
  Annual early-bird becomes a variant of the Gap-A pre-order instead.

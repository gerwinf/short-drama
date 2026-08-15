# D1 Segment Read — logged 2026-08-15

Source: production dashboard snapshot (339 signups, 7,665 visits, data through
2026-08-09; paid traffic effectively stopped ~Jul 27). Read against the
pre-registered gates in the ad brief and
`docs/designs/founding-preorder-preregistration.md`.

## Headline: the fake-door WTP gate is a clear PASS

| Gate | Pre-registered bar | Actual | Verdict |
|------|-------------------|--------|---------|
| PH ₱149 reserve rate | ≥ 8–10% | **44.9%** (35/78) | PASS ×4.5 |
| Diaspora $9.99 reserve rate | ≥ 5% | **34.8%** (8/23) | PASS ×7, but underpowered (n=23) |
| Integrity: reachable-only vs raw | holds ≈ raw | **37.9%** vs 42.6% | HOLDS — signal is real humans |

Blended: 101 price views → 43 reserve events → **25 unique reachable
reservers** (0 unreachable reservers — the fake-email population skips the
price gate, it doesn't reserve).

## The segment answer (the load-bearing question)

**PH dominates — on rate AND volume.** PH: 44.9% reserve rate on 78 views;
diaspora: 34.8% on 23 views. But the honest read on diaspora is
*underpowered, not negative*: 93.2% of traffic came from `lead_test_ph`
(PH-targeted), so the 39 abroad signups arrived by accident. Within its tiny
sample the diaspora rate is within noise of PH.

**Decisions (per the D1 decision rule):**
- GTM posture: **sachet/GCash PH path leads.** Kilig is not (yet) forced into
  the diaspora-first inversion.
- **D8 (OFW ad cell): stays deferred** — its gate ("diaspora dominates") did
  not trigger. The cheap, correct diaspora test is the pre-order's per-segment
  read, not a new ad cell.

## The unordered finding: the persona is wrong in the docs

The design doc targets **Filipina 18–34**. The audience that actually
converts is:

- **72.3% women — but 71.9% are 35+, and 45.1% are 45+.** 18–34 is only ~25%.
- 52.2% watch short-drama apps *daily* (the exact ReelShort/DramaBox user the
  sprint screened for), another 26.5% daily on TikTok/FB/TV.
- Verdict energy: "Lalaban ako para sa kanya" 62.4%; revenge splits
  magpakilala/tahimik. Rich Boy (30.1%) and Enemies-to-Lovers (28.0%) lead.

This is the teleserye demographic, not the TikTok-Gen-Z one — consistent with
Meta's older skew, but 3 independent signals (gender, age, frequency) say the
payer is a **35–60 Filipina daily short-drama viewer**. Implications: casting
and story POV for the pilot, creative targeting, and interview expectations
(voice notes > video calls for this cohort; GCash familiarity high). The
persona correction is now a P2 TODO; it does NOT reopen premise decisions —
it sharpens who the "authentic faces" must resonate with.

## Creative read (feeds D10/D11)

The `ad-03-bold-statement` family produced ~58% of attributed signups
(base 39.8% + neon-rain 9.1% + rooftop 6.8% + minor variants). Mystery-hook
and unexpected-twist tie at 10.9% each. Next creative round: iterate on
bold-statement, not on the tail.

## Data-integrity flags (MUST apply before the pre-order send)

1. **Dedup by email:** 43 reserve events ≠ 43 people (e.g. one address
   reserved on 4 separate submissions). Unique reachable reservers = 25.
2. **Alias cluster:** `green./master./red./blue.aquarian0216@gmail.com` is one
   person on four addresses — two of the aliases RESERVED. Treat the cluster
   as one (or as internal testing) and exclude the duplicates from the send
   list and the denominator.
3. **Minors:** at least one $9.99 reserver self-reported **Under 18** — never
   include minors in a payment ask. Filter `age = under_18` out of the send.
4. **Founder tests** (`gerwin*`, `db-verify`, `*@kilig.test`) already excluded
   by the test filter or obvious by inspection.

Realistic sendable pre-order list after filters: **~20–22 PH + ~4–5
diaspora.**

## D5 trigger status — founder decision required

Pre-registered primary trigger: ≥ 30 reachable reservations (≥10 in one
segment). **Current: 25.** Not crossed. But paid traffic stopped ~Jul 27 —
the count is static; waiting cannot cross the threshold without new spend,
and the fallback (run at ≥15 by 2026-09-30) is already satisfied on count.

Options, honestly framed:
- **A (recommended): invoke the fallback early.** Run the pre-order now to
  the filtered list, labeled *directional* per the pre-registration's own
  fallback terms. Rationale: leads decay — a list warm from July converts
  better in mid-August than on Sep 30; the count cannot grow on its own; the
  deviation is documented here, in the open, before results exist.
- **B: restart a small PH ad push** (~$50–100) to cross 30 organically, then
  run the primary trigger as written. Cleaner statistically, costs money and
  2+ weeks of decay.
- Not an option: silently treating 25 as 30. The deviation must stay labeled.

Whichever option: read reserved→paid **per segment**, pass bars unchanged
(≥15% blended / ≥20% single-segment n≥10 — note diaspora n will be <10, so
only the PH segment read is gate-grade).

# TODOS — Kilig

Priority order set by CEO review 2026-08-15
(`docs/designs/kilig-ceo-review-2026-08-15-todos.md`, decisions D1–D19).
Ranking rule: every item is ranked by its contribution to the one load-bearing
question — **who pays real money, and from which segment (PH mass vs diaspora)?**
Original source docs: design doc `docs/designs/kilig-design-doc.md`, CEO plan
`docs/designs/kilig-evidence-sprint.md`, market deep-dive
`docs/research/market-deep-dive-2026-08-15.md`.

## P0 — This week, no new spend (the evidence chain)

- [ ] **(D1) Diaspora-segmented WTP funnel read — do FIRST.** Segment every
  reserve/skip/price_view metric PH vs abroad in the dashboard (events carry the
  location answer). Zero cost — reads data already collected. Its result steers
  the interview guide (D2), the OFW ad cell gate (D8), and the GTM posture
  (deep-dive break #1: if diaspora dominates, Kilig is a diaspora-first company).
- [ ] **(D2+D3+D4) Interview 5 reservers, instrumented.** The `reserve_click`
  emails are the named, highest-intent users the sprint went looking for. Short
  calls or async voice notes. Guide must probe: why reserved, PH-vs-OFW segment,
  faces-vs-dubs (would you watch this with AI faces? did you watch Linda
  Walker?), coin-trap resentment, what would make them cancel. Use the
  interview-insight capture template (verbatims, pain scores, surprises,
  referral names — D3, unblocked from the 2026-07-10 deferral); verbatims feed
  ad creative. Optional 2-minute mock-vote stills test at the end if time
  allows (D4, directional only).
- [ ] **(D5) Founding pre-order: pre-register the threshold NOW, prep the
  rails.** Write down the `reserve_click` count that triggers the real-money
  test BEFORE looking at the dashboard (same pre-registration discipline as the
  sprint gates). Prep GCash/Maya + Stripe payment links so the one-shot
  broadcast (existing `/api/dashboard/broadcast`) can fire the day the
  threshold crosses: refundable founding pre-order, reserved emails only.
  **Read reserved→paid conversion per segment, never blended.** This is the
  strongest pre-production evidence the project can produce and the playbook
  gate for Phase 2 spend.

## P1 — Next 2 weeks

- [ ] **(D7) PH-network workstream (one muscle, three targets).**
  (a) Status-check the Jules Jurado intros (asked 2026-07-14: content creators +
  Globe-ecosystem distribution contacts; lead with vote-the-next-episode, not
  CYOA); (b) exploratory conversation with **Beetzee Play** (₱1/ep GCash rails +
  Globe distribution, thin content pipeline — partner path, not just rival);
  (c) exploratory conversation with **VMX/Viva** (audience + talent agency, no
  vertical play). Attacks Open Question 1 (PH production partner — biggest
  execution gap) and the deep-dive partner path at once.
- [ ] **(D9) Human-faces casting — principle DECIDED, execution open.** Logged:
  the pilot's lead faces are human; AI stays top-of-funnel/previz (photoreal AI
  measures the lowest WTP of any format; the wedge is authentic faces). The
  *who* comes out of D7's conversations — Approach C (creator co-production) is
  the casting decision, and it is the moat, not a Phase-2 detail.
- [ ] **(D12) iWant benchmark file (30 min).** Pilot gates reference the real
  local baseline — "The Chambermaid's Daughter": 30 eps, first 5 free on
  FB/YouTube/iWant, ~5M combined FB views, ₱35/mo PH vs $12.99/mo US — not only
  internal trailing averages.

## P2 — Gated on P0 reads / next natural trigger

- [ ] **(D8) OFW third ad cell — gate REWRITTEN.** Same creatives, OFW-heavy
  geos (UAE, Saudi, HK, Singapore), +$150–200. Old unblock ("PH sprint cells
  pass") superseded: runs if and when the D1 read shows diaspora-dominant
  reserve rates. If PH dominates, stays deferred. If promoted, add an OFW-POV
  story variant (longing-for-home register) to the creative round.
- [ ] **(D10+D11) Next creative round, when one runs:** add the
  anti-coin-trap/honest-billing framing ("walang coin trap" — blind spot 1,
  unclaimed) and keep the 2026-07-14 refinements: interactive-hook end-cards as
  **moral verdicts** ("tama ba siya?"), not plot picks; one variant with a
  kindness-at-the-lowest-moment beat. Cinderella-revenge premise stays.
- [ ] **(D13) Watchlist — monthly, timeboxed 30 min:** PineDrama/Melolo/
  FreeReels PH expansion (free-model squeeze); iWant vertical lineup cadence;
  Beetzee×Globe traction; AI Tagalog dub quality (when dubs stop being memes,
  the localization moat closes); any incumbent shipping community voting.

## Standing rules & logged decisions (no action; constraints that govern the above)

- **(D6) Vote-data citation rule — ADOPTED 2026-08-15:** every
  next-Kabanata/next-episode production decision logs one line citing the
  `watch_vote` / `play_choice` / verdict data behind it.
- **Cost-to-serve rule (Phase 3 architecture):** video bytes never ship from the
  app platform. Commodity CDN/off-the-shelf headless video (Cloudflare R2/
  Stream, Mux, Bunny) = 1–8% of even discounted ₱0.50/episode revenue;
  app-platform bandwidth (Vercel ~$0.15/GB) = 40–50%+ = fatal. Per-episode
  profitability must survive a ~5-free-episode subsidy and season-bundle
  discounting (₱50/100 eps). **Live tripwire:** landing serves demo clips from
  Vercel `public/shots/` — move to a CDN before any new paid ad traffic runs.
- **Piracy note (app phase):** piracy undercuts paid-unlock models specifically
  (PH: 70% of users consumed pirated streams 2024, #2 in APAC). Reinforces
  premise 5 (free + ad-supported first); app-phase monetization sells
  convenience, community, and voting rights, not pure content access.
- **AI content (pilot input):** majority of the market is AI-generated ("mostly
  AI slop" — said 3×, now corroborated: 95%+ of new Chinese titles). AI-hybrid
  production is market-acceptable for top-of-funnel, AND strengthens the
  authentic-faces differentiation wedge — see D9 for the casting boundary.
- **Story-discovery pipeline (pilot input):** Reddit top-monthly (r/ChikaPH,
  r/RantAndVentPH, r/alasjuicy) → archetype cluster → script the winner;
  repeatable per arc.
- **Brand decision (2026-07-14, logged):** one brand, PG-13-hot; campaign on the
  normal version. Dirty/Vivamax tier rejected (unadvertisable,
  app-store-blocked, kills ad-supported model); revisit only as Phase 3+
  web-only subscription experiment. **Interview listening cue:** if respondents
  independently say "I pay for Vivamax but wish it had real stories," log it,
  don't act on it.

## Gated — pilot redesign inputs (MANDATORY before Phase 2 production; from Codex outside voice, CEO review D14)

- [ ] **Control methodology:** voted-vs-control episode comparison is confounded
  by plot stakes, novelty, and audience growth; trailing-average baseline blends
  changing conditions. Redesign the measurement (or accept "directional only"
  explicitly) with sprint data in hand.
- [ ] **Retention measurability:** verify TikTok/FB analytics can actually
  measure "20% of viewers returning 3+ consecutive weekly drops" without owned
  identity; if not, redefine the criterion around measurable proxies (follower
  retention, repeat commenters, bio-link opt-ins).
- [ ] **Budget realism:** re-estimate ≤$5,000 for 8–10 authentic episodes +
  partner fees against real PH production quotes; the ceiling may force a
  shorter run or AI-hybrid production (within the D9 boundary: human lead
  faces).
- [ ] **Vote-to-shoot timing:** "shoot only the winning branch" needs a real
  production calendar — either pre-write both branches and shoot fast
  post-vote, or batch-shoot with modular scenes. Resolve before scripting.

## Deferred — pilot phase (unblock condition: P0 chain resolves + a pilot is green-lit)

- [ ] Codex-style funnel dashboard (Next.js + Supabase + R2) — only if native
  analytics + spreadsheet prove insufficient (D16).
- [x] ~~Facebook distribution (OFW/older segment)~~ — **CLOSED 2026-08-15,
  overtaken by events:** FB serial, Meta pixel, and FB traffic reads live since
  July (commits f281e0d, b91eafb). The OFW-geo remainder is exactly D8.
- Creator/celebrity co-production (design doc Approach C) — **merged into
  D7/D9**; it is the casting decision.

## Deferred — app phase (unblock condition: a pilot series shows platform-independent retention)

- [ ] Original spec scope: vertical player, branching engine, affinity state,
  coins, Kilig+, share-card composer, Barkada mode (Documentation/Product Spec.md
  §7). Deferred, not deleted.
- [ ] "Ikaw ang Bida" share-card loop — strongest surviving app-era idea; first
  app feature to build.
- [ ] App-store vs PWA funnel decision (spec §8.5) — resolved as "neither,
  social-native first" until this phase.

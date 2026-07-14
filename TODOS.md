# TODOS — Kilig

Deferred items from /office-hours + /plan-ceo-review (2026-07-10). Source docs:
- Design doc: `~/.gstack/projects/short-drama/gerwf-unknown-design-20260710-200540.md`
- CEO plan: `~/.gstack/projects/short-drama/ceo-plans/2026-07-10-kilig-evidence-sprint.md`

## Market feedback — Jules Jurado, Globe ecosystem (2026-07-14)
Full analysis: `docs/research/reddit-story-scoreboard-2026-07-14.md` (also mirrored in `~/.gstack/projects/short-drama/`). Premise check: all 5 design-doc premises survive; premise 4 (async voting over in-video branching) got independent outside validation (Jules raised Bandersnatch + "interactive sells only if invested — dating sims, RPGs" unprompted).

- [ ] **THIS WEEK — ask Jules for intros**: 1–2 warm intros to the content creators he knows and the Globe-ecosystem distribution contacts he spoke to. Directly attacks Open Question 1 (PH production/creator partner — biggest execution gap) and seeds a later Globe carrier-billing path. When pitching, lead with vote-the-next-episode, not "choose your own adventure" (the plan already demoted in-video branching; CYOA invites the Bandersnatch objection).
- [ ] **Sprint creative refinement (from Reddit scoreboard)**: keep the Cinderella-revenge premise (validated — intersection of the two strongest archetypes); write interactive-hook end-cards as **moral verdicts** ("tama ba siya?"), not plot picks — judgment posts have the highest comment ratios; consider one variant with a kindness-at-the-lowest-moment beat (the month's #1 emotional register).
- [ ] **Cost-to-serve rule (Phase 3 architecture)**: video bytes never ship from the app platform. Commodity CDN/off-the-shelf headless video (Cloudflare R2/Stream, Mux, Bunny) = 1–8% of even discounted ₱0.50/episode revenue; app-platform bandwidth (Vercel ~$0.15/GB) = 40–50%+ = fatal. Per-episode profitability must survive a ~5-free-episode subsidy and season-bundle discounting (₱50/100 eps). Near-term echo: landing serves demo clips from Vercel `public/shots/` — move to a CDN before paid ad traffic runs.
- [ ] **Piracy note (app phase)**: piracy has grown sharply in the past year and undercuts paid-unlock models specifically. Reinforces premise 5 (free + ad-supported first); app-phase monetization should sell convenience, community, and voting rights rather than pure content access.
- [ ] **AI content (pilot input)**: majority of the market is AI-generated ("mostly AI slop" — said 3×). Confirms AI-hybrid production is market-acceptable if PH quotes blow the $5k ceiling, AND strengthens the authentic-faces differentiation wedge.
- [ ] **Story-discovery pipeline (pilot input)**: Reddit top-monthly (r/ChikaPH, r/RantAndVentPH, r/alasjuicy) → archetype cluster → script the winner; repeatable per arc.
- [ ] **Brand decision (2026-07-14, logged)**: one brand, PG-13-hot; campaign on the normal version. Dirty/Vivamax tier rejected (unadvertisable, app-store-blocked, kills ad-supported model); revisit only as Phase 3+ web-only subscription experiment. **Interview listening cue for the sprint kit**: if respondents independently say "I pay for Vivamax but wish it had real stories," that's evidence for the spicy-subscription wedge — log it, don't act on it.

## Deferred — sprint fast-follows (unblock condition: PH sprint cells pass their gates)
- [ ] **OFW third ad cell** — same creatives, OFW-heavy geos (UAE, Saudi, HK, Singapore), +$150–200 budget. Tests the diaspora-tier hypothesis (spec §3.3.5) with a clean, separately-powered read.
- [ ] **Interview-insight log** — capture template (verbatim quotes, pain scores vs gate, surprises, referral names) + post-sprint synthesis doc + gstack learnings entries. Structure the sprint's free-form notes retroactively.
- [ ] **Mock-vote exercise** — 2-minute "ano'ng gagawin mo?" cliffhanger-stills test appended to the interview script. Directional-only; a unanimous shrug is the signal worth having before pilot spend.

## Pilot redesign inputs (MANDATORY before Phase 2 production — from Codex outside voice, CEO review D14)
- [ ] **Control methodology:** voted-vs-control episode comparison is confounded by plot stakes, novelty, and audience growth; trailing-average baseline blends changing conditions. Redesign the measurement (or accept "directional only" explicitly) with sprint data in hand.
- [ ] **Retention measurability:** verify TikTok/FB analytics can actually measure "20% of viewers returning 3+ consecutive weekly drops" without owned identity; if not, redefine the criterion around measurable proxies (follower retention, repeat commenters, bio-link opt-ins).
- [ ] **Budget realism:** re-estimate ≤$5,000 for 8–10 authentic episodes + partner fees against real PH production quotes; the ceiling may force a shorter run or AI-hybrid production.
- [ ] **Vote-to-shoot timing:** "shoot only the winning branch" needs a real production calendar — either pre-write both branches and shoot fast post-vote, or batch-shoot with modular scenes. Resolve before scripting.

## Deferred — pilot phase (unblock condition: sprint passes, Phase 2 begins)
- [ ] Codex-style funnel dashboard (Next.js + Supabase + R2) — only if native analytics + spreadsheet prove insufficient.
- [ ] Facebook distribution (OFW/older segment) — enters at pilot, not sprint.
- [ ] Creator/celebrity co-production deal (design doc Approach C) — becomes the pilot casting decision.

## Deferred — app phase (unblock condition: a pilot series shows platform-independent retention)
- [ ] Original spec scope: vertical player, branching engine, affinity state, coins, Kilig+, share-card composer, Barkada mode (Documentation/Product Spec.md §7). Deferred, not deleted.
- [ ] "Ikaw ang Bida" share-card loop — strongest surviving app-era idea; first app feature to build.
- [ ] App-store vs PWA funnel decision (spec §8.5) — resolved as "neither, social-native first" until this phase.

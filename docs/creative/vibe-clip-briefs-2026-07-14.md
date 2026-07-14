# Kilig vibe-clip generation briefs — Kabit + sharpened Cinderella-Revenge

Handoff briefs for the generation agent (Higgsfield or equivalent). Two clips, each delivered as
`<slug>.mp4` (9:16 vertical, 1080×1920, 10–15s, loopable) + `<slug>.jpg` (poster frame), matching
the existing assets in `landing/public/clips/`.

Grounding: Reddit story scoreboard 2026-07-14 (`~/.gstack/projects/short-drama/reddit-story-scoreboard-2026-07-14.md`),
brand decision 2026-07-14 (one brand, PG-13-hot, "malisyoso pero classy"), design system: Product Spec §2.

## Shared style block (prepend to every generation prompt)

> Cinematic vertical short-drama teaser, Philippines. Real Filipino cast, real Manila locations.
> Premium telenovela-poster look, NOT cheap Chinese-CEO-drama aesthetic. Color grade: warm
> golden-hour glow for romantic/emotional beats; cool neon-Manila night for tension/betrayal beats.
> Brand palette accents: Kilig Rose #FF3D68, Mango Gold #FFB627, Midnight Plum #1E0E24 background
> tones, Sampaguita White #FFF6F2 text, Twilight Violet #7B4BFF as second-lead/team accent.
> Title/overlay typography: Fraunces (high-contrast display serif), tight-tracked, dramatic;
> supporting text Plus Jakarta Sans. Text overlays in Taglish.
> Shallow depth of field, film grain, anamorphic-style lens flares on emotional peaks.
> PG-13 STRICT: no nudity, no lingerie, no explicit acts, no sexualized framing — tension lives in
> eyes, hands, near-misses, and what is almost seen. Must pass TikTok ad review.
> AVOID (AI-slop tells): plastic skin, dead eyes, warped hands, gibberish text in scene, generic
> "Asian city" — locations must read Filipino (jeepney, sari-sari store, condo skyline, province fiesta).

## Brief 1 — `kabit` (The Other Woman)

**Premise (one line):** A wife finds the receipt — literally — and the audience decides what she does with it.

**Why this premise:** kabit is the highest-engagement PH drama genre missing from v1; scoreboard
archetypes #1 (injustice → verdict) + #4 (secret desire/betrayal). The end-card is a moral verdict,
not a plot pick — verdict framing drives the biggest comment ratios.

**Beats (10–15s):**
1. (0–3s) Golden-hour condo kitchen. WIFE (30s, elegant, tired-beautiful) folds her husband's barong;
   a hotel keycard and a receipt fall from the pocket. Close-up: her hand freezes on it.
2. (3–6s) Cut to neon-night flashback tease: HUSBAND laughing in a hotel lobby with the KABIT
   (younger, Twilight Violet dress) — seen from behind glass, reflections, nothing explicit. Rain on the window.
3. (6–9s) Back to the wife. She looks up at the mirror; her face changes from broken to composed.
   She slides the receipt into her own purse. Slow push-in, Kilig Rose rim light rising.
4. (9–12s) Freeze-frame on her almost-smile.
5. (12–15s) END-CARD on Midnight Plum, Kilig Glow gradient bar (Rose → Coral → Gold):
   - Title (Fraunces): **"Ang Resibo"**
   - Verdict line (large): **"Nasa kamay mo na ang ebidensya. Ano'ng gagawin mo?"**
   - Two Sagot-Mo choice cards with heartbeat pulse: **[ Harapin sila NGAYON ]** (Kilig Rose) vs
     **[ Ipunin muna ang resibo ]** (Twilight Violet)
   - Footer: kilig wordmark (lowercase, spark on the i) + "Ikaw ang bida. Vote sa comments."

**Poster frame (`kabit.jpg`):** beat 3 — the composed face + receipt into the purse.

## Brief 2 — `cinderella-revenge` (sharpened, replaces soft "Cinderella Teleserye" framing)

**Premise (one line):** The maid they humiliated walks back in five years later as the boss — and the
audience decides whether she reveals herself.

**Why this premise:** this is the LOCKED sprint ad premise (CEO review D10 — wronged-heroine
pagbabalik); the landing clip must match what ad-clickers saw. Scoreboard: intersection of
archetypes #1 (injustice) + #3 (comeback with receipts). Keep one beat of kindness-at-the-lowest-moment
(archetype #2, the month's strongest register).

**Beats (10–15s):**
1. (0–3s) Cold open, desaturated: young woman in a maid's uniform on her knees picking up shattered
   wine glass; a manicured hand drops a ₱100 bill on the floor next to her like a tip. Off-screen laughter.
2. (3–5s) Kindness beat, warm flicker: outside in the rain, a street kid shares his umbrella and
   banana-cue with her. She half-laughs through tears. (One shot — it's a beat, not a subplot.)
3. (5–9s) Match-cut: same marble lobby, five years later, golden-hour grade at full glow. Red-soled
   heels step over the same spot. She's in a power suit, Mango Gold accents; staff bow. The family
   who humiliated her waits nervously in the boardroom — they don't recognize her. Yet.
4. (9–12s) Freeze-frame: her hand on the boardroom door handle, ghost of a smile. Kilig Rose rim light.
5. (12–15s) END-CARD, same system as Brief 1:
   - Title (Fraunces): **"Ang Pagbabalik"**
   - Verdict line: **"Hindi ka nila nakilala. Sasabihin mo ba kung sino ka?"**
   - Choice cards: **[ Magpakilala NA ]** (Kilig Rose) vs **[ Paglaruan muna sila ]** (Mango Gold)
   - Footer: kilig wordmark + "Ikaw ang bida. Vote sa comments."

**Poster frame (`cinderella-revenge.jpg`):** beat 4 — hand on the door, ghost smile.

## Delivery + integration notes (for the agent)

- One generation pass per clip + at most one quality re-roll (CEO plan effort bound).
- Label as AI-generated where platform rules require (TikTok synthetic-media disclosure) — applies
  when these run as ads; the landing embed needs no label but keep the master files flagged.
- File naming: `kabit.mp4/.jpg`, `cinderella-revenge.mp4/.jpg` → `landing/public/clips/`.
  Landing integration (separate task, not the agent's): add `{ slug: "kabit", label: "Ang Resibo (Kabit)" }`
  to `VIBE_CLIPS` in `landing/app/page.tsx` and either replace the `cinderella` entry or swap its
  assets for the sharpened version so the ad premise and landing premise match.
- Quality bar: if a human face reads as AI-plastic in the poster frame, re-roll or reframe to
  hands/silhouette/back-shot — the brand is positioned against AI slop even when using AI.

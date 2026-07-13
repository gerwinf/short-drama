# Kilig — Product Specification

**Working title:** Kilig
**Category:** Interactive vertical micro-drama (short-drama app)
**One-line pitch:** *You don't just watch the teleserye — you decide it.* A choose-your-path vertical drama app built for Filipinos, blending the emotional intensity of the teleserye, the twists of the Latin American telenovela, and the polish and slow-burn romance of K-drama.
**Tagline:** **"Ikaw ang bida."** *(You're the lead.)*

> Alternate names if "Kilig" is unavailable at store level: *Kilig* (primary), *Teleserye Mo*, *Bida*, *Kabog*, *Pusong Ligaw*. Kilig is the recommendation — short, emotional, untranslatable, and a built-in ad hook.

---

## 1. Positioning & Strategy

### The wedge
The short-drama category is a ~$11B market projected to hit ~$14B in 2026, but **83% of revenue is still China** and the Western leaders (ReelShort, DramaBox, ShortMax) all run the *same* playbook: machine-translated Chinese "billionaire CEO / werewolf" dramas, passive linear video, and a coin paywall users resent. Growth has decisively shifted to **Southeast Asia, Latin America, and India** (>75% of Q1 2026 downloads), which the incumbents serve with badly-dubbed content, not originals.

**Kilig attacks two axes the incumbents can't defend affordably:**

1. **Interactivity** — 100% of incumbent content is passive. A choose-your-path mechanic changes the paywall from "pay to see the next episode" to "pay to unlock *your* bolder path," and turns every cliffhanger into natively shareable, comment-baiting social content.
2. **Authentic Philippine localization** — real Filipino faces, Taglish dialogue, teleserye emotional grammar, and telenovela/K-drama story DNA. Not dubbed. This is a cheap-CPM, high-social-usage, teleserye-obsessed market that no global player treats as a first-class audience.

### Why the Philippines
- One of the highest social-media-usage rates on earth — organic and paid social is the native growth channel.
- Deep, multi-generational teleserye viewing culture (appointment-TV emotional habit already exists).
- Massive established K-drama and telenovela fandom — the story DNA is pre-validated with this audience.
- High English literacy → cheap to subtitle and later expand across SEA.
- Low CPMs → more thumb-stops per ad dollar than any US-focused competitor.

### Content DNA (the creative signature)
| Source tradition | What we take from it |
|---|---|
| **Filipino teleserye** | Emotional maximalism, family/class conflict, the "kontrabida" (villain) we love to hate, faith and utang-na-loob themes, Taglish warmth, the long-awaited "pagbabalik" (comeback/revenge) |
| **Latin American telenovela** | High-velocity twists: secret parentage, switched-at-birth, amnesia, evil matriarch, rags-to-riches, forbidden love across class lines |
| **Korean drama** | Production polish, warm cinematic color grade, slow-burn "will-they-won't-they," chaebol/heir romance, second-lead-syndrome love triangles, shipping culture |

The fusion is the moat: no competitor's translated Chinese library can replicate a Taglish, telenovela-twist, K-drama-glossed interactive romance.

### Target sub-audience
- **Primary:** Filipina women, 18–34, heavy TikTok/Facebook users, K-drama and teleserye fans, commute/downtime viewers, price-sensitive (low ARPU, so monetization leans on rewarded ads + micro-subscription).
- **Secondary:** OFW (Overseas Filipino Workers) diaspora — homesick, higher disposable income, strong paid-conversion potential, and a powerful organic-sharing community abroad.
- **Tertiary (expansion):** broader SEA romance-drama audiences (Indonesia, Vietnam, Malaysia) once the interactive format is proven.

---

## 2. Brand & Visual Identity

**Design north star:** *"Golden-hour glamour meets neon Manila night."* Premium, romantic, cinematic — the emotional opposite of the flat, cheap-looking Chinese-CEO drama apps. Think telenovela movie poster crossed with a K-drama color grade. Dark-first (video apps live in the dark), with warm romantic accents that glow.

### 2.1 Logo & wordmark
- **Wordmark:** `kilig` set lowercase in the display serif, with the dot of the "i" replaced by a small **spark/heartbeat glyph** (a stylized *kilig* spark).
- **App icon:** the spark-heart mark on a warm rose-to-plum gradient. Instantly warm and romantic in a sea of red/black competitor icons.
- **Clear space & scale:** minimum 24px icon legibility; the spark must remain visible at store-thumbnail size.

### 2.2 Color palette
Dark-first UI. Warm, saturated, romantic — never clinical.

| Token | Name | Hex | Use |
|---|---|---|---|
| `--kilig-rose` | Kilig Rose | `#FF3D68` | Primary brand / CTAs / active choices / the spark |
| `--mango-gold` | Mango Gold | `#FFB627` | Premium (coins, Kilig+), highlights, "kilig meter" fill |
| `--midnight-plum` | Midnight Plum | `#1E0E24` | Primary app background (dark) |
| `--plum-800` | Deep Plum | `#2B1533` | Cards / surfaces on dark |
| `--sampaguita` | Sampaguita White | `#FFF6F2` | Primary text on dark / light-mode base |
| `--sunset-coral` | Sunset Coral | `#FF7A59` | Secondary accent / gradients |
| `--twilight-violet` | Twilight Violet | `#7B4BFF` | Secondary-lead / "Team" accent, love-triangle voting |
| `--night-ink` | Night Ink | `#120814` | Video scrim / overlays |

- **Signature gradient ("Kilig Glow"):** Kilig Rose → Sunset Coral → Mango Gold. Used on the logo, primary CTAs, and the Kilig Meter.
- **Team colors:** each romantic lead gets a signature color (e.g. Kilig Rose vs Twilight Violet) so love-triangle voting and "Team [X]" content is instantly recognizable in-feed.

### 2.3 Typography
| Role | Typeface | Why |
|---|---|---|
| **Display / titles / poster** | **Fraunces** (or Playfair Display) | High-contrast fashionable serif = telenovela-poster drama and romance |
| **UI / body** | **Plus Jakarta Sans** | Clean, warm, highly legible humanist sans; designed in the region (nice SEA nod) |
| **Emotional accent** | A tasteful script (e.g. **Caveat**) | Sparingly — "kilig moment" flourishes, love notes, hand-written choice tags |

- Titles are large, dramatic, tight-tracked. Body is airy and legible for captions.
- **Bilingual by default:** all UI ships in Taglish-friendly English + Filipino; captions default to Taglish matching the dialogue.

### 2.4 Iconography, imagery & motion
- **Icons:** rounded, soft-cornered, slightly playful — never corporate.
- **Imagery:** warm golden-hour grade for romance; cool neon-Manila night for tension/villain scenes. Real Filipino cast, real locations (jeepney, sari-sari store, condo skyline, province fiesta).
- **Motion language:**
  - **Heartbeat pulse** on the primary CTA and at decision points.
  - **Kilig Glow shimmer** across the Kilig Meter as it fills.
  - **Confetti/sparkle burst** on a "kilig payoff" scene.
  - **Branch-split transition:** when the story forks, the screen briefly splits/shimmers to signal "your choice changed the path."
- **Tone of voice:** warm, teasing, best-friend Taglish. Example microcopy: *"Sagot mo?"* (Your call?), *"Charot lang... o hindi?"*, *"Grabe the kilig 😳"*, *"Unlock the mas matapang na path."*

---

## 3. Core Functionality

### 3.1 The content format
- **Vertical, full-screen video.** Episodes **60–120 seconds**.
- **Seasons of 40–70 episodes**, cliffhanger-driven.
- **Branching story graph:** most episodes end on a normal cliffhanger; **key episodes end on a decision point** that forks the narrative.

### 3.2 The interactive decision engine ("Sagot Mo")
The heart of the product and the primary differentiator.

- At a decision point, video pauses on a dramatic freeze-frame and **two (occasionally three) large tappable choice cards** slide up, with a **countdown timer** (urgency + tension).
- **Free choices** branch the emotional story (forgive him / walk away; confront the kontrabida / stay silent).
- **Premium choices** (Mango Gold locked) unlock the *bolder / spicier / higher-stakes* path — the "mas matapang" option — via coins or Kilig+.
- Choices affect a lightweight **relationship/affinity state** ("Team Mateo" vs "Team Sung" affinity, boldness, kindness) that shapes which endings and scenes you unlock.
- **Branch map** on the series page shows how many paths/endings exist and which you've unlocked → replay and completion drive.
- **"The Other Path" teaser:** after a choice resolves, a blurred peek at what the *other* choice would have triggered → FOMO to replay or unlock.

### 3.3 Monetization (tuned for a low-ARPU, high-engagement market)
A softened hybrid — the coin wall is the category norm but the most-resented part, so we blunt it:

1. **Free branching core.** The main emotional storyline is watchable free with rewarded ads — you never hit a hard "pay or leave" wall on the *baseline* path. This protects retention and ad-conversion.
2. **Coins** unlock premium choices, skip-ahead, exclusive/"true" endings, and early episode drops. Packs priced for PH (e.g. ₱49–₱499).
3. **Rewarded video (IAA)** to earn coins — critical for this market; monetizes non-payers heavily and keeps the funnel friendly.
4. **Kilig+ subscription** (~₱99/mo): unlimited premium choices, ad-free, early access, exclusive endings, and a "Team" badge. Priced as an impulse, positioned against competitors' nickel-and-diming: *"Stop paying ₱40 to finish one show."*
5. **Diaspora tier:** higher-priced global Kilig+ for OFW/expat users (USD pricing) who convert far better than the domestic base.

---

## 4. Viral Highlights (organic + paid social engine)

This is the section that matters most for growth. Every one of these is designed so the **product itself manufactures shareable, comment-baiting content** — lowering CAC instead of raising it like the incumbents' pure paid-UA model.

### ⭐ 4.1 "Ikaw ang Bida" share cards — the flagship viral loop
After any decision point, the app **auto-generates a 9–15s vertical share clip**: the freeze-frame cliffhanger + the two choices + *your* choice highlighted + an on-screen poll: **"Ako, I slapped him. Ikaw, ano'ng gagawin mo? 👉"** One tap exports to TikTok/Reels/Stories/Facebook with the app watermark and a deep-link.
- **Why it goes viral:** "what would YOU do?" is the single highest-engagement organic format on every platform — it *demands* a comment. Every share is free, algorithm-boosted UA that installs friends directly onto that exact scene.

### ⭐ 4.2 Auto-cut cliffhanger clips for paid + organic
Every episode auto-produces an **ad-ready vertical cut** with burned-in Taglish captions, the hook in the first 2 seconds, and the choice prompt as the CTA. Fills the "creative arms race" (the category now needs hundreds of fresh creatives/month) **at near-zero marginal cost**, and each cut is natively interactive-looking → higher CTR than a passive drama teaser.

### ⭐ 4.3 "Team [Lead]" love-triangle voting & shipping
Second-lead-syndrome is a K-drama superpower. Each series runs a live **Team Mateo vs Team Sung** vote with a public leaderboard, team colors, and badges. Fans evangelize their ship → tribal, self-perpetuating organic reach ("Team Sung, laban tayo!"). Weekly team results become their own social content.

### ⭐ 4.4 The Kilig Meter
An on-screen **meter that fills with Kilig Glow** during romantic build-up and *maxes out* on the payoff scene. It's screenshot- and screen-record-bait ("the meter EXPLODED 😳"), and doubles as an emotional gamification hook that deepens session time.

### 4.5 Barkada Mode (group watch)
Friends join a room and **vote together on the next choice**; the majority path plays. SEA viewing is intensely social; this turns watching into a group activity and a reason to invite friends (viral install driver).

### 4.6 Weekly cliffhanger drop + countdown
Mimics teleserye primetime: a new episode/branch drops on a schedule with an in-app and push **countdown**, rebuilding appointment-viewing habit and giving a recurring reason to post ("bago na! 8PM drop 🔥").

### 4.7 "The Other Ending" FOMO reveal
Shareable "you won't believe what happens if she forgives him" reveals of alternate branches → drives both replays and installs from curiosity.

### 4.8 (Phase 2) Fan alternate endings / UGC-lite
Let top fans submit and vote on alternate branch ideas; feature winners. Turns the audience into a content and marketing flywheel and seeds a creator angle the incumbents lack.

---

## 5. Primary Screens

The screens below are the ones that showcase the core loop and the viral mechanics. Dark-first, `--midnight-plum` base, Kilig Glow accents.

### 5.1 Onboarding — "Choose your first kilig"
- 3–4 swipeable full-bleed vibe cards: **Rich Boy Next Door**, **Amnesia Twist**, **Enemies-to-Lovers**, **Cinderella Teleserye**. Tapping one seeds recommendations and drops the user straight into a hooky first episode.
- **Ad-native:** the vibe the user picks (or the ad they clicked) becomes the opening episode — no dead "sign up first" friction. Language toggle (Taglish default).
- Goal: from install to first cliffhanger in **under 20 seconds**.

### 5.2 Player Screen (the star)
- Full-bleed vertical video, minimal chrome, `--night-ink` scrim top and bottom.
- **Kilig Meter** as a slim glowing vertical bar on the right edge.
- Taglish captions on by default.
- Light social rail: like, **share ("Ikaw ang Bida")**, Team vote, episode/branch progress.
- Tap-and-hold to pause; swipe up = next episode; swipe right = branch map.

### 5.3 Decision Point ("Sagot Mo?") overlay
- Video freezes on a dramatic frame; the frame desaturates slightly and the **branch-split shimmer** plays.
- **Two large choice cards** rise with a heartbeat pulse and a **countdown ring**. Premium (bolder) option wears a Mango Gold lock.
- Post-choice: brief **"The Other Path"** blurred teaser + a prompt to generate the share card.

### 5.4 "Ikaw ang Bida" Share Card composer
- Auto-generated clip preview with the poll overlay and your highlighted choice.
- One-tap export row: TikTok, Reels, Facebook, Stories, copy link. Watermark + deep-link baked in.
- Editable caption prefilled with a Taglish hook and hashtags.

### 5.5 Home / Feed
- Hero carousel of trending series (telenovela-style vertical posters with the Kilig Glow treatment).
- Rails: **Continue Watching** (with branch progress), **Trending Now**, **Team Battles this week**, **New 8PM Drops**, **For You**.
- Everything is one tap from resuming the exact branch you left.

### 5.6 Series Detail
- Big telenovela-style poster, logline, cast (real Filipino faces), **Team vote widget** with live leaderboard.
- **Branch map** visualizing paths/endings and which you've unlocked (completion + replay driver).
- Episode list with locked/premium markers; "Start" / "Continue" CTA in Kilig Rose.

### 5.7 Coins & Kilig+ (monetization screen)
- Coin packs (₱-priced) + **"Earn coins" rewarded-video** option front and center.
- **Kilig+** upsell framed against the pain point: *"Tapusin lahat ng kilig — unli premium choices, walang ads, early drops. ₱99/buwan."*
- Diaspora/global pricing variant for OFW users.

### 5.8 Profile — "Your Story"
- Your chosen path(s), unlocked endings, Kilig Meter high scores, **Team badges**, and a shareable "my kilig journey" recap card.
- Barkada Mode entry point and invite-a-friend (viral install hook).

---

## 6. Go-to-Market: social-ad-native growth

- **Channels (match category reality):** Facebook and TikTok are the category's #1 and #2 UA channels (in the US, social is 68% of category ad spend, Facebook 25% / TikTok 19%). In PH, Facebook + TikTok dominance is even stronger. Snapchat/IG secondary.
- **Paid creative:** run the auto-cut cliffhanger clips (§4.2) as the workhorse, always ending on the **interactive choice prompt** as the CTA ("Tap to decide what she does next") — a hook incumbents structurally cannot show because their content isn't interactive.
- **Organic engine:** the "Ikaw ang Bida" share loop (§4.1) + Team shipping (§4.3) generate installs your competitors have to *buy*. This is the core CAC advantage.
- **Creator seeding:** partner with Filipino TikTok micro-influencers and teleserye fan pages for authentic "watch me react to this choice" content.
- **Validation before scale:** the deep-research pass could NOT confirm any published "winning hook formula" or reliable CPI/ROAS benchmarks (vendor claims failed verification). So GTM must start with a **small paid creative test (2–3 ad concepts × 2 markets)** to find real winners before scaling spend — do not trust published category hook formulas.

---

## 7. MVP Scope (what ships first)

**In:**
- Vertical player + Taglish captions.
- Decision engine with 2-way branching + affinity state (lightweight).
- 2–3 flagship original series (one strong hook each: e.g. amnesia-heir romance, Cinderella-revenge, enemies-to-lovers), ~40–60 eps each with 2–3 branch points and 2 endings.
- Coin unlock + rewarded video + Kilig+ subscription.
- **"Ikaw ang Bida" share card** + auto-cut cliffhanger export (the growth engine — must be in v1).
- Home, Player, Decision, Series Detail, Share Composer, Coins/Kilig+, Onboarding, Profile.

**Out (later phases):** Barkada group-watch, fan/UGC alternate endings, full Team leaderboards, SEA-market expansion, three-way branches, deep affinity RPG mechanics.

---

## 8. Open Questions / To Validate
1. **Content production model:** live-action original shoots (authentic, higher cost) vs AI-assisted vs hybrid — and how much branching real production can support economically.
2. **Depth of branching:** how many real forks/endings per series before production cost outweighs the retention/replay benefit.
3. **Pricing calibration** for coin packs and Kilig+ against PH willingness-to-pay and rewarded-ad eCPMs.
4. **First-series greenlight:** which of the flagship hooks to lead with in paid creative testing.
5. **Distribution:** app-store-first vs a web/PWA funnel for cheaper social ad landing and instant-play.

---

*Document owner: [you] · Status: v1 concept spec · Next step: paid creative concept test + MVP implementation plan.*

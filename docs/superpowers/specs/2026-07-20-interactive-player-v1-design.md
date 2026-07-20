# Kilig — Interactive Player v1 ("Rich Boy Next Door")

**Date:** 2026-07-20
**Status:** Approved, in build
**Owner:** Gerwin

## Goal

Turn Kilig's core differentiator — the "Sagot Mo" choose-your-path mechanic —
from something the landing page *describes* into something a visitor can *feel*.
Ship one complete, lovable, playable branching micro-drama on the
best-performing premise (**Rich Boy Next Door**), built only from assets we
already have, living as a `/play` route inside the existing Next.js landing app.

Doubles as a validation asset: real traffic can be sent into a playable demo and
we log which paths people actually choose.

## Format (decided)

Interactive vertical **photonovela**. A short hero video clip opens the episode,
then the story continues as full-bleed cinematic **scene cards** (generated
stills + subtle Ken Burns motion + Taglish captions). Two "Sagot Mo?" decision
points fork the path; ~3 endings. This is chosen over a literal
Bandersnatch-style video-segment player because we currently have only one short
Rich Boy clip — true multi-branch *video* needs footage we don't have yet.

## Architecture

New route in the landing app; player is generic, content lives in data so future
episodes are just new data files.

```
landing/app/play/
  page.tsx                 // server: renders <Player story={richBoy} />
  player.tsx               // client: state machine (node, affinity, timer, history)
  components/
    SceneCard.tsx          // full-bleed media (video|image) + Ken Burns + caption + scrims
    ChoiceOverlay.tsx      // "Sagot Mo?" cards + countdown ring + split-shimmer
    KiligMeter.tsx         // gold gradient fill + heartbeat pulse
    TheOtherPath.tsx       // blurred peek at the road not taken
    EndingCard.tsx         // "Ikaw ang Bida" share card + replay
  story/rich-boy.ts        // the segment graph (data only)
  story/types.ts           // Node / Choice / Story types
```

## Data model (Bandersnatch-inspired, decoupled)

```ts
type Media = { type: "video" | "image"; src: string; poster?: string;
               kenBurns?: "in" | "out" | "pan"; objectPosition?: string };

type Choice = {
  label: string;              // Taglish, e.g. "Sakay na"
  next: string;               // target node id
  affinity?: { bold?: number; sweet?: number };
  premium?: boolean;          // 🔒 "mas matapang" — visual only in v1
  teaser?: string;            // "The Other Path" blurb for the road not taken
};

type Node = {
  id: string;
  media: Media;
  caption?: string;           // Taglish narration
  advanceMs?: number;         // auto-advance delay for non-choice nodes
  choice?: { prompt: string; timerMs: number; options: Choice[] };
  defaultNext?: string;       // used on timer expiry / auto-advance
  ending?: { key: "bold" | "sweet" | "twist"; title: string; line: string };
};

type Story = { id: string; title: string; start: string;
               nodes: Record<string, Node> };
```

## Story (≈8 nodes, 2 decisions, 3 endings)

- **hook** — `rich-boy.mp4` plays; caption sets up working-class girl / heir next door → auto-advance to `rooftop`.
- **rooftop** — rooftop still; caption → **Sagot Mo #1** *"Sumakay ka ba sa kotse niya?"*
  - **Sakay na** (bold+2) → `streetfood`; teaser of the walk
  - **Maglakad na lang tayo** (sweet+2) → `streetfood`; teaser of the ride
- **streetfood** — streetfood still, path-flavored caption → auto-advance to `confront`.
- **confront** — neon-rain still; the kontrabida mother: *"Lumayo ka sa anak ko."* → **Sagot Mo #2**
  - **Tapatan mo siya** (bold+2, 🔒 premium visual) → affinity-resolved ending
  - **Umatras nang tahimik** (sweet+2) → affinity-resolved ending
- **Endings (3)** by dominant affinity:
  - **bold** — "Team Mateo" triumphant (beach/portrait still)
  - **sweet** — slow-burn bittersweet
  - **twist** — balanced → cliffhanger "itutuloy..."
  - Each: Kilig Meter result + "The Other Path" blurred teaser + share card + replay.

Endings resolve from accumulated affinity: bold>sweet → bold, sweet>bold → sweet,
tie → twist.

## Assets (from existing, cropped)

Staged into `landing/public/play/`:
- `hook.mp4` / `hook-poster.jpg` — copies of `clips/rich-boy.*` (clean).
- `scene-{rooftop,streetfood,beach,neon-rain,portrait}.jpg` — ad-03 variation
  PNGs with the headline band + CTA cropped off via ffmpeg
  (`crop=1536:1500:0:900`, tuned per image in QA), re-encoded to jpg.

Decision-point split/desaturate is done in CSS (spec §5.3), so the ad-02
fork/doors images are not needed.

## Feel (spec §5.3)

Freeze + slight desaturate + branch-split shimmer at decisions; choice cards
slide up with a circular countdown ring; heartbeat pulse on the Kilig Meter;
confetti/sparkle on a kilig payoff. Vertical, full-bleed, thumb-reachable.
Premium option shows a 🔒 (no real paywall in v1).

## Analytics

Extend `/api/track` `ALLOWED_TYPES` + `cleanMeta` with:
`play_start`, `choice` (node + option + affinity), `ending` (key), `replay`,
`share_click`. Reuses the existing typed store — turns the demo into real
path-choice signal on the dashboard later.

## Scope — explicitly OUT of v1

No coins / real paywall, no accounts, no auto-generated share *video* (static
share card only), no branch-map screen, one episode only, no new footage.

## Known tradeoff

Scene stills are cropped ad creatives, not purpose-shot narrative frames, so
framing is imperfect (tuned via `objectPosition` per node). Acceptable for a v1
feel-test.

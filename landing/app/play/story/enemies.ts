import type { Story } from "./types";

// "Enemies-to-Lovers" — the #2 premise by audience signal.
//
// Two things make this episode different from Rich Boy:
//  1. It opens COLD, in media res, on the rain fight (the existing vibe clip is
//     a climax image, not an opening), then flashes back and plays forward into
//     it. The "puso" ending pays that cold open off.
//  2. Decision 1 is the dilemma the signup quiz has already been testing on real
//     users. The OPTIONS are kept verbatim (they're what we compare against the
//     quiz answers); only the framing prompt is shortened for mobile.
//
// Axis: tigas (pride) vs puso (heart). Weights let a split reach the tie ending:
//   tuloy(puso2)  + iligtas(puso2)  -> puso
//   alis(tigas2)  + ilaban(tigas2)  -> tigas
//   any cross pairing              -> tie
//   panggap(1/1) tips whichever way Decision 2 goes.
//
// Copy is subtitle-short by design — see rich-boy.ts.
//
// Cast: Jaz (the bida) and Rafa (the office rival).
export const enemies: Story = {
  id: "enemies",
  slug: "enemies",
  title: "Enemies-to-Lovers",
  subtitle: "Ikaw ang bida.",
  poster: "/play/en-hook.jpg",
  logline: "Ang kaaway mo sa opisina — blind date mo pala.",
  start: "hook",
  resolution: {
    axisA: "tigas",
    axisB: "puso",
    endingA: "ending-tigas",
    endingB: "ending-puso",
    endingTie: "ending-tie",
  },
  nodes: {
    hook: {
      id: "hook",
      media: {
        type: "video",
        src: "/play/en-hook.mp4",
        poster: "/play/en-hook.jpg",
      },
      caption: "Tatlong oras bago 'to, kaaway ko pa siya.",
      kiligBump: 14,
      advanceMs: 7000,
      defaultNext: "office",
    },

    office: {
      id: "office",
      media: {
        type: "image",
        src: "/play/en-office.jpg",
        kenBurns: "panLeft",
        objectPosition: "center 45%",
      },
      caption: "Anim na buwan. Iisang promotion.",
      sub: "“May blind date ka mamaya,” sabi ng barkada.",
      kiligBump: 10,
      advanceMs: 6500,
      defaultNext: "reveal",
    },

    reveal: {
      id: "reveal",
      media: {
        type: "image",
        src: "/play/en-reveal.jpg",
        kenBurns: "in",
        mood: "romantic",
        objectPosition: "center 40%",
      },
      caption: "“Ikaw?!”",
      sub: "Ang blind date mo — ang kaaway mo sa opisina.",
      kiligBump: 18,
      choice: {
        // Options verbatim from the signup quiz (VERDICTS.enemies), same order,
        // so taps here are comparable to the quiz answers.
        prompt: "Ano'ng gagawin mo?",
        timerMs: 16000,
        options: [
          {
            label: "Tutuloy ako sa date",
            next: "after_tuloy",
            affinity: { puso: 2 },
            teaser: "Tatayo ka't aalis bago siya makapagsalita.",
          },
          {
            label: "Aalis ako bago niya ako makita",
            next: "after_alis",
            affinity: { tigas: 2 },
            teaser: "Uupo ka. Malalaman mo kung sino talaga siya.",
          },
          {
            label: "Magpapanggap akong hindi ko siya kilala",
            next: "after_panggap",
            affinity: { tigas: 1, puso: 1 },
            teaser: "Haharapin mo siya nang diretso.",
          },
        ],
      },
      defaultNext: "after_panggap",
    },

    after_tuloy: {
      id: "after_tuloy",
      media: {
        type: "image",
        src: "/play/en-dinner.jpg",
        kenBurns: "in",
        mood: "romantic",
        objectPosition: "center 50%",
      },
      caption: "Dalawang oras na tawanan.",
      sub: "May hindi pala siya sinasabi sa opisina.",
      kiligBump: 16,
      advanceMs: 6500,
      defaultNext: "stakes",
    },

    after_alis: {
      id: "after_alis",
      media: {
        type: "image",
        src: "/play/en-leaving.jpg",
        kenBurns: "panRight",
        objectPosition: "center 55%",
      },
      caption: "“Jaz.”",
      sub: "Iba ang tono. Hindi pang-opisina.",
      kiligBump: 16,
      advanceMs: 6000,
      defaultNext: "stakes",
    },

    after_panggap: {
      id: "after_panggap",
      media: {
        type: "image",
        src: "/play/en-menus.jpg",
        kenBurns: "out",
        mood: "romantic",
        objectPosition: "center 50%",
      },
      caption: "“Hi, ako nga pala si Jaz.”",
      sub: "Pumayag siya sa laro.",
      kiligBump: 16,
      advanceMs: 6000,
      defaultNext: "stakes",
    },

    stakes: {
      id: "stakes",
      media: {
        type: "image",
        src: "/play/en-stakes.jpg",
        kenBurns: "in",
        objectPosition: "center 50%",
      },
      caption: "Nasa kamay mo ang ikakatalo niya.",
      sub: "Bukas ang announcement ng promotion.",
      kiligBump: 12,
      choice: {
        prompt: "Ano'ng gagawin mo sa report?",
        timerMs: 16000,
        options: [
          {
            label: "Ilaban ang promotion 🔥",
            next: "@ending",
            affinity: { tigas: 2 },
            premium: true,
            teaser: "Sisirain mo ang report. Walang makakaalam.",
          },
          {
            label: "Iligtas siya",
            next: "@ending",
            affinity: { puso: 2 },
            teaser: "Mananalo ka. Pero malamig ang panalo.",
          },
        ],
      },
      defaultNext: "@ending",
    },

    "ending-tigas": {
      id: "ending-tigas",
      media: {
        type: "image",
        src: "/play/en-ending-tigas.jpg",
        kenBurns: "out",
        objectPosition: "center 45%",
      },
      kiligBump: 22,
      ending: {
        key: "bold",
        title: "Panalo Ka. Mag-isa.",
        line: "Sa'yo ang corner office. Wala nang nakaupo sa harap mo.",
        otherPath: "May bersyon kung saan sinira mo ang report.",
      },
    },

    "ending-puso": {
      id: "ending-puso",
      media: {
        type: "image",
        src: "/play/en-ending-puso.jpg",
        kenBurns: "in",
        mood: "payoff",
        objectPosition: "center 35%",
      },
      kiligBump: 28,
      ending: {
        key: "sweet",
        title: "Sa Ulan",
        line: "“Bakit mo 'ko iniligtas?” Hindi mo siya sinagot.",
        otherPath: "May bersyon kung saan ipinasa mo ang report. Mas malamig.",
      },
    },

    "ending-tie": {
      id: "ending-tie",
      media: {
        type: "image",
        src: "/play/en-ending-tie.jpg",
        kenBurns: "in",
        objectPosition: "center 50%",
      },
      kiligBump: 25,
      ending: {
        key: "twist",
        title: "Itutuloy…",
        line: "Inurong niya ang application niya — noong gabi pa ng date.",
        otherPath: "Dalawang landas ang hindi mo pinili. Balikan.",
      },
    },
  },
};

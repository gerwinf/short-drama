import type { Story } from "./types";

// "Enemies-to-Lovers" — the #2 premise by audience signal.
//
// Two things make this episode different from Rich Boy:
//  1. It opens COLD, in media res, on the rain fight (the existing vibe clip is
//     a climax image, not an opening), then flashes back and plays forward into
//     it. The "puso" ending pays that cold open off.
//  2. Decision 1 is the dilemma the signup quiz has already been testing on real
//     users, verbatim (see VERDICTS.enemies in lib/types.ts) — the demo delivers
//     the exact question people answered.
//
// Axis: tigas (pride) vs puso (heart). Weights let a split reach the tie ending:
//   tuloy(puso2)  + iligtas(puso2)  -> puso
//   alis(tigas2)  + ilaban(tigas2)  -> tigas
//   any cross pairing              -> tie
//   panggap(1/1) tips whichever way Decision 2 goes.
//
// Cast: Jaz (the bida) and Rafa (the office rival).
export const enemies: Story = {
  id: "enemies",
  slug: "enemies",
  title: "Enemies-to-Lovers",
  subtitle: "Ikaw ang bida.",
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
      caption:
        "Bago mo 'ko husgahan — tatlong oras bago 'to, kaaway ko pa siya. Si Rafa. Ang katunggali ko sa promotion. Ngayon, basang-basa kami sa ulan, at hindi ko alam kung sasampalin ko siya o hahalikan.",
      kiligBump: 14,
      advanceMs: 12000,
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
      caption:
        "Anim na buwan kaming nag-aagawan sa iisang promotion. Bawat email, bawat meeting — patayan. “‘Wag mo nang isipin 'yon,” sabi ng barkada ko. “May inayos kaming blind date para sa'yo.”",
      kiligBump: 10,
      advanceMs: 11000,
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
      caption:
        "Umupo ang blind date ko sa harap ko. Nang tumingala ako — siya. Si Rafa. Namutla kaming dalawa.",
      kiligBump: 18,
      choice: {
        // Verbatim from the signup quiz (VERDICTS.enemies), same option order.
        prompt:
          "Ang kaaway mo sa opisina — siya pala ang blind date na inayos ng barkada mo. Ano'ng gagawin mo?",
        timerMs: 16000,
        options: [
          {
            label: "Tutuloy ako sa date",
            next: "after_tuloy",
            affinity: { puso: 2 },
            teaser:
              "Ang ibang landas: tatayo ka't aalis bago pa siya makapagsalita.",
          },
          {
            label: "Aalis ako bago niya ako makita",
            next: "after_alis",
            affinity: { tigas: 2 },
            teaser:
              "Ang ibang landas: uupo ka, iinom ng alak, at malalaman mo kung sino talaga siya.",
          },
          {
            label: "Magpapanggap akong hindi ko siya kilala",
            next: "after_panggap",
            affinity: { tigas: 1, puso: 1 },
            teaser:
              "Ang ibang landas: haharapin mo siya nang diretso — walang tago, walang arte.",
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
      caption:
        "Tumuloy kayo. Dalawang oras na tawanan — at doon mo lang narinig ang parte ng kwento niyang hindi niya sinasabi sa opisina.",
      kiligBump: 16,
      advanceMs: 11000,
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
      caption:
        "Tumayo ka't lumabas. Pero sa may pinto, narinig mo siyang tumawag ng pangalan mo — hindi 'yung pang-opisinang tono. Iba.",
      kiligBump: 16,
      advanceMs: 11000,
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
      caption:
        "“Hi, ako nga pala si Jaz.” Sabay taas ng menu. Pumayag siya sa laro — dalawang tao, nagkukunwaring hindi magkakilala, sa loob ng dalawang oras.",
      kiligBump: 16,
      advanceMs: 11000,
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
      caption:
        "Kinabukasan, nasa mesa mo ang incident report — ang pagkakamaling ikakatalo niya sa promotion. Alam mong kaya niyang ipaliwanag. Alam mo ring bukas ang announcement.",
      kiligBump: 12,
      choice: {
        prompt:
          "Nasa kamay mo kung sino ang mananalo bukas. Ano'ng gagawin mo sa report?",
        timerMs: 16000,
        options: [
          {
            label: "Ilaban ang promotion 🔥",
            next: "@ending",
            affinity: { tigas: 2 },
            premium: true,
            teaser:
              "Ang ibang landas: sisirain mo ang report — at walang makakaalam na ikaw ang nagligtas sa kanya.",
          },
          {
            label: "Iligtas siya",
            next: "@ending",
            affinity: { puso: 2 },
            teaser:
              "Ang ibang landas: isusumite mo 'to, mananalo ka — at matututunan mong ang panalo ay puwedeng malamig.",
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
        line: "Sa'yo ang corner office. Sa'yo ang plaka. Pero pagpasok mo kinabukasan, wala nang nakaupo sa mesa sa harap mo — at ngayon mo lang napansin kung gaano katahimik ang panalo.",
        otherPath:
          "May bersyon nito kung saan sinira mo ang report — at siya ang unang bumati sa'yo sa ulan.",
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
        line: "Hinabol ka niya palabas, basang-basa, hawak ang report na sana'y ikakatalo niya. “Bakit mo 'ko iniligtas?” Hindi mo siya sinagot. Hindi na kailangan — nandito na tayo sa umpisa ng kwento.",
        otherPath:
          "May bersyon nito kung saan ipinasa mo ang report at nanalo ka. Mas tahimik. Mas malamig.",
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
        line: "Pagdating mo sa opisina, wala na ang pangalan niya sa listahan. May naiwang sulat sa mesa mo: inurong niya ang application niya — noong gabi ng blind date pa. Ang tanong ngayon: bakit?",
        otherPath:
          "Dalawang malinaw na landas ang hindi mo pinili. Balikan para malaman kung sino talaga ang lumaban para kanino.",
      },
    },
  },
};

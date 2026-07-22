import type { Story } from "./types";

// "Rich Boy Next Door" — the best-performing premise (per audience signals).
// ~8 nodes, 2 "Sagot Mo?" decisions, 3 endings. Affinity weights are all 2 so a
// split choice (one bold, one sweet) ties → the "twist" cliffhanger ending,
// while two same-lane choices commit to bold or sweet. See resolveEnding().
//
// Copy is deliberately subtitle-short: this plays on cheap phones, one-handed.
// Dialogue over narration; the image carries the setup.
//
// Cast: YOU (the bida, working-class girl next door), Mateo (the heir),
// Doña Isabel (Mateo's mother, the kontrabida matriarch).
export const richBoy: Story = {
  id: "rich-boy",
  slug: "rich-boy",
  title: "Rich Boy Next Door",
  subtitle: "Ikaw ang bida.",
  poster: "/play/hook-poster.jpg",
  logline: "Bilyonaryo pala ang kapitbahay mo.",
  start: "hook",
  resolution: {
    axisA: "bold",
    axisB: "sweet",
    endingA: "ending-bold",
    endingB: "ending-sweet",
    endingTie: "ending-twist",
  },
  nodes: {
    hook: {
      id: "hook",
      media: {
        type: "video",
        src: "/play/hook.mp4",
        poster: "/play/hook-poster.jpg",
        mood: "romantic",
      },
      caption: "Dati, kapitbahay lang. Ngayon, bilyonaryo na.",
      kiligBump: 15,
      advanceMs: 7000,
      defaultNext: "rooftop",
    },

    rooftop: {
      id: "rooftop",
      media: {
        type: "image",
        src: "/play/scene-rooftop.jpg",
        kenBurns: "in",
        mood: "romantic",
        objectPosition: "center 35%",
      },
      caption: "“Isang taon kong tinago 'to. Ayoko nang magtago.”",
      kiligBump: 20,
      choice: {
        prompt: "Sasakay ka ba?",
        sub: "Dadaan kayo sa harap ng mga tsismosa.",
        timerMs: 15000,
        options: [
          {
            label: "Sakay na 🚗",
            next: "after_ride",
            affinity: { bold: 2 },
            teaser: "Maglalakad kayo. Kamay sa kamay.",
          },
          {
            label: "Maglakad na lang tayo",
            next: "after_walk",
            affinity: { sweet: 2 },
            teaser: "Bibilis ang kotse. Makikita kayo ng lahat.",
          },
        ],
      },
      defaultNext: "after_walk",
    },

    after_ride: {
      id: "after_ride",
      media: {
        type: "image",
        src: "/play/scene-car-ride.jpg",
        kenBurns: "panRight",
        objectPosition: "center 55%",
      },
      caption: "“Hayaan mong makita nila.”",
      kiligBump: 20,
      advanceMs: 6000,
      defaultNext: "confront",
    },

    after_walk: {
      id: "after_walk",
      media: {
        type: "image",
        src: "/play/scene-streetfood.jpg",
        kenBurns: "in",
        mood: "romantic",
        objectPosition: "center 45%",
      },
      caption: "Simple lang. Pero parang tama.",
      sub: "Fishball stand, alas-diyes ng gabi.",
      kiligBump: 18,
      advanceMs: 6500,
      defaultNext: "confront",
    },

    confront: {
      id: "confront",
      media: {
        // Already shot cold and rain-dark — no villain grade needed on top.
        src: "/play/scene-confront.jpg",
        type: "image",
        kenBurns: "out",
        objectPosition: "center 45%",
      },
      caption: "“Lumayo ka sa anak ko.”",
      sub: "— Doña Isabel, ina ni Mateo.",
      kiligBump: 10,
      choice: {
        prompt: "Sasagutin mo ba siya?",
        sub: "Hawak ni Mateo ang kamay mo.",
        timerMs: 16000,
        options: [
          {
            label: "Tapatan mo siya 🔥",
            next: "@ending",
            affinity: { bold: 2 },
            premium: true,
            teaser: "Tahimik kang aalis. Hahabulin ka niya sa ulan.",
          },
          {
            label: "Umatras nang tahimik",
            next: "@ending",
            affinity: { sweet: 2 },
            teaser: "Titindig ka. Mababahala ang buong Villaluna.",
          },
        ],
      },
      defaultNext: "@ending",
    },

    "ending-bold": {
      id: "ending-bold",
      media: {
        type: "image",
        src: "/play/scene-ending-bold.jpg",
        kenBurns: "in",
        mood: "payoff",
        objectPosition: "center 40%",
      },
      kiligBump: 30,
      ending: {
        key: "bold",
        title: "Ikaw ang Bida",
        line: "“Ako ang pipili ng mamahalin ko.” Natigilan si Doña Isabel.",
        otherPath: "May bersyon kung saan tahimik kang umalis — at siya ang humabol.",
      },
    },

    "ending-sweet": {
      id: "ending-sweet",
      media: {
        type: "image",
        src: "/play/scene-ending-sweet.jpg",
        kenBurns: "out",
        mood: "romantic",
        objectPosition: "center 50%",
      },
      kiligBump: 28,
      ending: {
        key: "sweet",
        title: "Slow Burn",
        line: "Umatras ka. Kinabukasan, nasa gate mo siya — dala ang totoo.",
        otherPath: "May bersyon kung saan hinarap mo siya nang harapan.",
      },
    },

    "ending-twist": {
      id: "ending-twist",
      media: {
        // Neon-noir grade is baked in — leave it ungraded.
        type: "image",
        src: "/play/scene-ending-twist.jpg",
        kenBurns: "in",
        objectPosition: "center 45%",
      },
      kiligBump: 25,
      ending: {
        key: "twist",
        title: "Itutuloy…",
        line: "Hindi pala basta kapitbahay ang lola mo sa mga Villaluna.",
        otherPath: "Dalawang landas ang hindi mo pinili. Balikan.",
      },
    },
  },
};

import type { Story } from "./types";

// "Rich Boy Next Door" — the best-performing premise (per audience signals).
// ~8 nodes, 2 "Sagot Mo?" decisions, 3 endings. Affinity weights are all 2 so a
// split choice (one bold, one sweet) ties → the "twist" cliffhanger ending,
// while two same-lane choices commit to bold or sweet. See resolveEnding().
//
// Cast: YOU (the bida, working-class girl next door), Mateo (the heir),
// Doña Isabel (Mateo's mother, the kontrabida matriarch).
export const richBoy: Story = {
  id: "rich-boy",
  slug: "rich-boy",
  title: "Rich Boy Next Door",
  subtitle: "Ikaw ang bida.",
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
      caption:
        "Katabi mong lumaki si Mateo. Ngayon, siya na ang tagapagmana ng Villaluna empire — at ikaw pa rin ang batang babae sa tapat ng kanilang gate. Pero ngayong gabi, hinihintay ka niya.",
      kiligBump: 15,
      advanceMs: 12000,
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
      caption:
        "Dinala ka niya sa rooftop. Buong Maynila nasa paanan niyo. “Isang taon kong tinago 'to,” bulong niya. “Ayoko nang magtago.”",
      kiligBump: 20,
      choice: {
        prompt:
          "Inaalok ka niyang ihatid — dadaan kayo sa harap mismo ng mga tsismosang kapitbahay. Sasakay ka ba?",
        timerMs: 15000,
        options: [
          {
            label: "Sakay na — wala akong pakialam 🚗",
            next: "after_ride",
            affinity: { bold: 2 },
            teaser:
              "Ang ibang landas: maglalakad kayo sa ilaw ng poste, kamay sa kamay, dahan-dahan.",
          },
          {
            label: "Maglakad na lang tayo",
            next: "after_walk",
            affinity: { sweet: 2 },
            teaser:
              "Ang ibang landas: bibilisan niya ang kotse, hihiyaw ang hangin, makikita kayo ng buong kalye.",
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
      caption:
        "Hinatak ka niya sa kotse, umandar sa ulan at neon. Nakita kayo ng buong kalye — at ngiti ka nang ngiti. “Hayaan mong makita nila,” sabi niya.",
      kiligBump: 20,
      advanceMs: 11000,
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
      caption:
        "Naglakad kayo. Huminto sa isang fishball stand, tawanan sa gitna ng usok at ilaw. Simple lang. Pero parang tama.",
      kiligBump: 18,
      advanceMs: 11000,
      defaultNext: "confront",
    },

    confront: {
      id: "confront",
      media: {
        type: "image",
        // Already shot cold and rain-dark — no villain grade needed on top.
        src: "/play/scene-confront.jpg",
        kenBurns: "out",
        objectPosition: "center 45%",
      },
      caption:
        "Paglingon mo, naghihintay na si Doña Isabel — ang ina ni Mateo. “Alam mo ba kung magkano ang apelyidong sinisira mo? Lumayo ka sa anak ko.”",
      kiligBump: 10,
      choice: {
        prompt:
          "Nakatingin sa'yo si Mateo, hawak ang kamay mo. Sasagutin mo ba ang kanyang ina?",
        timerMs: 16000,
        options: [
          {
            label: "Tapatan mo siya 🔥",
            next: "@ending",
            affinity: { bold: 2 },
            premium: true,
            teaser:
              "Ang ibang landas: tahimik kang tatalikod — at si Mateo ang hahabol sa'yo sa ulan.",
          },
          {
            label: "Umatras nang tahimik",
            next: "@ending",
            affinity: { sweet: 2 },
            teaser:
              "Ang ibang landas: titindig ka, sasabihin mo ang totoo — mababahala ang buong Villaluna.",
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
        line: "“Ako ang pipili ng mamahalin ko,” sabi ni Mateo, hawak ang kamay mo sa harap mismo ng kanyang ina. Natigilan si Doña Isabel. Ngayong gabi, ikaw ang nanalo.",
        otherPath:
          "May bersyon nito kung saan tahimik kang umalis — at si Mateo ang humabol sa ulan. Mas masakit. Mas kilig.",
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
        line: "Umatras ka — hindi dahil takot, kundi dahil mahal mo siyang hindi ilagay sa gitna. Kinabukasan, nasa tapat ng inyong gate si Mateo, dala ang buong katotohanan. Simula pa lang 'to.",
        otherPath:
          "May bersyon nito kung saan hinarap mo si Doña Isabel nang harapan — kabog ang buong sala.",
      },
    },

    "ending-twist": {
      id: "ending-twist",
      media: {
        type: "image",
        // Neon-noir grade is baked in — leave it ungraded.
        src: "/play/scene-ending-twist.jpg",
        kenBurns: "in",
        objectPosition: "center 45%",
      },
      kiligBump: 25,
      ending: {
        key: "twist",
        title: "Itutuloy…",
        line: "Bumukas ang isang lihim: hindi pala basta kapitbahay ang lola mo sa pamilya Villaluna. Napatigil sina Mateo at Doña Isabel. Ang tanong ngayon — sino talaga ang tagapagmana?",
        otherPath:
          "Dalawang malinaw na landas ang hindi mo pinili. Balikan para makita ang tunay na ending.",
      },
    },
  },
};

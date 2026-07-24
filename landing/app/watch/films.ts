// Linear (non-interactive) Kilig short films served at /watch/[slug].
//
// A film is the cinematic cut of a premise — distinct from the branching
// /play episodes. It ends on the same A/B/C vote as the FB serial and the
// player endings, so a finished film feeds the vote loop instead of being a
// dead end.
//
// HOSTING: `src` defaults to a local path for dev, but production MUST point at
// a CDN (Cloudflare R2/Stream, Bunny, Mux) — an 84s ~19MB mp4 served from
// Vercel `public/` is the cost-to-serve trap flagged in TODOS.md. Set
// NEXT_PUBLIC_SA_ULAN_URL to the CDN URL before this is a landing hero.

export type FilmVote = {
  prompt: string;
  options: { key: "A" | "B" | "C"; label: string }[];
};

export type Film = {
  slug: string;
  title: string;
  tagline: string;
  src: string;
  poster: string;
  durationSec: number;
  vote: FilmVote;
};

export const FILMS: Record<string, Film> = {
  "sa-ulan": {
    slug: "sa-ulan",
    title: "Sa Ulan",
    tagline: "Magkalaban sa trabaho. Pareho silang nag-sakripisyo — nang sabay.",
    src: process.env.NEXT_PUBLIC_SA_ULAN_URL || "/watch/sa-ulan.mp4",
    poster: "/watch/sa-ulan-poster.jpg",
    durationSec: 84,
    vote: {
      prompt:
        "Tinanggap ni Jaz ang Team Lead — ang posisyong binitawan ni Rafa para sa kanya. Ano'ng dapat niyang gawin?",
      options: [
        { key: "A", label: "Ibalik kay Rafa ang posisyon" },
        { key: "B", label: "Tanggapin — at ipaglaban silang dalawa sa opisina" },
        { key: "C", label: "Umalis silang dalawa, magtayo ng sariling team" },
      ],
    },
  },
};

export function filmBySlug(slug: string): Film | undefined {
  return FILMS[slug];
}

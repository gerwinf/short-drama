import type { Story } from "./types";
import { richBoy } from "./rich-boy";
import { enemies } from "./enemies";

// Every playable episode, addressed as /play/<slug>. Adding an episode is just
// authoring a Story and listing it here — the player engine is generic.
// Order here is the order shown on the /play chooser.
export const EPISODES: Story[] = [richBoy, enemies];

export function episodeBySlug(slug: string): Story | undefined {
  return EPISODES.find((e) => e.slug === slug);
}

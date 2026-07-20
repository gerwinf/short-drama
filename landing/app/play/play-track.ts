import { readUtm } from "@/lib/utm";

// Fire-and-forget analytics for the player. Reuses the existing /api/track
// pipeline (see app/api/track/route.ts) so path choices land in the same store
// as the signup funnel. node -> meta.questionId, value -> meta.value.
export function playTrack(
  type: "play_start" | "play_choice" | "play_ending" | "play_replay" | "play_share",
  meta?: { node?: string; value?: string },
) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type,
        meta: { questionId: meta?.node, value: meta?.value },
        utm: readUtm(),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never let analytics break playback
  }
}

import { readUtm } from "@/lib/utm";

// The entry point that launched this play session, read from ?from= on the
// player URL (hero | tile | feature). Internal links carry no UTMs, so without
// this every play_start looks identical and we can't tell which surface drives
// plays. Attached to every player event so the whole funnel is segmentable.
function readSource(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return new URLSearchParams(window.location.search).get("from") ?? undefined;
}

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
        meta: { questionId: meta?.node, value: meta?.value, source: readSource() },
        utm: readUtm(),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never let analytics break playback
  }
}

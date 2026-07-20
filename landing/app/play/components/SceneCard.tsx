"use client";

import Image from "next/image";
import type { StoryNode } from "../story/types";

// Full-bleed vertical scene: media (video or Ken-Burns still) + mood grade +
// top/bottom scrims + Taglish caption. Purely presentational — the Player owns
// all state and overlays the chrome (meter, choices, endings) on top.

const KEN_BURNS: Record<string, string> = {
  in: "kb-in",
  out: "kb-out",
  panLeft: "kb-pan-left",
  panRight: "kb-pan-right",
};

// Per-mood color grade applied straight to the media element.
const MOOD_FILTER: Record<string, string> = {
  romantic: "",
  villain: "grayscale-[35%] brightness-[0.72] contrast-[1.1]",
  payoff: "saturate-[1.2] brightness-[1.05]",
};

export default function SceneCard({
  node,
  caption,
  dim = false,
}: {
  node: StoryNode;
  caption?: string;
  dim?: boolean; // extra darken while a decision/ending overlay is up
}) {
  const { media } = node;
  const kb = media.kenBurns ? KEN_BURNS[media.kenBurns] : "";
  const filter = media.mood ? MOOD_FILTER[media.mood] : "";

  return (
    // bg-plum (not ink) so any decode gap flashes warm, never black.
    <div className="absolute inset-0 overflow-hidden bg-plum">
      {/* media layer (over-sized wrapper so Ken Burns never reveals an edge) */}
      <div className={`absolute inset-[-6%] ${kb}`}>
        {media.type === "video" ? (
          <video
            key={media.src}
            src={media.src}
            poster={media.poster}
            autoPlay
            loop
            muted
            playsInline
            className={`animate-media-in h-full w-full object-cover ${filter}`}
          />
        ) : (
          <Image
            key={media.src}
            src={media.src}
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 100vw, 440px"
            style={{ objectPosition: media.objectPosition ?? "center" }}
            className={`animate-media-in object-cover ${filter}`}
          />
        )}
      </div>

      {/* villain cool wash */}
      {media.mood === "villain" && (
        <div className="absolute inset-0 bg-[#101a3a] mix-blend-color opacity-40" />
      )}
      {/* payoff warm glow */}
      {media.mood === "payoff" && (
        <div className="absolute inset-0 bg-gradient-to-t from-rose/25 via-transparent to-gold/10" />
      )}

      {/* readability scrims: strong top + bottom, transparent middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-transparent to-ink/95" />
      {dim && <div className="absolute inset-0 bg-ink/45 transition-opacity" />}

      {/* caption */}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 px-6 pb-[env(safe-area-inset-bottom)]">
          <p className="mx-auto max-w-[34ch] pb-6 text-center text-[15px] font-medium leading-relaxed text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}

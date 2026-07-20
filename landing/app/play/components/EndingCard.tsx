"use client";

import { useState } from "react";
import type { Ending } from "../story/types";
import KiligMeter from "./KiligMeter";

// The resolution screen: ending title + line, the final Kilig Meter, a blurred
// "other ending" FOMO teaser, and the conversion CTAs. Sits over the ending
// scene still.
export default function EndingCard({
  ending,
  kilig,
  onReplay,
  onShare,
}: {
  ending: Ending;
  kilig: number;
  onReplay: () => void;
  onShare: () => void;
}) {
  const isPayoff = ending.key !== "twist";
  const [shareMsg, setShareMsg] = useState<string | null>(null);

  // Native share sheet where available (mobile), clipboard copy as a fallback
  // (desktop). Either way the viewer gets a deep link back into the episode.
  async function handleShare() {
    onShare(); // analytics
    const url =
      typeof window !== "undefined" ? `${window.location.origin}/play` : "";
    const text = `Na-unlock ko ang “${ending.title}” ending sa Kilig 😳 Ikaw, anong landas ang pipiliin mo? 👉`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "Kilig — Ikaw ang Bida", text, url });
        return;
      } catch (err) {
        // User dismissed the sheet — do nothing, don't fall back to copy.
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setShareMsg("Na-copy ang link! 📋 I-paste sa Stories o Reels.");
    } catch {
      setShareMsg(url ? `I-copy ang link: ${url}` : "Hindi ma-share ngayon.");
    }
    setTimeout(() => setShareMsg(null), 3500);
  }
  return (
    <div className="animate-fade-up absolute inset-0 z-30 flex flex-col justify-end overflow-y-auto">
      {/* confetti sparkles on a kilig payoff */}
      {isPayoff && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {SPARKS.map((s, i) => (
            <span
              key={i}
              className="animate-sparkle absolute text-lg"
              style={{ left: s.left, top: s.top, animationDelay: s.delay }}
            >
              {s.glyph}
            </span>
          ))}
        </div>
      )}

      <div className="relative bg-gradient-to-t from-ink via-ink/95 to-transparent px-6 pb-8 pt-16">
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-rose">
          {ending.key === "twist" ? "Cliffhanger" : "Ang iyong ending"}
        </p>
        <h2 className="kilig-glow-text mb-3 font-display text-3xl font-bold leading-tight">
          {ending.title}
        </h2>
        <p className="mb-5 max-w-[38ch] text-[15px] leading-relaxed text-cream/90">
          {ending.line}
        </p>

        <div className="mb-5">
          <KiligMeter value={kilig} big />
        </div>

        <div className="mb-6 rounded-2xl border border-white/12 bg-plum-800/50 px-4 py-3 backdrop-blur">
          <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gold">
            👀 Ang ibang landas
          </p>
          <p className="text-sm leading-relaxed text-cream/70 blur-[0.4px]">
            {ending.otherPath}
          </p>
        </div>

        {shareMsg && (
          <p className="mb-3 rounded-xl bg-plum-800/80 px-3 py-2 text-center text-xs font-medium text-gold backdrop-blur">
            {shareMsg}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            data-kilig-open
            className="kilig-glow-bg kilig-cta-shadow w-full rounded-full py-3.5 text-center font-bold text-white active:scale-[0.98]"
          >
            Makakuha ng early access — libre
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 rounded-full border border-white/25 py-3 text-center text-sm font-semibold text-cream active:scale-[0.98]"
            >
              I-share: Ikaw ang Bida
            </button>
            <button
              onClick={onReplay}
              className="flex-1 rounded-full border border-white/25 py-3 text-center text-sm font-semibold text-cream active:scale-[0.98]"
            >
              Iba ang piliin ↻
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const SPARKS = [
  { glyph: "✨", left: "12%", top: "18%", delay: "0ms" },
  { glyph: "💛", left: "82%", top: "12%", delay: "220ms" },
  { glyph: "✨", left: "68%", top: "26%", delay: "480ms" },
  { glyph: "💖", left: "26%", top: "30%", delay: "120ms" },
  { glyph: "✨", left: "90%", top: "34%", delay: "360ms" },
  { glyph: "💫", left: "44%", top: "14%", delay: "600ms" },
];

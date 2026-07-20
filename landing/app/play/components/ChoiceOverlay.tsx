"use client";

import { useEffect, useRef, useState } from "react";
import type { Choice, Decision } from "../story/types";

// The "Sagot Mo?" decision overlay: prompt, a circular countdown ring, and the
// tappable choice cards that slide up. When the timer hits zero it auto-selects
// the caller-provided default option.
export default function ChoiceOverlay({
  decision,
  defaultIndex,
  onChoose,
}: {
  decision: Decision;
  defaultIndex: number;
  onChoose: (option: Choice, index: number, expired: boolean) => void;
}) {
  const total = decision.timerMs;
  const [remaining, setRemaining] = useState(total);
  const doneRef = useRef(false);
  const startRef = useRef<number | null>(null);

  // rAF countdown; fires the default option once when it runs out.
  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const left = Math.max(0, total - (now - startRef.current));
      setRemaining(left);
      if (left <= 0) {
        if (!doneRef.current) {
          doneRef.current = true;
          onChoose(decision.options[defaultIndex], defaultIndex, true);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [decision, defaultIndex, onChoose, total]);

  const choose = (opt: Choice, i: number) => {
    if (doneRef.current) return;
    doneRef.current = true;
    onChoose(opt, i, false);
  };

  const frac = remaining / total;
  const seconds = Math.ceil(remaining / 1000);
  const R = 20;
  const C = 2 * Math.PI * R;

  return (
    <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-7 pt-24">
      {/* split-shimmer sweep signalling the fork */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-split-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mb-4 flex items-center gap-3">
        <span className="flex items-center gap-1.5 rounded-full bg-rose/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          <span className="animate-heartbeat">♥</span> Sagot Mo?
        </span>
        {/* countdown ring */}
        <span className="relative ml-auto grid h-12 w-12 place-items-center">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
            <circle
              cx="24"
              cy="24"
              r={R}
              fill="none"
              stroke="#ffb627"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={C * (1 - frac)}
            />
          </svg>
          <span className="absolute text-sm font-bold text-gold">{seconds}</span>
        </span>
      </div>

      <p className="relative mb-4 max-w-[34ch] text-[15px] font-semibold leading-snug text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
        {decision.prompt}
      </p>

      <div className="relative flex flex-col gap-3">
        {decision.options.map((opt, i) => (
          <button
            key={opt.label}
            onClick={() => choose(opt, i)}
            style={{ animationDelay: `${i * 90}ms` }}
            className={`animate-choice-rise group relative w-full overflow-hidden rounded-2xl border px-4 py-4 text-left backdrop-blur-md transition active:scale-[0.98] ${
              opt.premium
                ? "border-gold/70 bg-plum-800/80 shadow-[0_0_0_1px_rgba(255,182,39,0.25)]"
                : "border-white/20 bg-plum-800/70 hover:border-rose/60"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="text-[15px] font-semibold leading-tight text-cream">
                {opt.label}
              </span>
              {opt.premium && (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-gold/15 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-gold">
                  🔒 Mas Matapang
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

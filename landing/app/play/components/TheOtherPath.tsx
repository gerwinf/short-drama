"use client";

// "The Other Path" FOMO flash — a blurred peek at what the road NOT taken would
// have triggered, shown for ~2.5s right after a choice resolves.
export default function TheOtherPath({ teaser }: { teaser: string }) {
  return (
    <div className="animate-other-path pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6">
      <div className="max-w-[30ch] rounded-2xl border border-white/15 bg-plum/60 px-5 py-5 text-center backdrop-blur-xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-gold">
          👀 Ang Ibang Landas
        </p>
        <p className="text-sm font-medium leading-relaxed text-cream/90 blur-[0.4px]">
          {teaser}
        </p>
      </div>
    </div>
  );
}

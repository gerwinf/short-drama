"use client";

// The signature Kilig Meter: a gold gradient bar that fills as the kilig builds,
// with a heartbeat pulse on the heart glyph. `big` renders the celebratory
// version shown on the ending card.
export default function KiligMeter({
  value,
  big = false,
}: {
  value: number; // 0–100
  big?: boolean;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className={big ? "w-full" : "w-full"}>
      <div className="mb-1 flex items-center justify-between">
        <span
          className={`flex items-center gap-1 font-semibold text-cream ${
            big ? "text-sm" : "text-[11px]"
          }`}
        >
          <span className="animate-heartbeat text-rose">♥</span> Kilig Meter
        </span>
        <span
          className={`font-semibold text-gold ${big ? "text-sm" : "text-[11px]"}`}
        >
          {Math.round(pct)}%
        </span>
      </div>
      <div
        className={`w-full overflow-hidden rounded-full bg-white/15 ${
          big ? "h-2.5" : "h-1.5"
        }`}
      >
        <div
          className="kilig-glow-bg h-full rounded-full shadow-[0_0_12px_rgba(255,182,39,0.7)] transition-[width] duration-700 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

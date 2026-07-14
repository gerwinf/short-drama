"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export type Clip = { slug: string; label: string };

// Reusable click-to-play gallery. Cards show a poster; tapping one opens a
// lightbox that plays the compressed clip. Videos load only on click.
export default function ClipGallery({
  items,
  layout = "grid",
}: {
  items: Clip[];
  layout?: "grid" | "carousel";
}) {
  const [active, setActive] = useState<Clip | null>(null);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const container =
    layout === "carousel"
      ? "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible"
      : "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4";
  const item =
    layout === "carousel"
      ? "snap-start shrink-0 basis-[64%] sm:basis-[42%] md:basis-auto"
      : "";

  return (
    <>
      <div className={container}>
        {items.map((v) => (
          <div key={v.slug} className={item}>
            <button
              onClick={() => setActive(v)}
              aria-label={`Panoorin: ${v.label}`}
              className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-plum-700"
            >
              <Image
                src={`/clips/${v.slug}.jpg`}
                alt={v.label}
                fill
                sizes="(max-width: 768px) 60vw, 24vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rose/90 shadow-lg transition group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white" aria-hidden>
                  <path d="M4 2.5v11l9-5.5-9-5.5z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-sm font-semibold leading-tight text-cream">
                {v.label}
              </span>
            </button>
          </div>
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[380px]"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-cream">
                {active.label}
              </span>
              <button
                onClick={() => setActive(null)}
                aria-label="Isara"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-cream hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <video
              key={active.slug}
              src={`/clips/${active.slug}.mp4`}
              poster={`/clips/${active.slug}.jpg`}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="phone-shadow w-full rounded-2xl border border-plum-700"
            />
            <p className="mt-3 text-center text-sm text-fog">
              Isang lasa ng kilig.{" "}
              <button
                data-kilig-open
                className="font-semibold text-rose underline-offset-2 hover:underline"
              >
                Get early access
              </button>{" "}
              para sa buong kwento.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

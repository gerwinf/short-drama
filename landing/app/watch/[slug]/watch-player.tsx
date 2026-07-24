"use client";

import { useRef, useState } from "react";
import { readUtm } from "@/lib/utm";
import { isTestSession } from "@/lib/is-test";
import type { Film } from "../films";

// Fire-and-forget analytics, reusing the /api/track pipeline so film views land
// in the same store as the signup + player funnels. meta.questionId = film slug.
function watchTrack(
  type: "watch_start" | "watch_complete" | "watch_vote",
  film: string,
  value?: string,
) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        type,
        meta: {
          questionId: film,
          value,
          source:
            typeof window !== "undefined"
              ? (new URLSearchParams(window.location.search).get("from") ??
                undefined)
              : undefined,
          test: isTestSession() || undefined,
        },
        utm: readUtm(),
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // never let analytics break playback
  }
}

export default function WatchPlayer({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const [ended, setEnded] = useState(false);
  const [voted, setVoted] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  function onPlay() {
    if (startedRef.current) return;
    startedRef.current = true;
    watchTrack("watch_start", film.slug);
  }

  function onEnded() {
    if (!completedRef.current) {
      completedRef.current = true;
      watchTrack("watch_complete", film.slug);
    }
    setEnded(true);
  }

  function vote(key: string) {
    watchTrack("watch_vote", film.slug, key);
    setVoted(key);
  }

  async function share() {
    const url = window.location.href;
    const text = `Panoorin ang "${film.title}" — isang Kilig short film. Ikaw ang bida. 💖`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Kilig — ${film.title}`, text, url });
        return;
      } catch {
        /* cancelled — fall through to copy */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center px-4 py-6">
      {/* Title */}
      <div className="mb-4 text-center">
        <p className="font-display text-2xl font-semibold text-rose">kilig</p>
        <h1 className="mt-1 font-display text-xl font-semibold text-cream">
          {film.title}
        </h1>
        <p className="mt-1 text-sm text-fog">{film.tagline}</p>
      </div>

      {/* Stage */}
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-plum-700 bg-black">
        {!failed ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={film.src}
            poster={film.poster}
            controls
            playsInline
            preload="metadata"
            onPlay={onPlay}
            onEnded={onEnded}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="grid h-full w-full place-items-center p-6 text-center">
            <div>
              <p className="text-4xl">🎬</p>
              <p className="mt-3 font-display text-lg font-semibold text-cream">
                Malapit na ang premiere.
              </p>
              <p className="mt-2 text-sm text-fog">
                Sali sa early access para maunang mapanood.
              </p>
              <button
                data-kilig-open
                className="kilig-cta-shadow mt-5 rounded-full bg-rose px-6 py-3 font-semibold text-white"
              >
                Get early access — libre 💖
              </button>
            </div>
          </div>
        )}

        {/* End card — the vote, on top of the last frame */}
        {ended && (
          <div className="absolute inset-0 flex flex-col justify-center bg-plum/92 p-6 backdrop-blur-sm">
            {voted === null ? (
              <>
                <p className="text-center text-xs font-semibold uppercase tracking-wide text-gold">
                  Hindi pa tapos ang kwento
                </p>
                <p className="mt-3 text-center font-display text-lg font-semibold text-cream">
                  {film.vote.prompt}
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  {film.vote.options.map((o) => (
                    <button
                      key={o.key}
                      onClick={() => vote(o.key)}
                      className="flex items-center gap-3 rounded-2xl border border-plum-700 bg-plum-800 px-4 py-3 text-left transition active:scale-[0.98] hover:border-rose/60"
                    >
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-rose/15 font-semibold text-rose">
                        {o.key}
                      </span>
                      <span className="text-sm font-medium text-cream">
                        {o.label}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-4xl">💖</p>
                <p className="mt-3 font-display text-xl font-semibold text-cream">
                  Salamat sa boto mo — {voted}!
                </p>
                <p className="mt-2 text-sm text-fog">
                  Ang boto ng karamihan ang bahala sa susunod na kabanata.
                  Abangan mo.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <button
                    onClick={share}
                    className="rounded-full border border-rose/60 px-6 py-3 text-sm font-semibold text-rose transition hover:bg-rose/10"
                  >
                    {copied ? "Na-copy ang link! ✅" : "I-share sa barkada 💌"}
                  </button>
                  <button
                    onClick={() => {
                      setEnded(false);
                      setVoted(null);
                      startedRef.current = false;
                      completedRef.current = false;
                      const v = videoRef.current;
                      if (v) {
                        v.currentTime = 0;
                        void v.play();
                      }
                    }}
                    className="text-sm text-fog hover:text-cream"
                  >
                    ↺ Panoorin ulit
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 text-center text-xs text-fog/60">
        Isang Kilig short film · ikaw ang bida sa sariling teleserye.
      </p>
    </div>
  );
}

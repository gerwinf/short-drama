import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignupForm from "../signup-form";
import Track from "../track";
import { EPISODES } from "./story";

export const metadata: Metadata = {
  title: "Pumili ng kwento — Ikaw ang bida | Kilig",
  description:
    "Piliin ang unang panonoorin mo. Interactive Pinoy short drama — sagot mo ang magbabago ng kwento.",
};

// The chooser. Driven by the episode registry, so a new episode shows up here
// the moment it's added — nothing to hardcode.
export default function PlayIndex() {
  return (
    <main className="min-h-[100dvh] bg-plum px-5 py-10">
      <Track />

      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-fog transition hover:text-rose"
        >
          ← Kilig
        </Link>

        <header className="mt-6 text-center">
          <h1 className="font-display text-3xl font-semibold text-cream md:text-4xl">
            Pumili ng <span className="kilig-glow-text">kwento</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-fog">
            Dalawang kwento, buhay na buhay. Ikaw ang bida sa bawat isa — at ang
            sagot mo ang magbabago ng ending. 👇
          </p>
        </header>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {EPISODES.map((ep) => (
            <Link
              key={ep.slug}
              href={`/play/${ep.slug}`}
              aria-label={`Laruin: ${ep.title}`}
              className="group relative block overflow-hidden rounded-3xl border border-plum-700 bg-plum-800/40 transition hover:border-rose/60"
            >
              <div className="relative aspect-[9/13] w-full overflow-hidden">
                <Image
                  src={ep.poster}
                  alt={ep.title}
                  fill
                  sizes="(max-width: 640px) 100vw, 380px"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <span className="kilig-glow-bg absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-plum">
                  ▶ Laruin
                </span>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h2 className="font-display text-xl font-semibold leading-tight text-cream">
                    {ep.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-snug text-cream/75">
                    {ep.logline}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-fog/70">
          Marami pang kwentong paparating.{" "}
          <button
            data-kilig-open
            className="font-semibold text-rose underline-offset-2 hover:underline"
          >
            Get early access
          </button>{" "}
          para maunang makapanood.
        </p>
      </div>

      <SignupForm />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SignupForm from "../../signup-form";
import Track from "../../track";
import { FILMS, filmBySlug } from "../films";
import WatchPlayer from "./watch-player";

// Prerender every known film; unknown slugs 404.
export function generateStaticParams() {
  return Object.values(FILMS).map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) return {};
  return {
    title: `${film.title} — Kilig short film`,
    description: film.tagline,
    openGraph: {
      title: `${film.title} — Kilig`,
      description: film.tagline,
      images: [film.poster],
    },
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) notFound();

  return (
    <main className="min-h-[100dvh] bg-plum">
      <Track />
      <WatchPlayer film={film} />
      {/* The cold-viewer CTA ([data-kilig-open]) opens the early-access form. */}
      <SignupForm />
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SignupForm from "../../signup-form";
import Track from "../../track";
import Player from "../player";
import { EPISODES, episodeBySlug } from "../story";

// Prerender every known episode; unknown slugs 404.
export function generateStaticParams() {
  return EPISODES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = episodeBySlug(slug);
  if (!story) return {};
  return {
    title: `${story.title} — Ikaw ang bida | Kilig`,
    description:
      "Panoorin at piliin ang iyong landas. Isang interactive Pinoy short drama — sagot mo ang magbabago ng kwento.",
  };
}

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = episodeBySlug(slug);
  if (!story) notFound();

  return (
    <main className="min-h-[100dvh] bg-plum">
      <Track />
      <Player story={story} />
      {/* Any [data-kilig-open] click (the ending CTA) opens the early-access form. */}
      <SignupForm />
    </main>
  );
}

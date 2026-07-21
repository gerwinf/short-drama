"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Affinity, Choice, Story } from "./story/types";
import { resolveEnding } from "./story/types";
import { playTrack } from "./play-track";
import SceneCard from "./components/SceneCard";
import ChoiceOverlay from "./components/ChoiceOverlay";
import KiligMeter from "./components/KiligMeter";
import TheOtherPath from "./components/TheOtherPath";
import EndingCard from "./components/EndingCard";

function mergeAffinity(a: Affinity, b?: Affinity): Affinity {
  return { bold: (a.bold ?? 0) + (b?.bold ?? 0), sweet: (a.sweet ?? 0) + (b?.sweet ?? 0) };
}

// How long a caption needs to actually be read, in ms. Taglish narration runs
// ~120-180 characters; a fixed delay either rushed the long ones or dragged the
// short ones, so scale with length (~70ms/char) plus a beat to take in the image.
function readingMs(caption?: string): number {
  const chars = caption?.length ?? 0;
  return Math.min(13000, Math.max(4500, 1200 + chars * 70));
}

export default function Player({ story }: { story: Story }) {
  const [history, setHistory] = useState<string[]>([story.start]);
  const [affinity, setAffinity] = useState<Affinity>({});
  // A choice overlay is "revealed" once this holds the current node id (set by a
  // timer, never synchronously — so a fresh node starts un-revealed by default).
  const [revealFor, setRevealFor] = useState<string | null>(null);
  // Non-null while the "other path" flash is up (also carries the pending nav).
  const [pending, setPending] = useState<{ next: string; teaser?: string } | null>(null);

  const nodeId = history[history.length - 1];
  const node = story.nodes[nodeId];

  const kilig = useMemo(
    () =>
      Math.min(
        100,
        history.reduce((sum, id) => sum + (story.nodes[id]?.kiligBump ?? 0), 0),
      ),
    [history, story],
  );

  const goTo = useCallback((id: string) => setHistory((h) => [...h, id]), []);

  const restart = useCallback(
    (replay: boolean) => {
      playTrack(replay ? "play_replay" : "play_start", { node: story.start });
      setHistory([story.start]);
      setAffinity({});
      setPending(null);
      setRevealFor(null);
    },
    [story.start],
  );

  useEffect(() => {
    playTrack("play_start", { node: story.start });
  }, [story.start]);

  // Reaching an ending is a fire-and-forget analytics event (not a setState).
  useEffect(() => {
    if (node?.ending) playTrack("play_ending", { node: node.id, value: node.ending.key });
  }, [node]);

  // Choice nodes raise their overlay only once the caption has had time to be
  // read — the overlay replaces the caption, so revealing early loses the line.
  useEffect(() => {
    if (!node?.choice) return;
    const t = setTimeout(() => setRevealFor(node.id), readingMs(node.caption));
    return () => clearTimeout(t);
  }, [node]);

  // Linear scenes auto-advance, never before the caption is readable.
  useEffect(() => {
    if (!node || node.ending || node.choice || !node.defaultNext) return;
    const delay = Math.max(node.advanceMs ?? 6000, readingMs(node.caption));
    const t = setTimeout(() => goTo(node.defaultNext!), delay);
    return () => clearTimeout(t);
  }, [node, goTo]);

  // After the "other path" flash, commit the pending navigation.
  useEffect(() => {
    if (!pending) return;
    const t = setTimeout(() => {
      const next = pending.next;
      setPending(null);
      goTo(next);
    }, 3800);
    return () => clearTimeout(t);
  }, [pending, goTo]);

  const onChoose = useCallback(
    (option: Choice, _index: number, expired: boolean) => {
      const merged = mergeAffinity(affinity, option.affinity);
      setAffinity(merged);
      playTrack("play_choice", {
        node: nodeId,
        value: `${option.label}${expired ? " (auto)" : ""}`,
      });

      const next = option.next === "@ending" ? resolveEnding(merged) : option.next;
      const other = node.choice?.options.find((o) => o !== option && o.teaser);
      if (other?.teaser) {
        setPending({ next, teaser: other.teaser });
      } else {
        goTo(next);
      }
    },
    [affinity, node, nodeId, goTo],
  );

  if (!node) return null;

  const ended = !!node.ending;
  const flashing = !!pending;
  const deciding = !!node.choice && revealFor === nodeId && !flashing;
  const isLinear = !node.choice && !ended && !flashing;
  // Choice node whose caption is still showing — the overlay hasn't risen yet.
  const awaitingChoice = !!node.choice && !deciding && !ended && !flashing;
  const showCaption = !deciding && !ended && !flashing;

  return (
    <div className="relative mx-auto h-[100dvh] w-full max-w-[440px] select-none overflow-hidden bg-ink sm:my-[3vh] sm:h-[94vh] sm:rounded-[2rem] sm:phone-shadow">
      <SceneCard
        node={node}
        caption={showCaption ? node.caption : undefined}
        dim={deciding || ended}
      />

      {/* tap to summon the choice early — don't make fast readers wait it out */}
      {awaitingChoice && (
        <button
          onClick={() => setRevealFor(node.id)}
          aria-label="Sumagot na"
          className="absolute inset-0 z-10"
        >
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse text-[11px] font-medium text-cream/60">
            tap para sumagot →
          </span>
        </button>
      )}

      {/* tap-to-continue for linear scenes (auto-advance still runs) */}
      {isLinear && node.defaultNext && (
        <button
          onClick={() => goTo(node.defaultNext!)}
          aria-label="Magpatuloy"
          className="absolute inset-0 z-10"
        >
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-pulse text-[11px] font-medium text-cream/60">
            tap para magpatuloy →
          </span>
        </button>
      )}

      {/* top chrome: close + meter + restart */}
      <div className="absolute inset-x-0 top-0 z-40 flex items-start gap-3 px-4 pt-[max(0.9rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          aria-label="Isara"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/35 text-cream backdrop-blur hover:bg-black/55"
        >
          ✕
        </Link>
        <div className="mt-0.5 flex-1">
          <KiligMeter value={kilig} />
        </div>
        <button
          onClick={() => restart(true)}
          aria-label="Ulitin"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black/35 text-cream backdrop-blur hover:bg-black/55"
        >
          ↻
        </button>
      </div>

      {deciding && node.choice && (
        <ChoiceOverlay
          decision={node.choice}
          defaultIndex={node.choice.options.length - 1}
          onChoose={onChoose}
        />
      )}

      {flashing && pending?.teaser && <TheOtherPath teaser={pending.teaser} />}

      {ended && node.ending && (
        <EndingCard
          ending={node.ending}
          kilig={kilig}
          onReplay={() => restart(true)}
          onShare={() => playTrack("play_share", { node: node.id, value: node.ending!.key })}
        />
      )}
    </div>
  );
}

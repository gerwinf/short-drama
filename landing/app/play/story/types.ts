// Segment-graph types for the interactive player.
// Content lives in data (see rich-boy.ts); player.tsx is a generic engine, so a
// new episode is just a new Story object. Inspired by Bandersnatch's SegmentMap.

export type KenBurns = "in" | "out" | "panLeft" | "panRight";

// Color grade applied to a scene still to sell its emotional beat.
export type Mood = "romantic" | "villain" | "payoff";

export type Media = {
  type: "video" | "image";
  src: string;
  poster?: string;
  kenBurns?: KenBurns;
  objectPosition?: string; // CSS object-position, to reframe a cropped still
  mood?: Mood;
};

// A free-form axis map, so each episode picks its own emotional axes:
// Rich Boy runs bold/sweet, Enemies-to-Lovers runs tigas (pride) / puso (heart).
export type Affinity = Record<string, number>;

export type Choice = {
  label: string;
  // Target node id, or the sentinel "@ending" to resolve an ending by affinity.
  next: string;
  affinity?: Affinity;
  premium?: boolean; // 🔒 "mas matapang" path — visual only in v1 (no real paywall)
  // "The Other Path" peek — shown for the option the viewer did NOT take.
  teaser?: string;
};

export type Decision = {
  prompt: string;
  timerMs: number;
  options: Choice[];
};

export type Ending = {
  key: "bold" | "sweet" | "twist";
  title: string;
  line: string;
  otherPath: string; // FOMO teaser of an ending they didn't unlock
};

export type StoryNode = {
  id: string;
  media: Media;
  caption?: string;
  kiligBump?: number; // added to the Kilig Meter on entering this node
  advanceMs?: number; // auto-advance delay for non-choice nodes (ms)
  choice?: Decision;
  defaultNext?: string; // used on timer expiry / auto-advance
  ending?: Ending;
};

// Which ending an accumulated affinity leads to, declared per episode.
export type EndingResolution = {
  axisA: string;
  axisB: string;
  endingA: string; // node id when axisA wins outright
  endingB: string; // node id when axisB wins outright
  endingTie: string; // node id when the viewer split between the two
};

export type Story = {
  id: string;
  slug: string; // URL segment under /play
  title: string;
  subtitle?: string;
  poster: string; // card image on the /play chooser
  logline: string; // one-line Taglish hook on the chooser card
  start: string;
  resolution: EndingResolution;
  nodes: Record<string, StoryNode>;
};

// Decisive same-axis choices → that axis's ending; a split ties → the
// "twist" cliffhanger. Weights are tuned per episode so a tie is reachable.
export function resolveEnding(story: Story, a: Affinity): string {
  const { axisA, axisB, endingA, endingB, endingTie } = story.resolution;
  const A = a[axisA] ?? 0;
  const B = a[axisB] ?? 0;
  if (A > B) return endingA;
  if (B > A) return endingB;
  return endingTie;
}

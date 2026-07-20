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

export type Affinity = { bold?: number; sweet?: number };

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

export type Story = {
  id: string;
  title: string;
  subtitle?: string;
  start: string;
  nodes: Record<string, StoryNode>;
};

// Resolve which ending an accumulated affinity leads to.
// Decisive same-lane choices → that lane's ending; a split (one bold, one
// sweet) ties → the "twist" cliffhanger. See rich-boy.ts affinity weights.
export function resolveEnding(a: Affinity): string {
  const bold = a.bold ?? 0;
  const sweet = a.sweet ?? 0;
  if (bold > sweet) return "ending-bold";
  if (sweet > bold) return "ending-sweet";
  return "ending-twist";
}

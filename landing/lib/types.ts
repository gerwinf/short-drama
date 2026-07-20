// Shared types + the survey question definitions.
// Questions are ordered easiest-first (one-tap) with email captured LAST,
// per high-converting progressive-form practice.

export type QuestionOption = { value: string; label: string; sub?: string };

export type Question = {
  id: string;
  // Short question shown as the step heading
  title: string;
  // Optional Taglish helper line
  hint?: string;
  options: QuestionOption[];
};

// NOTE: order here === order in the form. Email is a separate final step.
// Order is deliberate: lead with the engaging, no-personal-data "pick your
// drama" hook. Per-step tracking (2026-07-19) showed 51% of openers bailed on
// the OLD first question (gender) — a cold demographic ask right after "Get
// early access". Demographics (gender/age) now sit late, once the user is
// invested. `vibe` must stay before the vibe-matched verdict step.
export const QUESTIONS: Question[] = [
  {
    id: "vibe",
    title: "Anong klaseng kilig ang type mo?",
    hint: "Pili ka ng isa — ito ang unang panonoorin mo.",
    options: [
      { value: "rich_boy", label: "Rich Boy Next Door" },
      { value: "amnesia", label: "Amnesia Twist" },
      { value: "enemies", label: "Enemies-to-Lovers" },
      { value: "cinderella", label: "Ang Pagbabalik", sub: "Cinderella revenge" },
      { value: "kabit", label: "Ang Resibo", sub: "kabit drama" },
    ],
  },
  {
    id: "frequency",
    title: "Gaano ka kadalas manood ng short drama, K-drama, o teleserye?",
    options: [
      {
        value: "daily_app",
        label: "Halos araw-araw sa short-drama app",
        sub: "ReelShort / DramaBox / NetShort",
      },
      { value: "daily_social", label: "Araw-araw sa TikTok / FB / TV" },
      { value: "weekly", label: "Ilang beses kada linggo" },
      { value: "rarely", label: "Paminsan-minsan lang" },
    ],
  },
  {
    id: "location",
    title: "Saan ka nanonood?",
    options: [
      { value: "ph", label: "Dito sa Pilipinas" },
      { value: "ofw", label: "Abroad (OFW / Fil-expat)" },
      { value: "other", label: "Iba pang bansa" },
    ],
  },
  {
    id: "gender",
    title: "Ikaw ay?",
    hint: "Para ma-personalize namin ang mga kwento mo.",
    options: [
      { value: "female", label: "Babae", sub: "Female" },
      { value: "male", label: "Lalaki", sub: "Male" },
      { value: "other", label: "Iba / Skip", sub: "Prefer not to say" },
    ],
  },
  {
    id: "age",
    title: "Ilang taon ka na?",
    options: [
      { value: "under_18", label: "Under 18" },
      { value: "18_24", label: "18–24" },
      { value: "25_34", label: "25–34" },
      { value: "35_44", label: "35–44" },
      { value: "45_plus", label: "45+" },
    ],
  },
];

// The verdict step adapts to the vibe chosen in the `vibe` question — the form
// demos the product promise (the story follows your choice) while measuring
// per-premise dilemma engagement. Keyed by `vibe` option value. Directional
// data only: informs premise 4 / pilot design, never the sprint gates.
export const VERDICTS: Record<string, Question> = {
  kabit: {
    id: "verdict_kabit",
    title: "Nahuli mong may kabit ang asawa mo. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — ikaw ang bahala. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "harapin", label: "Harapin sila ngayon" },
      { value: "ipunin", label: "Ipunin muna ang ebidensya" },
      { value: "iwan", label: "Iwan nang tahimik" },
    ],
  },
  cinderella: {
    id: "verdict_revenge",
    title:
      "Limang taon kang inapi ng pamilyang 'yan. Ngayon, hindi ka nila nakilala. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — ikaw ang bahala. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "magpakilala", label: "Magpakilala na" },
      { value: "paglaruan", label: "Paglaruan muna sila" },
      { value: "tahimik", label: "Tahimik na maghiganti" },
    ],
  },
  rich_boy: {
    id: "verdict_rich_boy",
    title:
      "Ang crush mong kapitbahay — anak pala ng bilyonaryo, at may fiancée. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — ikaw ang bahala. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "lalaban", label: "Lalaban ako para sa kanya" },
      { value: "lalayo", label: "Lalayo na ako habang maaga" },
      { value: "hintay", label: "Hihintayin kong siya ang lumapit" },
    ],
  },
  amnesia: {
    id: "verdict_amnesia",
    title:
      "Nawalan ng alaala ang asawa mo — kasama ang masakit niyong nakaraan. Sasabihin mo ba ang totoo?",
    hint: "Walang tamang sagot — ikaw ang bahala. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "lahat", label: "Sasabihin ko ang lahat" },
      { value: "umpisa", label: "Magsisimula kami ulit sa umpisa" },
      { value: "itago", label: "Itatago ko ang masakit na parte" },
    ],
  },
  enemies: {
    id: "verdict_enemies",
    title:
      "Ang kaaway mo sa opisina — siya pala ang blind date na inayos ng barkada mo. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — ikaw ang bahala. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "tuloy", label: "Tutuloy ako sa date" },
      { value: "alis", label: "Aalis ako bago niya ako makita" },
      { value: "panggap", label: "Magpapanggap akong hindi ko siya kilala" },
    ],
  },
};

// Every question that can appear in a submission — dashboard and CSV export
// resolve labels against this, not just QUESTIONS.
export const ALL_QUESTIONS: Question[] = [
  ...QUESTIONS,
  ...Object.values(VERDICTS),
];

// Bump when QUESTIONS change so dashboard/exports can segment responses
// across form revisions. Stored inside `answers` as `form_version` — rides
// the existing jsonb column, no schema change.
export const FORM_VERSION = "2026-07-20-vibe-first";

// ── Willingness-to-pay fake door ────────────────────────────────────────────
// After a lead is captured we show a founding-member "reserve your price" gate.
// Nothing is charged — it's a fake door that measures INTENT to pay, the one
// signal free clicks/signups can't give us. Two price variants so we can learn
// PH-mass vs diaspora ARPU from the same build.
export type PricePlan = {
  id: string; // stable key, also the value tagged on price events
  currency: string; // PHP | USD
  symbol: string; // ₱ | $
  amount: string; // display price, e.g. "149" / "9.99"
  anchor: string; // struck-through "was" price, e.g. "₱299"
  period: string; // "buwan" / "mo"
  offer: string; // small badge, e.g. "50% OFF habambuhay"
  headline: string;
  sub: string;
  reserveCta: string;
  reassure: string; // the "you won't be charged" line — keeps the fake door honest
  skipCta: string;
  confirmTitle: string;
  confirmBody: string;
};

export const PRICE_PLANS: Record<string, PricePlan> = {
  ph: {
    id: "ph",
    currency: "PHP",
    symbol: "₱",
    amount: "149",
    anchor: "₱299",
    period: "buwan",
    offer: "50% OFF — founding price",
    headline: "Maging Founding Member ng Kilig 💖",
    sub: "Unlimited na interactive kwento, ikaw ang bida, at ikaw ang mauuna pag-launch. I-lock in ang founding price habang bukas pa.",
    reserveCta: "I-reserve ang founding price ko",
    reassure: "Wala pang babayaran ngayon — reservation lang 'to.",
    skipCta: "Sa ngayon, early access muna",
    confirmTitle: "Reserved na! 🎉 Founding member ka na.",
    confirmBody:
      "Naka-lock in ang ₱149/buwan founding price mo. Wala pang singil — ie-email ka namin bago mag-launch.",
  },
  diaspora: {
    id: "diaspora",
    currency: "USD",
    symbol: "$",
    amount: "9.99",
    anchor: "$19.99",
    period: "mo",
    offer: "50% OFF — founding price",
    headline: "Become a Kilig Founding Member 💖",
    sub: "Unlimited interactive Pinoy drama, you're the lead, and first access at launch. Lock in the founding price while it's open — a piece of home wherever you are.",
    reserveCta: "Reserve my founding price",
    reassure: "You won't be charged now — this just holds your spot.",
    skipCta: "Just early access for now",
    confirmTitle: "Reserved! 🎉 You're a founding member.",
    confirmBody:
      "Your $9.99/mo founding price is locked in. No charge yet — we'll email you before launch.",
  },
};

export const DEFAULT_PLAN = "ph";

// Which price variant to show. A `?price=` URL param wins (so a diaspora ad set
// can link straight to the USD test); otherwise infer from the `location`
// answer (anyone abroad → diaspora); otherwise PH. Pure + testable.
export function resolvePlan(priceParam?: string | null, location?: string): string {
  const p = (priceParam || "").trim().toLowerCase();
  if (p === "usd" || p === "diaspora" || p === "intl") return "diaspora";
  if (p === "php" || p === "ph") return "ph";
  if (location === "ofw" || location === "other") return "diaspora";
  return DEFAULT_PLAN;
}

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
};

export type Submission = {
  id: string;
  ts: string; // ISO timestamp
  answers: Record<string, string>; // keyed by question id
  email: string;
  utm: UtmData;
  userAgent?: string;
};

// Lightweight funnel events — powers conversion rate + per-step drop-off.
//   view          — page visit (once/session)
//   open          — quiz modal opened (once/session)
//   step          — a quiz question was answered (meta.step / meta.questionId / meta.value)
//   close         — modal closed before finishing (meta.step = step abandoned on)
//   submit_error  — email submit reached the server but failed (meta.reason).
//                   Critical: distinguishes a goal-line bug from real abandonment.
//   price_view    — WTP fake door shown after lead capture (meta.plan / meta.value = price)
//   reserve_click — tapped "reserve founding price" — the willingness-to-pay signal
//   reserve_skip  — declined the price, took plain early access
export type TrackEventType =
  | "view"
  | "open"
  | "step"
  | "close"
  | "submit_error"
  | "price_view"
  | "reserve_click"
  | "reserve_skip"
  // Interactive player (/play): meta.questionId = node id, meta.value = choice
  // label / ending key.
  | "play_start"
  | "play_choice"
  | "play_ending"
  | "play_replay"
  | "play_share";

export type TrackEventMeta = {
  step?: number; // 1-based step index
  questionId?: string; // question answered / step context
  value?: string; // chosen option value (or price label on WTP events)
  reason?: string; // submit_error detail
  formVersion?: string; // form revision that produced the event — segments funnels
  plan?: string; // WTP price variant shown (ph | diaspora)
};

export type TrackEvent = {
  id: string;
  ts: string;
  type: TrackEventType;
  meta?: TrackEventMeta;
  utm: UtmData;
  userAgent?: string;
};

// Human-readable labels for the dashboard.
export function labelFor(questionId: string, value: string): string {
  const q = ALL_QUESTIONS.find((q) => q.id === questionId);
  const opt = q?.options.find((o) => o.value === value);
  return opt?.label ?? value;
}

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
export const QUESTIONS: Question[] = [
  {
    id: "gender",
    title: "Ikaw ba ay...",
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
];

// The verdict step adapts to the vibe chosen in the `vibe` question — the form
// demos the product promise (the story follows your choice) while measuring
// per-premise dilemma engagement. Keyed by `vibe` option value. Directional
// data only: informs premise 4 / pilot design, never the sprint gates.
export const VERDICTS: Record<string, Question> = {
  kabit: {
    id: "verdict_kabit",
    title: "Nahuli mong may kabit ang asawa mo. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — sagot mo 'to. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "harapin", label: "Harapin sila NGAYON" },
      { value: "ipunin", label: "Ipunin muna ang ebidensya" },
      { value: "iwan", label: "Iwan nang tahimik" },
    ],
  },
  cinderella: {
    id: "verdict_revenge",
    title:
      "Limang taon kang inapi ng pamilyang 'yan. Ngayon, hindi ka nila nakilala. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — sagot mo 'to. Ganito ka-drama ang Kilig. 😉",
    options: [
      { value: "magpakilala", label: "Magpakilala NA" },
      { value: "paglaruan", label: "Paglaruan muna sila" },
      { value: "tahimik", label: "Tahimik na maghiganti" },
    ],
  },
  rich_boy: {
    id: "verdict_rich_boy",
    title:
      "Ang crush mong kapitbahay — anak pala ng bilyonaryo, at may fiancée. Ano'ng gagawin mo?",
    hint: "Walang tamang sagot — sagot mo 'to. Ganito ka-drama ang Kilig. 😉",
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
    hint: "Walang tamang sagot — sagot mo 'to. Ganito ka-drama ang Kilig. 😉",
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
    hint: "Walang tamang sagot — sagot mo 'to. Ganito ka-drama ang Kilig. 😉",
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
export const FORM_VERSION = "2026-07-14b";

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

// Lightweight funnel events (page view, form open) — powers conversion rate.
export type TrackEvent = {
  id: string;
  ts: string;
  type: "view" | "open";
  utm: UtmData;
  userAgent?: string;
};

// Human-readable labels for the dashboard.
export function labelFor(questionId: string, value: string): string {
  const q = ALL_QUESTIONS.find((q) => q.id === questionId);
  const opt = q?.options.find((o) => o.value === value);
  return opt?.label ?? value;
}

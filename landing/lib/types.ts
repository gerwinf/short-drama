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
      { value: "cinderella", label: "Cinderella Teleserye" },
    ],
  },
  {
    id: "frequency",
    title: "Gaano ka kadalas manood ng short drama, K-drama, o teleserye?",
    options: [
      { value: "daily", label: "Araw-araw" },
      { value: "weekly", label: "Ilang beses kada linggo" },
      { value: "sometimes", label: "Paminsan-minsan" },
      { value: "rarely", label: "Bihira lang" },
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
  const q = QUESTIONS.find((q) => q.id === questionId);
  const opt = q?.options.find((o) => o.value === value);
  return opt?.label ?? value;
}

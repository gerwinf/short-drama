"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FORM_VERSION, QUESTIONS, VERDICTS, type Question } from "@/lib/types";
import { readUtm } from "@/lib/utm";
import { fbqTrack, fbqCustom } from "@/lib/fbq";

const TOTAL_STEPS = QUESTIONS.length + 2; // questions + vibe-matched verdict + email

export default function SignupForm() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const openTracked = useRef(false);

  const openModal = useCallback(() => {
    setOpen(true);
    if (!openTracked.current) {
      openTracked.current = true;
      fbqCustom("FormOpen"); // Meta custom event: funnel step
      fetch("/api/track", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "open", utm: readUtm() }),
        keepalive: true,
      }).catch(() => {});
    }
  }, []);

  // Any element with [data-kilig-open] opens the form — lets the server-rendered
  // page sprinkle CTAs without each needing to be a client component.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-kilig-open]");
      if (target) {
        e.preventDefault();
        openModal();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [openModal]);

  // Auto-open the form when linked directly, e.g. kilig.nueve.club/?signup=1
  // (also accepts #signup). Useful for the FB Page CTA button and ad links.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("signup") === "1" || window.location.hash === "#signup") {
      openModal();
    }
  }, [openModal]);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function chooseOption(qId: string, value: string) {
    setAnswers((a) => ({ ...a, [qId]: value }));
    setStep((s) => s + 1);
  }

  async function submit() {
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
      setError("Pakilagay ang valid na email address.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          answers: { ...answers, form_version: FORM_VERSION },
          email: email.trim(),
          utm: readUtm(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      fbqTrack("Lead"); // Meta standard conversion event — optimize ads on this
      setDone(true);
    } catch {
      setError("May problema sa pag-submit. Pakisubukan ulit.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const progress = done ? 100 : Math.round((step / TOTAL_STEPS) * 100);
  const isEmailStep = step === TOTAL_STEPS - 1;
  // The verdict step continues the story of whichever vibe they picked.
  const currentQuestion: Question | null = isEmailStep
    ? null
    : step < QUESTIONS.length
      ? QUESTIONS[step]
      : (VERDICTS[answers.vibe] ?? VERDICTS.kabit);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center">
      <div className="relative flex h-[100dvh] w-full flex-col bg-plum sm:h-auto sm:max-h-[92vh] sm:w-[440px] sm:rounded-3xl sm:border sm:border-plum-700">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5">
          <span className="font-display text-xl font-semibold text-rose">
            kilig
          </span>
          <button
            aria-label="Isara"
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-plum-700 text-fog hover:text-cream"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        {!done && (
          <div className="mt-4 px-5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-plum-800">
              <div
                className="kilig-glow-bg h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.max(progress, 6)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-fog">
              {isEmailStep ? "Huling step na!" : `Step ${step + 1} of ${TOTAL_STEPS}`}
            </p>
          </div>
        )}

        {/* Body */}
        <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6">
          {done ? (
            <Success email={email} />
          ) : isEmailStep ? (
            <div>
              <h2 className="font-display text-2xl font-semibold text-cream">
                Where do we send your early access?
              </h2>
              <p className="mt-2 text-sm text-fog">
                Ilalagay ka namin sa unang batch pag-launch. Walang spam, pinky
                promise. 🤙
              </p>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                placeholder="ikaw@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="mt-5 w-full rounded-2xl border border-plum-700 bg-plum-800 px-4 py-4 text-lg text-cream outline-none placeholder:text-fog/60 focus:border-rose"
              />
              {error && <p className="mt-3 text-sm text-rose">{error}</p>}
              <button
                onClick={submit}
                disabled={submitting}
                className="kilig-cta-shadow mt-5 w-full rounded-full bg-rose px-6 py-4 text-lg font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Sali na ako! 💖"}
              </button>
              <p className="mt-3 text-center text-xs text-fog/70">
                Sa pag-sign up, sumasang-ayon ka na i-email ka namin tungkol sa
                Kilig. Puwede kang mag-unsubscribe anytime.
              </p>
            </div>
          ) : (
            <Step
              key={currentQuestion!.id}
              q={currentQuestion!}
              onChoose={chooseOption}
              selected={answers[currentQuestion!.id]}
            />
          )}
        </div>

        {/* Back */}
        {!done && step > 0 && (
          <div className="px-5 pb-6">
            <button
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-fog hover:text-cream"
            >
              ← Balik
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({
  q,
  onChoose,
  selected,
}: {
  q: Question;
  onChoose: (qId: string, value: string) => void;
  selected?: string;
}) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-cream">
        {q.title}
      </h2>
      {q.hint && <p className="mt-2 text-sm text-fog">{q.hint}</p>}
      <div className="mt-5 flex flex-col gap-3">
        {q.options.map((opt) => {
          const isSel = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChoose(q.id, opt.value)}
              className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition active:scale-[0.98] ${
                isSel
                  ? "border-rose bg-rose/15"
                  : "border-plum-700 bg-plum-800 hover:border-rose/60"
              }`}
            >
              <span className="text-lg font-medium text-cream">
                {opt.label}
                {opt.sub && (
                  <span className="ml-2 text-sm font-normal text-fog">
                    {opt.sub}
                  </span>
                )}
              </span>
              <span className="text-rose">›</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Success({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.origin;
    const text = "Ikaw ang bida sa sariling teleserye. Sali ka na sa Kilig! 💖";
    if (navigator.share) {
      try {
        await navigator.share({ title: "Kilig", text, url });
        return;
      } catch {
        // user cancelled — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full kilig-glow-bg text-3xl">
        💖
      </div>
      <h2 className="mt-5 font-display text-3xl font-semibold text-cream">
        You&apos;re on the list!
      </h2>
      <p className="mt-3 text-fog">
        Salamat! Naka-reserve na ang early access mo. Aabangan mo ang email sa{" "}
        <span className="text-cream">{email}</span> pag-launch ng Kilig.
      </p>
      <p className="mt-6 text-sm text-fog">
        Gusto mong mauna ang barkada mo? I-share mo na 👀
      </p>
      <button
        onClick={share}
        className="mt-3 rounded-full border border-rose/60 px-6 py-3 text-sm font-semibold text-rose transition hover:bg-rose/10 active:scale-[0.98]"
      >
        {copied ? "Na-copy ang link! ✅" : "I-share sa barkada 💌"}
      </button>
    </div>
  );
}

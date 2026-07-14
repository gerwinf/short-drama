import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { getSubmissions, getEvents } from "@/lib/store";
import { QUESTIONS, VERDICTS, labelFor, type Submission } from "@/lib/types";
import { LoginForm, LogoutButton, ResetButton } from "./dashboard-client";

export const dynamic = "force-dynamic";

function pct(n: number, d: number): string {
  if (!d) return "—";
  return ((n / d) * 100).toFixed(1) + "%";
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-plum-700 bg-plum-800/40 p-5">
      <p className="text-sm text-fog">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold text-cream">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-fog/70">{hint}</p>}
    </div>
  );
}

function Breakdown({
  title,
  rows,
  total,
}: {
  title: string;
  rows: { label: string; count: number }[];
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-plum-700 bg-plum-800/40 p-5">
      <p className="text-sm font-semibold text-cream">{title}</p>
      <div className="mt-3 flex flex-col gap-2">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="flex justify-between text-sm text-fog">
              <span>{r.label}</span>
              <span className="text-cream">
                {r.count} · {pct(r.count, total)}
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-plum">
              <div
                className="kilig-glow-bg h-full rounded-full"
                style={{ width: total ? `${(r.count / total) * 100}%` : "0%" }}
              />
            </div>
          </div>
        ))}
        {rows.length === 0 && <p className="text-sm text-fog/60">No data yet.</p>}
      </div>
    </div>
  );
}

function countBy(subs: Submission[], key: (s: Submission) => string) {
  const map = new Map<string, number>();
  for (const s of subs) {
    const k = key(s);
    map.set(k, (map.get(k) || 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count);
}

export default async function Dashboard() {
  const store = await cookies();
  if (!isValidToken(store.get(DASH_COOKIE)?.value)) {
    return (
      <main className="min-h-[100dvh]">
        <LoginForm />
      </main>
    );
  }

  const [subs, events] = await Promise.all([getSubmissions(), getEvents()]);
  const views = events.filter((e) => e.type === "view").length;
  const opens = events.filter((e) => e.type === "open").length;
  const signups = subs.length;

  const utmRows = countBy(subs, (s) => s.utm.utm_source || "direct");
  const recent = [...subs].reverse();

  return (
    <main className="min-h-[100dvh] px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-rose">kilig</p>
            <h1 className="text-lg font-semibold text-cream">
              Validation dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <ResetButton />
            <LogoutButton />
          </div>
        </div>

        {/* Funnel */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Page visits" value={views} hint="unique sessions" />
          <StatCard
            label="Form opens"
            value={opens}
            hint={`${pct(opens, views)} of visits`}
          />
          <StatCard
            label="Signups"
            value={signups}
            hint={`${pct(signups, opens)} of opens`}
          />
          <StatCard
            label="Conversion"
            value={pct(signups, views)}
            hint="signups ÷ visits"
          />
        </div>

        {/* Answer breakdowns */}
        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-fog">
          Respondent breakdown ({signups} signups)
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {QUESTIONS.map((q) => (
            <Breakdown
              key={q.id}
              title={q.title}
              total={signups}
              rows={countBy(subs, (s) =>
                s.answers[q.id] ? labelFor(q.id, s.answers[q.id]) : "—",
              )}
            />
          ))}
          <Breakdown title="Ad source (utm_source)" total={signups} rows={utmRows} />
          {/* Vibe-matched verdicts: each respondent answers only the dilemma
              for the vibe they picked, so totals are per-verdict, not global. */}
          {Object.values(VERDICTS).map((q) => {
            const answered = subs.filter((s) => s.answers[q.id]);
            if (answered.length === 0) return null;
            return (
              <Breakdown
                key={q.id}
                title={q.title}
                total={answered.length}
                rows={countBy(answered, (s) => labelFor(q.id, s.answers[q.id]))}
              />
            );
          })}
        </div>

        {/* Raw submissions */}
        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-fog">
            All submissions
          </h2>
          <a
            href="/api/dashboard/export"
            className="rounded-full border border-rose/50 px-4 py-2 text-sm font-semibold text-cream hover:bg-rose/10"
          >
            ↓ Download CSV
          </a>
        </div>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-plum-700">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-plum-800/60 text-fog">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Email</th>
                {QUESTIONS.map((q) => (
                  <th key={q.id} className="px-4 py-3 font-medium capitalize">
                    {q.id}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium">Verdict</th>
                <th className="px-4 py-3 font-medium">Source</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((s) => (
                <tr key={s.id} className="border-t border-plum-800">
                  <td className="whitespace-nowrap px-4 py-3 text-fog">
                    {new Date(s.ts).toLocaleString("en-PH", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3 text-cream">{s.email}</td>
                  {QUESTIONS.map((q) => (
                    <td key={q.id} className="px-4 py-3 text-fog">
                      {s.answers[q.id] ? labelFor(q.id, s.answers[q.id]) : "—"}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-fog">
                    {(() => {
                      // Show the verdict matching their vibe (falls back to any
                      // answered verdict for back-navigation edge cases).
                      const q =
                        (s.answers.vibe && VERDICTS[s.answers.vibe]) ||
                        Object.values(VERDICTS).find((v) => s.answers[v.id]);
                      return q && s.answers[q.id]
                        ? labelFor(q.id, s.answers[q.id])
                        : "—";
                    })()}
                  </td>
                  <td className="px-4 py-3 text-fog">
                    {s.utm.utm_source || "direct"}
                  </td>
                </tr>
              ))}
              {recent.length === 0 && (
                <tr>
                  <td
                    colSpan={QUESTIONS.length + 4}
                    className="px-4 py-8 text-center text-fog/60"
                  >
                    No submissions yet. Share the landing page to start
                    collecting.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-fog/50">
          Data stored locally in <code>landing/data/*.jsonl</code>. See
          README.md for the Vercel (Postgres/KV) migration path.
        </p>
      </div>
    </main>
  );
}

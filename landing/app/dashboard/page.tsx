import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { getSubmissions, getEvents } from "@/lib/store";
import {
  QUESTIONS,
  VERDICTS,
  FORM_VERSION,
  labelFor,
  wtpByEmail,
  wtpFor,
  type Submission,
} from "@/lib/types";
import {
  Broadcast,
  LoginForm,
  LogoutButton,
  ResetButton,
} from "./dashboard-client";

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

// Per-step quiz funnel: each row is "reached this step". The drop between
// consecutive rows is abandonment at that step — pinpoints the real cliff.
// One funnel PER form version: questionIds repeat across reorders, so a single
// all-versions funnel is meaningless (a reordered question inflates its count).
function StepFunnel({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle?: string;
  rows: { label: string; count: number }[];
}) {
  const base = rows[0]?.count || 0;
  return (
    <div className="rounded-2xl border border-plum-700 bg-plum-800/40 p-5">
      <p className="text-sm font-semibold text-cream">{title}</p>
      {subtitle && <p className="mt-1 text-xs text-fog/70">{subtitle}</p>}
      <div className="mt-3 flex flex-col gap-2">
        {rows.map((r, i) => {
          const prev = i > 0 ? rows[i - 1].count : r.count;
          const dropped = prev - r.count;
          return (
            <div key={r.label}>
              <div className="flex justify-between text-sm text-fog">
                <span>{r.label}</span>
                <span className="text-cream">
                  {r.count} · {pct(r.count, base)}
                  {i > 0 && dropped > 0 && (
                    <span className="ml-2 text-rose">−{dropped}</span>
                  )}
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-plum">
                <div
                  className="kilig-glow-bg h-full rounded-full"
                  style={{ width: base ? `${(r.count / base) * 100}%` : "0%" }}
                />
              </div>
            </div>
          );
        })}
        {base === 0 && (
          <p className="text-sm text-fog/60">
            No step data yet — ships with the next deploy.
          </p>
        )}
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

  const submitErrors = events.filter((e) => e.type === "submit_error").length;

  // Per-version funnels. A question reorder reuses questionIds, so mixing
  // versions in one funnel is meaningless (a moved question inflates its own
  // count). Build one funnel per form version present in tagged events; always
  // include the current FORM_VERSION so it shows even before it has traffic.
  const versionSet = new Set<string>([FORM_VERSION]);
  for (const e of events) {
    if (e.meta?.formVersion) versionSet.add(e.meta.formVersion);
  }
  const versions = [...versionSet].sort((a, b) =>
    a === FORM_VERSION ? -1 : b === FORM_VERSION ? 1 : b.localeCompare(a),
  );

  const funnelFor = (version: string) => {
    const evs = events.filter((e) => e.meta?.formVersion === version);
    const vOpens = evs.filter((e) => e.type === "open").length;
    const steps = evs.filter((e) => e.type === "step");
    const answered = (qId: string) =>
      steps.filter((e) => e.meta?.questionId === qId).length;
    const verdictReached = steps.filter((e) =>
      e.meta?.questionId?.startsWith("verdict"),
    ).length;
    // email→signup from submissions tagged with this version (submissions have
    // carried form_version in answers since before event tagging).
    const vSignups = subs.filter(
      (s) => s.answers.form_version === version,
    ).length;
    const rows = [
      { label: "Form opens", count: vOpens },
      ...QUESTIONS.map((q, i) => ({
        label: `${i + 1}. ${q.id}`,
        count: answered(q.id),
      })),
      { label: `${QUESTIONS.length + 1}. verdict`, count: verdictReached },
      { label: `${QUESTIONS.length + 2}. email → signup`, count: vSignups },
    ];
    return { version, vOpens, vSignups, rows };
  };

  const funnels = versions.map(funnelFor);
  // Events with no formVersion predate event-tagging (2026-07-20) — count them
  // so the funnels' missing history is visible, not silently dropped.
  const untaggedOpens = events.filter(
    (e) => e.type === "open" && !e.meta?.formVersion,
  ).length;

  // Willingness to pay: the founding-member fake door. reserve ÷ price_view is
  // the intent-to-pay rate free signups can't measure. Split by price variant
  // so PH-mass and diaspora ARPU theses are read separately.
  const priceViews = events.filter((e) => e.type === "price_view");
  const reserves = events.filter((e) => e.type === "reserve_click");
  const wtpByPlan = [
    { id: "ph", label: "PH — ₱149/mo", bar: "≥8–10%" },
    { id: "diaspora", label: "Diaspora — $9.99/mo", bar: "≥5%" },
  ].map((p) => ({
    ...p,
    views: priceViews.filter((e) => e.meta?.plan === p.id).length,
    reserves: reserves.filter((e) => e.meta?.plan === p.id).length,
  }));

  // Per-signup WTP status, so the All submissions table can show WHO reserved —
  // not just the aggregate rate above. Joins price events to signups by email.
  const wtp = wtpByEmail(events);

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

        <Broadcast count={subs.length} />

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

        {/* Per-step drop-off (per form version) + goal-line failures */}
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-4 md:col-span-2">
            {funnels.map((f) => (
              <StepFunnel
                key={f.version}
                title={`Quiz step drop-off — ${f.version}${
                  f.version === FORM_VERSION ? " (current)" : ""
                }`}
                subtitle={
                  f.version === FORM_VERSION
                    ? `${f.vOpens} tagged opens. Reached each step, as % of opens; red = lost vs. previous. Baseline to beat: gender-first lost ~51% at step 1.`
                    : `${f.vOpens} tagged opens. Reached each step, as % of opens.`
                }
                rows={f.rows}
              />
            ))}
            {untaggedOpens > 0 && (
              <p className="text-xs text-fog/60">
                + {untaggedOpens} form opens before event-tagging (2026-07-20) —
                their step order can&apos;t be segmented, so they&apos;re excluded
                from the funnels above.
              </p>
            )}
          </div>
          <StatCard
            label="Submit errors"
            value={submitErrors}
            hint="reached email, submit failed — a bug, not abandonment"
          />
        </div>

        {/* Willingness to pay — the founding-member fake door */}
        <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-fog">
          Willingness to pay (founding-member fake door)
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            label="Price views"
            value={priceViews.length}
            hint="reached the reserve screen"
          />
          <StatCard
            label="Reservations"
            value={reserves.length}
            hint="tapped “reserve my price”"
          />
          <StatCard
            label="WTP conversion"
            value={pct(reserves.length, priceViews.length)}
            hint="reserve ÷ price view"
          />
          <StatCard
            label="Skipped"
            value={priceViews.length - reserves.length}
            hint="saw price, took free access"
          />
        </div>
        <div className="mt-4 rounded-2xl border border-plum-700 bg-plum-800/40 p-5">
          <p className="text-sm font-semibold text-cream">By price variant</p>
          <div className="mt-3 flex flex-col gap-2">
            {wtpByPlan.map((r) => (
              <div key={r.id} className="flex justify-between text-sm">
                <span className="text-fog">
                  {r.label}{" "}
                  <span className="text-fog/50">pass {r.bar}</span>
                </span>
                <span className="text-cream">
                  {r.reserves}/{r.views} reserved · {pct(r.reserves, r.views)}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-fog/70">
            The signal free signups can’t give. Below the pass bar, the audience
            likes it free but won’t pay — a red flag worth catching before
            production spend.
          </p>
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
          <table className="w-full min-w-[900px] text-left text-sm">
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
                <th className="px-4 py-3 font-medium">WTP</th>
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
                  <td className="px-4 py-3">
                    {(() => {
                      const w = wtpFor(wtp, s.email);
                      if (!w) return <span className="text-fog/50">—</span>;
                      if (w.status === "reserved")
                        return (
                          <span className="font-semibold text-rose">
                            💳 {w.price ?? "Reserved"}
                          </span>
                        );
                      if (w.status === "skipped")
                        return <span className="text-fog">Skipped</span>;
                      return <span className="text-fog/60">Saw price</span>;
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
                    colSpan={QUESTIONS.length + 5}
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

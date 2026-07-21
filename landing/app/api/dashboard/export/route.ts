import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { getSubmissions, getEvents } from "@/lib/store";
import { ALL_QUESTIONS, wtpByEmail, wtpFor } from "@/lib/types";

function csvCell(v: string): string {
  let s = v ?? "";
  // Neutralize spreadsheet formula injection: a cell starting with = + - @ (or a
  // control char Excel treats as a formula lead) is executed on open. Some of
  // these fields (email, wtp_price) originate from client-controlled track
  // events, so prefix a ' to force literal text. See the WTP export path.
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  // Quote on comma, quote, or any newline (bare \r can inject a spoofed row).
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const store = await cookies();
  if (!isValidToken(store.get(DASH_COOKIE)?.value)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const [subs, events] = await Promise.all([getSubmissions(), getEvents()]);
  const wtp = wtpByEmail(events);
  const questionIds = ALL_QUESTIONS.map((q) => q.id);
  const header = [
    "id",
    "timestamp",
    "email",
    ...questionIds,
    "form_version",
    "wtp_status",
    "wtp_price",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "referrer",
  ];

  const rows = subs.map((s) => {
    const w = wtpFor(wtp, s.email);
    return [
      s.id,
      s.ts,
      s.email,
      ...questionIds.map((q) => s.answers?.[q] ?? ""),
      s.answers?.form_version ?? "",
      w?.status ?? "",
      w?.status === "reserved" ? (w.price ?? "") : "",
      s.utm?.utm_source ?? "",
      s.utm?.utm_medium ?? "",
      s.utm?.utm_campaign ?? "",
      s.utm?.utm_content ?? "",
      s.utm?.utm_term ?? "",
      s.utm?.referrer ?? "",
    ]
      .map(csvCell)
      .join(",");
  });

  const csv = [header.join(","), ...rows].join("\n");
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="kilig-submissions.csv"`,
    },
  });
}

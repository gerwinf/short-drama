import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { getSubmissions } from "@/lib/store";
import { ALL_QUESTIONS } from "@/lib/types";

function csvCell(v: string): string {
  const s = v ?? "";
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export async function GET() {
  const store = await cookies();
  if (!isValidToken(store.get(DASH_COOKIE)?.value)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const subs = await getSubmissions();
  const questionIds = ALL_QUESTIONS.map((q) => q.id);
  const header = [
    "id",
    "timestamp",
    "email",
    ...questionIds,
    "form_version",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "referrer",
  ];

  const rows = subs.map((s) =>
    [
      s.id,
      s.ts,
      s.email,
      ...questionIds.map((q) => s.answers?.[q] ?? ""),
      s.answers?.form_version ?? "",
      s.utm?.utm_source ?? "",
      s.utm?.utm_medium ?? "",
      s.utm?.utm_campaign ?? "",
      s.utm?.utm_content ?? "",
      s.utm?.utm_term ?? "",
      s.utm?.referrer ?? "",
    ]
      .map(csvCell)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="kilig-submissions.csv"`,
    },
  });
}

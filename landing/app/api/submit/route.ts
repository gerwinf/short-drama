import { randomUUID } from "crypto";
import { saveSubmission } from "@/lib/store";
import type { Submission, UtmData } from "@/lib/types";

export async function POST(request: Request) {
  let body: {
    answers?: Record<string, string>;
    email?: string;
    utm?: UtmData;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  // Light validation — we want to capture, not to be strict.
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const submission: Submission = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    answers: body.answers || {},
    email,
    utm: body.utm || {},
    userAgent: request.headers.get("user-agent") || undefined,
  };

  await saveSubmission(submission);
  return Response.json({ ok: true, id: submission.id });
}

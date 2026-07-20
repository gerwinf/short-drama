import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { sendCampaign, allRecipientEmails } from "@/lib/email";

// Sends the vote-drive campaign. Dashboard-cookie gated so only an authed
// admin can trigger real sends. mode "test" → one address; "all" → every
// real signup. Returns per-run counts.
export async function POST(request: Request) {
  const store = await cookies();
  if (!isValidToken(store.get(DASH_COOKIE)?.value)) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.RESEND_API_KEY) {
    return Response.json(
      { ok: false, error: "RESEND_API_KEY not configured in Vercel yet." },
      { status: 400 },
    );
  }

  let body: { mode?: string; testEmail?: string; offset?: number; limit?: number };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const mode = body.mode === "all" ? "all" : "test";
  let recipients: string[];
  let total = 0;

  if (mode === "test") {
    const e = (body.testEmail || "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      return Response.json(
        { ok: false, error: "Enter a valid test email." },
        { status: 400 },
      );
    }
    recipients = [e];
  } else {
    // Oldest-first, test emails already stripped. Batch by offset + a cap
    // (Resend free tier = 100/day) so re-runs can walk through the list.
    const all = await allRecipientEmails();
    total = all.length;
    const limit = Math.min(100, Math.max(1, Number(body.limit) || 100));
    const offset = Math.max(0, Number(body.offset) || 0);
    recipients = all.slice(offset, offset + limit);
  }

  if (recipients.length === 0) {
    return Response.json({ ok: false, error: "no recipients" }, { status: 400 });
  }

  const result = await sendCampaign(recipients);
  return Response.json({
    ok: true,
    mode,
    total,
    recipients: recipients.length,
    ...result,
  });
}

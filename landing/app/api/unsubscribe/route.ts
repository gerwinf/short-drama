import { saveUnsubscribe } from "@/lib/store";
import { verifyUnsubToken } from "@/lib/unsubscribe";

/**
 * Unsubscribe endpoint.
 *
 * POST — RFC 8058 one-click. Gmail/Yahoo POST here (body
 * `List-Unsubscribe=One-Click`) when the user taps the native "Unsubscribe"
 * next to the sender name. It must complete with no further interaction, so
 * there is no confirmation step.
 *
 * GET — the footer link a human clicks. Same effect, plus a friendly page.
 */

async function optOut(request: Request, source: string): Promise<string | null> {
  const token = new URL(request.url).searchParams.get("t") || "";
  const email = verifyUnsubToken(token);
  if (!email) return null;
  await saveUnsubscribe(email, source);
  return email;
}

export async function POST(request: Request) {
  const email = await optOut(request, "one-click");
  // 200 even on a bad token would tell providers nothing useful; 400 is honest.
  return new Response(email ? "unsubscribed" : "invalid token", {
    status: email ? 200 : 400,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const email = await optOut(request, "link");
  const ok = Boolean(email);
  const body = `<!doctype html><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${ok ? "Na-unsubscribe ka na" : "Hindi valid ang link"} — Kilig</title>
<div style="min-height:100vh;display:grid;place-items:center;background:#2b0a1f;color:#f3e9ee;font-family:Arial,Helvetica,sans-serif;margin:0;padding:24px;">
  <div style="max-width:420px;text-align:center;">
    <p style="font-size:22px;font-weight:bold;color:#ff3d68;margin:0 0 16px;">kilig</p>
    ${
      ok
        ? `<h1 style="font-size:20px;margin:0 0 12px;">Na-unsubscribe ka na. 💔</h1>
    <p style="font-size:15px;line-height:1.6;color:#c9b6c0;margin:0;">Hindi ka na namin ie-email. Salamat sa pagsubok sa Kilig — nandito pa rin kami kung magbabago ang isip mo.</p>`
        : `<h1 style="font-size:20px;margin:0 0 12px;">Hindi valid ang link.</h1>
    <p style="font-size:15px;line-height:1.6;color:#c9b6c0;margin:0;">Baka luma na ang link. Mag-email lang sa hello@kilig.nueve.club at kami na ang bahala.</p>`
    }
  </div>
</div>`;
  return new Response(body, {
    status: ok ? 200 : 400,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

import { getSubmissions, getUnsubscribes } from "./store";
import { unsubUrl } from "./unsubscribe";

/**
 * Resend email sending — talks to the REST API directly (no SDK dependency).
 *
 * Requires two env vars (set in Vercel, after verifying a domain in Resend):
 *   RESEND_API_KEY  — your Resend API key
 *   RESEND_FROM     — verified sender, e.g. "Kilig <hello@kilig.nueve.club>"
 *
 * Until those are set, sendCampaign throws and the dashboard shows the error.
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM || "Kilig <hello@kilig.nueve.club>";
const REPLY_TO = process.env.RESEND_REPLY_TO; // where replies go, if set
const UNSUB = process.env.RESEND_UNSUBSCRIBE || "unsubscribe@kilig.nueve.club";

// The live vote-post to drive people to.
const POST_URL = "https://www.facebook.com/share/p/1JerhCHkxf/";

export type BroadcastResult = { sent: number; failed: number; errors: string[] };

// The vote-drive campaign (Taglish). Kept here so it's the single source of
// truth for both the test send and the full blast.
// `unsubLink` is the per-recipient one-click URL. Falls back to the mailto so
// the template still renders in a preview/test with no recipient context.
export function voteDriveCampaign(unsubLink?: string) {
  const unsubHref = unsubLink || `mailto:${UNSUB}?subject=Unsubscribe`;
  const subject = "Ikaw ang bahala sa kwento 💚 (2 seconds lang)";

  const html = `<div style="background:#2b0a1f;padding:24px 0;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background:#3b0a1f;border-radius:16px;padding:28px;color:#f3e9ee;">
    <p style="font-size:22px;font-weight:bold;color:#ff3d68;margin:0 0 16px;">kilig</p>
    <p style="font-size:16px;line-height:1.5;margin:0 0 12px;">Kumusta, ka-Kilig! 👋</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 12px;">Salamat ulit sa pagsali sa unang batch ng <b>Kilig</b> — isa ka sa mga unang naniwala. 🙏</p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 12px;">May bago kaming kwento… at <b>IKAW ang magdedesisyon</b> kung paano ito magtatapos.</p>
    <p style="font-size:15px;line-height:1.6;font-style:italic;margin:0 0 16px;color:#e9c9d6;">Nahuli ng bida na may kalaguyo ang asawa niya. Ngayong gabi, sa harap ng lahat. Ano'ng dapat niyang gawin?</p>
    <p style="font-size:15px;line-height:1.9;margin:0 0 20px;">👉 <b>Bumoto sa comments — i-type lang ang letra:</b><br/>
    A) Harapin sila ngayon<br/>
    B) Umalis muna, mag-isip<br/>
    C) Mag-ipon muna ng ebidensya</p>
    <p style="margin:0 0 20px;"><a href="${POST_URL}" style="display:inline-block;background:#ff3d68;color:#ffffff;text-decoration:none;font-weight:bold;font-size:16px;padding:14px 28px;border-radius:999px;">Panoorin at bumoto 👀</a></p>
    <p style="font-size:15px;line-height:1.6;margin:0 0 4px;">Bukas, <b>ituloy namin ang kwento base sa pinakamaraming boto.</b> Ang boto mo ang bahala sa mangyayari. 💖</p>
    <p style="font-size:14px;line-height:1.6;margin:16px 0 0;color:#c9b6c0;">— Team Kilig</p>
    <p style="font-size:11px;line-height:1.5;margin:24px 0 0;color:#8a6d78;">Natanggap mo 'to kasi sumali ka sa Kilig early access. Ayaw mo nang ma-email? <a href="${unsubHref}" style="color:#8a6d78;">Mag-unsubscribe dito.</a></p>
  </div>
</div>`;

  const text = `Kumusta, ka-Kilig!

Salamat ulit sa pagsali sa unang batch ng Kilig. May bago kaming kwento — at IKAW ang magdedesisyon kung paano ito magtatapos.

Nahuli ng bida na may kalaguyo ang asawa niya. Ano'ng dapat niyang gawin?

Bumoto sa comments (i-type lang ang letra):
A) Harapin sila ngayon
B) Umalis muna, mag-isip
C) Mag-ipon muna ng ebidensya

Panoorin at bumoto: ${POST_URL}

Bukas, ituloy namin ang kwento base sa pinakamaraming boto.

— Team Kilig

Ayaw mo nang ma-email? Mag-unsubscribe dito: ${unsubHref}`;

  return { subject, html, text };
}

// Explicit test/junk addresses to never email (in addition to the pattern
// filters below). Lowercased.
const DENYLIST = new Set([
  "test400@gmail.com",
  "gerwin.fricke@gmail.comfff",
  "gerwin2@gmail.com",
]);

// Stricter than a loose "has an @ and a dot" check: local part must start
// alphanumeric, domain must be real-looking, TLD ≥2 letters, no trailing dot.
// Catches the junk that made Resend 422 the whole batch (e.g. "x@gmail.com.").
export function isValidEmail(e: string): boolean {
  return /^[a-z0-9][a-z0-9._%+-]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/.test(
    e,
  );
}

// De-duplicated, validated list of real signup emails, OLDEST FIRST.
// getSubmissions() returns ts-ascending, and the Set preserves insertion
// order, so the returned array is oldest → newest. Drops test/junk rows.
export async function allRecipientEmails(): Promise<string[]> {
  const [subs, unsubscribed] = await Promise.all([
    getSubmissions(),
    getUnsubscribes(),
  ]);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of subs) {
    const e = (s.email || "").trim().toLowerCase();
    if (!e || !isValidEmail(e)) continue;
    if (e.endsWith("@kilig.test") || e.startsWith("db-verify")) continue;
    if (DENYLIST.has(e)) continue;
    if (unsubscribed.has(e)) continue; // opted out — never email again
    if (seen.has(e)) continue;
    seen.add(e);
    out.push(e);
  }
  return out;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Send the campaign to a list — ONE request per recipient so a single bad
// address (or a rate-limit blip) fails alone instead of killing the batch.
// Modest concurrency + a single retry on 429 keeps us under Resend's limits.
export async function sendCampaign(
  recipients: string[],
): Promise<BroadcastResult> {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not set");
  const result: BroadcastResult = { sent: 0, failed: 0, errors: [] };

  const sendOne = async (to: string): Promise<void> => {
    if (!isValidEmail(to)) {
      result.failed++;
      if (result.errors.length < 6) result.errors.push(`${to}: invalid format`);
      return;
    }
    // Per-recipient so the one-click URL identifies who to opt out.
    const link = unsubUrl(to);
    const { subject, html, text } = voteDriveCampaign(link);
    const payload: Record<string, unknown> = {
      from: FROM,
      to,
      subject,
      html,
      text,
      headers: {
        // RFC 8058: the https URL enables Gmail/Yahoo's native one-click
        // Unsubscribe; the mailto stays as a fallback for older clients.
        "List-Unsubscribe": `<${link}>, <mailto:${UNSUB}?subject=Unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    };
    if (REPLY_TO) payload.reply_to = REPLY_TO;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (res.status === 429 && attempt === 0) {
          await sleep(1200); // rate limited — back off once and retry
          continue;
        }
        if (!res.ok) {
          const body = await res.text();
          result.failed++;
          if (result.errors.length < 6)
            result.errors.push(`${to}: ${res.status} ${body.slice(0, 100)}`);
          return;
        }
        result.sent++;
        return;
      } catch (e) {
        if (attempt === 0) {
          await sleep(800);
          continue;
        }
        result.failed++;
        if (result.errors.length < 6)
          result.errors.push(`${to}: ${(e as Error).message}`);
        return;
      }
    }
  };

  const CONCURRENCY = 4;
  for (let i = 0; i < recipients.length; i += CONCURRENCY) {
    await Promise.all(recipients.slice(i, i + CONCURRENCY).map(sendOne));
  }
  return result;
}

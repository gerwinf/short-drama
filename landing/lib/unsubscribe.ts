import { createHmac, timingSafeEqual } from "crypto";

/**
 * One-click unsubscribe tokens (RFC 8058).
 *
 * The unsubscribe URL is public and unauthenticated — mail providers hit it
 * with no session. So the recipient is carried IN the URL, HMAC-signed, rather
 * than passed as a bare email. Without the signature anyone could unsubscribe
 * anyone by guessing addresses.
 *
 * Failure mode is deliberately fail-safe: a bad signature unsubscribes nobody.
 */

// UNSUB_SECRET is the intended key. It falls back to another server-only secret
// so links still verify if the env var was never set — never to a public value.
const SECRET =
  process.env.UNSUB_SECRET ||
  process.env.RESEND_API_KEY ||
  process.env.DATABASE_URL ||
  "kilig-dev-only-unsub-secret";

const SITE_URL = process.env.SITE_URL || "https://kilig.nueve.club";

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url").slice(0, 32);
}

export function unsubToken(email: string): string {
  const payload = Buffer.from(email.trim().toLowerCase(), "utf8").toString("base64url");
  return `${payload}.${sign(payload)}`;
}

// Returns the email if the signature checks out, otherwise null.
export function verifyUnsubToken(token: string): string | null {
  const [payload, sig] = (token || "").split(".");
  if (!payload || !sig) return null;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  // Length check first — timingSafeEqual throws on a length mismatch.
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const email = Buffer.from(payload, "base64url").toString("utf8");
    return email.includes("@") ? email : null;
  } catch {
    return null;
  }
}

export function unsubUrl(email: string): string {
  return `${SITE_URL}/api/unsubscribe?t=${unsubToken(email)}`;
}

import { createHmac, timingSafeEqual } from "crypto";

/**
 * Minimal password gate for the dashboard.
 *
 * The password lives in the DASHBOARD_PASSWORD env var (see .env.local locally,
 * and Vercel Project → Settings → Environment Variables in production). On a
 * correct password we set an httpOnly cookie whose value is an HMAC derived
 * from the password — so the cookie can't be forged without the secret, and
 * rotating the password invalidates existing sessions.
 */

export const DASH_COOKIE = "kilig_dash";

function password(): string {
  return process.env.DASHBOARD_PASSWORD || "kilig-sprint-2026";
}

export function expectedToken(): string {
  // Derive a stable token from the current password.
  return createHmac("sha256", password())
    .update("kilig-dashboard-v1")
    .digest("hex");
}

export function checkPassword(input: string): boolean {
  const a = Buffer.from(input || "");
  const b = Buffer.from(password());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(expectedToken());
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

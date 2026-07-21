/**
 * Lead reachability.
 *
 * The 2026-07-20 broadcast hard-bounced 15 of 100 addresses — the mailbox or
 * domain does not exist. Those are not deliverability failures, they're
 * fabricated or mistyped addresses typed into the signup quiz, which has no
 * verification step.
 *
 * That matters beyond email: an unreachable address is also a fake *lead*,
 * inflating both the signup count and the willingness-to-pay rate. This module
 * lets the dashboard separate "real humans" from "typed something to finish
 * the quiz" so the validation numbers stay honest.
 */

// Confirmed undeliverable by Resend on the first broadcast. Never email again.
export const KNOWN_BOUNCED = new Set([
  "luradarwin873@gmail.com",
  "lolitgecale@gmail.com",
  "lenidvirtucio@yahoo.com",
  "rachelldarlo@gmail.com",
  "villadosmikay9@gmail.com",
  "julmors28@gmail.com",
  "esen_canafranca@yaho.com.ph",
  "rosariobonifacio1964@gmail.com",
  "ibasco09.alfonso@gmail.com",
  "laidorona@gmail.com",
  "tumimbangjulejames@gmail.com",
  "joannesnunez9@gmail.com",
  "santostordaangelina@yahoo.com",
  "jamebailm0102@icloud.com",
  "ahnnealcopra@gmail.com",
]);

// Near-misses for a real mail host — a typed slip, not a working domain.
// `yaho.com.ph` came straight off the bounce list; the rest are the common
// PH-market typos of the same providers.
const TYPO_DOMAINS = new Set([
  "yaho.com",
  "yaho.com.ph",
  "yahooo.com",
  "yahoo.co",
  "yahoo.con",
  "gmial.com",
  "gmai.com",
  "gmail.co",
  "gmail.con",
  "gnail.com",
  "gmaill.com",
  "hotmial.com",
  "hotmai.com",
  "outlok.com",
  "icloud.co",
]);

export type Reach = "bounced" | "typo" | "ok";

export function reachOf(email: string): Reach {
  const e = (email || "").trim().toLowerCase();
  if (KNOWN_BOUNCED.has(e)) return "bounced";
  const domain = e.split("@")[1] || "";
  if (TYPO_DOMAINS.has(domain)) return "typo";
  return "ok";
}

export function isUnreachable(email: string): boolean {
  return reachOf(email) !== "ok";
}

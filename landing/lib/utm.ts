import type { UtmData } from "./types";

// Reads ad-attribution params from the current URL + referrer (browser only).
export function readUtm(): UtmData {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const utm: UtmData = {};
  (["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const).forEach(
    (k) => {
      const v = p.get(k);
      if (v) utm[k] = v;
    },
  );
  if (document.referrer) utm.referrer = document.referrer;
  return utm;
}

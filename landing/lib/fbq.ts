// Thin, safe wrappers around the Meta Pixel `fbq` global. No-ops if the pixel
// hasn't loaded (e.g. NEXT_PUBLIC_META_PIXEL_ID unset, or an ad blocker).
type Fbq = (...args: unknown[]) => void;

function getFbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { fbq?: Fbq }).fbq;
}

// Meta standard event (e.g. "Lead", "CompleteRegistration").
export function fbqTrack(event: string, params?: Record<string, unknown>) {
  getFbq()?.("track", event, params);
}

// Custom event for funnel steps that aren't a standard event.
export function fbqCustom(event: string, params?: Record<string, unknown>) {
  getFbq()?.("trackCustom", event, params);
}

// Marks a browser session as internal QA. Add ?test=1 to any URL (e.g.
// /play/enemies?test=1) and every event + signup from that session is stamped
// so the dashboard can exclude it. Persists for the whole session, so the full
// flow is tagged — not just the first page that carried the param.
export function isTestSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get("test") === "1") {
      sessionStorage.setItem("kilig_test", "1");
    }
    return sessionStorage.getItem("kilig_test") === "1";
  } catch {
    return false;
  }
}

"use client";

import { useEffect } from "react";
import { readUtm } from "@/lib/utm";

// Fires a single "view" event per browser session so the dashboard can compute
// a real conversion rate (signups ÷ visits). One-per-session avoids inflating
// counts from re-renders / React StrictMode double-invocation in dev.
export default function Track() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("kilig_viewed") === "1") return;
      sessionStorage.setItem("kilig_viewed", "1");
    } catch {
      // sessionStorage may be unavailable; fall through and still track.
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "view", utm: readUtm() }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Mali ang password.");
        return;
      }
      router.refresh();
    } catch {
      setError("May problema. Subukan ulit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-[100dvh] place-items-center px-5">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl border border-plum-700 bg-plum-800/50 p-8"
      >
        <p className="font-display text-2xl font-semibold text-rose">kilig</p>
        <h1 className="mt-2 text-lg font-semibold text-cream">
          Dashboard access
        </h1>
        <p className="mt-1 text-sm text-fog">Private — password required.</p>
        <input
          type="password"
          autoFocus
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 w-full rounded-2xl border border-plum-700 bg-plum px-4 py-3 text-cream outline-none focus:border-rose"
        />
        {error && <p className="mt-3 text-sm text-rose">{error}</p>}
        <button
          disabled={loading}
          className="mt-4 w-full rounded-full bg-rose px-6 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

export function ResetButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      disabled={busy}
      onClick={async () => {
        if (
          !confirm(
            "Delete ALL submissions and events? This clears test data and cannot be undone.",
          )
        )
          return;
        setBusy(true);
        await fetch("/api/dashboard/reset", { method: "POST" });
        setBusy(false);
        router.refresh();
      }}
      className="rounded-full border border-rose/40 px-4 py-2 text-sm text-fog hover:text-rose disabled:opacity-60"
    >
      {busy ? "Clearing…" : "Reset data"}
    </button>
  );
}

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/dashboard/logout", { method: "POST" });
        router.refresh();
      }}
      className="rounded-full border border-plum-700 px-4 py-2 text-sm text-fog hover:text-cream"
    >
      Log out
    </button>
  );
}

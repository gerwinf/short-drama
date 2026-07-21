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

export function Broadcast({ count }: { count: number }) {
  const [testEmail, setTestEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [skip, setSkip] = useState(0); // offset for later batches
  const [confirming, setConfirming] = useState(false); // in-app confirm gate

  async function send(mode: "test" | "all") {
    if (busy) return; // re-entrancy guard: never fire a second send while one is in flight
    if (mode === "test" && !testEmail) {
      setMsg("Enter a test email first.");
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/dashboard/broadcast", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          mode,
          testEmail: testEmail.trim(),
          offset: skip,
          limit: 100,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "failed");
      if (mode === "test") {
        setMsg(`Test sent (${data.sent} ok, ${data.failed} failed).`);
      } else {
        const done = skip + data.recipients;
        const remaining = Math.max(0, (data.total ?? 0) - done);
        setMsg(
          `Sent ${data.sent}/${data.recipients} (failed ${data.failed}). ` +
            `${data.total} real signups, ${remaining} remaining.` +
            (remaining > 0
              ? ` Next batch tomorrow: set "skip first" to ${done}.`
              : " 🎉 All sent.") +
            (data.errors?.length ? ` [${data.errors[0]}]` : ""),
        );
      }
    } catch (e) {
      setMsg("Error: " + (e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-plum-700 bg-plum-800/40 p-5">
      <p className="text-sm font-semibold text-cream">
        Send vote-drive email (Resend) · {count} rows in DB
      </p>
      <p className="mt-1 text-xs text-fog/70">
        From your domain. Test yourself first, then send the oldest 100 (Resend
        free-tier daily cap; test emails auto-excluded). For batch 2 tomorrow,
        bump &quot;skip first&quot;.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="email"
          placeholder="you@email.com (test)"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          className="rounded-full border border-plum-700 bg-plum px-4 py-2 text-sm text-cream outline-none focus:border-rose"
        />
        <button
          disabled={busy}
          onClick={() => send("test")}
          className="rounded-full border border-plum-700 px-4 py-2 text-sm text-fog hover:text-cream disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send test"}
        </button>
        <label className="text-xs text-fog/70">
          skip first
          <input
            type="number"
            min={0}
            value={skip}
            onChange={(e) => setSkip(Math.max(0, Number(e.target.value) || 0))}
            className="ml-2 w-20 rounded-full border border-plum-700 bg-plum px-3 py-2 text-sm text-cream outline-none focus:border-rose"
          />
        </label>
        <button
          disabled={busy}
          onClick={() => setConfirming(true)}
          className="rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {busy ? "Sending…" : "Send oldest 100"}
        </button>
      </div>
      {confirming && (
        <div className="mt-3 rounded-xl border border-rose/50 bg-plum/60 p-3">
          <p className="text-sm text-cream">
            Send the vote-drive email to the oldest 100 signups (skipping the
            first {skip})? Real emails, cannot be undone.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              disabled={busy}
              onClick={() => {
                setConfirming(false);
                send("all");
              }}
              className="rounded-full bg-rose px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              Confirm send
            </button>
            <button
              disabled={busy}
              onClick={() => setConfirming(false)}
              className="rounded-full border border-plum-700 px-4 py-2 text-sm text-fog hover:text-cream disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      {msg && <p className="mt-2 text-sm text-fog">{msg}</p>}
    </div>
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

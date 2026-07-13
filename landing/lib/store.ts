import { promises as fs } from "fs";
import path from "path";
import type { NeonQueryFunction } from "@neondatabase/serverless";
import type { Submission, TrackEvent } from "./types";

/**
 * Storage adapter.
 *
 * PRODUCTION (Vercel): when DATABASE_URL (a Neon Postgres connection string) is
 * set, all reads/writes go to Postgres — durable across serverless instances and
 * cold starts. Tables are auto-created on first use.
 *
 * LOCAL DEV: with no DATABASE_URL, falls back to newline-delimited JSON files
 * under `data/` (or DATA_DIR). Zero setup for `next dev`.
 *
 * Everything else in the app imports only the four exported functions
 * (saveSubmission / getSubmissions / saveEvent / getEvents), so the backing
 * store is fully swappable here.
 */

const DATABASE_URL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED;

// ---------- Postgres (Neon) ----------
let sqlClient: NeonQueryFunction<false, false> | null = null;
let tablesReady: Promise<void> | null = null;

async function getSql(): Promise<NeonQueryFunction<false, false>> {
  if (!sqlClient) {
    const { neon } = await import("@neondatabase/serverless");
    sqlClient = neon(DATABASE_URL!);
  }
  const sql = sqlClient;
  if (!tablesReady) {
    tablesReady = (async () => {
      await sql`CREATE TABLE IF NOT EXISTS submissions (
        id text PRIMARY KEY,
        ts timestamptz NOT NULL,
        email text NOT NULL,
        answers jsonb NOT NULL DEFAULT '{}'::jsonb,
        utm jsonb NOT NULL DEFAULT '{}'::jsonb,
        user_agent text
      )`;
      await sql`CREATE TABLE IF NOT EXISTS events (
        id text PRIMARY KEY,
        ts timestamptz NOT NULL,
        type text NOT NULL,
        utm jsonb NOT NULL DEFAULT '{}'::jsonb,
        user_agent text
      )`;
    })();
  }
  await tablesReady;
  return sql;
}

async function pgSaveSubmission(s: Submission): Promise<void> {
  const sql = await getSql();
  await sql`INSERT INTO submissions (id, ts, email, answers, utm, user_agent)
    VALUES (${s.id}, ${s.ts}, ${s.email}, ${JSON.stringify(s.answers)}::jsonb, ${JSON.stringify(s.utm)}::jsonb, ${s.userAgent ?? null})
    ON CONFLICT (id) DO NOTHING`;
}

async function pgGetSubmissions(): Promise<Submission[]> {
  const sql = await getSql();
  const rows = await sql`SELECT id, ts, email, answers, utm, user_agent
    FROM submissions ORDER BY ts ASC`;
  return rows.map((r) => ({
    id: r.id as string,
    ts: new Date(r.ts as string).toISOString(),
    email: r.email as string,
    answers: (r.answers ?? {}) as Record<string, string>,
    utm: (r.utm ?? {}) as Submission["utm"],
    userAgent: (r.user_agent as string) ?? undefined,
  }));
}

async function pgSaveEvent(e: TrackEvent): Promise<void> {
  const sql = await getSql();
  await sql`INSERT INTO events (id, ts, type, utm, user_agent)
    VALUES (${e.id}, ${e.ts}, ${e.type}, ${JSON.stringify(e.utm)}::jsonb, ${e.userAgent ?? null})
    ON CONFLICT (id) DO NOTHING`;
}

async function pgGetEvents(): Promise<TrackEvent[]> {
  const sql = await getSql();
  const rows = await sql`SELECT id, ts, type, utm, user_agent
    FROM events ORDER BY ts ASC`;
  return rows.map((r) => ({
    id: r.id as string,
    ts: new Date(r.ts as string).toISOString(),
    type: r.type as TrackEvent["type"],
    utm: (r.utm ?? {}) as TrackEvent["utm"],
    userAgent: (r.user_agent as string) ?? undefined,
  }));
}

// ---------- File JSONL (local dev fallback) ----------
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");
const EVENTS_FILE = path.join(DATA_DIR, "events.jsonl");

async function appendLine(file: string, obj: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(file, JSON.stringify(obj) + "\n", "utf8");
}

async function readLines<T>(file: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return raw
      .split("\n")
      .filter((l) => l.trim().length > 0)
      .map((l) => JSON.parse(l) as T);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

// ---------- Public API (dispatches on DATABASE_URL) ----------
export async function saveSubmission(s: Submission): Promise<void> {
  if (DATABASE_URL) return pgSaveSubmission(s);
  return appendLine(SUBMISSIONS_FILE, s);
}

export async function getSubmissions(): Promise<Submission[]> {
  if (DATABASE_URL) return pgGetSubmissions();
  return readLines<Submission>(SUBMISSIONS_FILE);
}

export async function saveEvent(e: TrackEvent): Promise<void> {
  if (DATABASE_URL) return pgSaveEvent(e);
  return appendLine(EVENTS_FILE, e);
}

export async function getEvents(): Promise<TrackEvent[]> {
  if (DATABASE_URL) return pgGetEvents();
  return readLines<TrackEvent>(EVENTS_FILE);
}

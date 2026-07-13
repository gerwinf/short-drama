import { promises as fs } from "fs";
import path from "path";
import type { Submission, TrackEvent } from "./types";

/**
 * Storage adapter.
 *
 * TODAY (local dev / validation): appends newline-delimited JSON to files under
 * `data/`. Works out-of-the-box with `next dev` and needs zero setup.
 *
 * VERCEL (later): serverless functions have an ephemeral, read-only filesystem,
 * so file writes will NOT persist in production. When we deploy, swap the four
 * functions below to a managed store — recommended: Neon Postgres or Upstash
 * Redis from the Vercel Marketplace (or Vercel Blob). The rest of the app
 * (pages, API routes, dashboard) imports only these functions, so the migration
 * is contained to this single file. See README.md → "Deploying to Vercel".
 */

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.jsonl");
const EVENTS_FILE = path.join(DATA_DIR, "events.jsonl");

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function appendLine(file: string, obj: unknown) {
  await ensureDir();
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

export async function saveSubmission(s: Submission): Promise<void> {
  await appendLine(SUBMISSIONS_FILE, s);
}

export async function getSubmissions(): Promise<Submission[]> {
  return readLines<Submission>(SUBMISSIONS_FILE);
}

export async function saveEvent(e: TrackEvent): Promise<void> {
  await appendLine(EVENTS_FILE, e);
}

export async function getEvents(): Promise<TrackEvent[]> {
  return readLines<TrackEvent>(EVENTS_FILE);
}

import { randomUUID } from "crypto";
import { saveEvent } from "@/lib/store";
import type {
  TrackEvent,
  TrackEventMeta,
  TrackEventType,
  UtmData,
} from "@/lib/types";

const ALLOWED_TYPES: TrackEventType[] = [
  "view",
  "open",
  "step",
  "close",
  "submit_error",
];

// Keep meta small and typed — never trust arbitrary client payloads into jsonb.
function cleanMeta(m: unknown): TrackEventMeta | undefined {
  if (!m || typeof m !== "object") return undefined;
  const src = m as Record<string, unknown>;
  const meta: TrackEventMeta = {};
  if (typeof src.step === "number") meta.step = src.step;
  if (typeof src.questionId === "string")
    meta.questionId = src.questionId.slice(0, 64);
  if (typeof src.value === "string") meta.value = src.value.slice(0, 64);
  if (typeof src.reason === "string") meta.reason = src.reason.slice(0, 200);
  if (typeof src.formVersion === "string")
    meta.formVersion = src.formVersion.slice(0, 40);
  return Object.keys(meta).length ? meta : undefined;
}

export async function POST(request: Request) {
  let body: { type?: string; meta?: unknown; utm?: UtmData };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const type: TrackEventType = ALLOWED_TYPES.includes(
    body.type as TrackEventType,
  )
    ? (body.type as TrackEventType)
    : "view";
  const event: TrackEvent = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    type,
    meta: cleanMeta(body.meta),
    utm: body.utm || {},
    userAgent: request.headers.get("user-agent") || undefined,
  };

  await saveEvent(event);
  return Response.json({ ok: true });
}

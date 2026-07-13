import { randomUUID } from "crypto";
import { saveEvent } from "@/lib/store";
import type { TrackEvent, UtmData } from "@/lib/types";

export async function POST(request: Request) {
  let body: { type?: string; utm?: UtmData };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const type = body.type === "open" ? "open" : "view";
  const event: TrackEvent = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    type,
    utm: body.utm || {},
    userAgent: request.headers.get("user-agent") || undefined,
  };

  await saveEvent(event);
  return Response.json({ ok: true });
}

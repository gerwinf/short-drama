import { cookies } from "next/headers";
import { DASH_COOKIE } from "@/lib/auth";

export async function POST() {
  const store = await cookies();
  store.delete(DASH_COOKIE);
  return Response.json({ ok: true });
}

import { cookies } from "next/headers";
import { isValidToken, DASH_COOKIE } from "@/lib/auth";
import { clearAll } from "@/lib/store";

// Destructive: wipes all submissions + events. Gated by the dashboard cookie.
export async function POST() {
  const store = await cookies();
  if (!isValidToken(store.get(DASH_COOKIE)?.value)) {
    return Response.json({ ok: false }, { status: 401 });
  }
  await clearAll();
  return Response.json({ ok: true });
}

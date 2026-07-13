import { cookies } from "next/headers";
import { checkPassword, expectedToken, DASH_COOKIE } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (!checkPassword(body.password || "")) {
    return Response.json({ ok: false, error: "wrong_password" }, { status: 401 });
  }

  const store = await cookies();
  store.set(DASH_COOKIE, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return Response.json({ ok: true });
}

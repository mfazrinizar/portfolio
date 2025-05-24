import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  const csrfToken = jwt.sign(
    { csrf: true, iat: Math.floor(Date.now() / 1000) },
    process.env.CSRF_SECRET!,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({ csrfToken });
  response.cookies.set("csrfToken", csrfToken, {
    path: "/",
    sameSite: "Strict",
    maxAge: 60 * 60 * 1,
  });
  return response;
}
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import jwt from "jsonwebtoken";


const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute (ms)
const RATE_LIMIT_MAX = 3;
const ipCache = new Map<string, { count: number; last: number }>();

function verifyCsrfToken(req: NextRequest) {
  const csrfHeader = req.headers.get("x-csrf-token");
  const csrfCookie = req.cookies.get("csrfToken")?.value;

  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) return false;
  try {
    const decoded = jwt.verify(csrfHeader, process.env.CSRF_SECRET!);
    return true;
  } catch (err) {

    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!verifyCsrfToken(req)) {
    return NextResponse.json(
      { error: "Invalid CSRF token." },
      { status: 403 }
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const now = Date.now();
  const entry = ipCache.get(ip);

  if (entry) {
    if (now - entry.last < RATE_LIMIT_WINDOW) {
      if (entry.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Too many requests. Please wait before trying again." },
          { status: 429 }
        );
      }
      entry.count += 1;
      ipCache.set(ip, entry);
    } else {
      ipCache.set(ip, { count: 1, last: now });
    }
  } else {
    ipCache.set(ip, { count: 1, last: now });
  }

  const body = await req.json();
  const { name, email, subject, message } = body;

  try {
    await resend.emails.send({
      from: "Portfolio Contact <" + CONTACT_EMAIL + ">",
      to: [process.env.CONTACT_TO_EMAIL!],
      subject: `[Portfolio] ${subject}`,
      replyTo: email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
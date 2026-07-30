import { Resend } from "resend";
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY environment variable is not set.");
      return NextResponse.json(
        { error: "Server misconfiguration. Please try again later." },
        { status: 500 },
      );
    }
    const resend = new Resend(apiKey);

    const { email, message } = await request.json();

    // ── Validation ──────────────────────────────────────────────
    if (typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedEmail || !EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!trimmedMessage || trimmedMessage.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (max 5000 characters)." },
        { status: 400 },
      );
    }

    // ── Send ────────────────────────────────────────────────────
    const { error } = await resend.emails.send({
      from: "Portfolio Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL || "delivered@resend.dev"],
      replyTo: [trimmedEmail],
      subject: "New message from your portfolio site",
      text: `From: ${trimmedEmail}\n\n${trimmedMessage}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color: #6366f1;">New Contact Form Submission</h2>
          <p><strong>From:</strong> ${escapeHtml(trimmedEmail)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f4f4f5; padding: 16px; border-radius: 8px;">${escapeHtml(trimmedMessage)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

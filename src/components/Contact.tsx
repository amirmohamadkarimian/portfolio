"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const CONTACT_EMAIL = "karimian.dev@gmail.com";

/* ── Direct Email ──────────────────────────────────────────────────────── */

function DirectEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: select the text for manual copy */
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-background/60 px-6 py-4 backdrop-blur-sm sm:flex-row sm:justify-between">
        {/* Label + address */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Mail className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">
              Direct Email
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="truncate text-sm font-medium text-foreground transition-colors duration-150 hover:text-accent"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-[transform,border-color,color] duration-150 hover:-translate-y-px hover:border-accent/40 hover:text-accent active:scale-95"
          >
            <Mail className="h-3.5 w-3.5" />
            Open Mail
          </a>
          <button
            type="button"
            id="copy-email-btn"
            onClick={handleCopy}
            aria-label={copied ? "Email copied!" : "Copy email address"}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold transition-[transform,border-color,background-color,color] duration-150 active:scale-95 ${
              copied
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "border-accent/30 bg-accent/10 text-accent hover:-translate-y-px hover:bg-accent/15"
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Contact Section ───────────────────────────────────────────────────── */

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = "Portfolio contact";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <AnimatedSection
      id="contact"
      delay={100}
      direction="up"
      className="relative border-t border-border px-6 py-24 lg:px-8 overflow-hidden"
    >
      {/* ── Decorative background orb ────────────────────────────────── */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-accent/8 blur-[100px]" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-64 w-64 rounded-full bg-accent-secondary/8 blur-[80px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader
            label="Contact"
            title="Get in Touch"
            gradientWord="Directly"
            description="Have a question or a project idea? Send a message through the form below."
            centered
          />

          <div className="mt-6 flex justify-center">
            <div
              role="status"
              aria-label="Currently available for new opportunities"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>
          </div>
        </div>

        {/* ── Direct Email ──────────────────────────────────────── */}
        <DirectEmail />

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto mt-6 max-w-3xl space-y-6 rounded-3xl border border-border bg-background/80 p-8 shadow-sm backdrop-blur-sm"
        >
          {/* Subtle noise texture on form */}
          <div className="noise-overlay absolute inset-0 rounded-3xl" />

          <div className="relative space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-foreground"
              >
                Name
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="mt-2 block w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>

              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-foreground"
              >
                Email
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 block w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
            </div>

            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-foreground"
            >
              Message
              <textarea
                id="contact-message"
                name="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                minLength={10}
                maxLength={5000}
                rows={6}
                placeholder="Tell me about your project, timeline, or your goals."
                className="mt-2 block w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <span className="mt-1 block text-right text-xs text-muted">
                {message.length}/5000
              </span>
            </label>
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              {"This opens your email app with the message pre-filled."}
            </p>
            <button
              type="submit"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent px-6 text-sm font-semibold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] active:scale-[0.98]"
            >
              <Mail className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5" />
              Send Message
            </button>
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}

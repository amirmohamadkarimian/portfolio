"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

type SubmitStatus = "idle" | "loading" | "success" | "error";

/* ── Contact Section ───────────────────────────────────────────────────── */

export function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setEmail("");
      setMessage("");
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  };

  return (
    <AnimatedSection
      id="contact"
      delay={240}
      className="relative border-t border-border bg-surface/30 px-6 py-24 lg:px-8 overflow-hidden"
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

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto max-w-3xl space-y-6 rounded-3xl border border-border bg-background/80 p-8 shadow-sm backdrop-blur-sm"
        >
          {/* Subtle noise texture on form */}
          <div className="noise-overlay absolute inset-0 rounded-3xl" />

          <div className="relative grid gap-6">
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-foreground"
            >
              Your Email
              <input
                id="contact-email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={status === "loading"}
                className="mt-3 block w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
            </label>

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
                disabled={status === "loading"}
                className="mt-3 block w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
              />
              <span className="mt-1 block text-right text-xs text-muted">
                {message.length}/5000
              </span>
            </label>
          </div>

          {/* ── Status messages ──────────────────────────────────────── */}
          {status === "success" && (
            <div
              role="status"
              className="relative flex items-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Message sent! I&apos;ll get back to you soon.
            </div>
          )}

          {status === "error" && (
            <div
              role="alert"
              className="relative flex items-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessage}
            </div>
          )}

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              I&apos;ll reply directly to your inbox.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent px-6 text-sm font-semibold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}

"use client";

import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

/* ── Contact Section ───────────────────────────────────────────────────── */

export function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent("Website inquiry");
    const body = encodeURIComponent(`From: ${email}\n\n${message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
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
            description="Have a question or a project idea? Send your email and message below and I'll reply as soon as possible."
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
            <label className="block text-sm font-medium text-foreground">
              Your Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                className="mt-3 block w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>

            <label className="block text-sm font-medium text-foreground">
              Message
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
                rows={6}
                placeholder="Tell me about your project, timeline, or your goals."
                className="mt-3 block w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              I&apos;ll reply directly to your inbox.
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

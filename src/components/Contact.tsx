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
      className="border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader
            label="Contact"
            title="Get in Touch"
            gradientWord="Directly"
            description="Have a question or a project idea? Send your email and message below and I’ll reply as soon as possible."
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
          className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-border bg-background/80 p-8 shadow-sm"
        >
          <div className="grid gap-6">
            <label className="block text-sm font-medium text-foreground">
              Your Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="you@example.com"
                className="mt-3 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                className="mt-3 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
            </label>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">
              I’ll reply directly to your inbox.
            </p>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent px-6 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </AnimatedSection>
  );
}

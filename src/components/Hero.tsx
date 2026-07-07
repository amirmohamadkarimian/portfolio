"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { GitHubIcon } from "./icons";

const roles = [
  "Frontend Developer",
  "React Enthusiast",
  "TypeScript Lover",
  "UI Craftsman",
  "Next.js Builder",
];

function TypewriterRole() {
  const [displayed, setDisplayed] = useState("");
  // All mutable animation state in a ref — never causes re-renders
  const meta = useRef({ roleIndex: 0, deleting: false, text: "" });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const m = meta.current;
      const current = roles[m.roleIndex];

      if (!m.deleting && m.text.length < current.length) {
        m.text = current.slice(0, m.text.length + 1);
        setDisplayed(m.text);
        timeout = setTimeout(tick, 70);
      } else if (!m.deleting && m.text.length === current.length) {
        timeout = setTimeout(() => {
          m.deleting = true;
          tick();
        }, 1800);
      } else if (m.deleting && m.text.length > 0) {
        m.text = current.slice(0, m.text.length - 1);
        setDisplayed(m.text);
        timeout = setTimeout(tick, 40);
      } else {
        // finished deleting — pause then move to next role
        timeout = setTimeout(() => {
          m.deleting = false;
          m.roleIndex = (m.roleIndex + 1) % roles.length;
          tick();
        }, 300);
      }
    };

    timeout = setTimeout(tick, 500); // initial delay
    return () => clearTimeout(timeout);
  }, []); // runs once on mount — no cascading renders

  return (
    <span className="inline-flex items-center gap-1 text-xl font-medium sm:text-2xl">
      <span className="text-gradient">{displayed || "\u00a0"}</span>
      <span className="animate-blink text-accent leading-none">|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 lg:px-8"
    >
      {/* ── Decorative Background ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-float absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="animate-float-slow absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl pb-24 text-center">
        {/* ── Profile Photo ─────────────────────────────────────────── */}
        <div className="animate-fade-in mb-8 flex justify-center">
          <div className="relative">
            {/* Outer spinning ring */}
            <div className="animate-spin-slow absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent opacity-60 blur-[2px]" />
            {/* Glow */}
            <div className="absolute -inset-3 rounded-full bg-accent/20 blur-xl" />
            {/* Photo frame */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-accent/40 sm:h-36 sm:w-36">
              <Image
                src="/profile.png"
                alt="Amirmohamad Karimian"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
            {/* Available dot */}
            <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-background">
              <span className="animate-pulse-dot h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </div>
        </div>

        <p className="animate-fade-in mb-3 text-sm font-medium uppercase tracking-widest text-accent [animation-delay:100ms]">
          Hello, I&apos;m
        </p>

        <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl [animation-delay:150ms]">
          {siteConfig.name}
        </h1>

        <div className="animate-fade-in-up mt-3 flex h-8 items-center justify-center overflow-hidden sm:h-10 [animation-delay:220ms]">
          <TypewriterRole />
        </div>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg [animation-delay:300ms]">
          {siteConfig.intro}
        </p>

        {/* ── CTA Buttons ───────────────────────────────────────────── */}
        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:380ms]">
          <a
            href="#projects"
            className="group relative inline-flex h-12 min-w-[10.75rem] items-center justify-center overflow-hidden rounded-full px-6 text-sm font-semibold text-white bg-gradient-to-r from-accent via-accent-secondary to-accent transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 z-0 translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </a>

          <a
            href={siteConfig.resume}
            download
            className="inline-flex h-12 min-w-[10.75rem] items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>

          <a
            href="#contact"
            className="inline-flex h-12 min-w-[10.75rem] items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </a>
        </div>

        {/* ── Social Links ──────────────────────────────────────────── */}
        <div className="animate-fade-in-up mt-8 flex items-center justify-center gap-3 [animation-delay:460ms]">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
        </div>

        <a
          href="#about"
          aria-label="Scroll to about section"
          className="animate-bounce-subtle absolute bottom-3 left-1/2 flex flex-col items-center gap-1 text-muted transition-colors hover:text-accent"
        >
          <span className="text-xs font-medium tracking-widest uppercase opacity-60">
            scroll
          </span>
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-current p-1">
            <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-current" />
          </span>
        </a>
      </div>
    </section>
  );
}

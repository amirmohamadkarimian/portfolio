"use client";

import { Download, Mail } from "lucide-react";
import Image from "next/image";
import { roles, siteConfig } from "@/lib/data";
import { useMouseGlow } from "@/hooks/useMouseGlow";
import { useTypewriter } from "@/hooks/useTypewriter";
import { scrollToSection } from "@/lib/scrollTo";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "./icons";
import { GradientButton } from "./ui/GradientButton";
import { SocialIconButton } from "./ui/SocialIconButton";

/* ── Typewriter ────────────────────────────────────────────────────────── */

function TypewriterRole() {
  const displayed = useTypewriter(roles);

  return (
    <span className="inline-flex items-center gap-1 text-xl font-medium sm:text-2xl">
      <span className="text-gradient">{displayed || "\u00a0"}</span>
      <span className="animate-blink leading-none text-accent">|</span>
    </span>
  );
}

/* ── Hero Section ──────────────────────────────────────────────────────── */

export function Hero() {
  const { containerRef, glowRef } = useMouseGlow();

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 lg:px-8"
    >
      {/* ── Decorative Background ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Mouse-following glow */}
        <div
          ref={glowRef}
          className="absolute h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] transition-opacity duration-150"
          style={{ opacity: 0 }}
        />
        <div className="animate-float absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="animate-float-slow absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-accent-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0" />
      </div>

      <div className="relative mx-auto max-w-4xl pb-24 text-center">
        {/* ── Profile Photo ─────────────────────────────────────────── */}
        <div className="animate-fade-in mb-8 flex justify-center">
          <div className="relative">
            <div className="animate-spin-slow absolute -inset-1 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent opacity-60 blur-[2px]" />
            <div className="absolute -inset-3 rounded-full bg-accent/20 blur-xl" />
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-accent/40 sm:h-36 sm:w-36">
              <Image
                src="/profile.png"
                alt="Amirmohamad Karimian"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
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

        <p className="animate-fade-in-up mx-auto mt-5 max-w-3xl text-lg font-medium leading-relaxed text-foreground/80 sm:text-xl [animation-delay:260ms]">
          {siteConfig.subtitle}
        </p>

        {/* ── CTA Buttons ───────────────────────────────────────────── */}
        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:380ms]">
          <GradientButton
            href="#projects"
            onClick={(e) => scrollToSection(e, "#projects")}
            className="min-w-[10.75rem]"
          >
            View My Work
          </GradientButton>

          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="inline-flex h-12 min-w-[10.75rem] items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-[transform,border-color,background-color,color,box-shadow] duration-150 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </a>
        </div>

        {/* ── Social Links ──────────────────────────────────────────── */}
        <div className="animate-fade-in-up mt-8 flex items-center justify-center gap-3 [animation-delay:460ms]">
          <SocialIconButton
            href={siteConfig.github}
            icon={GitHubIcon}
            label="GitHub profile"
          />
          <SocialIconButton
            href={siteConfig.linkedin}
            icon={LinkedInIcon}
            label="LinkedIn profile"
          />
          <SocialIconButton
            href={siteConfig.telegram}
            icon={TelegramIcon}
            label="Telegram"
          />
          <SocialIconButton
            href={`mailto:${siteConfig.email}`}
            icon={Mail}
            label="Send email"
          />
        </div>

        {/* ── Scroll indicator ──────────────────────────────────────── */}
        <a
          href="#about"
          onClick={(e) => scrollToSection(e, "#about")}
          aria-label="Scroll to about section"
          className="animate-bounce-subtle absolute bottom-6 left-1/2 flex flex-col items-center gap-1 text-muted transition-colors duration-150 hover:text-accent"
        >
          <span className="text-xs font-medium uppercase tracking-widest opacity-60">
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

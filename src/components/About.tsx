"use client";

import { ArrowRight, CheckCircle2, Mail, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/scrollTo";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const stats = [
  { value: "3+", label: "Years Crafting Web Apps" },
  { value: "15+", label: "Projects & Demos Built" },
  { value: "98+", label: "Avg Lighthouse Score" },
  { value: "<100ms", label: "UI Interaction Speed" },
];

const standards = [
  {
    title: "Strict TypeScript Architecture",
    description:
      "Zero implicit any, end-to-end type safety, and predictable state control that prevents production bugs.",
  },
  {
    title: "60fps Motion & Fluid Micro-Interactions",
    description:
      "Hardware-accelerated animations that guide user intent without sacrificing performance or battery.",
  },
  {
    title: "Sub-Second Load Times & SEO",
    description:
      "Optimized Next.js App Router setup with dynamic SSR/SSG, crisp images, and lean JS bundles.",
  },
  {
    title: "Product-Driven Collaboration",
    description:
      "Translating Figma comps into accessible code while keeping git histories clean and communication direct.",
  },
];

const techPills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Motion UI",
  "REST APIs",
];

export function About() {
  return (
    <AnimatedSection
      id="about"
      delay={80}
      className="relative border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      {/* Decorative ambient background blur */}
      <div className="pointer-events-none absolute left-10 top-1/3 h-72 w-72 rounded-full bg-accent/8 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-accent-secondary/8 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeader
            label="Engineering & Vision"
            title="Beyond the"
            gradientWord="Code"
            description="A frontend developer who bridges modern web architecture with high-converting, fluid user experience."
            centered
          />
        </div>

        {/* ── Main Layout: Asymmetric Bento Grid ────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (8 cols): Bio & Stats */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Bio Card */}
            <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background/90 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(99,102,241,0.08)]">
              {/* Noise texture overlay */}
              <div className="noise-overlay absolute inset-0" />

              <div className="relative z-10 space-y-6">
                {/* Intro Avatar + Badge Header */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-accent/40 shadow-md">
                    <Image
                      src="/profile.png"
                      alt={siteConfig.name}
                      width={64}
                      height={64}
                      sizes="64px"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground">
                      {siteConfig.name}
                    </h3>
                    <p className="flex items-center gap-2 text-sm font-medium text-accent">
                      <Zap className="h-3.5 w-3.5 fill-accent" />
                      Frontend Specialist &amp; UI Architect
                    </p>
                  </div>
                </div>

                {/* Main Pitch Narrative */}
                <div className="space-y-4 text-base leading-relaxed text-foreground">
                  <p className="font-medium text-foreground">
                    I don&apos;t just write code — I build web applications
                    people actually enjoy using.
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Specializing in{" "}
                    <strong className="font-semibold text-foreground">
                      React 19, Next.js 16, and strict TypeScript
                    </strong>
                    , I focus on shipping high-performance user interfaces. From
                    engineering dynamic banking dashboards like{" "}
                    <span className="text-accent font-medium">Banky</span> to
                    live weather platforms like{" "}
                    <span className="text-accent font-medium">Weatherly</span>,
                    my focus stays anchored on sub-second loads and 98+
                    Lighthouse scores.
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/90">
                    <strong className="font-semibold text-foreground">
                      My work philosophy:
                    </strong>{" "}
                    Great software is invisible. Users shouldn&apos;t think
                    about state machines or memoized hooks — they should simply
                    feel speed, clarity, and zero friction.
                  </p>
                </div>
              </div>

              {/* Tech proof pill strip */}
              <div className="relative z-10 mt-8 border-t border-border/60 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Primary Production Stack
                </p>
                <ul
                  aria-label="Primary production stack technologies"
                  className="flex flex-wrap gap-2"
                >
                  {techPills.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors duration-150 hover:border-accent/40 hover:text-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Stat Cards (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, index) => (
                <div
                  key={label}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(99,102,241,0.12)]"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-accent/5 transition-transform duration-300 group-hover:scale-150" />
                  <p className="text-3xl font-extrabold text-gradient">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Working Standards & Direct Call to Action */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Engineering Standards Card */}
            <div className="flex flex-1 flex-col rounded-3xl border border-border bg-background/90 p-7 shadow-sm backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                What I Bring to the Team
              </h3>
              <div className="mt-6 flex-1 space-y-5">
                {standards.map((item) => (
                  <div key={item.title} className="group flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Hire / CTA Card (Focal point with accent glow) */}
            <div className="group relative overflow-hidden rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/10 via-surface to-accent-secondary/10 p-7 shadow-lg shadow-accent/5 backdrop-blur-md transition-all duration-200 hover:border-accent hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]">
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent ring-1 ring-accent/30">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Available for Hire
                </span>
                <h3 className="mt-4 text-xl font-bold text-foreground">
                  Ready to build a high-impact web product?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Open for full-time frontend engineering roles and select
                  contract work.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "#contact")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent px-5 text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] active:scale-[0.98]"
                  >
                    <Mail className="h-4 w-4" />
                    Book a Quick Chat
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => scrollToSection(e, "#projects")}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-all duration-150 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent active:scale-[0.98]"
                  >
                    View My Work
                    <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

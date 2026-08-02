"use client";

import { ArrowRight, CheckCircle2, Code2, Mail, Sparkles } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/scrollTo";
import { AnimatedSection } from "./AnimatedSection";
import { ScrollRevealContainer, ScrollRevealItem } from "./ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "10+", label: "Projects Completed" },
  { value: "100%", label: "Responsive Design" },
  { value: "Clean", label: "Type-Safe Code" },
];

const focusAreas = [
  {
    title: "Clean Code & Type Safety",
    description:
      "Writing maintainable TypeScript and building modular React components that scale predictably.",
  },
  {
    title: "Responsive & Accessible UI",
    description:
      "Crafting pixel-perfect layouts using Tailwind CSS that work seamlessly across all screen sizes.",
  },
  {
    title: "Performance & Usability",
    description:
      "Optimizing load speeds, Core Web Vitals, and smooth interactive experiences.",
  },
];

const techPills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "Git & GitHub",
];

export function About() {
  return (
    <AnimatedSection
      id="about"
      delay={80}
      className="relative border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      {/* Decorative ambient background blur */}
      <div className="pointer-events-none absolute left-10 top-1/3 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-80 w-80 rounded-full bg-accent-secondary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Section Header ─────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeader
            label="About Me"
            title="Background &"
            gradientWord="Focus"
            description="A frontend developer dedicated to building clean, fast, and responsive user interfaces."
            centered
          />
        </div>

        {/* ── Main Layout: Asymmetric Bento Grid ────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Left Column (7 cols): Bio & Stats */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Bio Card */}
            <div className="group relative flex flex-1 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-background/90 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:shadow-[0_12px_40px_rgba(99,102,241,0.06)]">
              {/* Noise texture overlay */}
              <div className="noise-overlay absolute inset-0" />

              <div className="relative z-10 space-y-6">
                {/* Intro Avatar + Role Header */}
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-border shadow-sm">
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
                      <Code2 className="h-4 w-4 text-accent" />
                      Frontend Developer
                    </p>
                  </div>
                </div>

                {/* Main Pitch Narrative */}
                <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
                  <p className="text-base font-medium text-foreground">
                    I focus on building functional, responsive, and user-friendly web applications.
                  </p>
                  <p>
                    Specializing in{" "}
                    <strong className="font-semibold text-foreground">
                      React, Next.js, and TypeScript
                    </strong>
                    , I bridge the gap between design and clean code implementation. I enjoy turning complex ideas into simple, clear digital interfaces.
                  </p>
                  <p>
                    My approach is straightforward: prioritize performance, maintain clear component structure, and keep user experience smooth across all devices.
                  </p>
                </div>
              </div>

              {/* Tech proof pill strip */}
              <div className="relative z-10 mt-8 border-t border-border/60 pt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Core Technologies
                </p>
                <ScrollRevealContainer
                  as="ul"
                  stagger={60}
                  aria-label="Core technologies list"
                  className="flex flex-wrap gap-2"
                >
                  {techPills.map((tech, i) => (
                    <ScrollRevealItem
                      key={tech}
                      as="li"
                      index={i}
                      direction="zoom-in"
                      distance="12px"
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors duration-150 hover:border-accent/40 hover:text-accent"
                    >
                      {tech}
                    </ScrollRevealItem>
                  ))}
                </ScrollRevealContainer>
              </div>
            </div>

            {/* Stat Cards (2x2 Grid) */}
            <ScrollRevealContainer stagger={80} className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label }, index) => (
                <ScrollRevealItem
                  key={label}
                  index={index}
                  direction="up"
                  distance="24px"
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface/80 p-5 text-center shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_10px_30px_rgba(99,102,241,0.08)]"
                >
                  <p className="text-2xl font-bold text-gradient">
                    {value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
                    {label}
                  </p>
                </ScrollRevealItem>
              ))}
            </ScrollRevealContainer>
          </div>

          {/* Right Column (5 cols): Development Focus & Call to Action */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Development Focus Card */}
            <div className="flex flex-1 flex-col rounded-3xl border border-border bg-background/90 p-7 shadow-sm backdrop-blur-sm">
              <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                What I Focus On
              </h3>
              <ScrollRevealContainer stagger={100} className="mt-6 flex-1 space-y-5">
                {focusAreas.map((item, index) => (
                  <ScrollRevealItem
                    key={item.title}
                    index={index}
                    direction="right"
                    distance="20px"
                    className="group flex gap-3"
                  >
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
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
                  </ScrollRevealItem>
                ))}
              </ScrollRevealContainer>
            </div>

            {/* Direct Contact Card */}
            <ScrollRevealItem
              direction="up"
              distance="30px"
              index={0}
              className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-sm transition-all duration-200 hover:border-accent/40"
            >
              <div className="relative z-10">
                <h3 className="text-lg font-bold text-foreground">
                  Interested in Working Together?
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  Open for frontend developer roles, team opportunities, and select projects.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, "#contact")}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-accent px-5 text-xs font-semibold text-white transition-all duration-150 hover:bg-accent-hover active:scale-[0.98]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Get in Touch
                  </a>
                  <a
                    href="#projects"
                    onClick={(e) => scrollToSection(e, "#projects")}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 text-xs font-semibold text-foreground transition-all duration-150 hover:border-accent/40 hover:text-accent active:scale-[0.98]"
                  >
                    View Projects
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </ScrollRevealItem>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}


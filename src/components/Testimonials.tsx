import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { ScrollRevealContainer, ScrollRevealItem } from "./ScrollReveal";
import { SectionHeader } from "./ui/SectionHeader";

export function Testimonials() {
  return (
    <AnimatedSection
      id="testimonials"
      delay={100}
      className="relative overflow-hidden border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      {/* Decorative ambient background */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-accent/5 blur-[110px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-accent-secondary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeader
            label="Testimonials"
            title="What People"
            gradientWord="Say"
            description="Feedback from teammates and clients I've collaborated with on frontend projects."
            centered
          />
        </div>

        {/* ── Cards ──────────────────────────────────────────────────── */}
        <ScrollRevealContainer
          stagger={120}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item, index) => (
            <ScrollRevealItem
              key={item.name}
              index={index}
              direction="up"
              distance="30px"
              as="figure"
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background/80 p-7 shadow-sm backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]"
            >
              {/* Quote glyph */}
              <Quote
                className="absolute right-6 top-6 h-10 w-10 text-accent/10 transition-colors duration-200 group-hover:text-accent/20"
                aria-hidden="true"
              />

              <blockquote className="relative z-10 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <figcaption className="relative z-10 mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-sm font-bold text-white shadow-[0_4px_14px_rgba(99,102,241,0.3)]">
                  {item.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {item.name}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {item.role}
                  </span>
                </span>
              </figcaption>

              {/* Bottom accent glow line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-200 group-hover:w-full" />
            </ScrollRevealItem>
          ))}
        </ScrollRevealContainer>
      </div>
    </AnimatedSection>
  );
}

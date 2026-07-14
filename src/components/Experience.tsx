import { journeyMilestones } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="border-t border-border px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeader
            label="Journey"
            title="My Path as a"
            gradientWord="Developer"
            description="A self-driven frontend developer focused on building real-world projects and continuously learning modern web technologies."
            centered
          />
        </div>

        {/* ── Timeline ───────────────────────────────────────────────── */}
        <div className="relative mx-auto max-w-3xl">
          {/* Glowing vertical line */}
          <div className="absolute left-4 top-0 hidden h-full w-px sm:left-1/2 sm:block sm:-translate-x-px">
            <div className="h-full w-full bg-gradient-to-b from-accent via-accent-secondary to-accent opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-b from-accent via-accent-secondary to-accent blur-[2px] opacity-30" />
          </div>

          <div className="space-y-12">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />

                {/* ── Card ─────────────────────────────────────────── */}
                <div
                  className={`group sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(99,102,241,0.12)]">
                    {/* Year badge */}
                    <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent ring-1 ring-accent/20">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {milestone.description}
                    </p>
                    {/* Bottom accent glow line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>

                {/* ── Pulsing dot ──────────────────────────────────── */}
                <div className="absolute left-4 top-7 hidden sm:left-1/2 sm:block sm:-translate-x-1/2">
                  <span className="absolute -inset-2 animate-ping rounded-full bg-accent/20" />
                  <span className="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

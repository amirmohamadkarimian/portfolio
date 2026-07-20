import { Bolt, Rocket, ShieldCheck, Sparkles } from "lucide-react";
import { highlights } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./ui/SectionHeader";

const iconMap: Record<string, typeof Rocket> = {
  Rocket,
  ShieldCheck,
  Sparkles,
  Bolt,
};

export function Highlights() {
  return (
    <AnimatedSection
      id="highlights"
      delay={140}
      className="border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <SectionHeader
            label="Highlights"
            title="What I"
            gradientWord="Deliver"
            description="These are the pillars I build around: performance, accessibility, motion, and reusable code architecture."
            centered
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => {
            const Icon = iconMap[item.icon] ?? Rocket;

            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-border bg-background/80 p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_60px_rgba(99,102,241,0.12)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-accent/10 text-accent transition-colors duration-200 group-hover:bg-accent/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

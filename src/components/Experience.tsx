import { journeyMilestones } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";

export function Experience() {
  return (
    <AnimatedSection
      id="experience"
      className="border-y border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Journey
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Path as a Developer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            A self-driven frontend developer focused on building real-world
            projects and continuously learning modern web technologies.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-border sm:left-1/2 sm:block sm:-translate-x-px" />

          <div className="space-y-10">
            {journeyMilestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex flex-col gap-4 sm:flex-row sm:items-center ${
                  index % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <div className="hidden sm:block sm:w-1/2" />

                <div
                  className={`sm:w-1/2 ${
                    index % 2 === 0 ? "sm:pr-12 sm:text-right" : "sm:pl-12"
                  }`}
                >
                  <div className="rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_rgba(99,102,241,0.08)]">
                    <span className="text-sm font-semibold text-accent">
                      {milestone.year}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-accent bg-background sm:left-1/2 sm:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

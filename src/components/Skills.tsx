import { additionalSkills, coreSkills } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="group inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="border-y border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Skills
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technologies & Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            A toolkit built for modern frontend development — from core
            languages to design-minded problem solving.
          </p>
        </div>

        <div className="mb-10">
          <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-muted">
            Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, i) => (
              <div
                key={skill}
                style={{ animationDelay: `${i * 50}ms` }}
                className="animate-fade-in"
              >
                <SkillBadge label={skill} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-muted">
            Additional Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill) => (
              <SkillBadge key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

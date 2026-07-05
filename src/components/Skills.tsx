import { additionalSkills, coreSkills } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";

/* ── Skill icon map (SVG inline) ──────────────────────────────────────── */
const skillIcons: Record<string, string> = {
  JavaScript: "🟨",
  TypeScript: "🔷",
  React: "⚛️",
  "Next.js": "▲",
  "Tailwind CSS": "🎨",
  Git: "🌿",
  GitHub: "🐙",
};

function CoreSkillBadge({ label, index }: { label: string; index: number }) {
  const icon = skillIcons[label];
  return (
    <div
      className="gradient-border group relative inline-flex cursor-default items-center gap-2.5 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:bg-accent/5 hover:text-accent hover:shadow-[0_4px_20px_rgba(99,102,241,0.18)] hover:-translate-y-0.5"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      <span>{label}</span>
    </div>
  );
}

function AdditionalSkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex cursor-default items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:-translate-y-0.5">
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
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Skills
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Technologies &amp;{" "}
            <span className="text-gradient">Expertise</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            A toolkit built for modern frontend development — from core
            languages to design-minded problem solving.
          </p>
        </div>

        {/* ── Core Skills ─────────────────────────────────────────────── */}
        <div className="mb-12">
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-muted">
            Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, i) => (
              <CoreSkillBadge key={skill} label={skill} index={i} />
            ))}
          </div>
        </div>

        {/* ── Additional Skills ───────────────────────────────────────── */}
        <div>
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-muted">
            Additional Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill) => (
              <AdditionalSkillBadge key={skill} label={skill} />
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

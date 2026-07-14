import type { ComponentType } from "react";
import { additionalSkills, coreSkills } from "@/lib/data";
import type { IconProps } from "@/lib/types";
import { AnimatedSection } from "./AnimatedSection";
import {
  GitHubIcon,
  GitIcon,
  JavaScriptIcon,
  NextjsIcon,
  ReactIcon,
  TailwindIcon,
  TypeScriptIcon,
} from "./icons";
import { SectionHeader } from "./ui/SectionHeader";

/* ── Skill icon map ────────────────────────────────────────────────────── */
const skillIcons: Record<string, ComponentType<IconProps>> = {
  JavaScript: JavaScriptIcon,
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  "Next.js": NextjsIcon,
  "Tailwind CSS": TailwindIcon,
  Git: GitIcon,
  GitHub: GitHubIcon,
};

/* ── Skill badge colors ────────────────────────────────────────────────── */
const skillColors: Record<string, string> = {
  JavaScript: "hover:text-yellow-500 hover:border-yellow-500/40",
  TypeScript: "hover:text-blue-500 hover:border-blue-500/40",
  React: "hover:text-sky-400 hover:border-sky-400/40",
  "Next.js": "hover:text-foreground hover:border-foreground/40",
  "Tailwind CSS": "hover:text-cyan-400 hover:border-cyan-400/40",
  Git: "hover:text-orange-500 hover:border-orange-500/40",
  GitHub: "hover:text-foreground hover:border-foreground/40",
};

function CoreSkillBadge({ label, index }: { label: string; index: number }) {
  const Icon = skillIcons[label];
  const color = skillColors[label] ?? "hover:text-accent hover:border-accent/40";

  return (
    <div
      className={`gradient-border group relative inline-flex cursor-default items-center gap-2.5 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-accent/5 hover:shadow-[0_4px_20px_rgba(99,102,241,0.18)] ${color}`}
      style={{
        animationDelay: `${index * 60}ms`,
        animation: `float ${6 + index * 0.5}s ease-in-out ${index * 0.3}s infinite`,
      }}
    >
      {Icon && (
        <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      )}
      <span>{label}</span>
    </div>
  );
}

function AdditionalSkillBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex cursor-default items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.1)]">
      {label}
    </span>
  );
}

export function Skills() {
  return (
    <AnimatedSection
      id="skills"
      className="border-t border-border px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-14">
          <SectionHeader
            label="Skills"
            title="Technologies &"
            gradientWord="Expertise"
            description="A toolkit built for modern frontend development — from core languages to design-minded problem solving."
            centered
          />
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

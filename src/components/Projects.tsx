import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { GitHubIcon } from "./icons";
import { SectionHeader } from "./ui/SectionHeader";

/* ── Tech Badge Colors ─────────────────────────────────────────────────── */

const techColors: Record<string, string> = {
  HTML: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  CSS: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  JavaScript:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  "Next.js":
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  React: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  TypeScript:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Tailwind CSS":
    "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  Zustand:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  "REST API":
    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  "Framer Motion":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
};

function getTechClass(tech: string) {
  return techColors[tech] ?? "bg-accent/10 text-accent";
}

/* ── Projects Section ──────────────────────────────────────────────────── */

export function Projects() {
  return (
    <AnimatedSection id="projects" className="border-t border-border bg-surface/30 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader
            label="Projects"
            title="Featured"
            gradientWord="Work"
            description="A selection of projects that showcase my approach to building modern, user-centered web applications."
          />
        </div>

        {/* ── Cards Grid ─────────────────────────────────────────────── */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)]"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* ── Card number ───────────────────────────────────── */}
              <span className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-xs font-bold text-accent backdrop-blur-sm ring-1 ring-border">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* ── Image ─────────────────────────────────────────── */}
              <div className="relative aspect-video overflow-hidden bg-background">
                <Image
                  src={project.image}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* ── Body ──────────────────────────────────────────── */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getTechClass(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    <GitHubIcon className="h-4 w-4" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live demo`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-accent"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                  {/* Hover arrow */}
                  <span className="ml-auto translate-x-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
              </div>

              {/* ── Bottom gradient glow line ──────────────────────── */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-accent to-accent-secondary transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

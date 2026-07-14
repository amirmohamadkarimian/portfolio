import type { ComponentType, SVGProps } from "react";

/* ── Icon ──────────────────────────────────────────────────────────────── */
export type IconProps = SVGProps<SVGSVGElement>;

/* ── Site Config ───────────────────────────────────────────────────────── */
export interface SiteConfig {
  name: string;
  title: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  telegram: string;
  resume: string;
}

/* ── Navigation ────────────────────────────────────────────────────────── */
export interface NavLink {
  href: string;
  label: string;
}

/* ── Projects ──────────────────────────────────────────────────────────── */
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
}

/* ── Journey ───────────────────────────────────────────────────────────── */
export interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
}

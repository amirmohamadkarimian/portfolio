import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "@/components/icons";
import type {
  ContactMethod,
  JourneyMilestone,
  NavLink,
  Project,
  SiteConfig,
  SocialLink,
} from "./types";

/* ── Site Config ───────────────────────────────────────────────────────── */
export const siteConfig: SiteConfig = {
  name: "Amirmohamad Karimian",
  title: "Frontend Developer",
  intro:
    "I build modern, fast, and user-friendly web applications using React, Next.js, and TypeScript.",
  email: "karimian.dev@gmail.com",
  github: "https://github.com/amirmohamadkarimian",
  linkedin: "https://linkedin.com/in/amirmohammadkarimian",
  telegram: "https://t.me/amirmohamadkarimian",
  resume: "/resume.pdf",
};

/* ── Navigation ────────────────────────────────────────────────────────── */
export const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Journey" },
  { href: "#contact", label: "Contact" },
];

/* ── Hero Roles (typewriter) ───────────────────────────────────────────── */
export const roles: string[] = [
  "Frontend Developer",
  "React Enthusiast",
  "TypeScript Lover",
  "UI Craftsman",
  "Next.js Builder",
];

/* ── Skills ────────────────────────────────────────────────────────────── */
export const coreSkills: string[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Git",
  "GitHub",
];

export const additionalSkills: string[] = [
  "Responsive Design",
  "REST APIs",
  "UI/UX Basics",
  "Problem Solving",
  "Component-Based Architecture",
];

/* ── Projects ──────────────────────────────────────────────────────────── */
export const projects: Project[] = [
  {
    id: "banky",
    title: "Banky",
    description: "My banky project built with javascrpt",
    image: "/projects/banky.png",
    technologies: ["html", "css", "javascript"],
    github: "https://github.com/amirmohamadkarimian/banky",
    demo: "https://banky-demo.vercel.app",
  },
  {
    id: "weatherly",
    title: "Weatherly",
    description:
      "A responsive weather application with location search, 7-day forecasts, and animated weather icons powered by a public REST API.",
    image: "/projects/weatherly.svg",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST API"],
    github: "https://github.com/amirmohamadkarimian/weatherly",
    demo: "https://weatherly-demo.vercel.app",
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description:
      "A performant, SEO-optimized portfolio site featuring smooth scroll animations, dark/light mode, and a fully responsive component-based layout.",
    image: "/projects/portfolio.svg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/amirmohamadkarimian/portfolio",
    demo: "https://amirmohamadkarimian.dev",
  },
];

/* ── Tech Badge Colors ─────────────────────────────────────────────────── */
export const techColors: Record<string, string> = {
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

export function getTechClass(tech: string): string {
  return techColors[tech] ?? "bg-accent/10 text-accent";
}

/* ── Journey Milestones ────────────────────────────────────────────────── */
export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2023",
    title: "Started the Journey",
    description:
      "Began learning web development fundamentals — HTML, CSS, and JavaScript — with a focus on building interactive user interfaces.",
  },
  {
    year: "2024",
    title: "Diving into React",
    description:
      "Transitioned to React and modern tooling, building component-based applications and exploring state management patterns.",
  },
  {
    year: "2025",
    title: "Modern Frontend Stack",
    description:
      "Adopted TypeScript, Next.js, and Tailwind CSS to ship production-ready projects with strong performance and developer experience.",
  },
  {
    year: "Present",
    title: "Building Real-World Projects",
    description:
      "Continuously learning and shipping frontend applications — focused on clean code, responsive design, and exceptional user experience.",
  },
];

/* ── Contact Methods ───────────────────────────────────────────────────── */
export const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hoverColor: "group-hover:bg-rose-500",
    hoverText: "group-hover:text-rose-400",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/amirmohamadkarimian",
    href: siteConfig.github,
    hoverColor: "group-hover:bg-slate-600",
    hoverText: "group-hover:text-slate-400",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/amirmohammadkarimian",
    href: siteConfig.linkedin,
    hoverColor: "group-hover:bg-blue-600",
    hoverText: "group-hover:text-blue-400",
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@amirmohamadkarimian",
    href: siteConfig.telegram,
    hoverColor: "group-hover:bg-sky-500",
    hoverText: "group-hover:text-sky-400",
  },
];

/* ── Social Links (Footer / Hero) ──────────────────────────────────────── */
export const socialLinks: SocialLink[] = [
  { href: siteConfig.github, icon: GitHubIcon, label: "GitHub" },
  { href: siteConfig.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
  { href: siteConfig.telegram, icon: TelegramIcon, label: "Telegram" },
];

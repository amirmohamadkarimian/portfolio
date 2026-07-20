import type { NavLink, Project, SiteConfig, JourneyMilestone } from "./types";

/* ── Site Config ───────────────────────────────────────────────────────── */
export const siteConfig: SiteConfig = {
  name: "Amirmohamad Karimian",
  title: "Frontend Developer",
  subtitle:
    "I help teams ship polished, responsive web experiences with modern frontend tooling and thoughtful UX.",
  intro:
    "I build modern, fast, and user-friendly web applications using React, Next.js, and TypeScript.",
  email: "karimian.dev@gmail.com",
  github: "https://github.com/amirmohamadkarimian",
  linkedin: "https://linkedin.com/in/amirmohammadkarimian",
  telegram: "https://t.me/amirmohamadev",
  resume: "/resume.pdf",
  skills: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Motion UI"],
};

/* ── Navigation ────────────────────────────────────────────────────────── */
export const navLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
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

export const highlights: Highlight[] = [
  {
    title: "Performance-first apps",
    description:
      "Optimized React and Next.js experiences focused on fast loading, smooth interactions, and strong SEO.",
    icon: "Rocket",
  },
  {
    title: "Accessible design",
    description:
      "Interfaces built for everyone with thoughtful accessibility, responsive layouts, and clear visual hierarchy.",
    icon: "ShieldCheck",
  },
  {
    title: "Modern UI motion",
    description:
      "Subtle animations and polished micro-interactions that elevate brand trust without sacrificing usability.",
    icon: "Sparkles",
  },
  {
    title: "Component-driven scale",
    description:
      "Reusable, maintainable code patterns that make it easy to iterate and ship new features quickly.",
    icon: "Bolt",
  },
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
    description:
      "A responsive banking landing page featuring smooth scroll animations, modern UI components, and an interactive design built with vanilla web technologies.",
    image: "/projects/banky.png",
    technologies: ["HTML", "CSS", "JavaScript"],
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

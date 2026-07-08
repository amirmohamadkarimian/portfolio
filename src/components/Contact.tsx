import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { AnimatedSection } from "./AnimatedSection";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "./icons";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "from-rose-500 to-pink-500",
    bg: "bg-accent/10 group-hover:bg-rose-500",
    text: "group-hover:text-rose-400",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/amirmohamadkarimian",
    href: siteConfig.github,
    color: "from-slate-500 to-slate-700",
    bg: "bg-accent/10 group-hover:bg-slate-600",
    text: "group-hover:text-slate-400",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/amirmohammadkarimian",
    href: siteConfig.linkedin,
    color: "from-blue-500 to-blue-700",
    bg: "bg-accent/10 group-hover:bg-blue-600",
    text: "group-hover:text-blue-400",
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@amirmohamadkarimian",
    href: siteConfig.telegram,
    color: "from-sky-400 to-sky-600",
    bg: "bg-accent/10 group-hover:bg-sky-500",
    text: "group-hover:text-sky-400",
  },
];

export function Contact() {
  return (
    <AnimatedSection id="contact" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Work <span className="text-gradient">Together</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Have a project in mind or want to connect? I&apos;d love to hear
            from you. Reach out through any of the channels below.
          </p>

          {/* ── Available badge ──────────────────────────────────────── */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>
        </div>

        {/* ── Contact Cards ───────────────────────────────────────────── */}
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {contactMethods.map(
            ({ icon: Icon, label, value, href, bg, text }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-accent transition-all duration-300 ${bg} group-hover:text-white`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted">{label}</p>
                  <p
                    className={`truncate text-sm font-semibold text-foreground transition-colors ${text}`}
                  >
                    {value}
                  </p>
                </div>
                <span className="ml-auto translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-muted">
                  →
                </span>
              </a>
            ),
          )}
        </div>

        {/* ── CTA Button ──────────────────────────────────────────────── */}
        <div className="mt-12 text-center">
          <a
            href={`mailto:${siteConfig.email}`}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-8 text-sm font-semibold text-white bg-gradient-to-r from-accent via-accent-secondary to-accent transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Send Me an Email
            </span>
            <span className="absolute inset-0 z-0 translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

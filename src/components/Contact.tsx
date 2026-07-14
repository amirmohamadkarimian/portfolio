import { Mail } from "lucide-react";
import type { ComponentType } from "react";
import { siteConfig } from "@/lib/data";
import type { IconProps } from "@/lib/types";
import { AnimatedSection } from "./AnimatedSection";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "./icons";
import { SectionHeader } from "./ui/SectionHeader";

/* ── Contact Methods ───────────────────────────────────────────────────── */

interface ContactMethodItem {
  icon: ComponentType<IconProps>;
  label: string;
  value: string;
  href: string;
  hoverBg: string;
  hoverText: string;
}

const contactMethods: ContactMethodItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    hoverBg: "group-hover:bg-rose-500",
    hoverText: "group-hover:text-rose-400",
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/amirmohamadkarimian",
    href: siteConfig.github,
    hoverBg: "group-hover:bg-slate-600",
    hoverText: "group-hover:text-slate-400",
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/amirmohammadkarimian",
    href: siteConfig.linkedin,
    hoverBg: "group-hover:bg-blue-600",
    hoverText: "group-hover:text-blue-400",
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@amirmohamadev",
    href: siteConfig.telegram,
    hoverBg: "group-hover:bg-sky-500",
    hoverText: "group-hover:text-sky-400",
  },
];

/* ── Contact Section ───────────────────────────────────────────────────── */

export function Contact() {
  return (
    <AnimatedSection
      id="contact"
      className="border-t border-border bg-surface/30 px-6 py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="mb-12">
          <SectionHeader
            label="Contact"
            title="Let's Work"
            gradientWord="Together"
            description="Have a project in mind or want to connect? I'd love to hear from you. Reach out through any of the channels below."
            centered
          />

          {/* ── Available badge ──────────────────────────────────────── */}
          <div className="mt-6 flex justify-center">
            <div
              role="status"
              aria-label="Currently available for new opportunities"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </div>
          </div>
        </div>

        {/* ── Contact Cards ───────────────────────────────────────────── */}
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {contactMethods.map(
            ({ icon: Icon, label, value, href, hoverBg, hoverText }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  href.startsWith("mailto") ? undefined : "noopener noreferrer"
                }
                aria-label={`Contact via ${label}: ${value}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)]"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-all duration-300 ${hoverBg} group-hover:text-white`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-muted">{label}</p>
                  <p
                    className={`truncate text-sm font-semibold text-foreground transition-colors ${hoverText}`}
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

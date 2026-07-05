"use client";

import { ArrowUp, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { GitHubIcon, LinkedInIcon, TelegramIcon } from "./icons";

const socialLinks = [
  { href: siteConfig.github, icon: GitHubIcon, label: "GitHub" },
  { href: siteConfig.linkedin, icon: LinkedInIcon, label: "LinkedIn" },
  { href: `mailto:${siteConfig.email}`, icon: Mail, label: "Email" },
  { href: siteConfig.telegram, icon: TelegramIcon, label: "Telegram" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface/50">
      {/* Gradient divider glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-bold text-foreground">
            <span className="text-gradient">{siteConfig.name.split(" ")[0]}</span>
            {" "}{siteConfig.name.split(" ").slice(1).join(" ")}
          </p>
          <p className="mt-1 text-xs text-muted">
            © {year} All rights reserved. Built with Next.js &amp; ❤️
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted transition-all duration-300 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.12)] hover:-translate-y-0.5"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}

          {/* Back to top */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-all duration-300 hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.35)] hover:-translate-y-0.5"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

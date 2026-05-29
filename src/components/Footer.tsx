import { Mail } from "lucide-react";
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
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row lg:px-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm text-muted">
            © {year} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.12)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

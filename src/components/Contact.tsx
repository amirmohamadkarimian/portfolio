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
  },
  {
    icon: GitHubIcon,
    label: "GitHub",
    value: "github.com/amirmohamadkarimian",
    href: siteConfig.github,
  },
  {
    icon: LinkedInIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/amirmohamadkarimian",
    href: siteConfig.linkedin,
  },
  {
    icon: TelegramIcon,
    label: "Telegram",
    value: "@amirmohamadkarimian",
    href: siteConfig.telegram,
  },
];

export function Contact() {
  return (
    <AnimatedSection id="contact" className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">
            Contact
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s Work Together
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Have a project in mind or want to connect? I&apos;d love to hear from
            you. Reach out through any of the channels below.
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {contactMethods.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_4px_24px_rgba(99,102,241,0.1)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted">{label}</p>
                <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-accent">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            Send Me an Email
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

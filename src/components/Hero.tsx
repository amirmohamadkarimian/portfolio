import { ArrowDown, Download, Mail } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { GitHubIcon } from "./icons";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-72 w-72 rounded-full bg-accent-secondary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="animate-fade-in mb-4 text-sm font-medium uppercase tracking-widest text-accent">
          Hello, I&apos;m
        </p>

        <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {siteConfig.name}
        </h1>

        <p className="animate-fade-in-up mt-4 text-xl font-medium text-muted sm:text-2xl [animation-delay:100ms]">
          {siteConfig.title}
        </p>

        <p className="animate-fade-in-up mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg [animation-delay:200ms]">
          {siteConfig.intro}
        </p>

        <div className="animate-fade-in-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:300ms]">
          <a
            href="#projects"
            className="inline-flex h-12 min-w-[10.75rem] items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]"
          >
            View My Work
          </a>

          <a
            href="#contact"
            className="inline-flex h-12 min-w-[10.75rem] items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            Get In Touch
          </a>
        </div>

        <div className="animate-fade-in-up mt-10 flex items-center justify-center [animation-delay:400ms]">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
          >
            <GitHubIcon className="h-5 w-5 leading-none" />
          </a>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted transition-colors hover:text-accent"
      >
        <ArrowDown className="h-5 w-5" />
      </a>
    </section>
  );
}

"use client";

import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/data";
import { scrollToSection } from "@/lib/scrollTo";
import { ThemeToggle } from "./ThemeToggle";

/* ── Desktop NavLink ───────────────────────────────────────────────────── */

function DesktopNavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        onClick={(e) => scrollToSection(e, href)}
        className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "text-accent"
            : "text-muted hover:bg-surface hover:text-foreground"
        }`}
      >
        {label}
        {isActive && (
          <span
            className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
            style={{ animation: "slide-in-right 0.25s ease-out both" }}
          />
        )}
      </a>
    </li>
  );
}

/* ── Mobile NavLink ────────────────────────────────────────────────────── */

function MobileNavLink({
  href,
  label,
  isActive,
  onNavigate,
  index,
  mobileOpen,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onNavigate: () => void;
  index: number;
  mobileOpen: boolean;
}) {
  return (
    <li
      style={{ transitionDelay: mobileOpen ? `${index * 75 + 100}ms` : "0ms" }}
      className={`transition-[transform,opacity] duration-150 ease-out ${
        mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
      }`}
    >
      <a
        href={href}
        onClick={(e) => {
          scrollToSection(e, href);
          onNavigate();
        }}
        className={`group flex items-center gap-4 rounded-2xl px-5 py-4 text-lg font-medium transition-[transform,color,background-color] duration-150 active:scale-95 ${
          isActive
            ? "bg-accent/10 text-accent shadow-sm"
            : "text-foreground hover:bg-accent/5 hover:text-accent"
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full transition-[transform,background-color,box-shadow] duration-150 ${
            isActive
              ? "bg-accent scale-100 shadow-[0_0_8px_var(--accent-glow)]"
              : "bg-transparent scale-0 group-hover:bg-accent/50 group-hover:scale-100"
          }`}
        />
        {label}
      </a>
    </li>
  );
}

/* ── Navbar ────────────────────────────────────────────────────────────── */

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* scroll shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active-section tracker */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* lock body scroll + close on Escape / resize when drawer is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    if (!mobileOpen) {
      return () => {
        document.body.style.overflow = "";
      };
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-150 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="group flex items-center gap-1.5 text-lg font-bold tracking-tight transition-colors"
        >
          <span className="text-foreground transition-colors duration-150 group-hover:text-accent-secondary">
            {siteConfig.name.split(" ")[0]}
          </span>
        </a>

        {/* ── Desktop Nav ──────────────────────────────────────────── */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <DesktopNavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={activeSection === link.href.replace("#", "")}
            />
          ))}
        </ul>

        {/* ── Right side ───────────────────────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={siteConfig.resume}
            download
            className="hidden items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-2 text-sm font-medium text-accent transition-colors duration-150 hover:bg-accent/20 sm:inline-flex"
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Download CV</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            className="group relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-border bg-surface text-foreground transition-[transform,border-color,color] duration-150 hover:border-accent/40 hover:text-accent active:scale-95 md:hidden will-change-transform"
          >
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-150 ease-out ${
                mobileOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-150 ease-out ${
                mobileOpen ? "opacity-0 translate-x-2" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-5 rounded-full bg-current transition-[transform,opacity] duration-150 ease-out ${
                mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={closeMobile}
          aria-label="Close navigation menu"
          className={`fixed inset-0 top-16 z-40 bg-background/70 backdrop-blur-sm transition-[opacity,pointer-events] duration-150 ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        />

        <div
          id="mobile-navigation"
          className={`fixed right-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-[min(88vw,24rem)] flex-col border-l border-border/60 bg-surface/95 px-5 py-6 shadow-2xl shadow-black/10 backdrop-blur-md transition-transform duration-150 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <ul className="flex flex-1 flex-col gap-2">
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                isActive={activeSection === link.href.replace("#", "")}
                onNavigate={closeMobile}
                index={index}
                mobileOpen={mobileOpen}
              />
            ))}
          </ul>

          <a
            href={siteConfig.resume}
            download
            onClick={closeMobile}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition-colors duration-150 hover:bg-accent/20"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}

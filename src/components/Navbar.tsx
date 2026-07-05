"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active Section Tracker ──────────────────────────────────────── */
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
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-background/70 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <a
          href="#home"
          className="group flex items-center gap-1.5 text-lg font-bold tracking-tight transition-colors"
        >
          <span className="text-foreground transition-colors duration-300 group-hover:text-accent-secondary">
            {siteConfig.name.split(" ")[0]}
          </span>
        </a>

        {/* ── Desktop Nav ──────────────────────────────────────────── */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    isActive
                      ? "text-accent"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  }`}
                >
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary"
                      style={{ animation: "slide-in-right 0.25s ease-out both" }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Right side ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:border-accent/40 hover:text-accent md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-8">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition-colors ${
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-surface hover:text-accent"
                  }`}
                >
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}

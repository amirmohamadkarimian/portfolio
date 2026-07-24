"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useCallback } from "react";
import { flushSync } from "react-dom";

function applyThemeChange(callback: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !document.startViewTransition) {
    callback();
    return;
  }

  document.startViewTransition(() => {
    flushSync(callback);
  });
}

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  const toggleTheme = useCallback(() => {
    applyThemeChange(() => {
      setTheme(isDark ? "light" : "dark");
    });
  }, [isDark, setTheme]);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-surface/30 shadow-sm backdrop-blur-md focus:outline-none"
        disabled
      >
        <div className="h-5 w-5 rounded-full bg-muted/20 animate-pulse" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-surface/30 hover:bg-surface-elevated/60 border border-border/30 hover:border-border/80 shadow-sm backdrop-blur-sm transition-[transform,background-color,border-color,box-shadow] duration-150 active:scale-95 focus:outline-none will-change-transform"
    >
      <Sun
        strokeWidth={1.5}
        className={`absolute h-5 w-5 transition-[transform,opacity] duration-150 ease-out ${
          isDark
            ? "rotate-90 scale-0 opacity-0 text-muted-foreground"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
      />

      <Moon
        strokeWidth={1.5}
        className={`absolute h-5 w-5 transition-[transform,opacity] duration-150 ease-out ${
          isDark
            ? "rotate-0 scale-100 opacity-100 text-indigo-400"
            : "-rotate-90 scale-0 opacity-0 text-muted-foreground"
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
});

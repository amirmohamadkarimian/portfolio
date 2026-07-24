"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, memo, useCallback } from "react";

export const ThemeToggle = memo(function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/30 bg-surface/30 shadow-sm backdrop-blur-md focus:outline-none"
        disabled
      >
        <div className="h-5 w-5 rounded-full bg-muted/20" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-surface/30 hover:bg-surface-elevated/60 border border-border/30 hover:border-border/80 shadow-sm backdrop-blur-sm transition-[background-color,border-color,box-shadow] duration-150 focus:outline-none"
    >
      {isDark ? (
        <Moon strokeWidth={1.5} className="h-5 w-5 text-indigo-400" />
      ) : (
        <Sun strokeWidth={1.5} className="h-5 w-5 text-amber-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
});

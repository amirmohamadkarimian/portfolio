import type { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  gradientWord: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  gradientWord,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p className="text-sm font-medium uppercase tracking-widest text-accent">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title} <span className="text-gradient">{gradientWord}</span>
      </h2>
      {description && (
        <p
          className={`mt-4 text-muted ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

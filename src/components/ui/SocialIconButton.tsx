import type { ComponentType } from "react";
import type { IconProps } from "@/lib/types";

interface SocialIconButtonProps {
  href: string;
  icon: ComponentType<IconProps>;
  label: string;
  size?: "sm" | "md";
}

export function SocialIconButton({
  href,
  icon: Icon,
  label,
  size = "md",
}: SocialIconButtonProps) {
  const isMailto = href.startsWith("mailto");
  const dims = size === "sm" ? "h-10 w-10" : "h-11 w-11";
  const iconDims = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      aria-label={label}
      className={`inline-flex ${dims} items-center justify-center rounded-full border border-border bg-surface text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/5 hover:text-accent hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]`}
    >
      <Icon className={iconDims} />
    </a>
  );
}

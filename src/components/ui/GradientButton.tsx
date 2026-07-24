import type { ReactNode } from "react";

interface GradientButtonProps {
  href: string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  download?: boolean;
  className?: string;
}

export function GradientButton({
  href,
  children,
  onClick,
  download,
  className = "",
}: GradientButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      download={download || undefined}
      className={`btn-shimmer group relative inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-accent via-accent-secondary to-accent px-8 text-sm font-semibold text-white transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] active:scale-[0.98] ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}

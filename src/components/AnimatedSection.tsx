"use client";

import { type ReactNode } from "react";
import { ScrollReveal, type AnimationDirection } from "./ScrollReveal";

type AnimatedSectionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: AnimationDirection;
  blur?: boolean;
  distance?: string | number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  id?: string;
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 700,
  direction = "up",
  blur = true,
  distance = "32px",
  once = true,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  id,
}: AnimatedSectionProps) {
  return (
    <ScrollReveal
      as="section"
      id={id}
      direction={direction}
      delay={delay}
      duration={duration}
      blur={blur}
      distance={distance}
      once={once}
      threshold={threshold}
      rootMargin={rootMargin}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
}


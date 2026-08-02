"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
} from "react";

export type AnimationDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoom-in"
  | "zoom-out"
  | "flip-up"
  | "fade";

export interface ScrollRevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  distance?: string | number;
  blur?: boolean;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  easing?: string;
  className?: string;
  id?: string;
}

/**
 * Custom hook to manage intersection observation for scroll animations.
 */
export function useScrollReveal({
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
}: {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, threshold, rootMargin]);

  return { ref, isVisible };
}

/**
 * Enhanced ScrollReveal Component with smooth physics, directional effects,
 * soft progressive blur, and accessibility support.
 */
export function ScrollReveal({
  children,
  as: Component = "div",
  direction = "up",
  delay = 0,
  duration = 700,
  distance = "28px",
  blur = true,
  once = true,
  threshold = 0.12,
  rootMargin = "0px 0px -50px 0px",
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  className = "",
  id,
  style,
  ...restProps
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ once, threshold, rootMargin });

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1) rotateX(0deg)";

    const distVal = typeof distance === "number" ? `${distance}px` : distance;

    switch (direction) {
      case "up":
        return `translate3d(0, ${distVal}, 0)`;
      case "down":
        return `translate3d(0, -${distVal}, 0)`;
      case "left":
        return `translate3d(-${distVal}, 0, 0)`;
      case "right":
        return `translate3d(${distVal}, 0, 0)`;
      case "zoom-in":
        return "scale(0.92)";
      case "zoom-out":
        return "scale(1.08)";
      case "flip-up":
        return `perspective(1000px) rotateX(16deg) translate3d(0, ${distVal}, 0)`;
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
    transitionDelay: `${delay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <Component
      id={id}
      ref={ref}
      className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none ${className}`}
      style={computedStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Stagger Container Context & Components
 * ───────────────────────────────────────────────────────────────────────── */

interface ScrollRevealContextType {
  isVisible: boolean;
  stagger: number;
  baseDelay: number;
}

const ScrollRevealContext = createContext<ScrollRevealContextType>({
  isVisible: false,
  stagger: 80,
  baseDelay: 0,
});

export interface ScrollRevealContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  stagger?: number;
  baseDelay?: number;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  id?: string;
}

export function ScrollRevealContainer({
  children,
  as: Component = "div",
  stagger = 80,
  baseDelay = 0,
  once = true,
  threshold = 0.1,
  rootMargin = "0px 0px -40px 0px",
  className = "",
  id,
  ...restProps
}: ScrollRevealContainerProps) {
  const { ref, isVisible } = useScrollReveal({ once, threshold, rootMargin });

  return (
    <ScrollRevealContext.Provider value={{ isVisible, stagger, baseDelay }}>
      <Component id={id} ref={ref} className={className} {...restProps}>
        {children}
      </Component>
    </ScrollRevealContext.Provider>
  );
}

export interface ScrollRevealItemProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  index: number;
  direction?: AnimationDirection;
  duration?: number;
  distance?: string | number;
  blur?: boolean;
  easing?: string;
  className?: string;
}

export function ScrollRevealItem({
  children,
  as: Component = "div",
  index,
  direction = "up",
  duration = 650,
  distance = "24px",
  blur = true,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  className = "",
  style,
  ...restProps
}: ScrollRevealItemProps) {
  const { isVisible, stagger, baseDelay } = useContext(ScrollRevealContext);
  const calculatedDelay = baseDelay + index * stagger;

  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1) rotateX(0deg)";

    const distVal = typeof distance === "number" ? `${distance}px` : distance;

    switch (direction) {
      case "up":
        return `translate3d(0, ${distVal}, 0)`;
      case "down":
        return `translate3d(0, -${distVal}, 0)`;
      case "left":
        return `translate3d(-${distVal}, 0, 0)`;
      case "right":
        return `translate3d(${distVal}, 0, 0)`;
      case "zoom-in":
        return "scale(0.92)";
      case "zoom-out":
        return "scale(1.08)";
      case "flip-up":
        return `perspective(1000px) rotateX(14deg) translate3d(0, ${distVal}, 0)`;
      case "fade":
      default:
        return "translate3d(0, 0, 0)";
    }
  };

  const computedStyle: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
    transitionDelay: `${calculatedDelay}ms`,
    willChange: isVisible ? "auto" : "opacity, transform",
  };

  return (
    <Component
      className={`motion-reduce:!transform-none motion-reduce:!opacity-100 motion-reduce:!transition-none ${className}`}
      style={computedStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
}

import { useEffect, useRef } from "react";

/**
 * Creates a mouse-following radial glow that fades in on hover
 * and out on mouse leave.
 *
 * Attach `containerRef` to the bounding element and `glowRef`
 * to the glow `<div>`.
 */
export function useMouseGlow() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow) return;

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
      glow.style.opacity = "1";
    };

    const handleLeave = () => {
      glow.style.opacity = "0";
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return { containerRef, glowRef };
}

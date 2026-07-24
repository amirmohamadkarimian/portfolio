import { useEffect, useRef } from "react";

/**
 * Creates a mouse-following radial glow that fades in on hover
 * and out on mouse leave.
 *
 * Uses requestAnimationFrame to batch DOM writes and avoid
 * forced reflows from interleaved reads/writes.
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

    let rafId = 0;
    let targetX = -9999;
    let targetY = -9999;
    let visible = false;
    let scheduled = false;

    /* Batch all DOM writes into a single rAF callback */
    const flush = () => {
      scheduled = false;
      if (visible) {
        glow.style.transform = `translate(${targetX - 200}px, ${targetY - 200}px)`;
        glow.style.opacity = "1";
      } else {
        glow.style.opacity = "0";
      }
    };

    const scheduleFlush = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(flush);
      }
    };

    /* Read layout (getBoundingClientRect) only here, write nothing */
    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      visible = true;
      scheduleFlush();
    };

    const handleLeave = () => {
      visible = false;
      scheduleFlush();
    };

    container.addEventListener("mousemove", handleMove, { passive: true });
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return { containerRef, glowRef };
}

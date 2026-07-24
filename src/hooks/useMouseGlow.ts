import { useEffect, useRef } from "react";

/**
 * Creates a mouse-following radial glow that fades in on hover
 * and out on mouse leave.
 *
 * Uses requestAnimationFrame to batch layout reads and DOM writes,
 * avoiding forced reflows from interleaved getBoundingClientRect calls
 * on every mousemove event.
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
    let clientX = -9999;
    let clientY = -9999;
    let visible = false;
    let scheduled = false;

    /* Batch layout read + DOM writes into a single rAF callback */
    const flush = () => {
      scheduled = false;
      if (visible) {
        const rect = container.getBoundingClientRect();
        glow.style.transform = `translate(${clientX - rect.left - 200}px, ${clientY - rect.top - 200}px)`;
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

    const handleMove = (e: MouseEvent) => {
      clientX = e.clientX;
      clientY = e.clientY;
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

"use client";

import { useEffect, useRef, useCallback } from "react";

/* ── Types ────────────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  /** Base hue for the particle glow (degrees) */
  hue: number;
}

interface GradientOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  saturation: number;
  opacity: number;
}

/* ── Constants ────────────────────────────────────────────────────────── */

const PARTICLE_COUNT = 60;
const ORB_COUNT = 4;
const CONNECTION_DISTANCE = 140;
const MOUSE_ATTRACTION_RADIUS = 200;
const MOUSE_ATTRACTION_FORCE = 0.012;

const REDUCED_PARTICLE_COUNT = 24;
const REDUCED_ORB_COUNT = 2;

/* ── Helpers ──────────────────────────────────────────────────────────── */

function createParticle(w: number, h: number): Particle {
  const hueBase = 230 + Math.random() * 40; // indigo → violet range
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    radius: Math.random() * 1.8 + 0.6,
    opacity: Math.random() * 0.5 + 0.2,
    hue: hueBase,
  };
}

function createOrb(w: number, h: number): GradientOrb {
  const hueBase = 230 + Math.random() * 50;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    radius: Math.random() * 180 + 120,
    hue: hueBase,
    saturation: 60 + Math.random() * 30,
    opacity: 0.04 + Math.random() * 0.04,
  };
}

/* ── Component ────────────────────────────────────────────────────────── */

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animIdRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particleCount = prefersReducedMotion ? REDUCED_PARTICLE_COUNT : PARTICLE_COUNT;
    const orbCount = prefersReducedMotion ? REDUCED_ORB_COUNT : ORB_COUNT;

    /* ── Size canvas to viewport ──────────────────────────────────── */
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Mouse tracking ──────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    /* ── Create entities ─────────────────────────────────────────── */
    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle(w, h)
    );
    const orbs: GradientOrb[] = Array.from({ length: orbCount }, () =>
      createOrb(w, h)
    );

    /* ── Pre-render Gradient Orbs for Performance ────────────────── */
    const orbCanvases = orbs.map((orb) => {
      const renderOrbCanvas = (isDarkTheme: boolean) => {
        const oCanvas = document.createElement("canvas");
        oCanvas.width = orb.radius * 2;
        oCanvas.height = orb.radius * 2;
        const oCtx = oCanvas.getContext("2d");
        if (oCtx) {
          const grad = oCtx.createRadialGradient(
            orb.radius, orb.radius, 0,
            orb.radius, orb.radius, orb.radius
          );
          const alpha = isDarkTheme ? orb.opacity : orb.opacity * 0.6;
          grad.addColorStop(0, `hsla(${orb.hue}, ${orb.saturation}%, ${isDarkTheme ? 60 : 50}%, ${alpha})`);
          grad.addColorStop(1, "transparent");
          oCtx.fillStyle = grad;
          oCtx.fillRect(0, 0, orb.radius * 2, orb.radius * 2);
        }
        return oCanvas;
      };
      
      return {
        light: renderOrbCanvas(false),
        dark: renderOrbCanvas(true),
      };
    });

    /* ── Detect dark mode ────────────────────────────────────────── */
    const isDark = () => document.documentElement.classList.contains("dark");

    /* ── Animation loop ──────────────────────────────────────────── */
    const loop = () => {
      const dark = isDark();
      ctx.clearRect(0, 0, w, h);

      /* ── Draw ambient gradient orbs ────────────────────────────── */
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = w + orb.radius;
        if (orb.x > w + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = h + orb.radius;
        if (orb.y > h + orb.radius) orb.y = -orb.radius;

        const cachedCanvas = dark ? orbCanvases[i].dark : orbCanvases[i].light;
        ctx.drawImage(cachedCanvas, orb.x - orb.radius, orb.y - orb.radius);
      }

      /* ── Update & draw particles ───────────────────────────────── */
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseRadSq = MOUSE_ATTRACTION_RADIUS * MOUSE_ATTRACTION_RADIUS;
      const connectionLimitSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

      for (const p of particles) {
        if (!prefersReducedMotion) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            p.vx += (dx / dist) * MOUSE_ATTRACTION_FORCE;
            p.vy += (dy / dist) * MOUSE_ATTRACTION_FORCE;
          }
        }

        p.vx *= 0.998;
        p.vy *= 0.998;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const light = dark ? 75 : 45;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${light}%, ${p.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, ${light}%, ${p.opacity * 0.15})`;
        ctx.fill();
      }

      /* ── Draw connections ──────────────────────────────────────── */
      const connectionLight = dark ? 70 : 40;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectionLimitSq) {
            const alpha = (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE) * 0.15;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${(a.hue + b.hue) / 2}, 70%, ${connectionLight}%, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      /* ── Mouse proximity connections ───────────────────────────── */
      if (!prefersReducedMotion && mx > 0 && my > 0) {
        ctx.lineWidth = 0.8;
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadSq) {
            const alpha = (1 - Math.sqrt(distSq) / MOUSE_ATTRACTION_RADIUS) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.strokeStyle = `hsla(${p.hue}, 80%, ${connectionLight}%, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animIdRef.current = requestAnimationFrame(loop);
    };

    animIdRef.current = requestAnimationFrame(loop);

    /* ── Cleanup ─────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cleanup = draw();
    return cleanup;
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

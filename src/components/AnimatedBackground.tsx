"use client";

import { memo, useEffect, useRef } from "react";

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

export const AnimatedBackground = memo(function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const mouseTargetRef = useRef({ x: -9999, y: -9999 });
  const animIdRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── One-time checks (not per-frame) ──────────────────────────── */
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let isSmall = window.innerWidth < 900;
    let particleCount = prefersReducedMotion
      ? REDUCED_PARTICLE_COUNT
      : isSmall
        ? Math.max(28, Math.floor(PARTICLE_COUNT * 0.6))
        : PARTICLE_COUNT;
    const orbCount = prefersReducedMotion
      ? REDUCED_ORB_COUNT
      : isSmall
        ? Math.max(1, Math.floor(ORB_COUNT * 0.5))
        : ORB_COUNT;

    /* ── Size canvas to viewport ──────────────────────────────────── */
    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);

    const applySize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    applySize();

    /* Debounced resize — re-apply size, update isSmall */
    let resizeTimer = 0;
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applySize();
        isSmall = window.innerWidth < 900;
        particleCount = prefersReducedMotion
          ? REDUCED_PARTICLE_COUNT
          : isSmall
            ? Math.max(28, Math.floor(PARTICLE_COUNT * 0.6))
            : PARTICLE_COUNT;
      }, 100);
    };
    window.addEventListener("resize", resize, { passive: true });

    /* ── Mouse tracking ──────────────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseTargetRef.current.x = e.clientX;
      mouseTargetRef.current.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouseTargetRef.current.x = -9999;
      mouseTargetRef.current.y = -9999;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    /* ── Create entities ─────────────────────────────────────────── */
    const particles: Particle[] = Array.from({ length: particleCount }, () =>
      createParticle(w, h),
    );
    const orbs: GradientOrb[] = Array.from({ length: orbCount }, () =>
      createOrb(w, h),
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
            orb.radius,
            orb.radius,
            0,
            orb.radius,
            orb.radius,
            orb.radius,
          );
          const alpha = isDarkTheme ? orb.opacity : orb.opacity * 0.6;
          grad.addColorStop(
            0,
            `hsla(${orb.hue}, ${orb.saturation}%, ${isDarkTheme ? 60 : 50}%, ${alpha})`,
          );
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

    /* ── Visibility / pause control ───────────────────────────────
       Stops the rAF loop entirely when the tab is hidden, so we
       burn zero CPU/battery in background tabs. */
    let isRunning = false;

    /* ── Frame-skip for physics ───────────────────────────────────
       Redraw every rAF (smooth), but only advance particle/orb
       physics and the O(n^2) connection pass every other frame.
       Halves the heaviest work without visible quality loss. */
    let frameCount = 0;

    const TAU = Math.PI * 2;
    const connectionLimitSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
    const mouseRadSq = MOUSE_ATTRACTION_RADIUS * MOUSE_ATTRACTION_RADIUS;

    const loop = () => {
      if (!isRunning) return;

      const dark = isDark();
      const shouldStepPhysics = frameCount % 2 === 0;
      frameCount++;

      ctx.clearRect(0, 0, w, h);

      /* Smooth mouse updates */
      mouseRef.current.x +=
        (mouseTargetRef.current.x - mouseRef.current.x) * 0.22;
      mouseRef.current.y +=
        (mouseTargetRef.current.y - mouseRef.current.y) * 0.22;

      /* ── Draw ambient gradient orbs ─────────────────────────────── */
      for (let i = 0; i < orbs.length; i++) {
        const orb = orbs[i];
        if (shouldStepPhysics) {
          orb.x += orb.vx * 2;
          orb.y += orb.vy * 2;
          if (orb.x < -orb.radius) orb.x = w + orb.radius;
          if (orb.x > w + orb.radius) orb.x = -orb.radius;
          if (orb.y < -orb.radius) orb.y = h + orb.radius;
          if (orb.y > h + orb.radius) orb.y = -orb.radius;
        }

        const cachedCanvas = dark ? orbCanvases[i].dark : orbCanvases[i].light;
        ctx.drawImage(cachedCanvas, orb.x - orb.radius, orb.y - orb.radius);
      }

      /* ── Update & draw particles — batched per style pass ────────
         Pass 1: solid core dots (all same style per dark/light)
         Pass 2: soft glow halos (all same style per dark/light)
         This replaces N×2 beginPath/fill calls with 2 beginPath/fill
         calls at the cost of grouped per-particle fillStyle strings.
         We use a Map to batch by fillStyle. */

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const light = dark ? 75 : 45;

      /* Advance physics for all particles first */
      if (shouldStepPhysics) {
        for (const p of particles) {
          if (!prefersReducedMotion) {
            const dx = mx - p.x;
            const dy = my - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < mouseRadSq && distSq > 1) {
              const dist = Math.sqrt(distSq);
              p.vx += (dx / dist) * MOUSE_ATTRACTION_FORCE * 2;
              p.vy += (dy / dist) * MOUSE_ATTRACTION_FORCE * 2;
            }
          }

          p.vx *= 0.998;
          p.vy *= 0.998;
          p.x += p.vx * 2;
          p.y += p.vy * 2;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }
      }

      /* Batch draw: group particles by their fillStyle to minimise
         ctx.fillStyle reassignments. Core dots first. */
      const coreBuckets = new Map<string, Particle[]>();
      const glowBuckets = new Map<string, Particle[]>();

      for (const p of particles) {
        const coreStyle = `hsla(${p.hue}, 80%, ${light}%, ${p.opacity})`;
        const glowStyle = `hsla(${p.hue}, 80%, ${light}%, ${(p.opacity * 0.15).toFixed(3)})`;

        let bucket = coreBuckets.get(coreStyle);
        if (!bucket) { bucket = []; coreBuckets.set(coreStyle, bucket); }
        bucket.push(p);

        let gBucket = glowBuckets.get(glowStyle);
        if (!gBucket) { gBucket = []; glowBuckets.set(glowStyle, gBucket); }
        gBucket.push(p);
      }

      for (const [style, ps] of coreBuckets) {
        ctx.fillStyle = style;
        ctx.beginPath();
        for (const p of ps) ctx.arc(p.x, p.y, p.radius, 0, TAU);
        ctx.fill();
      }

      for (const [style, ps] of glowBuckets) {
        ctx.fillStyle = style;
        ctx.beginPath();
        for (const p of ps) ctx.arc(p.x, p.y, p.radius * 3, 0, TAU);
        ctx.fill();
      }

      /* ── Draw connections ───────────────────────────────────────── */
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

      /* ── Mouse proximity connections ────────────────────────────── */
      if (!prefersReducedMotion && mx > 0 && my > 0) {
        ctx.lineWidth = 0.8;
        for (const p of particles) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouseRadSq) {
            const alpha =
              (1 - Math.sqrt(distSq) / MOUSE_ATTRACTION_RADIUS) * 0.25;
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

    const start = () => {
      if (isRunning) return;
      isRunning = true;
      animIdRef.current = requestAnimationFrame(loop);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animIdRef.current);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!document.hidden) start();

    /* ── Cleanup ─────────────────────────────────────────────────── */
    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.7 }}
    />
  );
});

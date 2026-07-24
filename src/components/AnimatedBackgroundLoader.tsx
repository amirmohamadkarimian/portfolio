"use client";

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(
  () =>
    import("@/components/AnimatedBackground").then(
      (m) => m.AnimatedBackground,
    ),
  { ssr: false },
);

export function AnimatedBackgroundLoader() {
  return <AnimatedBackground />;
}

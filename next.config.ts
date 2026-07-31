import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Explicitly tree-shake lucide-react to only the icons used in the project.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // compress: true is the default — no need to declare it.
  poweredByHeader: false,
};

export default nextConfig;

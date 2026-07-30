import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // lucide-react is already in Next.js's built-in optimizePackageImports list.
  // compress: true is the default — no need to declare it.
  poweredByHeader: false,
};

export default nextConfig;

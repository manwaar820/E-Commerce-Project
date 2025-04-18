import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  eslint: {
    // ✅ Option 1: Skip linting during build (use if test code isn't production-relevant)
    ignoreDuringBuilds: true,

    // ✅ Option 2: Only lint src/components and pages, NOT __tests__
    // dirs: ['src/components', 'src/pages'],
  },
};

export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Serve images directly from public directory to ensure immediate updates without stale caching
  },
};

export default nextConfig;

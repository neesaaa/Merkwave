import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Commented out to allow API routes to work
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  // Suppress hydration warnings caused by browser extensions
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;

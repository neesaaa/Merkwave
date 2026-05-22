import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Static export for CDN / Nginx hosting
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export
    qualities: [75],   // reduced from 85 → smaller files, still crisp
  },
  reactStrictMode: true,
  poweredByHeader: false, // removes X-Powered-By header (minor security + bytes)
  compress: true,         // gzip/brotli for JS/CSS responses in next start
  // Suppress hydration warnings caused by browser extensions
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"], // tree-shake large packages
  },
};

export default nextConfig;

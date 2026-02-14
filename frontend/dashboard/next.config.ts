import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5070",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "7073",
      },
    ],
  },
};

export default nextConfig;

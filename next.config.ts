import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/ecommerce",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
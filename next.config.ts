import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_URI || "your-prod-domain.com",

      },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_LOCAL_IMAGE_URI || "your-local-uri",
      },
    ],
  },
};

export default nextConfig;

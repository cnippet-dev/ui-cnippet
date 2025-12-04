import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      }
    ]
  }
};

export default withMDX(nextConfig);
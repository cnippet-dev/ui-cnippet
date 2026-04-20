import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.cnippet.dev",
        protocol: "https",
      },
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withMDX(nextConfig);

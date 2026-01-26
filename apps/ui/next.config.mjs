import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);

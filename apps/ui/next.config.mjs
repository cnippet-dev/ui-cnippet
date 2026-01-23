import { createMDX } from "fumadocs-mdx/next";
import fixSourcePaths from "./scripts/fix-source-paths.mjs";

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
const withFixPaths = fixSourcePaths();

export default withFixPaths(withMDX(nextConfig));

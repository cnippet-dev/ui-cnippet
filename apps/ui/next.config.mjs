import { createMDX } from "fumadocs-mdx/next";
import fixSourcePaths from "./scripts/fix-source-paths.mjs"

/** @type {import('next').NextConfig} */

const nextConfig = {
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

const withMDX = createMDX({});
const withFixPaths = fixSourcePaths()


export default withFixPaths(withMDX(nextConfig));
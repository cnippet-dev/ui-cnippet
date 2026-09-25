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
  redirects: async () => [
    {
      destination: "/motion/text-animations/text-reveal",
      permanent: false,
      source: "/motion",
    },
  ],
  // `/ui/data/accordion.md` → markdown version of the page for LLMs.
  rewrites: async () =>
    ["ui", "docs", "motion"].map((section) => ({
      destination: `/llms.mdx/${section}/:path*`,
      source: `/${section}/:path*.md`,
    })),
};

export default withMDX(nextConfig);

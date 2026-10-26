import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // Dev-only: streamed responses through Next's gzip trigger a
  // MaxListenersExceededWarning. Production keeps compression.
  compress: process.env.NODE_ENV === "production",
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
    {
      destination: "/charts/foundation/chart",
      permanent: false,
      source: "/charts",
    },
    // The chart primitive's docs moved from core to the charts section.
    {
      destination: "/charts/foundation/chart",
      permanent: true,
      source: "/ui/data/chart",
    },
  ],
  // `/ui/data/accordion.md` → markdown version of the page for LLMs.
  rewrites: async () =>
    ["ui", "docs", "motion", "charts"].map((section) => ({
      destination: `/llms.mdx/${section}/:path*`,
      source: `/${section}/:path*.md`,
    })),
};

export default withMDX(nextConfig);

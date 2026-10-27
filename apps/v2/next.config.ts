import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // Dev-only: streamed responses through Next's gzip trigger a
  // MaxListenersExceededWarning. Production keeps compression.
  compress: process.env.NODE_ENV === "production",
  // Registry JSON and markdown copies stay crawlable (shadcn CLI, LLMs) but out of the index.
  headers: async () =>
    [
      "/r/:path*",
      "/llms.mdx/:path*",
      "/:section(ui|docs|motion|charts)/:path*.md",
    ].map((source) => ({
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      source,
    })),
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
    // Old URLs Search Console reports as 404 (some are crawled from demo hrefs).
    { destination: "/docs/introduction", permanent: true, source: "/docs" },
    { destination: "/docs/theming", permanent: true, source: "/docs/styling" },
    {
      destination:
        "https://github.com/cnippet-dev/ui-cnippet/blob/main/LICENSE",
      permanent: true,
      source: "/license",
    },
    { destination: "/motion", permanent: true, source: "/mo" },
    { destination: "/", permanent: true, source: "/forgot-password" },
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

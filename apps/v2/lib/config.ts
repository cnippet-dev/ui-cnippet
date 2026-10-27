export const appConfig = {
  description:
    "A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.",
  name: "cnippet ui",
  navItems: [
    {
      href: "/docs/introduction",
      label: "Docs",
    },
    {
      href: "/explore",
      label: "Explore",
    },
    {
      href: "/playground",
      label: "Playground",
    },
    {
      href: "/themes",
      label: "Themes",
    },
  ],
  ogImage: "https://ui.cnippet.dev/opengraph-image.png",
  url: "https://ui.cnippet.dev/",
};

// Spread into every page's `twitter` metadata: a page's object replaces the layout's.
export const twitterBase = {
  card: "summary_large_image" as const,
  creator: "@cnippet_dev",
  images: ["/twitter-image.png"],
};

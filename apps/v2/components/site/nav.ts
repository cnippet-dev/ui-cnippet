export type NavLink = {
  description?: string;
  href: string;
  label: string;
};

export type NavGroup = { items: NavLink[]; label: string; match: string[] };

export type NavItem = NavGroup | (NavLink & { match: string[] });

export const NAV_ITEMS: NavItem[] = [
  {
    items: [
      {
        description: "97 copy-paste component variants",
        href: "/explore?section=core",
        label: "Components",
      },
      {
        description: "40+ text and scroll animations",
        href: "/explore?section=text+animations",
        label: "Motion",
      },
    ],
    label: "Explore",
    match: ["/explore"],
  },
  {
    items: [
      {
        description: "Introduction, install, theming",
        href: "/docs/introduction",
        label: "Guides",
      },
      {
        description: "API reference for every component",
        href: "/ui/actions/button",
        label: "Core components",
      },
      {
        description: "API reference for motion variants",
        href: "/motion/text-animations/text-reveal",
        label: "Motion components",
      },
    ],
    label: "Docs",
    match: ["/docs", "/ui", "/motion"],
  },
  { href: "/themes", label: "Themes", match: ["/themes"] },
  { href: "/playground", label: "Playground", match: ["/playground"] },
];

export const GITHUB_URL = "https://github.com/cnippet-dev/ui-cnippet";

export function isActive(pathname: string, match: string[]) {
  return match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

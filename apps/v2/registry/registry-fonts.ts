import type { Registry } from "shadcn/schema";

export const fonts: Registry["items"] = [
  {
    name: "fonts",
    type: "registry:ui",
    registryDependencies: [
      "@coss/font-sans",
      "@coss/font-heading",
      "@coss/font-mono",
    ],
    files: [],
  },
  {
    name: "font-sans",
    type: "registry:font",
    font: {
      family: "'Inter', sans-serif",
      import: "Inter",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-sans",
      dependency: "@fontsource-variable/inter",
    },
  },
  {
    name: "font-heading",
    type: "registry:font",
    font: {
      family: "'Inter', sans-serif",
      import: "Inter",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-heading",
      dependency: "@fontsource-variable/inter",
    },
  },
  {
    name: "font-mono",
    type: "registry:font",
    font: {
      family: "'Geist Mono', monospace",
      import: "Geist_Mono",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-mono",
      dependency: "geist",
    },
  },
];

import type { Registry } from "shadcn/schema";

export const fonts: Registry["items"] = [
  {
    files: [],
    name: "fonts",
    registryDependencies: [
      "@coss/font-sans",
      "@coss/font-heading",
      "@coss/font-mono",
    ],
    type: "registry:ui",
  },
  {
    font: {
      dependency: "@fontsource-variable/inter",
      family: "'Inter', sans-serif",
      import: "Inter",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-sans",
    },
    name: "font-sans",
    type: "registry:font",
  },
  {
    font: {
      dependency: "@fontsource-variable/inter",
      family: "'Inter', sans-serif",
      import: "Inter",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-heading",
    },
    name: "font-heading",
    type: "registry:font",
  },
  {
    font: {
      dependency: "geist",
      family: "'Geist Mono', monospace",
      import: "Geist_Mono",
      provider: "google",
      subsets: ["latin"],
      variable: "--font-mono",
    },
    name: "font-mono",
    type: "registry:font",
  },
];

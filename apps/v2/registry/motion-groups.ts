import type { RegistryCategory } from "./registry-categories";
import { motionComponents } from "./registry-motion";

// `id` is the folder under content/motion/ and the /motion/<id>/<slug> URL
// segment; `category` is the group category a component lists in
// registry-motion.ts. Order here is display order.
export const motionGroups = [
  {
    category: "text animation",
    id: "text-animations",
    label: "Text Animations",
  },
  {
    category: "scroll animation",
    id: "scroll-animations",
    label: "Scroll Animations",
  },
  {
    category: "hover animation",
    id: "hover-animations",
    label: "Hover & Interaction",
  },
  {
    category: "layout animation",
    id: "layout-animations",
    label: "Layout & Transitions",
  },
  { category: "marquee animation", id: "marquee", label: "Marquee" },
  { category: "background animation", id: "backgrounds", label: "Backgrounds" },
  { category: "navigation animation", id: "navigation", label: "Navigation" },
  { category: "carousel animation", id: "carousels", label: "Carousels" },
  { category: "physics animation", id: "physics", label: "Physics" },
  {
    category: "image animation",
    id: "image-animations",
    label: "Image & Media",
  },
  { category: "svg animation", id: "svg-animations", label: "SVG & Paths" },
  {
    category: "filter effect",
    id: "filter-effects",
    label: "Filters & Shaders",
  },
  { category: "button animation", id: "buttons", label: "Buttons & Micro" },
  { category: "block animation", id: "blocks", label: "Blocks" },
] as const satisfies readonly {
  id: string;
  label: string;
  category: RegistryCategory;
}[];

export type MotionGroup = (typeof motionGroups)[number];

// A component lists several categories (e.g. text + hover); it belongs to the
// first group, in motionGroups order, whose category it lists.
export function motionGroupOf(componentName: string): MotionGroup | undefined {
  const cats: string[] =
    motionComponents.find((c) => c.name === componentName)?.categories ?? [];
  return motionGroups.find((g) => cats.includes(g.category));
}

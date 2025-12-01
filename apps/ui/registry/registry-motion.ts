import type { Registry } from "shadcn/schema";

export const motion: Registry["items"] = [
  {
    dependencies: ["motion"],
    files: [
      {
        path: "motion/horizontal-scroll.tsx",
        type: "registry:ui",
      },
    ],
    name: "horizontal-scroll",
    type: "registry:ui",
  },
];

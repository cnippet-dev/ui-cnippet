import type { Registry } from "shadcn/schema";

export const motion: Registry["items"] = [
  {
    dependencies: ["motion"],
    files: [
      {
        path: "motion/animated-number.tsx",
        type: "registry:ui",
      },
    ],
    name: "animated-number",
    type: "registry:ui",
  },
  {
    dependencies: ["motion", "react-use-measure"],
    files: [
      {
        path: "motion/sliding-number.tsx",
        type: "registry:ui",
      },
    ],
    name: "sliding-number",
    type: "registry:ui",
  },
];

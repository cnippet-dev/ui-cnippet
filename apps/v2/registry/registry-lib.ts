import type { Registry } from "shadcn/schema";

export const lib: Registry["items"] = [
  {
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
    name: "utils",
    type: "registry:lib",
  },
  {
    description:
      "Number and date formatters plus buildChartConfig, shared by chart components",
    files: [
      {
        path: "lib/chart-utils.ts",
        type: "registry:lib",
      },
    ],
    name: "chart-utils",
    registryDependencies: ["@cnippet/chart"],
    type: "registry:lib",
  },
];

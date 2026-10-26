import type { Registry } from "shadcn/schema";
import type { RegistryCategory } from "./registry-categories";

type ChartItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

function createChart(options: {
  name: string;
  description: string;
  categories: RegistryCategory[];
  dependencies?: string[];
  registryDependencies?: string[];
}): ChartItem {
  const dependencies = options.dependencies ?? ["recharts"];
  return {
    categories: options.categories,
    ...(dependencies.length && { dependencies }),
    description: options.description,
    files: [
      {
        path: `charts/${options.name}.tsx`,
        target: `components/charts/${options.name}.tsx`,
        type: "registry:ui",
      },
    ],
    name: options.name,
    registryDependencies: (
      options.registryDependencies ?? ["chart", "chart-utils"]
    ).map((d) => `@cnippet/${d}`),
    type: "registry:ui",
  };
}

export const charts: ChartItem[] = [
  // Foundation
  createChart({
    categories: ["chart card"],
    dependencies: [],
    description:
      "Card frame for a chart with title, headline value, delta badge, actions and footer",
    name: "chart-card",
    registryDependencies: ["card", "badge", "chart-utils"],
  }),
  createChart({
    categories: ["chart tooltip presets"],
    description:
      "Tooltip layouts for the chart primitive: totals, sorted list and previous-period comparison",
    name: "chart-tooltip-presets",
  }),
  createChart({
    categories: ["interactive legend"],
    description:
      "Chart legend whose items toggle series on and off and highlight them on hover",
    name: "interactive-legend",
    registryDependencies: ["chart"],
  }),
  createChart({
    categories: ["chart skeleton"],
    dependencies: [],
    description:
      "Loading placeholder shaped like a bar, line, area or donut chart",
    name: "chart-skeleton",
    registryDependencies: ["skeleton"],
  }),
  createChart({
    categories: ["chart empty"],
    dependencies: ["lucide-react"],
    description: "Empty state sized for a chart, with icon, message and action",
    name: "chart-empty",
    registryDependencies: ["empty"],
  }),
];

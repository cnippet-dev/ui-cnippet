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

// What every data-driven chart (area, bar, line, combo) imports.
const dataChartDeps = [
  "use-media-query",
  "chart",
  "chart-utils",
  "chart-tooltip-presets",
  "chart-skeleton",
  "chart-empty",
];

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
  // Cartesian
  createChart({
    categories: ["area chart"],
    description:
      "Data-driven area chart: default, stacked or percent, with gradient, solid or no fill",
    name: "area-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["bar chart"],
    description:
      "Data-driven bar chart: columns or horizontal bars, grouped, stacked or percent, with value labels",
    name: "bar-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["line chart"],
    description:
      "Data-driven line chart with dots, dashed forecast series and gap handling",
    name: "line-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["combo chart"],
    description:
      "Bars and lines on one plot, with an optional second y-axis for the lines",
    name: "combo-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["scatter chart"],
    description: "X/Y scatter plot with optional bubble size and colour groups",
    name: "scatter-chart",
    registryDependencies: [
      "chart",
      "chart-utils",
      "chart-skeleton",
      "chart-empty",
      "use-media-query",
    ],
  }),
  // Micro
  ...(
    [
      [
        "spark-area",
        "Tiny area trend with no axes, optionally coloured by trend",
      ],
      [
        "spark-line",
        "Tiny line trend with an optional last-point dot, coloured by trend",
      ],
      ["spark-bar", "Tiny bars for daily volume or win/loss, coloured by sign"],
    ] as const
  ).map(([name, description]) =>
    createChart({
      categories: [name.replace("-", " ") as RegistryCategory],
      description,
      name,
      registryDependencies: ["chart", "chart-utils", "use-media-query"],
    }),
  ),
  createChart({
    categories: ["bar list"],
    dependencies: [],
    description:
      "Ranked horizontal bars with a name and value per row; rows can be links or buttons",
    name: "bar-list",
    registryDependencies: ["chart-utils"],
  }),
  createChart({
    categories: ["category bar"],
    dependencies: [],
    description:
      "One bar split into coloured ranges, with boundary labels and an optional marker",
    name: "category-bar",
    registryDependencies: [],
  }),
  createChart({
    categories: ["progress circle"],
    dependencies: [],
    description: "Ring showing progress toward a maximum, with centre content",
    name: "progress-circle",
    registryDependencies: [],
  }),
  createChart({
    categories: ["delta bar"],
    dependencies: [],
    description:
      "Bar growing left or right from the centre to show a +/− change",
    name: "delta-bar",
    registryDependencies: ["chart-utils"],
  }),
  createChart({
    categories: ["tracker"],
    dependencies: [],
    description:
      "Row of status blocks with tooltips, e.g. daily uptime or build history",
    name: "tracker",
    registryDependencies: ["tooltip"],
  }),
  createChart({
    categories: ["bullet chart"],
    dependencies: [],
    description:
      "Compact bar comparing a value with a target over qualitative ranges",
    name: "bullet-chart",
    registryDependencies: ["chart-utils"],
  }),
];

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
  // Polar
  createChart({
    categories: ["donut chart"],
    description:
      "Part-to-whole ring with a centre value, slice labels and a bottom or side legend",
    name: "donut-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["pie chart"],
    description:
      "Part-to-whole pie with slice labels; a donut chart with no hole",
    name: "pie-chart",
    registryDependencies: ["donut-chart"],
  }),
  createChart({
    categories: ["radar chart"],
    description:
      "Multi-axis comparison with polygon or circle grid, filled or outlined",
    name: "radar-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["radial chart"],
    description: "Concentric progress rings with a track and centre label",
    name: "radial-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["gauge chart"],
    dependencies: [],
    description:
      "Half-circle gauge with coloured threshold bands, a needle or a value arc",
    name: "gauge-chart",
    registryDependencies: ["chart-utils"],
  }),
  createChart({
    categories: ["sunburst chart"],
    description:
      "Two-level nested rings: category in the middle, breakdown outside",
    name: "sunburst-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["polar area chart"],
    description: "Rose chart: equal-angle slices whose length shows the value",
    name: "polar-area-chart",
    registryDependencies: [
      "chart",
      "chart-utils",
      "chart-skeleton",
      "chart-empty",
      "use-media-query",
    ],
  }),
  // Interactive
  createChart({
    categories: ["time range chart"],
    dependencies: [],
    description:
      "Area or bar chart with a 7d / 30d / 90d range toggle and totals for the range",
    name: "time-range-chart",
    registryDependencies: [
      "area-chart",
      "bar-chart",
      "toggle-group",
      "chart-utils",
    ],
  }),
  createChart({
    categories: ["brush chart"],
    description:
      "Area or line chart with a brush underneath to zoom and pan a long series",
    name: "brush-chart",
    registryDependencies: ["area-chart", "line-chart", "chart-utils"],
  }),
  createChart({
    categories: ["series toggle chart"],
    dependencies: [],
    description:
      "Metric tabs with totals above a chart; each tab switches the series shown",
    name: "series-toggle-chart",
    registryDependencies: [
      "area-chart",
      "bar-chart",
      "line-chart",
      "chart-utils",
    ],
  }),
  createChart({
    categories: ["synced charts"],
    dependencies: [],
    description:
      "Stacked chart panels on one x-axis that share a cursor and tooltip",
    name: "synced-charts",
    registryDependencies: ["area-chart", "bar-chart", "line-chart"],
  }),
  createChart({
    categories: ["realtime chart"],
    dependencies: ["recharts", "lucide-react"],
    description:
      "Streaming line chart with a sliding window, live values and a pause button",
    name: "realtime-chart",
    registryDependencies: [
      "chart",
      "chart-utils",
      "chart-tooltip-presets",
      "button",
    ],
  }),
  createChart({
    categories: ["drilldown chart"],
    dependencies: ["recharts", "lucide-react"],
    description:
      "Bar chart that drills into a bar's breakdown on click or Enter, with breadcrumbs back",
    name: "drilldown-chart",
    registryDependencies: ["bar-chart", "chart-utils"],
  }),
  createChart({
    categories: ["annotated chart"],
    description:
      "Time series with event markers, target lines and shaded periods",
    name: "annotated-chart",
    registryDependencies: ["area-chart", "line-chart", "chart-utils"],
  }),
  // Advanced cartesian
  createChart({
    categories: ["histogram"],
    dependencies: [],
    description:
      "Distribution of raw values in equal-width buckets, drawn as touching bars",
    name: "histogram",
    registryDependencies: ["bar-chart", "chart-utils"],
  }),
  createChart({
    categories: ["waterfall chart"],
    description:
      "Running total built from increases, decreases and subtotal bars",
    name: "waterfall-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["range area chart"],
    description:
      "Shaded band between a low and high value, with an optional line inside",
    name: "range-area-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["candlestick chart"],
    description: "Open, high, low and close candles with optional volume bars",
    name: "candlestick-chart",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["box plot"],
    description:
      "Quartiles and range per group, from raw values or precomputed stats",
    name: "box-plot",
    registryDependencies: dataChartDeps,
  }),
  // Hierarchy & flow
  createChart({
    categories: ["funnel chart"],
    dependencies: [],
    description:
      "Steps of a process with the share reaching each step and the drop-off between them",
    name: "funnel-chart",
    registryDependencies: ["chart-utils", "chart-empty"],
  }),
  createChart({
    categories: ["treemap"],
    description:
      "Nested rectangles sized by value, coloured by top-level group",
    name: "treemap",
    registryDependencies: dataChartDeps,
  }),
  createChart({
    categories: ["sankey"],
    description:
      "Flows between named stages, with link widths proportional to value",
    name: "sankey",
    registryDependencies: [
      "chart",
      "chart-utils",
      "chart-tooltip-presets",
      "chart-skeleton",
      "chart-empty",
    ],
  }),
  // Matrix
  createChart({
    categories: ["heatmap"],
    dependencies: [],
    description:
      "Grid of cells shaded by value, with keyboard navigation and a tooltip per cell",
    name: "heatmap",
    registryDependencies: [
      "chart-utils",
      "chart-skeleton",
      "chart-empty",
      "tooltip",
    ],
  }),
  createChart({
    categories: ["calendar heatmap"],
    dependencies: [],
    description:
      "Days laid out in week columns and shaded by value, like a contribution graph",
    name: "calendar-heatmap",
    registryDependencies: ["heatmap", "chart-utils"],
  }),
  createChart({
    categories: ["cohort retention"],
    dependencies: [],
    description:
      "Triangle table of retention by cohort and period, with shaded % cells",
    name: "cohort-retention",
    registryDependencies: ["heatmap", "chart-utils"],
  }),
];

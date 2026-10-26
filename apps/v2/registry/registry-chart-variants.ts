import type { Registry } from "shadcn/schema";
import type { RegistryCategory } from "./registry-categories";

type ChartVariantItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

// One entry per example file `c-<slug>-<n>`, in order: [description, registry deps].
function createChartVariants(
  category: RegistryCategory,
  slug: string,
  entries: [description: string, dependencies: string[]][],
): ChartVariantItem[] {
  return entries.map(([description, dependencies], i) => {
    const name = `c-${slug}-${i + 1}`;
    return {
      categories: [category],
      description,
      files: [{ path: `chart-variants/${name}.tsx`, type: "registry:block" }],
      meta: { className: "" },
      name,
      registryDependencies: dependencies.map((d) => `@cnippet/${d}`),
      type: "registry:block",
    };
  });
}

const tooltipList = ["chart-tooltip-presets", "chart", "chart-utils"];

export const chartVariants: ChartVariantItem[] = [
  ...createChartVariants("chart card", "chart-card", [
    [
      "Revenue card — headline value, growth badge and area trend",
      ["chart-card", ...tooltipList],
    ],
    [
      "Range select — card actions switch the chart between 7, 30 and 90 days",
      ["chart-card", "toggle-group", ...tooltipList],
    ],
    [
      "Churn card — inverted delta where a drop is good, with a footer insight",
      ["chart-card", ...tooltipList],
    ],
  ]),
  ...createChartVariants("chart tooltip presets", "chart-tooltip-presets", [
    [
      "Period comparison — revenue against last year with % change",
      tooltipList,
    ],
    ["Stacked total — MRR by plan with a total row", tooltipList],
    ["Sorted list — page load by region, slowest first", tooltipList],
  ]),
  ...createChartVariants("interactive legend", "interactive-legend", [
    [
      "Toggle series — show or hide latency percentiles on a line chart",
      ["interactive-legend", ...tooltipList],
    ],
    [
      "Hover highlight — dim the other channels on a stacked bar chart",
      ["interactive-legend", ...tooltipList],
    ],
    [
      "Top legend — sessions by device with icons, legend above the chart",
      ["interactive-legend", ...tooltipList],
    ],
  ]),
  ...createChartVariants("chart skeleton", "chart-skeleton", [
    [
      "Bar placeholder — swaps to the real chart once data loads",
      ["chart-skeleton", "chart-card", "chart", "button"],
    ],
    [
      "Line and area placeholders — side by side in chart cards",
      ["chart-skeleton", "chart-card"],
    ],
    [
      "Donut placeholder — loading state for a part-to-whole card",
      ["chart-skeleton", "chart-card", "skeleton"],
    ],
  ]),
  ...createChartVariants("chart empty", "chart-empty", [
    [
      "No data in range — prompt to widen the date range",
      ["chart-empty", "chart-card", "button", ...tooltipList],
    ],
    [
      "No events yet — first-run state before any data arrives",
      ["chart-empty", "chart-card", "button"],
    ],
    [
      "Filtered to nothing — clear filters to bring the chart back",
      ["chart-empty", "chart-card", "button", "toggle-group", ...tooltipList],
    ],
  ]),
];

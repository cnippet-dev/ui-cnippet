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
  ...createChartVariants("area chart", "area-chart", [
    [
      "Visitors — desktop vs mobile with gradient fill",
      ["area-chart", "chart-card", "chart-utils"],
    ],
    [
      "MRR by plan — stacked areas with a total tooltip",
      ["area-chart", "chart-card", "chart-utils"],
    ],
    [
      "Traffic mix — percent-stacked share of sessions by channel",
      ["area-chart", "chart-card"],
    ],
    [
      "Provisioned storage — step curve for values that jump",
      ["area-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("bar chart", "bar-chart", [
    [
      "Monthly revenue — single series in a chart card",
      ["bar-chart", "chart-card", "chart-utils"],
    ],
    ["Signups by channel — stacked columns", ["bar-chart", "chart-card"]],
    [
      "Top pages — horizontal bars with value labels",
      ["bar-chart", "chart-card"],
    ],
    [
      "Profit & loss — negative values below a zero line",
      ["bar-chart", "chart-card", "chart-utils"],
    ],
    [
      "Sales vs quota — reference line for the target",
      ["bar-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("line chart", "line-chart", [
    ["API latency — p50, p90 and p99 over a day", ["line-chart", "chart-card"]],
    [
      "Revenue forecast — dashed forecast continuing the actuals",
      ["line-chart", "chart-card", "chart-utils"],
    ],
    [
      "Conversion rate — dots and a target line",
      ["line-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("combo chart", "combo-chart", [
    [
      "Revenue & growth — bars in $ with a % line on a second axis",
      ["combo-chart", "chart-card", "chart-utils"],
    ],
    [
      "Orders & AOV — order volume against average order value",
      ["combo-chart", "chart-card", "chart-utils"],
    ],
    [
      "Trials & conversion — stacked bars by plan with a conversion line",
      ["combo-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("scatter chart", "scatter-chart", [
    [
      "Price vs rating — products coloured by category",
      ["scatter-chart", "chart-card", "chart-utils"],
    ],
    [
      "Deal size vs sales cycle — bubbles sized by seats",
      ["scatter-chart", "chart-card", "chart-utils"],
    ],
    [
      "Response time vs payload — single-series correlation",
      ["scatter-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("spark area", "spark-area", [
    [
      "KPI card — revenue with a 7-day spark area",
      ["spark-area", "chart-card", "chart-utils"],
    ],
    [
      "Table cell — weekly users trend per workspace",
      ["spark-area", "table", "chart-utils"],
    ],
    [
      "Trend colours — green or red by direction, inverted for errors and CPU",
      ["spark-area"],
    ],
  ]),
  ...createChartVariants("spark line", "spark-line", [
    [
      "Stock ticker — 10-day price lines with change",
      ["spark-line", "chart-utils"],
    ],
    [
      "Status list — service latency with a status badge",
      ["spark-line", "badge"],
    ],
    [
      "Up vs down — the same line coloured by what rising means",
      ["spark-line"],
    ],
  ]),
  ...createChartVariants("spark bar", "spark-bar", [
    ["Daily commits — 28 days of activity", ["spark-bar"]],
    ["Win/loss — last 15 games per team", ["spark-bar"]],
    [
      "Weekly volume — stacked web and app orders in a card",
      ["spark-bar", "chart-card"],
    ],
  ]),
  ...createChartVariants("bar list", "bar-list", [
    ["Top pages — page views, last 30 days", ["bar-list", "chart-card"]],
    [
      "Top countries — flags and % share",
      ["bar-list", "chart-card", "chart-utils"],
    ],
    [
      "Clickable referrers — rows filter the dashboard",
      ["bar-list", "chart-card"],
    ],
  ]),
  ...createChartVariants("category bar", "category-bar", [
    ["Credit score — bands with a marker", ["category-bar"]],
    ["Storage breakdown — usage by type with free space", ["category-bar"]],
    [
      "Budget allocation — spend so far as a marker",
      ["category-bar", "chart-utils"],
    ],
  ]),
  ...createChartVariants("progress circle", "progress-circle", [
    ["Profile completion — ring with a checklist", ["progress-circle"]],
    ["Quota used — colours by threshold", ["progress-circle"]],
    ["Sizes — from 32px to 96px", ["progress-circle"]],
  ]),
  ...createChartVariants("delta bar", "delta-bar", [
    ["NPS change — points gained or lost per area", ["delta-bar"]],
    [
      "Budget variance — over budget shown as bad",
      ["delta-bar", "chart-utils"],
    ],
    ["Week over week — change under each metric", ["delta-bar", "chart-utils"]],
  ]),
  ...createChartVariants("tracker", "tracker", [
    ["90-day uptime — daily status with incidents", ["tracker", "chart-utils"]],
    ["Build history — last 30 CI runs", ["tracker"]],
    ["Habit tracker — four weeks per habit", ["tracker"]],
  ]),
  ...createChartVariants("bullet chart", "bullet-chart", [
    [
      "Sales vs quota — per rep with performance bands",
      ["bullet-chart", "chart-utils"],
    ],
    ["SLA vs target — response time per support tier", ["bullet-chart"]],
    [
      "Budget usage — spend with a month-end forecast marker",
      ["bullet-chart", "chart-utils"],
    ],
  ]),
  ...createChartVariants("donut chart", "donut-chart", [
    [
      "Traffic sources — channel share with the total in the centre",
      ["donut-chart", "chart-card", "chart-utils"],
    ],
    [
      "Storage used — side legend with free space muted",
      ["donut-chart", "chart-card"],
    ],
    [
      "Headcount — percentage labels on each slice",
      ["donut-chart", "chart-card"],
    ],
    [
      "Budget split — side legend with a currency total",
      ["donut-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("pie chart", "pie-chart", [
    [
      "Browser share — pie with a bottom legend",
      ["pie-chart", "chart-card", "chart-utils"],
    ],
    [
      "Survey answers — percentage labels and a side legend",
      ["pie-chart", "chart-card"],
    ],
    [
      "Expenses — spending by category with currency values",
      ["pie-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("radar chart", "radar-chart", [
    [
      "Product comparison — two laptops across six aspects",
      ["radar-chart", "chart-card"],
    ],
    ["Skill profile — circle grid with dots", ["radar-chart", "chart-card"]],
    ["Plan scorecard — three outlined plans", ["radar-chart", "chart-card"]],
  ]),
  ...createChartVariants("radial chart", "radial-chart", [
    ["Activity rings — three daily goals", ["radial-chart", "chart-card"]],
    [
      "Seats used — half ring with an upgrade action",
      ["radial-chart", "chart-card", "button"],
    ],
    ["Site scores — four Lighthouse rings", ["radial-chart", "chart-card"]],
  ]),
  ...createChartVariants("gauge chart", "gauge-chart", [
    ["Web Vitals LCP — good / needs work / poor bands", ["gauge-chart"]],
    ["CPU load — value arcs coloured by threshold", ["gauge-chart"]],
    ["NPS — a -100 to 100 scale with four bands", ["gauge-chart"]],
  ]),
  ...createChartVariants("sunburst chart", "sunburst-chart", [
    [
      "Revenue by region — region then country",
      ["sunburst-chart", "chart-card", "chart-utils"],
    ],
    ["Disk usage — folders and subfolders", ["sunburst-chart", "chart-card"]],
    ["Org structure — departments and teams", ["sunburst-chart", "chart-card"]],
  ]),
  ...createChartVariants("polar area chart", "polar-area-chart", [
    ["Activity by weekday — one colour", ["polar-area-chart", "chart-card"]],
    ["Wind rose — hours by direction", ["polar-area-chart", "chart-card"]],
    [
      "Tickets by topic — a colour per slice",
      ["polar-area-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("time range chart", "time-range-chart", [
    [
      "Visitors — 7d / 30d / 90d with totals per device",
      ["time-range-chart", "chart-card", "chart-utils"],
    ],
    [
      "Revenue — 3m / 6m / 12m monthly bars",
      ["time-range-chart", "chart-card", "chart-utils"],
    ],
    [
      "API calls — stacked successful and failed calls",
      ["time-range-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("brush chart", "brush-chart", [
    [
      "Two years of revenue — starts zoomed to 90 days",
      ["brush-chart", "chart-card", "chart-utils"],
    ],
    [
      "Sensor log — three days of 10-minute readings",
      ["brush-chart", "chart-card"],
    ],
    [
      "Stock history — a year of closes, last 60 sessions shown",
      ["brush-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("series toggle chart", "series-toggle-chart", [
    [
      "Visitors — desktop and mobile tabs with totals",
      ["series-toggle-chart", "chart-card", "chart-utils"],
    ],
    [
      "Metric switcher — users, sessions and revenue",
      ["series-toggle-chart", "chart-card", "chart-utils"],
    ],
    [
      "Rates — funnel rates as lines, tabs without totals",
      ["series-toggle-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("synced charts", "synced-charts", [
    ["Server metrics — CPU, memory and network", ["synced-charts"]],
    ["Sales — revenue, orders and AOV", ["synced-charts", "chart-utils"]],
    [
      "Traffic vs conversion — sessions and rate by hour",
      ["synced-charts", "chart-utils"],
    ],
  ]),
  ...createChartVariants("realtime chart", "realtime-chart", [
    ["Requests per second — live stream", ["realtime-chart", "chart-card"]],
    [
      "Room temperature — two sensors, fixed axis",
      ["realtime-chart", "chart-card"],
    ],
    ["Price feed — a random walk", ["realtime-chart", "chart-card"]],
  ]),
  ...createChartVariants("drilldown chart", "drilldown-chart", [
    [
      "Revenue — year → quarter → month",
      ["drilldown-chart", "chart-card", "chart-utils"],
    ],
    [
      "Active users — region → country → city",
      ["drilldown-chart", "chart-card", "chart-utils"],
    ],
    [
      "Sales by product — horizontal bars, category → product",
      ["drilldown-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("annotated chart", "annotated-chart", [
    [
      "Deploy markers — error rate with deploy, rollback and SLO",
      ["annotated-chart", "chart-card", "chart-utils"],
    ],
    [
      "Campaign periods — shaded launch and webinar weeks",
      ["annotated-chart", "chart-card", "chart-utils"],
    ],
    [
      "Incident — latency with an incident window and SLA",
      ["annotated-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("histogram", "histogram", [
    [
      "Response times — right-skewed latency distribution",
      ["histogram", "chart-card"],
    ],
    [
      "Order values — two clusters of basket sizes",
      ["histogram", "chart-card", "chart-utils"],
    ],
    [
      "Test scores — 20 narrow bands without a grid",
      ["histogram", "chart-card"],
    ],
  ]),
  ...createChartVariants("waterfall chart", "waterfall-chart", [
    [
      "MRR movement — new, expansion, contraction and churn",
      ["waterfall-chart", "chart-card", "chart-utils"],
    ],
    [
      "P&L bridge — revenue to net profit with subtotals",
      ["waterfall-chart", "chart-card", "chart-utils"],
    ],
    [
      "Headcount change — hires and departures by team",
      ["waterfall-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("range area chart", "range-area-chart", [
    [
      "Latency band — p5–p99 with the median line",
      ["range-area-chart", "chart-card"],
    ],
    [
      "Revenue forecast — actuals then a widening forecast band",
      ["range-area-chart", "chart-card", "chart-utils"],
    ],
    [
      "Temperature range — monthly low and high",
      ["range-area-chart", "chart-card"],
    ],
  ]),
  ...createChartVariants("candlestick chart", "candlestick-chart", [
    [
      "Stock price — daily candles for a month",
      ["candlestick-chart", "chart-card", "chart-utils"],
    ],
    [
      "Crypto — hourly candles with volume bars",
      ["candlestick-chart", "chart-card", "chart-utils"],
    ],
    [
      "Moving average — candles with a 7-day average line",
      ["candlestick-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("box plot", "box-plot", [
    [
      "Salary by role — precomputed quartiles",
      ["box-plot", "chart-card", "chart-utils"],
    ],
    [
      "Latency by region — quartiles computed from raw samples",
      ["box-plot", "chart-card"],
    ],
    [
      "CI run time — per runner against a time budget",
      ["box-plot", "chart-card"],
    ],
  ]),
  ...createChartVariants("funnel chart", "funnel-chart", [
    [
      "Signup funnel — share reaching each step with drop-off",
      ["funnel-chart", "chart-card", "chart-utils"],
    ],
    ["Checkout — left-aligned bars", ["funnel-chart", "chart-card"]],
    [
      "Sales pipeline — currency values without drop-off",
      ["funnel-chart", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("treemap", "treemap", [
    [
      "Revenue mix — two levels: business line and product",
      ["treemap", "chart-card", "chart-utils"],
    ],
    ["Bundle size — flat list of packages", ["treemap", "chart-card"]],
    ["Disk usage — click a cell to select it", ["treemap", "chart-card"]],
  ]),
  ...createChartVariants("sankey", "sankey", [
    [
      "Traffic flow — source to landing page to outcome",
      ["sankey", "chart-card"],
    ],
    [
      "Budget allocation — department then spend type",
      ["sankey", "chart-card", "chart-utils"],
    ],
    ["Energy flow — source to use, with losses", ["sankey", "chart-card"]],
  ]),
  ...createChartVariants("heatmap", "heatmap", [
    ["Activity — sessions by weekday and hour", ["heatmap", "chart-card"]],
    [
      "Feature usage by plan — values printed in cells",
      ["heatmap", "chart-card", "chart-utils"],
    ],
    [
      "Error rate — services by day with an incident",
      ["heatmap", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("calendar heatmap", "calendar-heatmap", [
    [
      "Contributions — a year of daily activity",
      ["calendar-heatmap", "chart-card"],
    ],
    [
      "Habit streak — three months, weeks start Monday",
      ["calendar-heatmap", "chart-card"],
    ],
    [
      "Daily sales — six months of revenue",
      ["calendar-heatmap", "chart-card", "chart-utils"],
    ],
  ]),
  ...createChartVariants("cohort retention", "cohort-retention", [
    [
      "Weekly retention — signup cohorts by week",
      ["cohort-retention", "chart-card"],
    ],
    [
      "Net revenue retention — monthly cohorts above 100%",
      ["cohort-retention", "chart-card", "chart-utils"],
    ],
    [
      "Feature adoption — share using a feature by month",
      ["cohort-retention", "chart-card"],
    ],
  ]),
];

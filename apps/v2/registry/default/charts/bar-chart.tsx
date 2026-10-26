"use client";

import {
  Bar,
  CartesianGrid,
  LabelList,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import {
  ChartTooltipList,
  ChartTooltipTotal,
} from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  type BaseChartProps,
  buildChartConfig,
  describeChart,
  formatCompact,
  formatPercent,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type BarChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    /** "horizontal" draws columns; "vertical" draws bars growing to the right. */
    layout?: "horizontal" | "vertical";
    /** "stacked" piles series on top of each other; "percent" stacks them to 100%. */
    type?: "default" | "stacked" | "percent";
    /** Print each value at the end of its bar (not for stacked types). */
    showValues?: boolean;
    /** Corner radius of the bar ends, in px. */
    radius?: number;
    /** Gap between groups of bars, e.g. "20%" or 8. */
    barCategoryGap?: string | number;
    onValueClick?: (payload: {
      index: string;
      category: string;
      value: number;
    }) => void;
  };

export function BarChart<T extends Record<string, unknown>>({
  data,
  index,
  categories,
  config,
  valueFormatter = formatCompact,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = categories.length > 1,
  showTooltip = true,
  legendPosition = "bottom",
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
  layout = "horizontal",
  type = "default",
  showValues = false,
  radius = 4,
  barCategoryGap,
  onValueClick,
}: BarChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const resolvedConfig = buildChartConfig(categories, config);
  const stacked = type !== "default";
  const vertical = layout === "vertical";

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);
  const formatValue = (value: number) =>
    type === "percent"
      ? formatPercent(value, { digits: 0 })
      : valueFormatter(value);
  // Round only the outer end: the top of a column, the right end of a bar.
  const corners: [number, number, number, number] = vertical
    ? [0, radius, radius, 0]
    : [radius, radius, 0, 0];

  const categoryAxis = {
    axisLine: false,
    dataKey: index as string,
    tickFormatter: formatIndex,
    tickLine: false,
    tickMargin: 8,
    type: "category" as const,
  };
  const valueAxis = {
    axisLine: false,
    tickFormatter: formatValue,
    tickLine: false,
    type: "number" as const,
  };

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Bar chart", categories, index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsBarChart
        accessibilityLayer
        barCategoryGap={barCategoryGap}
        data={data}
        layout={layout}
        margin={{
          left: showYAxis ? 0 : 12,
          right: showValues && vertical ? 40 : 12,
          top: showValues && !vertical ? 20 : 8,
        }}
        stackOffset={type === "percent" ? "expand" : undefined}
      >
        {showGrid ? (
          <CartesianGrid horizontal={!vertical} vertical={vertical} />
        ) : null}
        {vertical ? (
          <>
            <XAxis {...valueAxis} hide={!showXAxis} />
            <YAxis {...categoryAxis} hide={!showYAxis} width={yAxisWidth} />
          </>
        ) : (
          <>
            <XAxis
              {...categoryAxis}
              hide={!showXAxis}
              interval="preserveStartEnd"
              minTickGap={16}
            />
            <YAxis {...valueAxis} hide={!showYAxis} width={yAxisWidth} />
          </>
        )}
        {showTooltip ? (
          <ChartTooltip
            content={
              stacked ? (
                <ChartTooltipTotal
                  config={resolvedConfig}
                  labelFormatter={indexFormatter && formatIndex}
                  valueFormatter={valueFormatter}
                />
              ) : (
                <ChartTooltipList
                  config={resolvedConfig}
                  labelFormatter={indexFormatter && formatIndex}
                  sort={false}
                  valueFormatter={valueFormatter}
                />
              )
            }
            cursor={false}
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign={legendPosition}
          />
        ) : null}
        {categories.map((key, i) => (
          <Bar
            className={onValueClick ? "cursor-pointer" : undefined}
            dataKey={key as string}
            fill={`var(--color-${key})`}
            isAnimationActive={!reduceMotion}
            key={key}
            onClick={
              onValueClick
                ? (entry: { payload?: Record<string, unknown> }) =>
                    onValueClick({
                      category: key,
                      index: String(entry.payload?.[index]),
                      value: Number(entry.payload?.[key]),
                    })
                : undefined
            }
            radius={!stacked || i === categories.length - 1 ? corners : 0}
            stackId={stacked ? "stack" : undefined}
          >
            {showValues && !stacked ? (
              <LabelList
                className="fill-foreground"
                dataKey={key as string}
                fontSize={12}
                formatter={(value: unknown) => valueFormatter(Number(value))}
                position={vertical ? "right" : "top"}
              />
            ) : null}
          </Bar>
        ))}
        {children}
      </RechartsBarChart>
    </ChartContainer>
  );
}

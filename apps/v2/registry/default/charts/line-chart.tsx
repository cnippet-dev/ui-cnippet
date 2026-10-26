"use client";

import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  type BaseChartProps,
  buildChartConfig,
  describeChart,
  formatCompact,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type LineChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    curve?: "linear" | "monotone" | "step";
    showDots?: boolean;
    /** Series drawn dashed, e.g. forecasts or targets. */
    dashedCategories?: (keyof T & string)[];
    /** Draw a line across missing (null) values instead of leaving a gap. */
    connectNulls?: boolean;
  };

export function LineChart<T extends Record<string, unknown>>({
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
  curve = "monotone",
  showDots = false,
  dashedCategories = [],
  connectNulls = false,
}: LineChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const resolvedConfig = buildChartConfig(categories, config);

  if (loading) return <ChartSkeleton className={className} variant="line" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Line chart", categories, index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsLineChart
        accessibilityLayer
        data={data}
        margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
      >
        {showGrid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          axisLine={false}
          dataKey={index as string}
          hide={!showXAxis}
          interval="preserveStartEnd"
          minTickGap={24}
          tickFormatter={formatIndex}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          hide={!showYAxis}
          tickFormatter={(value: number) => valueFormatter(value)}
          tickLine={false}
          width={yAxisWidth}
        />
        {showTooltip ? (
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                labelFormatter={indexFormatter && formatIndex}
                sort={false}
                valueFormatter={valueFormatter}
              />
            }
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign={legendPosition}
          />
        ) : null}
        {categories.map((key) => (
          <Line
            activeDot={{ r: 4 }}
            connectNulls={connectNulls}
            dataKey={key as string}
            dot={showDots ? { r: 3 } : false}
            isAnimationActive={!reduceMotion}
            key={key}
            stroke={`var(--color-${key})`}
            strokeDasharray={dashedCategories.includes(key) ? "4 4" : undefined}
            strokeWidth={2}
            type={curve}
          />
        ))}
        {children}
      </RechartsLineChart>
    </ChartContainer>
  );
}

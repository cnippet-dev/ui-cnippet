"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
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

export type ComboChartProps<T extends Record<string, unknown>> = Omit<
  BaseChartProps<T>,
  "categories"
> & {
  /** Series drawn as bars, against the left axis. */
  barCategories: (keyof T & string)[];
  /** Series drawn as lines; on the right axis when `dualAxis` is set. */
  lineCategories: (keyof T & string)[];
  /** Give the lines their own y-axis on the right, e.g. for a % next to a $. */
  dualAxis?: boolean;
  /** Formats line values (right axis + tooltip). Default: `valueFormatter`. */
  lineValueFormatter?: (value: number) => string;
  /** Stack the bar series. */
  stacked?: boolean;
  curve?: "linear" | "monotone" | "step";
};

export function ComboChart<T extends Record<string, unknown>>({
  data,
  index,
  barCategories,
  lineCategories,
  config,
  valueFormatter = formatCompact,
  lineValueFormatter = valueFormatter,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  legendPosition = "bottom",
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
  dualAxis = false,
  stacked = false,
  curve = "monotone",
}: ComboChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const categories = [...barCategories, ...lineCategories];
  const resolvedConfig = buildChartConfig(categories, config);

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);
  // Left axis keeps the default id (0) so children like <ReferenceLine> find it.
  const lineAxis = dualAxis ? "right" : 0;

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Combo chart", categories, index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{
          left: showYAxis ? 0 : 12,
          right: showYAxis && dualAxis ? 0 : 12,
          top: 8,
        }}
      >
        {showGrid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          axisLine={false}
          dataKey={index as string}
          hide={!showXAxis}
          interval="preserveStartEnd"
          minTickGap={16}
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
        {dualAxis ? (
          <YAxis
            axisLine={false}
            hide={!showYAxis}
            orientation="right"
            tickFormatter={(value: number) => lineValueFormatter(value)}
            tickLine={false}
            width={yAxisWidth}
            yAxisId="right"
          />
        ) : null}
        {showTooltip ? (
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                formatters={Object.fromEntries(
                  lineCategories.map((key) => [key, lineValueFormatter]),
                )}
                labelFormatter={indexFormatter && formatIndex}
                sort={false}
                valueFormatter={valueFormatter}
              />
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
        {barCategories.map((key, i) => (
          <Bar
            dataKey={key as string}
            fill={`var(--color-${key})`}
            isAnimationActive={!reduceMotion}
            key={key}
            radius={
              !stacked || i === barCategories.length - 1 ? [4, 4, 0, 0] : 0
            }
            stackId={stacked ? "stack" : undefined}
          />
        ))}
        {lineCategories.map((key) => (
          <Line
            activeDot={{ r: 4 }}
            dataKey={key as string}
            dot={false}
            isAnimationActive={!reduceMotion}
            key={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            type={curve}
            yAxisId={lineAxis}
          />
        ))}
        {children}
      </ComposedChart>
    </ChartContainer>
  );
}

"use client";

import * as React from "react";
import {
  Area,
  CartesianGrid,
  AreaChart as RechartsAreaChart,
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

export type AreaChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    /** "stacked" piles series on top of each other; "percent" stacks them to 100%. */
    type?: "default" | "stacked" | "percent";
    curve?: "linear" | "monotone" | "step";
    fill?: "gradient" | "solid" | "none";
    /** Draw a line across missing (null) values instead of leaving a gap. */
    connectNulls?: boolean;
  };

export function AreaChart<T extends Record<string, unknown>>({
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
  type = "default",
  curve = "monotone",
  fill = "gradient",
  connectNulls = false,
}: AreaChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const resolvedConfig = buildChartConfig(categories, config);
  const stacked = type !== "default";

  if (loading) return <ChartSkeleton className={className} variant="area" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Area chart", categories, index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsAreaChart
        accessibilityLayer
        data={data}
        margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
        stackOffset={type === "percent" ? "expand" : undefined}
      >
        {fill === "gradient" ? (
          <defs>
            {categories.map((key) => (
              <linearGradient
                id={`${id}-${key}`}
                key={key}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={`var(--color-${key})`}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
        ) : null}
        {showGrid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          axisLine={false}
          dataKey={index as string}
          hide={!showXAxis}
          interval="preserveStartEnd"
          minTickGap={24}
          tickFormatter={(value) =>
            indexFormatter ? indexFormatter(String(value)) : String(value)
          }
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          hide={!showYAxis}
          tickFormatter={(value: number) =>
            type === "percent"
              ? formatPercent(value, { digits: 0 })
              : valueFormatter(value)
          }
          tickLine={false}
          width={yAxisWidth}
        />
        {showTooltip ? (
          <ChartTooltip
            content={
              stacked ? (
                <ChartTooltipTotal
                  config={resolvedConfig}
                  labelFormatter={
                    indexFormatter && ((l) => indexFormatter(String(l)))
                  }
                  valueFormatter={valueFormatter}
                />
              ) : (
                <ChartTooltipList
                  config={resolvedConfig}
                  labelFormatter={
                    indexFormatter && ((l) => indexFormatter(String(l)))
                  }
                  sort={false}
                  valueFormatter={valueFormatter}
                />
              )
            }
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent />}
            itemSorter={null}
            verticalAlign={legendPosition}
          />
        ) : null}
        {categories.map((key) => (
          <Area
            connectNulls={connectNulls}
            dataKey={key as string}
            fill={
              fill === "gradient"
                ? `url(#${id}-${key})`
                : fill === "solid"
                  ? `var(--color-${key})`
                  : "none"
            }
            fillOpacity={fill === "solid" ? 0.4 : 1}
            isAnimationActive={!reduceMotion}
            key={key}
            stackId={stacked ? "stack" : undefined}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            type={curve}
          />
        ))}
        {children}
      </RechartsAreaChart>
    </ChartContainer>
  );
}

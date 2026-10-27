"use client";

import type * as React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipRows } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type RangeAreaChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Key of the x-axis field, e.g. "time". */
  index: keyof T & string;
  /** Lower edge of the band, e.g. "p50". */
  minKey: keyof T & string;
  /** Upper edge of the band, e.g. "p99". */
  maxKey: keyof T & string;
  /** Optional line drawn inside the band, e.g. "median" or "forecast". */
  midKey?: keyof T & string;
  /** Name of the band in the tooltip and legend. */
  label?: string;
  /** Name of the mid line. Default: `midKey`. */
  midLabel?: string;
  /** CSS colour of the band and line. */
  color?: string;
  curve?: "linear" | "monotone" | "step";
  valueFormatter?: (value: number) => string;
  indexFormatter?: (value: string) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  /** Default: true when there is a mid line. */
  showLegend?: boolean;
  showTooltip?: boolean;
  legendPosition?: "top" | "bottom";
  yAxisWidth?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  children?: React.ReactNode;
  syncId?: string;
};

const num = (value: unknown) =>
  typeof value === "number" && Number.isFinite(value) ? value : null;

export function RangeAreaChart<T extends Record<string, unknown>>({
  data,
  index,
  minKey,
  maxKey,
  midKey,
  label = "Range",
  midLabel = midKey,
  color = "var(--chart-1)",
  curve = "monotone",
  valueFormatter = formatCompact,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = Boolean(midKey),
  showTooltip = true,
  legendPosition = "bottom",
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  syncId,
  "aria-label": ariaLabel,
}: RangeAreaChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const config: ChartConfig = {
    mid: { color, label: midLabel },
    range: { color, label },
  };

  if (loading) return <ChartSkeleton className={className} variant="area" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  return (
    <ChartContainer
      aria-label={
        ariaLabel ?? `Range chart of ${minKey} to ${maxKey} by ${index}`
      }
      className={cn("w-full", className)}
      config={config}
      role="figure"
    >
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
        syncId={syncId}
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
          domain={["auto", "auto"]}
          hide={!showYAxis}
          tickFormatter={(value: number) => valueFormatter(value)}
          tickLine={false}
          width={yAxisWidth}
        />
        {showTooltip ? (
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as T | undefined;
              if (!active || !row) return null;
              const low = num(row[minKey]);
              const high = num(row[maxKey]);
              const mid = midKey ? num(row[midKey]) : null;
              const rows: [string, string][] = [];
              if (low !== null && high !== null) {
                rows.push([
                  label,
                  `${valueFormatter(low)} – ${valueFormatter(high)}`,
                ]);
              }
              if (mid !== null)
                rows.push([midLabel ?? "", valueFormatter(mid)]);
              return (
                <ChartTooltipRows rows={rows} title={formatIndex(row[index])} />
              );
            }}
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent nameKey="value" />}
            itemSorter={null}
            verticalAlign={legendPosition}
          />
        ) : null}
        <Area
          dataKey={(row: T) => {
            const low = num(row[minKey]);
            const high = num(row[maxKey]);
            return low === null || high === null ? null : [low, high];
          }}
          fill="var(--color-range)"
          fillOpacity={0.25}
          isAnimationActive={!reduceMotion}
          name="range"
          stroke="var(--color-range)"
          strokeOpacity={0.5}
          type={curve}
        />
        {midKey ? (
          <Line
            dataKey={midKey as string}
            dot={false}
            isAnimationActive={!reduceMotion}
            name="mid"
            stroke="var(--color-mid)"
            strokeWidth={2}
            type={curve}
          />
        ) : null}
        {children}
      </ComposedChart>
    </ChartContainer>
  );
}

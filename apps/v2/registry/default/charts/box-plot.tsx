"use client";

import type * as React from "react";
import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipRows } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  formatCompact,
  getYAxisDomain,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { ChartContainer, ChartTooltip } from "@/registry/default/ui/chart";

export type BoxPlotProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Key of the group name, e.g. "role". */
  index: keyof T & string;
  /**
   * Key of a `number[]` of raw measurements; quartiles are computed from it.
   * Omit to read precomputed `min`, `q1`, `median`, `q3` and `max` fields.
   */
  values?: keyof T & string;
  /** CSS colour of the boxes. */
  color?: string;
  valueFormatter?: (value: number) => string;
  indexFormatter?: (value: string) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  yAxisWidth?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  children?: React.ReactNode;
};

export type BoxStats = {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
};

/** Quantile with linear interpolation between closest ranks (sorted input). */
function quantile(sorted: number[], q: number) {
  const pos = (sorted.length - 1) * q;
  const lower = Math.floor(pos);
  const a = sorted[lower] ?? 0;
  const b = sorted[lower + 1] ?? a;
  return a + (b - a) * (pos - lower);
}

/** min, quartiles and max of raw values; whiskers span the full range. */
export function boxStats(values: number[]): BoxStats | null {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (sorted.length === 0) return null;
  return {
    max: sorted.at(-1) ?? 0,
    median: quantile(sorted, 0.5),
    min: sorted[0] ?? 0,
    q1: quantile(sorted, 0.25),
    q3: quantile(sorted, 0.75),
  };
}

type Row = BoxStats & { name: string; range: [number, number] };

type ShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: Row;
};

export function BoxPlot<T extends Record<string, unknown>>({
  data,
  index,
  values,
  color = "var(--chart-1)",
  valueFormatter = formatCompact,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
}: BoxPlotProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const rows: Row[] = data.flatMap((row) => {
    const stats = values
      ? boxStats(Array.isArray(row[values]) ? (row[values] as number[]) : [])
      : ({
          max: Number(row.max),
          median: Number(row.median),
          min: Number(row.min),
          q1: Number(row.q1),
          q3: Number(row.q3),
        } satisfies BoxStats);
    return stats
      ? [{ ...stats, name: String(row[index]), range: [stats.min, stats.max] }]
      : [];
  });

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (rows.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  // The bar spans min→max; quartiles are placed on the same scale inside it.
  const Box = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    payload,
  }: ShapeProps) => {
    if (!payload) return null;
    const span = payload.max - payload.min;
    const toY = (v: number) =>
      span === 0 ? y : y + ((payload.max - v) / span) * height;
    const boxWidth = Math.max(Math.min(width * 0.6, 48), 4);
    const cx = x + width / 2;
    const left = cx - boxWidth / 2;
    const capLeft = cx - boxWidth / 4;
    const capRight = cx + boxWidth / 4;
    const q3 = toY(payload.q3);
    const median = toY(payload.median);
    return (
      <g stroke={color} strokeWidth={1.5}>
        <line x1={cx} x2={cx} y1={y} y2={y + height} />
        <line x1={capLeft} x2={capRight} y1={y} y2={y} />
        <line x1={capLeft} x2={capRight} y1={y + height} y2={y + height} />
        <rect
          fill={color}
          fillOpacity={0.2}
          height={Math.max(toY(payload.q1) - q3, 1)}
          rx={2}
          width={boxWidth}
          x={left}
          y={q3}
        />
        <line
          strokeWidth={2}
          x1={left}
          x2={left + boxWidth}
          y1={median}
          y2={median}
        />
      </g>
    );
  };

  return (
    <ChartContainer
      aria-label={ariaLabel ?? `Box plot by ${index}`}
      className={cn("w-full", className)}
      config={{}}
      role="figure"
    >
      <RechartsBarChart
        accessibilityLayer
        data={rows}
        margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
      >
        {showGrid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          axisLine={false}
          dataKey="name"
          hide={!showXAxis}
          interval="preserveStartEnd"
          minTickGap={8}
          tickFormatter={formatIndex}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          {...getYAxisDomain(
            Math.min(...rows.map((r) => r.min)),
            Math.max(...rows.map((r) => r.max)),
          )}
          hide={!showYAxis}
          tickFormatter={(value: number) => valueFormatter(value)}
          tickLine={false}
          width={yAxisWidth}
        />
        {showTooltip ? (
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as Row | undefined;
              if (!active || !row) return null;
              return (
                <ChartTooltipRows
                  color={color}
                  rows={[
                    ["Max", valueFormatter(row.max)],
                    ["Q3", valueFormatter(row.q3)],
                    ["Median", valueFormatter(row.median)],
                    ["Q1", valueFormatter(row.q1)],
                    ["Min", valueFormatter(row.min)],
                  ]}
                  title={formatIndex(row.name)}
                />
              );
            }}
            cursor={false}
          />
        ) : null}
        <Bar dataKey="range" isAnimationActive={!reduceMotion} shape={Box} />
        {children}
      </RechartsBarChart>
    </ChartContainer>
  );
}

"use client";

import type * as React from "react";
import { Pie, PieChart, type PieLabelRenderProps } from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  describeChart,
  formatCompact,
  toConfigKey,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type PolarAreaChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Field that names each slice, e.g. "weekday". */
  index: keyof T & string;
  /** Numeric field; sets how far each slice reaches out. */
  category: keyof T & string;
  /** Labels or colours per slice, keyed by slice name (see toConfigKey). */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  /** One colour for every slice (e.g. var(--chart-1)) instead of one per slice. */
  color?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function PolarAreaChart<T extends Record<string, unknown>>({
  data,
  index,
  category,
  config,
  valueFormatter = formatCompact,
  color,
  showLegend = !color,
  showTooltip = true,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: PolarAreaChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (loading) return <ChartSkeleton className={className} variant="donut" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const max = Math.max(...data.map((row) => Number(row[category]) || 0), 0);
  // Every slice gets the same angle (__slice); the value sets its radius.
  const slices = data.map((row) => {
    const key = toConfigKey(String(row[index]));
    const value = Number(row[category]) || 0;
    return {
      ...row,
      __key: key,
      // Area grows with the square of the radius, so scale by √value.
      __radius: max > 0 ? 18 + 57 * Math.sqrt(value / max) : 18,
      __slice: 1,
      fill: color ?? `var(--color-${key})`,
    };
  });
  // Centre the first slice on 12 o'clock (N on a wind rose), then go clockwise.
  const startAngle = 90 + 180 / slices.length;
  const resolvedConfig = buildChartConfig(
    slices.map((s) => s.__key),
    {
      ...Object.fromEntries(
        slices.map((s) => [s.__key, { label: String(s[index]) }]),
      ),
      ...config,
    },
  );

  return (
    <ChartContainer
      aria-label={
        ariaLabel ?? describeChart("Polar area chart", [category], index)
      }
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <PieChart accessibilityLayer>
        {showTooltip ? (
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as
                | (typeof slices)[number]
                | undefined;
              if (!active || !row) return null;
              return (
                <div className="flex items-center gap-2 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-xs"
                    style={{ backgroundColor: row.fill }}
                  />
                  <span className="text-muted-foreground">
                    {resolvedConfig[row.__key]?.label}
                  </span>
                  <span className="ms-auto ps-3 font-medium font-mono tabular-nums">
                    {valueFormatter(Number(row[category]) || 0)}
                  </span>
                </div>
              );
            }}
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent nameKey="__key" />}
            itemSorter={null}
          />
        ) : null}
        <Pie
          data={slices}
          dataKey="__slice"
          endAngle={startAngle - 360}
          isAnimationActive={!reduceMotion}
          // Slice names at the outer edge: the only way to read a single-colour rose.
          label={(props: PieLabelRenderProps) => (
            <text
              className="fill-muted-foreground text-xs"
              dominantBaseline="central"
              textAnchor={props.textAnchor}
              x={props.x}
              y={props.y}
            >
              {
                resolvedConfig[(props.payload as { __key: string }).__key]
                  ?.label
              }
            </text>
          )}
          labelLine={false}
          nameKey="__key"
          outerRadius={(row: { __radius: number }) => `${row.__radius}%`}
          startAngle={startAngle}
          stroke="var(--background)"
          strokeWidth={2}
        />
      </PieChart>
    </ChartContainer>
  );
}

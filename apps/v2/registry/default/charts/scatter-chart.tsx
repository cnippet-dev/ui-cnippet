"use client";

import type * as React from "react";
import {
  CartesianGrid,
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
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

export type ScatterChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Numeric field on the x-axis. */
  x: keyof T & string;
  /** Numeric field on the y-axis. */
  y: keyof T & string;
  /** Numeric field that sets dot size (bubble chart). */
  size?: keyof T & string;
  /** Field whose values split the dots into coloured series. */
  groupBy?: keyof T & string;
  /** Field used as each dot's name in the tooltip, e.g. "product". */
  label?: keyof T & string;
  xLabel?: string;
  yLabel?: string;
  sizeLabel?: string;
  /** Labels or colours per group value; built from the groups when omitted. */
  config?: ChartConfig;
  xValueFormatter?: (value: number) => string;
  yValueFormatter?: (value: number) => string;
  sizeValueFormatter?: (value: number) => string;
  /** Smallest and largest dot area in px² when `size` is set. */
  sizeRange?: [number, number];
  showGrid?: boolean;
  /** Default: true when there is more than one group. */
  showLegend?: boolean;
  showTooltip?: boolean;
  legendPosition?: "top" | "bottom";
  yAxisWidth?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  children?: React.ReactNode;
};

export function ScatterChart<T extends Record<string, unknown>>({
  data,
  x,
  y,
  size,
  groupBy,
  label,
  xLabel = x,
  yLabel = y,
  sizeLabel = size,
  config,
  xValueFormatter = formatCompact,
  yValueFormatter = formatCompact,
  sizeValueFormatter = formatCompact,
  sizeRange = [40, 400],
  showGrid = true,
  showLegend,
  showTooltip = true,
  legendPosition = "bottom",
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
}: ScatterChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const groups = new Map<string, { name: string; rows: T[] }>();
  for (const row of data) {
    const name = groupBy ? String(row[groupBy]) : y;
    const key = toConfigKey(name);
    const group = groups.get(key) ?? { name, rows: [] };
    group.rows.push(row);
    groups.set(key, group);
  }
  const keys = [...groups.keys()];
  const resolvedConfig = buildChartConfig(keys, {
    ...Object.fromEntries(
      [...groups].map(([key, group]) => [key, { label: group.name }]),
    ),
    ...config,
  });

  if (loading) return <ChartSkeleton className={className} variant="line" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  return (
    <ChartContainer
      aria-label={ariaLabel ?? `Scatter chart of ${yLabel} against ${xLabel}`}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsScatterChart
        accessibilityLayer
        margin={{ bottom: 12, left: 0, right: 12, top: 8 }}
      >
        {showGrid ? <CartesianGrid /> : null}
        <XAxis
          axisLine={false}
          dataKey={x as string}
          label={{
            className: "fill-muted-foreground",
            offset: -8,
            position: "insideBottom",
            value: xLabel,
          }}
          name={xLabel}
          tickFormatter={(value: number) => xValueFormatter(value)}
          tickLine={false}
          tickMargin={8}
          type="number"
        />
        <YAxis
          axisLine={false}
          dataKey={y as string}
          name={yLabel}
          tickFormatter={(value: number) => yValueFormatter(value)}
          tickLine={false}
          type="number"
          width={yAxisWidth}
        />
        <ZAxis
          dataKey={size as string | undefined}
          range={size ? sizeRange : [64, 64]}
        />
        {showTooltip ? (
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as T | undefined;
              if (!active || !row) return null;
              const group = toConfigKey(groupBy ? String(row[groupBy]) : y);
              const lines: [string, string][] = [
                [xLabel, xValueFormatter(Number(row[x]))],
                [yLabel, yValueFormatter(Number(row[y]))],
              ];
              if (size && sizeLabel) {
                lines.push([sizeLabel, sizeValueFormatter(Number(row[size]))]);
              }
              return (
                <div className="grid min-w-36 gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
                  <div className="flex items-center gap-2 font-medium">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: `var(--color-${group})` }}
                    />
                    {label ? String(row[label]) : resolvedConfig[group]?.label}
                  </div>
                  {lines.map(([name, value]) => (
                    <div className="flex justify-between gap-3" key={name}>
                      <span className="text-muted-foreground">{name}</span>
                      <span className="font-medium font-mono tabular-nums">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              );
            }}
            cursor={{ strokeDasharray: "3 3" }}
          />
        ) : null}
        {(showLegend ?? keys.length > 1) ? (
          <ChartLegend
            content={<ChartLegendContent nameKey="value" />}
            itemSorter={null}
            verticalAlign={legendPosition}
          />
        ) : null}
        {[...groups].map(([key, group]) => (
          <Scatter
            data={group.rows}
            fill={`var(--color-${key})`}
            fillOpacity={0.7}
            isAnimationActive={!reduceMotion}
            key={key}
            name={key}
          />
        ))}
        {children}
      </RechartsScatterChart>
    </ChartContainer>
  );
}

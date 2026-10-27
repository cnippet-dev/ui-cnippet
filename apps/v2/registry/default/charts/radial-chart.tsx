"use client";

import type * as React from "react";
import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
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

export type RadialChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Field that names each ring, e.g. "goal". */
  index: keyof T & string;
  /** Numeric field for each ring's progress. */
  category: keyof T & string;
  /** Value of a full ring. Default: the largest value. */
  max?: number;
  /** Labels or colours per ring, keyed by ring name (see toConfigKey). */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  /** Degrees; 90 is 12 o'clock. Default draws clockwise from the top. */
  startAngle?: number;
  endAngle?: number;
  /** Show the empty track behind each ring. */
  showBackground?: boolean;
  /** Big text in the centre, e.g. "82%". */
  centerValue?: string;
  centerLabel?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function RadialChart<T extends Record<string, unknown>>({
  data,
  index,
  category,
  max,
  config,
  valueFormatter = formatCompact,
  startAngle = 90,
  endAngle = -270,
  showBackground = true,
  centerValue,
  centerLabel,
  showLegend = true,
  showTooltip = true,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: RadialChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (loading) return <ChartSkeleton className={className} variant="donut" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const rings = data.map((row) => {
    const key = toConfigKey(String(row[index]));
    return { ...row, __key: key, fill: `var(--color-${key})` };
  });
  const resolvedConfig = buildChartConfig(
    rings.map((r) => r.__key),
    {
      ...Object.fromEntries(
        rings.map((r) => [r.__key, { label: String(r[index]) }]),
      ),
      ...config,
    },
  );
  const domainMax =
    max ?? Math.max(...data.map((row) => Number(row[category]) || 0), 0);

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Radial chart", [category], index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RadialBarChart
        accessibilityLayer
        data={rings}
        endAngle={endAngle}
        innerRadius="35%"
        outerRadius="100%"
        startAngle={startAngle}
      >
        <PolarAngleAxis domain={[0, domainMax]} tick={false} type="number" />
        {showTooltip ? (
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                hideLabel
                nameKey="__key"
                sort={false}
                valueFormatter={valueFormatter}
              />
            }
            cursor={false}
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent nameKey="__key" />}
            itemSorter={null}
          />
        ) : null}
        <RadialBar
          background={showBackground ? { fill: "var(--muted)" } : false}
          cornerRadius={8}
          dataKey={category as string}
          isAnimationActive={!reduceMotion}
        />
        {centerValue || centerLabel ? (
          <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null;
                const { cx = 0, cy = 0 } = viewBox;
                return (
                  <text
                    dominantBaseline="middle"
                    textAnchor="middle"
                    x={cx}
                    y={cy}
                  >
                    {centerValue ? (
                      <tspan
                        className="fill-foreground font-semibold text-xl tabular-nums"
                        x={cx}
                        y={centerLabel ? cy - 7 : cy}
                      >
                        {centerValue}
                      </tspan>
                    ) : null}
                    {centerLabel ? (
                      <tspan
                        className="fill-muted-foreground text-xs"
                        x={cx}
                        y={centerValue ? cy + 13 : cy}
                      >
                        {centerLabel}
                      </tspan>
                    ) : null}
                  </text>
                );
              }}
            />
          </PolarRadiusAxis>
        ) : null}
      </RadialBarChart>
    </ChartContainer>
  );
}

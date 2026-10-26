"use client";

import type * as React from "react";
import {
  Label,
  Pie,
  type PieSectorDataItem,
  PieChart as RechartsPieChart,
  Sector,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  describeChart,
  formatCompact,
  formatPercent,
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

export type DonutChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Field that names each slice, e.g. "channel". */
  index: keyof T & string;
  /** Numeric field that sizes each slice, e.g. "visitors". */
  category: keyof T & string;
  /** Labels or colours per slice, keyed by slice name (see toConfigKey). */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  variant?: "donut" | "pie";
  /** Big text in the hole (donut only), e.g. the total. */
  centerValue?: string;
  /** Small text under `centerValue` (donut only). */
  centerLabel?: string;
  /** Print each slice's share next to it. */
  showLabels?: boolean;
  showLegend?: boolean;
  /** Legend under the chart, or as a list beside it. */
  legendLayout?: "bottom" | "side";
  showTooltip?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function DonutChart<T extends Record<string, unknown>>({
  data,
  index,
  category,
  config,
  valueFormatter = formatCompact,
  variant = "donut",
  centerValue,
  centerLabel,
  showLabels = false,
  showLegend = true,
  legendLayout = "bottom",
  showTooltip = true,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: DonutChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (loading) return <ChartSkeleton className={className} variant="donut" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  // Each slice gets a config key from its name, and its fill from that key.
  const slices = data.map((row) => {
    const key = toConfigKey(String(row[index]));
    return { ...row, __key: key, fill: `var(--color-${key})` };
  });
  const resolvedConfig = buildChartConfig(
    slices.map((s) => s.__key),
    {
      ...Object.fromEntries(
        slices.map((s) => [s.__key, { label: String(s[index]) }]),
      ),
      ...config,
    },
  );
  const donut = variant === "donut";
  const side = legendLayout === "side";
  const outerRadius = showLabels ? "70%" : "85%";

  return (
    <ChartContainer
      aria-label={
        ariaLabel ??
        describeChart(donut ? "Donut chart" : "Pie chart", [category], index)
      }
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsPieChart accessibilityLayer>
        {showTooltip ? (
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                hideLabel
                nameKey="__key"
                valueFormatter={valueFormatter}
              />
            }
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            align={side ? "right" : "center"}
            content={
              <ChartLegendContent
                className={side ? "flex-col items-start gap-2 ps-4 pt-0" : ""}
                nameKey="__key"
              />
            }
            itemSorter={null}
            layout={side ? "vertical" : "horizontal"}
            verticalAlign={side ? "middle" : "bottom"}
          />
        ) : null}
        <Pie
          activeShape={(props: PieSectorDataItem) => (
            <Sector {...props} outerRadius={(props.outerRadius ?? 0) + 6} />
          )}
          data={slices}
          dataKey={category as string}
          innerRadius={donut ? "55%" : 0}
          isAnimationActive={!reduceMotion}
          label={
            showLabels
              ? ({ percent }: { percent?: number }) =>
                  formatPercent(percent ?? 0, { digits: 0 })
              : false
          }
          labelLine={showLabels}
          nameKey="__key"
          outerRadius={outerRadius}
          stroke="var(--background)"
          strokeWidth={2}
        >
          {donut && (centerValue || centerLabel) ? (
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
                        className="fill-foreground font-semibold text-2xl tabular-nums"
                        x={cx}
                        y={centerLabel ? cy - 8 : cy}
                      >
                        {centerValue}
                      </tspan>
                    ) : null}
                    {centerLabel ? (
                      <tspan
                        className="fill-muted-foreground text-xs"
                        x={cx}
                        y={centerValue ? cy + 14 : cy}
                      >
                        {centerLabel}
                      </tspan>
                    ) : null}
                  </text>
                );
              }}
            />
          ) : null}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}

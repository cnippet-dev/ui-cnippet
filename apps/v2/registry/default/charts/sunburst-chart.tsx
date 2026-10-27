"use client";

import type * as React from "react";
import { Pie, PieChart } from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
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
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type SunburstNode = {
  name: string;
  /** Needed on leaves; a parent's value is the sum of its children. */
  value?: number;
  children?: { name: string; value: number }[];
};

export type SunburstChartProps = {
  data: SunburstNode[];
  /** Labels or colours per top-level node, keyed by name (see toConfigKey). */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  showLegend?: boolean;
  showTooltip?: boolean;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function SunburstChart({
  data,
  config,
  valueFormatter = formatCompact,
  showLegend = true,
  showTooltip = true,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: SunburstChartProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (loading) return <ChartSkeleton className={className} variant="donut" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const parents = data.map((node) => {
    const key = toConfigKey(node.name);
    const value =
      node.children?.reduce((sum, c) => sum + c.value, 0) ?? node.value ?? 0;
    return { fill: `var(--color-${key})`, key, name: node.name, value };
  });
  // Children sit in the outer ring in their parent's colour, alternating tint.
  const children = data.flatMap((node, p) =>
    (node.children ?? []).map((child, i) => ({
      fill: `color-mix(in oklch, var(--color-${parents[p]?.key}) ${i % 2 ? 55 : 80}%, var(--background))`,
      name: child.name,
      value: child.value,
    })),
  );
  const resolvedConfig = buildChartConfig(
    parents.map((p) => p.key),
    {
      ...Object.fromEntries(parents.map((p) => [p.key, { label: p.name }])),
      ...config,
    },
  );

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <ChartContainer
        aria-label={
          ariaLabel ??
          `Sunburst chart of ${parents.map((p) => p.name).join(", ")}`
        }
        className="aspect-auto min-h-0 w-full flex-1"
        config={resolvedConfig}
        role="figure"
      >
        <PieChart accessibilityLayer>
          {showTooltip ? (
            <ChartTooltip
              content={
                <ChartTooltipList
                  hideLabel
                  nameKey="name"
                  valueFormatter={valueFormatter}
                />
              }
            />
          ) : null}
          <Pie
            data={parents}
            dataKey="value"
            innerRadius="22%"
            isAnimationActive={!reduceMotion}
            nameKey="name"
            outerRadius="54%"
            stroke="var(--background)"
            strokeWidth={2}
          />
          <Pie
            data={children}
            dataKey="value"
            innerRadius="56%"
            isAnimationActive={!reduceMotion}
            nameKey="name"
            outerRadius="88%"
            stroke="var(--background)"
            strokeWidth={2}
          />
        </PieChart>
      </ChartContainer>
      {showLegend ? (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-3 text-xs">
          {parents.map((p) => (
            <li className="flex items-center gap-1.5" key={p.key}>
              <span
                aria-hidden="true"
                className="size-2 rounded-xs"
                style={{ backgroundColor: resolvedConfig[p.key]?.color }}
              />
              {resolvedConfig[p.key]?.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

"use client";

import type * as React from "react";
import { Treemap as RechartsTreemap, type TreemapNode } from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipRows } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  formatCompact,
  formatPercent,
  toConfigKey,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type TreemapItem = {
  name: string;
  /** Size of a leaf. Parents are sized by their children. */
  value?: number;
  children?: TreemapItem[];
};

export type TreemapProps = {
  /** Top-level items; give them `children` for a two-level map. */
  data: TreemapItem[];
  /** Colours or labels per top-level name; built from the names when omitted. */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  showTooltip?: boolean;
  /** Show the top-level legend (nested data only). */
  showLegend?: boolean;
  onValueClick?: (item: { name: string; value: number; group: string }) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

const total = (item: TreemapItem): number =>
  item.children?.reduce((sum, child) => sum + total(child), 0) ??
  Math.max(item.value ?? 0, 0);

/** Tags every node with its top-level ancestor so cells can be coloured by it. */
function tag(
  item: TreemapItem,
  group: string,
): TreemapItem & { group: string } {
  return {
    ...item,
    children: item.children?.map((child) => tag(child, group)),
    group,
  };
}

export function Treemap({
  data,
  config,
  valueFormatter = formatCompact,
  showTooltip = true,
  showLegend,
  onValueClick,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: TreemapProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const nested = data.some((item) => item.children?.length);
  const keys = data.map((item) => toConfigKey(item.name));
  const resolvedConfig = buildChartConfig(keys, {
    ...Object.fromEntries(
      data.map((item) => [toConfigKey(item.name), { label: item.name }]),
    ),
    ...config,
  });
  const grandTotal = data.reduce((sum, item) => sum + total(item), 0);

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (grandTotal === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  // `group` is the top-level name added by tag().
  const groupOf = (node: TreemapNode) => String(node.group ?? node.name);

  const Cell = (node: TreemapNode) => {
    const { x, y, width, height, depth, name, value, children } = node;
    const group = groupOf(node);
    // Parents only draw a gap around their children.
    if (children?.length || depth === 0) return <g />;
    const fits = width > 56 && height > 36;
    return (
      <g
        className={onValueClick ? "cursor-pointer" : undefined}
        onClick={
          onValueClick ? () => onValueClick({ group, name, value }) : undefined
        }
      >
        {/* A tint of the colour keeps foreground text readable in both themes. */}
        <rect
          fill={`color-mix(in oklab, var(--color-${toConfigKey(group)}) 45%, var(--background))`}
          height={height}
          rx={4}
          stroke="var(--background)"
          strokeWidth={2}
          width={width}
          x={x}
          y={y}
        />
        {fits ? (
          <text className="fill-foreground" fontSize={12} x={x + 8} y={y + 18}>
            <tspan fontWeight={500}>{name}</tspan>
            <tspan dy={16} fillOpacity={0.75} x={x + 8}>
              {valueFormatter(value)}
            </tspan>
          </text>
        ) : null}
      </g>
    );
  };

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <ChartContainer
        aria-label={ariaLabel ?? "Treemap"}
        className="aspect-auto min-h-0 w-full flex-1 overflow-hidden"
        config={resolvedConfig}
        role="figure"
      >
        <RechartsTreemap
          content={Cell}
          data={data.map((item) => tag(item, item.name))}
          dataKey="value"
          isAnimationActive={!reduceMotion}
          nameKey="name"
        >
          {showTooltip ? (
            <ChartTooltip
              content={({ active, payload }) => {
                const node = payload?.[0]?.payload as TreemapNode | undefined;
                if (!active || !node) return null;
                const rows: [string, string][] = [
                  ["Value", valueFormatter(node.value)],
                  ["Share", formatPercent(node.value / grandTotal)],
                ];
                const group = groupOf(node);
                if (nested && group !== node.name) {
                  rows.unshift(["Group", group]);
                }
                return (
                  <ChartTooltipRows
                    color={`var(--color-${toConfigKey(group)})`}
                    rows={rows}
                    title={node.name}
                  />
                );
              }}
            />
          ) : null}
        </RechartsTreemap>
      </ChartContainer>
      {(showLegend ?? nested) ? (
        <ul
          aria-hidden="true"
          className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-3 text-xs"
        >
          {data.map((item) => (
            <li className="flex items-center gap-1.5" key={item.name}>
              <span
                className="size-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor:
                    resolvedConfig[toConfigKey(item.name)]?.color,
                }}
              />
              {item.name}
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="sr-only">
        {data.map((item) => (
          <li key={item.name}>
            {item.name}: {valueFormatter(total(item))}
            {item.children?.length ? (
              <ul>
                {item.children.map((child) => (
                  <li key={child.name}>
                    {child.name}: {valueFormatter(total(child))}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

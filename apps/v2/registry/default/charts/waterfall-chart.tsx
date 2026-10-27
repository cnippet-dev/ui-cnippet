"use client";

import type * as React from "react";
import {
  Bar,
  CartesianGrid,
  Cell,
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
  formatPercent,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type WaterfallChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Key of the step name, e.g. "step". */
  index: keyof T & string;
  /** Key of each step's change, e.g. "amount". */
  category: keyof T & string;
  /**
   * `index` values drawn as totals from zero. A total row with a number sets the
   * running total (e.g. a starting balance); without one it shows the running total.
   */
  totals?: string[];
  /** Labels or colours for "increase", "decrease" and "total". */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  indexFormatter?: (value: string) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  yAxisWidth?: number;
  radius?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  children?: React.ReactNode;
};

type Kind = "increase" | "decrease" | "total";

type Step = {
  name: string;
  kind: Kind;
  change: number;
  total: number;
  range: [number, number];
};

const defaultConfig = {
  decrease: { color: "var(--destructive)", label: "Decrease" },
  increase: { color: "var(--success)", label: "Increase" },
  total: { color: "var(--chart-1)", label: "Total" },
} satisfies ChartConfig;

export function WaterfallChart<T extends Record<string, unknown>>({
  data,
  index,
  category,
  totals = [],
  config,
  valueFormatter = formatCompact,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  yAxisWidth = 48,
  radius = 4,
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
}: WaterfallChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const resolvedConfig = {
    decrease: { ...defaultConfig.decrease, ...config?.decrease },
    increase: { ...defaultConfig.increase, ...config?.increase },
    total: { ...defaultConfig.total, ...config?.total },
  } as ChartConfig;

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  let running = 0;
  const steps: Step[] = data.map((row) => {
    const name = String(row[index]);
    const raw = row[category];
    const value = typeof raw === "number" && Number.isFinite(raw) ? raw : null;
    if (totals.includes(name)) {
      const change = value === null ? 0 : value - running;
      if (value !== null) running = value;
      return {
        change,
        kind: "total",
        name,
        range: [0, running],
        total: running,
      };
    }
    const start = running;
    running += value ?? 0;
    return {
      change: value ?? 0,
      kind: (value ?? 0) < 0 ? "decrease" : "increase",
      name,
      range: [Math.min(start, running), Math.max(start, running)],
      total: running,
    };
  });

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  return (
    <div className={cn("flex w-full flex-col", className)}>
      <ChartContainer
        aria-label={ariaLabel ?? `Waterfall chart of ${category} by ${index}`}
        className="aspect-auto min-h-0 w-full flex-1"
        config={resolvedConfig}
        role="figure"
      >
        <RechartsBarChart
          accessibilityLayer
          data={steps}
          margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
        >
          {showGrid ? <CartesianGrid vertical={false} /> : null}
          <XAxis
            axisLine={false}
            dataKey="name"
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
          {showTooltip ? (
            <ChartTooltip
              content={({ active, payload }) => {
                const step = payload?.[0]?.payload as Step | undefined;
                if (!active || !step) return null;
                const rows: [string, string][] =
                  step.kind === "total"
                    ? [["Total", valueFormatter(step.total)]]
                    : [
                        [
                          "Change",
                          `${step.change > 0 ? "+" : ""}${valueFormatter(step.change)}`,
                        ],
                        ["Running total", valueFormatter(step.total)],
                      ];
                const previous = step.total - step.change;
                if (step.kind !== "total" && previous !== 0) {
                  rows.push([
                    "vs previous",
                    formatPercent(step.change / Math.abs(previous), {
                      signed: true,
                    }),
                  ]);
                }
                return (
                  <ChartTooltipRows
                    color={`var(--color-${step.kind})`}
                    rows={rows}
                    title={formatIndex(step.name)}
                  />
                );
              }}
              cursor={false}
            />
          ) : null}
          <Bar
            dataKey="range"
            isAnimationActive={!reduceMotion}
            radius={radius}
          >
            {steps.map((step) => (
              <Cell fill={`var(--color-${step.kind})`} key={step.name} />
            ))}
          </Bar>
          {children}
        </RechartsBarChart>
      </ChartContainer>
      {showLegend ? (
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-3 text-xs">
          {(["increase", "decrease", "total"] as const).map((kind) => (
            <li className="flex items-center gap-1.5" key={kind}>
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: resolvedConfig[kind]?.color }}
              />
              {resolvedConfig[kind]?.label}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

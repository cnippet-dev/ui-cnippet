"use client";

import * as React from "react";
import { AreaChart } from "@/registry/default/charts/area-chart";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { LineChart } from "@/registry/default/charts/line-chart";
import {
  type BaseChartProps,
  buildChartConfig,
  formatCompact,
  sumBy,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type SeriesToggleChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    chartType?: "area" | "bar" | "line";
    /** Series shown at first. Default: the first category. */
    defaultCategory?: keyof T & string;
    /** Called with the newly selected series. */
    onCategoryChange?: (category: keyof T & string) => void;
    /** Show each series' total on its tab. */
    showTotals?: boolean;
    /** Per-series formatters for the tab totals and the chart. */
    formatters?: Partial<Record<keyof T & string, (value: number) => string>>;
  };

export function SeriesToggleChart<T extends Record<string, unknown>>({
  chartType = "bar",
  defaultCategory,
  onCategoryChange,
  showTotals = true,
  formatters,
  ...chartProps
}: SeriesToggleChartProps<T>) {
  const {
    data,
    categories,
    config,
    valueFormatter = formatCompact,
  } = chartProps;
  const [active, setActive] = React.useState(defaultCategory ?? categories[0]);
  const resolvedConfig = buildChartConfig(categories, config);
  const format = (key: keyof T & string) => formatters?.[key] ?? valueFormatter;
  const shown = active ? [active] : [];
  const Chart =
    chartType === "area"
      ? AreaChart
      : chartType === "line"
        ? LineChart
        : BarChart;

  return (
    <div className="grid w-full gap-4" data-slot="series-toggle-chart">
      <div
        aria-label="Metric"
        className="grid auto-cols-fr grid-flow-col overflow-hidden rounded-lg border"
        role="group"
      >
        {categories.map((key) => (
          <button
            aria-pressed={key === active}
            className={cn(
              "relative flex flex-col items-start gap-1 border-s px-4 py-3 text-start outline-none transition-colors first:border-s-0 hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
              "aria-pressed:bg-muted/60",
            )}
            key={key}
            onClick={() => {
              setActive(key);
              onCategoryChange?.(key);
            }}
            type="button"
          >
            <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
              <span
                aria-hidden="true"
                className="size-2 rounded-xs"
                style={{ backgroundColor: resolvedConfig[key]?.color }}
              />
              {resolvedConfig[key]?.label}
            </span>
            {showTotals ? (
              <span className="font-semibold text-lg tabular-nums sm:text-xl">
                {format(key)(sumBy(data, [key]))}
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <Chart
        {...chartProps}
        categories={shown}
        config={resolvedConfig}
        showLegend={false}
        valueFormatter={active ? format(active) : valueFormatter}
      />
    </div>
  );
}

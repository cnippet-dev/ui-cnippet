"use client";

import * as React from "react";
import { AreaChart } from "@/registry/default/charts/area-chart";
import { BarChart } from "@/registry/default/charts/bar-chart";
import {
  type BaseChartProps,
  buildChartConfig,
  formatCompact,
  sumBy,
} from "@/registry/default/lib/chart-utils";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export type TimeRange = {
  label: string;
  /** Number of trailing rows to show. Omit to show every row. */
  size?: number;
};

export type TimeRangeChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    ranges?: TimeRange[];
    /** Label of the range selected at first. Default: the second range. */
    defaultRange?: string;
    /** Called with the new range label, e.g. to fetch more data. */
    onRangeChange?: (label: string) => void;
    chartType?: "area" | "bar";
    /** Stack the series. */
    stacked?: boolean;
    /** Show the sum of each series over the range above the chart. */
    showTotals?: boolean;
  };

const DEFAULT_RANGES: TimeRange[] = [
  { label: "7d", size: 7 },
  { label: "30d", size: 30 },
  { label: "90d", size: 90 },
];

export function TimeRangeChart<T extends Record<string, unknown>>({
  ranges = DEFAULT_RANGES,
  defaultRange,
  onRangeChange,
  chartType = "area",
  stacked = false,
  showTotals = true,
  ...chartProps
}: TimeRangeChartProps<T>) {
  const [range, setRange] = React.useState(
    defaultRange ?? ranges[1]?.label ?? ranges[0]?.label ?? "",
  );
  const {
    data,
    categories,
    config,
    valueFormatter = formatCompact,
  } = chartProps;
  const size = ranges.find((r) => r.label === range)?.size;
  const rows = size === undefined ? data : data.slice(-size);
  const resolvedConfig = buildChartConfig(categories, config);
  const type = stacked ? "stacked" : "default";

  return (
    <div className="grid w-full gap-4" data-slot="time-range-chart">
      <div className="flex flex-wrap items-end justify-between gap-4">
        {showTotals ? (
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {categories.map((key) => (
              <div key={key}>
                <dt className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-xs"
                    style={{ backgroundColor: resolvedConfig[key]?.color }}
                  />
                  {resolvedConfig[key]?.label}
                </dt>
                <dd className="font-semibold text-xl tabular-nums">
                  {valueFormatter(sumBy(rows, [key]))}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <span />
        )}
        <ToggleGroup
          aria-label="Time range"
          onValueChange={(value) => {
            const next = value[0];
            if (!next) return;
            setRange(next);
            onRangeChange?.(next);
          }}
          size="sm"
          value={[range]}
          variant="outline"
        >
          {ranges.map((r) => (
            <ToggleGroupItem key={r.label} value={r.label}>
              {r.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {chartType === "bar" ? (
        <BarChart
          {...chartProps}
          config={resolvedConfig}
          data={rows}
          // The totals header already names and colours each series.
          showLegend={chartProps.showLegend ?? !showTotals}
          type={type}
        />
      ) : (
        <AreaChart
          {...chartProps}
          config={resolvedConfig}
          data={rows}
          // The totals header already names and colours each series.
          showLegend={chartProps.showLegend ?? !showTotals}
          type={type}
        />
      )}
    </div>
  );
}

"use client";

import type * as React from "react";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { binValues, formatCompact } from "@/registry/default/lib/chart-utils";

export type HistogramProps = {
  /** Raw measurements, e.g. response times in ms. */
  values: number[];
  /** Number of equal-width buckets. */
  bins?: number;
  /** Formats bucket edges on the x-axis and in the tooltip, e.g. (v) => `${v} ms`. */
  valueFormatter?: (value: number) => string;
  /** Name of the count in the tooltip, e.g. "Requests". */
  label?: string;
  /** CSS colour of the bars. */
  color?: string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  yAxisWidth?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Extra Recharts elements, e.g. <ReferenceLine x="…" /> on a bucket. */
  children?: React.ReactNode;
};

export function Histogram({
  values,
  bins = 10,
  valueFormatter = formatCompact,
  label = "Count",
  color = "var(--chart-1)",
  "aria-label": ariaLabel,
  ...props
}: HistogramProps) {
  const data = binValues(values, bins).map((bin) => ({
    count: bin.count,
    range: `${valueFormatter(bin.start)}–${valueFormatter(bin.end)}`,
  }));

  return (
    <BarChart
      aria-label={ariaLabel ?? `Histogram of ${label.toLowerCase()}`}
      barCategoryGap={1}
      categories={["count"]}
      config={{ count: { color, label } }}
      data={data}
      index="range"
      radius={2}
      {...props}
    />
  );
}

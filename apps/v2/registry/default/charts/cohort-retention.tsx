"use client";

import type * as React from "react";
import { Heatmap } from "@/registry/default/charts/heatmap";
import {
  formatCompact,
  formatPercent,
} from "@/registry/default/lib/chart-utils";

export type CohortRow = {
  /** Cohort name, e.g. "Jan 6" or "2026-01". */
  cohort: string;
  /** Users (or revenue) at the start of the cohort. */
  size: number;
  /** Share still retained in period 0, 1, 2… as fractions (0.42 = 42%). `null` = not reached yet. */
  values: (number | null)[];
};

export type CohortRetentionProps = {
  data: CohortRow[];
  /** Column header for period i. Default: "0", "1", "2"… */
  periodLabel?: (period: number) => string;
  /** Formats the cohort size next to its name. */
  sizeFormatter?: (size: number) => string;
  /** Formats retention values. Default: whole percent. */
  valueFormatter?: (value: number) => string;
  /** CSS colour of 100% retention. */
  color?: string;
  showLegend?: boolean;
  /** Smallest column width in px; the table scrolls sideways below it. */
  minCellSize?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

type Cell = {
  cohort: string;
  period: string;
  value: number;
  size: number;
  label: string;
};

export function CohortRetention({
  data,
  periodLabel = (period) => String(period),
  sizeFormatter = formatCompact,
  valueFormatter = (value) => formatPercent(value, { digits: 0 }),
  color,
  showLegend = false,
  minCellSize = 40,
  loading,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: CohortRetentionProps) {
  const periods = Math.max(0, ...data.map((row) => row.values.length));
  const columns = Array.from({ length: periods }, (_, i) => periodLabel(i));
  const sizes = new Map(data.map((row) => [row.cohort, row.size]));
  const cells: Cell[] = data.flatMap((row) =>
    row.values.flatMap((value, i) =>
      value === null || value === undefined
        ? []
        : [
            {
              cohort: row.cohort,
              label: `${row.cohort}, ${columns[i]}: ${valueFormatter(value)} of ${sizeFormatter(row.size)}`,
              period: columns[i] ?? String(i),
              size: row.size,
              value,
            },
          ],
    ),
  );

  return (
    <Heatmap
      aria-label={ariaLabel ?? "Cohort retention"}
      cellLabel={(cell) => cell.label}
      className={className}
      color={color}
      data={cells}
      emptyState={emptyState}
      loading={loading}
      max={1}
      min={0}
      minCellSize={minCellSize}
      showLegend={showLegend}
      showValues
      value="value"
      valueFormatter={valueFormatter}
      x="period"
      xLabels={columns}
      y="cohort"
      yFormatter={(cohort) => (
        <span className="flex flex-col leading-tight">
          <span className="text-foreground">{cohort}</span>
          <span className="tabular-nums">
            {sizeFormatter(sizes.get(cohort) ?? 0)}
          </span>
        </span>
      )}
      yLabels={data.map((row) => row.cohort)}
    />
  );
}

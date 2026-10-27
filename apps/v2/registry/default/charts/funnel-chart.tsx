"use client";

import type * as React from "react";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import {
  formatCompact,
  formatPercent,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type FunnelChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Key of the step name, e.g. "step". */
  index: keyof T & string;
  /** Key of the number reaching each step, e.g. "users". */
  category: keyof T & string;
  valueFormatter?: (value: number) => string;
  /** CSS colour of the bars. */
  color?: string;
  /** Show the % lost between steps. */
  showDropOff?: boolean;
  /** Centre the bars (funnel shape) or align them left. */
  align?: "center" | "start";
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function FunnelChart<T extends Record<string, unknown>>({
  data,
  index,
  category,
  valueFormatter = formatCompact,
  color = "var(--chart-1)",
  showDropOff = true,
  align = "center",
  emptyState,
  className,
  "aria-label": ariaLabel,
}: FunnelChartProps<T>) {
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const values = data.map((row) => Math.max(Number(row[category]) || 0, 0));
  const first = values[0] || 1;

  return (
    <ol
      aria-label={ariaLabel ?? `Funnel of ${category} by ${index}`}
      className={cn("grid w-full gap-1 text-sm", className)}
      data-slot="funnel-chart"
    >
      {data.map((row, i) => {
        const value = values[i] ?? 0;
        const previous = values[i - 1];
        const dropOff =
          previous !== undefined && previous > 0 ? 1 - value / previous : null;
        return (
          <li className="grid gap-1" key={String(row[index])}>
            <div className="flex items-baseline justify-between gap-3">
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="truncate font-medium">
                  {String(row[index])}
                </span>
                {showDropOff && dropOff !== null ? (
                  <span className="shrink-0 text-muted-foreground text-xs tabular-nums">
                    ↓ {formatPercent(dropOff, { digits: 1 })}
                    <span className="sr-only"> drop-off</span>
                  </span>
                ) : null}
              </span>
              <span className="shrink-0 text-muted-foreground tabular-nums">
                <span className="font-medium text-foreground">
                  {valueFormatter(value)}
                </span>{" "}
                · {formatPercent(value / first, { digits: 1 })}
              </span>
            </div>
            <div
              aria-hidden="true"
              className={cn(
                "flex h-5 rounded-md bg-muted",
                align === "center" && "justify-center",
              )}
            >
              <div
                className="h-full rounded-md transition-[width] motion-reduce:transition-none"
                style={{
                  backgroundColor: color,
                  width: `${Math.max((value / first) * 100, value > 0 ? 1 : 0)}%`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

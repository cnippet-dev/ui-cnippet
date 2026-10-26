"use client";

import type * as React from "react";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type BarListItem = {
  name: string;
  value: number;
  /** Makes the row a link. */
  href?: string;
  /** Shown before the name, e.g. a flag or favicon. */
  icon?: React.ReactNode;
  key?: string;
};

export type BarListProps<T extends BarListItem> = {
  data: T[];
  valueFormatter?: (value: number) => string;
  sortOrder?: "descending" | "ascending" | "none";
  /** Makes rows buttons; called with the clicked item. */
  onValueClick?: (item: T) => void;
  className?: string;
  "aria-label"?: string;
};

export function BarList<T extends BarListItem>({
  data,
  valueFormatter = formatCompact,
  sortOrder = "descending",
  onValueClick,
  className,
  "aria-label": ariaLabel,
}: BarListProps<T>) {
  const rows =
    sortOrder === "none"
      ? data
      : [...data].sort((a, b) =>
          sortOrder === "descending" ? b.value - a.value : a.value - b.value,
        );
  const max = Math.max(...rows.map((row) => row.value), 0);

  return (
    <ul
      aria-label={ariaLabel}
      className={cn("grid gap-1.5", className)}
      data-slot="bar-list"
    >
      {rows.map((row) => {
        const width = max > 0 ? Math.max((row.value / max) * 100, 1) : 0;
        const label = (
          <>
            <span
              aria-hidden="true"
              className="absolute inset-y-0 start-0 rounded-md bg-chart-1/20 transition-[width] duration-500 motion-reduce:transition-none"
              style={{ width: `${width}%` }}
            />
            <span className="relative flex min-w-0 items-center gap-2 [&_svg]:size-4 [&_svg]:shrink-0">
              {row.icon}
              <span className="truncate">{row.name}</span>
            </span>
          </>
        );
        const rowClass =
          "relative flex h-8 min-w-0 flex-1 items-center rounded-md px-2.5 text-sm";

        return (
          <li className="flex items-center gap-4" key={row.key ?? row.name}>
            {row.href ? (
              <a
                className={cn(
                  rowClass,
                  "outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring",
                )}
                href={row.href}
              >
                {label}
              </a>
            ) : onValueClick ? (
              <button
                className={cn(
                  rowClass,
                  "text-start outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring",
                )}
                onClick={() => onValueClick(row)}
                type="button"
              >
                {label}
              </button>
            ) : (
              <div className={rowClass}>{label}</div>
            )}
            <span className="shrink-0 font-medium text-sm tabular-nums">
              {valueFormatter(row.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

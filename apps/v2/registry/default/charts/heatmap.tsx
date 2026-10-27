"use client";

import * as React from "react";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  Tooltip,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export type HeatmapProps<T extends Record<string, unknown>> = {
  /** One row per cell. Cells with no row are left blank. */
  data: T[];
  /** Key of the column field, e.g. "hour". */
  x: keyof T & string;
  /** Key of the row field, e.g. "day". */
  y: keyof T & string;
  /** Key of the numeric value, e.g. "events". */
  value: keyof T & string;
  /** Column order. Default: order of first appearance in `data`. */
  xLabels?: string[];
  /** Row order. Default: order of first appearance in `data`. */
  yLabels?: string[];
  /** Column header content; return "" to hide a label, e.g. every other hour. */
  xFormatter?: (label: string) => React.ReactNode;
  /** Row header content. */
  yFormatter?: (label: string) => React.ReactNode;
  valueFormatter?: (value: number) => string;
  /** Tooltip and accessible name per cell. Default: "<y>, <x>: <value>". */
  cellLabel?: (row: T) => string;
  /** CSS colour of the highest value; lower values are lighter tints. */
  color?: string;
  /** Value shown as the lightest tint. Default: smallest value. */
  min?: number;
  /** Value shown as the full colour. Default: largest value. */
  max?: number;
  /** Print each value inside its cell (cells become wide bars, not squares). */
  showValues?: boolean;
  /** Show the min–max colour scale under the grid. */
  showLegend?: boolean;
  /** Smallest cell width in px; the grid scrolls sideways below it. */
  minCellSize?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

const SCALE_STEPS = [0, 0.25, 0.5, 0.75, 1];

/** Tint of `color` for t in 0…1. The empty end is the muted surface. */
function tint(color: string, t: number, cap: number) {
  if (t <= 0) return "var(--muted)";
  const pct = Math.round(15 + Math.min(t, 1) * (cap - 15));
  return `color-mix(in oklab, ${color} ${pct}%, var(--muted))`;
}

export function Heatmap<T extends Record<string, unknown>>({
  data,
  x,
  y,
  value,
  xLabels,
  yLabels,
  xFormatter = (label) => label,
  yFormatter = (label) => label,
  valueFormatter = formatCompact,
  cellLabel,
  color = "var(--chart-1)",
  min,
  max,
  showValues = false,
  showLegend = true,
  minCellSize = 0,
  loading = false,
  emptyState,
  className,
  "aria-label": ariaLabel,
}: HeatmapProps<T>) {
  const cells = new Map<string, T>();
  const seenX: string[] = [];
  const seenY: string[] = [];
  const nums: number[] = [];
  for (const row of data) {
    const cx = String(row[x]);
    const cy = String(row[y]);
    if (!seenX.includes(cx)) seenX.push(cx);
    if (!seenY.includes(cy)) seenY.push(cy);
    cells.set(`${cx}\u0000${cy}`, row);
    const v = row[value];
    if (typeof v === "number" && Number.isFinite(v)) nums.push(v);
  }
  const columns = xLabels ?? seenX;
  const rows = yLabels ?? seenY;
  const lo = min ?? Math.min(...nums);
  const hi = max ?? Math.max(...nums);
  // Text sits on the cell, so cap the colour where foreground text stays readable.
  const cap = showValues ? 70 : 100;
  const toT = (v: number) => (hi === lo ? 1 : (v - lo) / (hi - lo));
  const label =
    cellLabel ??
    ((row: T) =>
      `${row[y]}, ${row[x]}: ${
        typeof row[value] === "number"
          ? valueFormatter(row[value] as number)
          : "no data"
      }`);

  // Roving focus: the grid is one tab stop, arrow keys move between cells.
  const refs = React.useRef<(HTMLButtonElement | null)[][]>([]);
  const [active, setActive] = React.useState<[number, number] | null>(null);
  const first = (() => {
    for (let r = 0; r < rows.length; r++) {
      for (let c = 0; c < columns.length; c++) {
        if (cells.has(`${columns[c]}\u0000${rows[r]}`)) return [r, c];
      }
    }
    return [0, 0];
  })();
  const [activeRow, activeCol] = active ?? first;

  const move = (event: React.KeyboardEvent, r: number, c: number) => {
    const step: Record<string, [number, number]> = {
      ArrowDown: [1, 0],
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
      ArrowUp: [-1, 0],
    };
    let target: [number, number] | undefined;
    const delta = step[event.key];
    if (delta) {
      // Skip blank cells in the direction of travel.
      let [nr, nc] = [r + delta[0], c + delta[1]];
      while (nr >= 0 && nr < rows.length && nc >= 0 && nc < columns.length) {
        if (refs.current[nr]?.[nc]) {
          target = [nr, nc];
          break;
        }
        nr += delta[0];
        nc += delta[1];
      }
    } else if (event.key === "Home" || event.key === "End") {
      const order = [...columns.keys()];
      if (event.key === "End") order.reverse();
      const nc = order.find((i) => refs.current[r]?.[i]);
      if (nc !== undefined) target = [r, nc];
    }
    if (!target) return;
    event.preventDefault();
    setActive(target);
    refs.current[target[0]]?.[target[1]]?.focus();
  };

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (nums.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  refs.current = rows.map(() => []);

  return (
    <TooltipProvider delay={0}>
      <div className={cn("w-full text-xs", className)} data-slot="heatmap">
        <div className="overflow-x-auto pb-1">
          <div
            aria-label={ariaLabel ?? `Heatmap of ${value} by ${x} and ${y}`}
            className="grid gap-0.5"
            role="group"
            style={{
              gridTemplateColumns: `auto repeat(${columns.length}, minmax(${minCellSize}px, 1fr))`,
            }}
          >
            <span aria-hidden="true" />
            {columns.map((col) => (
              <span
                aria-hidden="true"
                className="overflow-visible whitespace-nowrap pb-1 text-muted-foreground"
                key={col}
              >
                {xFormatter(col)}
              </span>
            ))}
            {rows.map((rowLabel, r) => (
              <React.Fragment key={rowLabel}>
                <span
                  aria-hidden="true"
                  className="flex items-center whitespace-nowrap pe-2 text-muted-foreground"
                >
                  {yFormatter(rowLabel)}
                </span>
                {columns.map((col, c) => {
                  const row = cells.get(`${col}\u0000${rowLabel}`);
                  // Square cells, but capped so a grid with few columns stays short.
                  const sizing = showValues
                    ? "h-8"
                    : "aspect-square max-h-8 w-full";
                  if (!row) return <span className={sizing} key={col} />;
                  const raw = row[value];
                  const v = typeof raw === "number" ? raw : null;
                  const text = label(row);
                  return (
                    <Tooltip key={col}>
                      <TooltipTrigger
                        render={
                          <button
                            aria-label={text}
                            className={cn(
                              sizing,
                              "flex min-w-0 items-center justify-center rounded-[3px] font-medium text-foreground tabular-nums outline-none hover:ring-1 hover:ring-foreground/40 focus-visible:ring-2 focus-visible:ring-ring",
                            )}
                            onFocus={() => setActive([r, c])}
                            onKeyDown={(event) => move(event, r, c)}
                            ref={(el) => {
                              const line = refs.current[r];
                              if (line) line[c] = el;
                            }}
                            style={{
                              backgroundColor:
                                v === null
                                  ? "var(--muted)"
                                  : tint(color, toT(v), cap),
                            }}
                            tabIndex={
                              r === activeRow && c === activeCol ? 0 : -1
                            }
                            type="button"
                          >
                            {showValues && v !== null
                              ? valueFormatter(v)
                              : null}
                          </button>
                        }
                      />
                      <TooltipPopup>{text}</TooltipPopup>
                    </Tooltip>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
        {showLegend ? (
          <div
            aria-hidden="true"
            className="mt-3 flex items-center justify-end gap-1.5 text-muted-foreground tabular-nums"
          >
            <span>{valueFormatter(lo)}</span>
            {SCALE_STEPS.map((t) => (
              <span
                className="size-3 rounded-[2px]"
                key={t}
                style={{ backgroundColor: tint(color, t, cap) }}
              />
            ))}
            <span>{valueFormatter(hi)}</span>
          </div>
        ) : null}
      </div>
    </TooltipProvider>
  );
}

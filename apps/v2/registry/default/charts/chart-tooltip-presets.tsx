"use client";

import type * as React from "react";
import {
  formatCompact,
  formatPercent,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import type { ChartConfig } from "@/registry/default/ui/chart";

// The props Recharts injects into a `<ChartTooltip content={…} />` element.
type TooltipItem = {
  color?: string;
  dataKey?: string | number;
  name?: string | number;
  payload?: Record<string, unknown> & { fill?: string };
  type?: string;
  value?: unknown;
};

type InjectedProps = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipItem[];
};

export type ChartTooltipPresetProps = InjectedProps & {
  /** Same config as the chart's ChartContainer; used for series labels. */
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  /** Per-series formatters that override `valueFormatter`, e.g. `{ growth: formatPercent }`. */
  formatters?: Record<string, (value: number) => string>;
  /** Row field that names each item, for pie-style charts where every slice shares one dataKey. */
  nameKey?: string;
  labelFormatter?: (label: string | number) => React.ReactNode;
  hideLabel?: boolean;
  className?: string;
};

type Row = {
  key: string;
  label: React.ReactNode;
  color?: string;
  value: number;
};

function toRows(
  payload: TooltipItem[] = [],
  config: ChartConfig = {},
  nameKey?: string,
): Row[] {
  return payload
    .filter((item) => item.type !== "none" && typeof item.value === "number")
    .map((item) => {
      const key = String(
        (nameKey ? item.payload?.[nameKey] : undefined) ??
          item.dataKey ??
          item.name ??
          "value",
      );
      return {
        // Pie sectors carry their colour on the row; series carry it on the item.
        color: nameKey
          ? item.payload?.fill || item.color
          : item.color || item.payload?.fill,
        key,
        label: config[key]?.label ?? item.name ?? key,
        value: item.value as number,
      };
    });
}

function Shell({
  label,
  labelFormatter,
  hideLabel,
  className,
  children,
}: Pick<
  ChartTooltipPresetProps,
  "label" | "labelFormatter" | "hideLabel" | "className"
> & { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "grid min-w-36 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!hideLabel && label !== undefined ? (
        <div className="font-medium">
          {labelFormatter ? labelFormatter(label) : label}
        </div>
      ) : null}
      <div className="grid gap-1.5">{children}</div>
    </div>
  );
}

function RowView({
  row,
  formatted,
  extra,
}: {
  row: Pick<Row, "label" | "color">;
  formatted: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {row.color ? (
        <span
          aria-hidden="true"
          className="size-2.5 shrink-0 rounded-xs"
          style={{ backgroundColor: row.color }}
        />
      ) : null}
      <span className="text-muted-foreground">{row.label}</span>
      <span className="ms-auto flex items-center gap-1.5 ps-3 font-medium font-mono text-foreground tabular-nums">
        {formatted}
        {extra}
      </span>
    </div>
  );
}

/** Every series plus a "Total" row — for stacked charts. */
export function ChartTooltipTotal({
  active,
  payload,
  config,
  valueFormatter = formatCompact,
  formatters,
  nameKey,
  totalLabel = "Total",
  ...shell
}: ChartTooltipPresetProps & { totalLabel?: React.ReactNode }) {
  const rows = toRows(payload, config, nameKey);
  if (!active || !rows.length) return null;
  const total = rows.reduce((sum, row) => sum + row.value, 0);

  return (
    <Shell {...shell}>
      {rows.map((row) => (
        <RowView
          formatted={(formatters?.[row.key] ?? valueFormatter)(row.value)}
          key={row.key}
          row={row}
        />
      ))}
      <div className="border-border/50 border-t pt-1.5">
        <RowView
          formatted={valueFormatter(total)}
          row={{ label: totalLabel }}
        />
      </div>
    </Shell>
  );
}

/** Series sorted by value, highest first — for many overlapping lines. */
export function ChartTooltipList({
  active,
  payload,
  config,
  valueFormatter = formatCompact,
  formatters,
  nameKey,
  limit,
  sort = true,
  ...shell
}: ChartTooltipPresetProps & {
  limit?: number;
  /** Set `false` to keep the chart's series order. */
  sort?: boolean;
}) {
  const rows = toRows(payload, config, nameKey);
  if (sort) rows.sort((a, b) => b.value - a.value);
  const shown = rows.slice(0, limit);
  if (!active || !shown.length) return null;

  return (
    <Shell {...shell}>
      {shown.map((row) => (
        <RowView
          formatted={(formatters?.[row.key] ?? valueFormatter)(row.value)}
          key={row.key}
          row={row}
        />
      ))}
    </Shell>
  );
}

/**
 * Each series against its previous-period value, with the % change.
 * `previous` maps a series key to the data field holding last period's value,
 * e.g. `{ revenue: "lastYear" }`.
 */
export function ChartTooltipComparison({
  active,
  payload,
  config,
  valueFormatter = formatCompact,
  formatters,
  nameKey,
  previous,
  invertDelta = false,
  ...shell
}: ChartTooltipPresetProps & {
  previous: Record<string, string>;
  /** Set when a drop is good news (latency, cost). */
  invertDelta?: boolean;
}) {
  const rows = toRows(payload, config, nameKey).filter(
    (row) => row.key in previous,
  );
  if (!active || !rows.length) return null;

  return (
    <Shell {...shell}>
      {rows.map((row) => {
        const format = formatters?.[row.key] ?? valueFormatter;
        const item = payload?.find((p) => String(p.dataKey) === row.key);
        const prev = item?.payload?.[previous[row.key] as string];
        const delta =
          typeof prev === "number" && prev !== 0
            ? (row.value - prev) / Math.abs(prev)
            : undefined;
        const good =
          delta !== undefined && (invertDelta ? delta < 0 : delta > 0);

        return (
          <div className="grid gap-1" key={row.key}>
            <RowView
              extra={
                delta !== undefined ? (
                  <span
                    className={cn(
                      "font-sans text-[0.625rem]",
                      delta === 0
                        ? "text-muted-foreground"
                        : good
                          ? "text-success-foreground"
                          : "text-destructive-foreground",
                    )}
                  >
                    {formatPercent(delta, { signed: true })}
                  </span>
                ) : null
              }
              formatted={format(row.value)}
              row={row}
            />
            {typeof prev === "number" ? (
              <div className="flex justify-between gap-3 ps-4.5 text-muted-foreground">
                <span>Previous</span>
                <span className="font-mono tabular-nums">{format(prev)}</span>
              </div>
            ) : null}
          </div>
        );
      })}
    </Shell>
  );
}

"use client";

import { cn } from "@/registry/default/lib/utils";

export type CategoryBarProps = {
  /** Size of each segment, left to right, e.g. [300, 280, 70, 200]. */
  values: number[];
  /** CSS colour per segment. Default: var(--chart-1) … var(--chart-5). */
  colors?: string[];
  /** Name per segment, used in the accessible description. */
  labels?: string[];
  /** Position on the same scale as `values`, e.g. a score of 712. */
  marker?: number;
  /** Print the boundary between segments under the bar. */
  showLabels?: boolean;
  valueFormatter?: (value: number) => string;
  className?: string;
  "aria-label"?: string;
};

export function CategoryBar({
  values,
  colors,
  labels,
  marker,
  showLabels = true,
  valueFormatter = String,
  className,
  "aria-label": ariaLabel,
}: CategoryBarProps) {
  const total = values.reduce((sum, v) => sum + Math.max(v, 0), 0);
  const percent = (v: number) => (total > 0 ? (v / total) * 100 : 0);
  const color = (i: number) => colors?.[i] ?? `var(--chart-${(i % 5) + 1})`;
  // Running totals: the boundaries printed under the bar.
  const bounds = [0];
  for (const v of values) bounds.push((bounds.at(-1) ?? 0) + Math.max(v, 0));
  const markerPercent =
    marker === undefined
      ? undefined
      : Math.min(Math.max(percent(marker), 0), 100);
  const description =
    ariaLabel ??
    [
      marker === undefined ? null : `Value ${valueFormatter(marker)}`,
      labels
        ?.map(
          (label, i) =>
            `${label} ${valueFormatter(bounds[i] ?? 0)}–${valueFormatter(bounds[i + 1] ?? 0)}`,
        )
        .join(", "),
    ]
      .filter(Boolean)
      .join(". ");

  return (
    <div
      aria-label={description || undefined}
      className={cn("w-full", className)}
      data-slot="category-bar"
      role="img"
    >
      <div className="relative">
        <div className="flex h-2 gap-0.5 overflow-hidden rounded-full">
          {values.map((v, i) => (
            <div
              key={i}
              style={{ backgroundColor: color(i), width: `${percent(v)}%` }}
            />
          ))}
        </div>
        {markerPercent !== undefined ? (
          <div
            aria-hidden="true"
            className="absolute -top-1 h-4 w-1 -translate-x-1/2 rounded-full bg-foreground ring-2 ring-background"
            style={{ left: `${markerPercent}%` }}
          />
        ) : null}
      </div>
      {showLabels ? (
        <div
          aria-hidden="true"
          className="relative mt-2 h-4 text-muted-foreground text-xs tabular-nums"
        >
          {bounds.map((b, i) => (
            <span
              className={cn(
                "absolute",
                i === 0
                  ? "start-0"
                  : i === bounds.length - 1
                    ? "end-0"
                    : "-translate-x-1/2",
              )}
              key={i}
              style={
                i > 0 && i < bounds.length - 1
                  ? { left: `${percent(b)}%` }
                  : undefined
              }
            >
              {valueFormatter(b)}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

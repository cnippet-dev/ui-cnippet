"use client";

import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type BulletChartProps = {
  value: number;
  /** Goal, drawn as a vertical marker. */
  target?: number;
  /** End of the scale. Default: the largest of value, target and ranges. */
  max?: number;
  /**
   * Upper bounds of the qualitative bands, ascending, e.g. [60, 80, 100] for
   * poor / ok / good. Drawn darkest first.
   */
  ranges?: number[];
  /** CSS colour of the value bar. */
  color?: string;
  valueFormatter?: (value: number) => string;
  className?: string;
  "aria-label"?: string;
};

export function BulletChart({
  value,
  target,
  max,
  ranges = [],
  color = "var(--chart-1)",
  valueFormatter = formatCompact,
  className,
  "aria-label": ariaLabel,
}: BulletChartProps) {
  const scale = max ?? Math.max(value, target ?? 0, ...ranges, 0);
  const percent = (v: number) =>
    scale > 0 ? Math.min(Math.max((v / scale) * 100, 0), 100) : 0;

  return (
    <div
      aria-label={
        ariaLabel ??
        `${valueFormatter(value)} of ${valueFormatter(scale)}${
          target === undefined ? "" : `, target ${valueFormatter(target)}`
        }`
      }
      className={cn("relative h-4 w-full", className)}
      data-slot="bullet-chart"
      role="img"
    >
      <div className="absolute inset-0 overflow-hidden rounded-sm bg-muted">
        {/* Widest band first so narrower (darker) bands paint on top. */}
        {[...ranges]
          .map((bound, i) => ({ bound, i }))
          .reverse()
          .map(({ bound, i }) => (
            <div
              className="absolute inset-y-0 start-0 bg-foreground"
              key={bound}
              style={{
                opacity: 0.06 + 0.06 * (ranges.length - 1 - i),
                width: `${percent(bound)}%`,
              }}
            />
          ))}
      </div>
      <div
        className="absolute inset-y-1 start-0 rounded-xs transition-[width] duration-500 motion-reduce:transition-none"
        style={{ backgroundColor: color, width: `${percent(value)}%` }}
      />
      {target !== undefined ? (
        <div
          className="absolute -inset-y-0.5 w-0.5 -translate-x-1/2 rounded-full bg-foreground"
          style={{ left: `${percent(target)}%` }}
        />
      ) : null}
    </div>
  );
}

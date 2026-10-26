"use client";

import { formatPercent } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type DeltaBarProps = {
  /** Change as a fraction from -1 to 1: 0.124 fills 12.4% of the right half. */
  value: number;
  /** Set when a drop is good news (cost, latency): flips the colours. */
  invertDelta?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function DeltaBar({
  value,
  invertDelta = false,
  className,
  "aria-label": ariaLabel,
}: DeltaBarProps) {
  const clamped = Math.min(Math.max(value, -1), 1);
  const good = invertDelta ? clamped < 0 : clamped > 0;
  const width = `${Math.abs(clamped) * 50}%`;

  return (
    <div
      aria-label={ariaLabel ?? formatPercent(value, { signed: true })}
      className={cn("relative h-2 w-full rounded-full bg-muted", className)}
      data-slot="delta-bar"
      role="img"
    >
      <div
        className={cn(
          "absolute inset-y-0 transition-[width] duration-500 motion-reduce:transition-none",
          clamped >= 0 ? "start-1/2 rounded-e-full" : "end-1/2 rounded-s-full",
          good ? "bg-success" : clamped === 0 ? "" : "bg-destructive",
        )}
        style={{ width }}
      />
      <div
        aria-hidden="true"
        className="absolute -inset-y-1 start-1/2 w-0.5 -translate-x-1/2 rounded-full bg-foreground/48"
      />
    </div>
  );
}

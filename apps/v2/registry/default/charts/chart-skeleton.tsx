"use client";

import { cn } from "@/registry/default/lib/utils";
import { Skeleton } from "@/registry/default/ui/skeleton";

export type ChartSkeletonProps = {
  variant?: "bar" | "line" | "area" | "donut";
  className?: string;
};

// Fixed heights (%) so server and client render the same bars.
const BARS = [46, 72, 58, 88, 64, 80, 52, 94, 70, 60, 84, 76];
const LINE =
  "M0 70 L9 58 L18 64 L27 44 L36 50 L45 32 L55 40 L64 26 L73 34 L82 18 L91 24 L100 12";

export function ChartSkeleton({
  variant = "bar",
  className,
}: ChartSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("relative flex aspect-video w-full", className)}
      data-slot="chart-skeleton"
      role="status"
    >
      <span className="sr-only">Loading chart</span>
      {variant === "bar" ? (
        <div className="flex size-full items-end gap-[3%]">
          {BARS.map((h) => (
            <Skeleton
              className="flex-1 rounded-b-none motion-reduce:animate-none"
              key={h}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : null}
      {variant === "line" || variant === "area" ? (
        <svg
          aria-hidden="true"
          className="size-full animate-pulse overflow-visible motion-reduce:animate-none"
          preserveAspectRatio="none"
          viewBox="0 0 100 80"
        >
          {variant === "area" ? (
            <path className="fill-muted" d={`${LINE} L100 80 L0 80 Z`} />
          ) : null}
          <path
            className="fill-none stroke-muted-foreground/24"
            d={LINE}
            strokeLinejoin="round"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
      {variant === "donut" ? (
        <Skeleton className="m-auto aspect-square h-full max-h-full rounded-full [mask:radial-gradient(circle,transparent_56%,#000_57%)] motion-reduce:animate-none" />
      ) : null}
    </div>
  );
}

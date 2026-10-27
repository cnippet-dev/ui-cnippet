"use client";

import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export type ProgressCircleProps = {
  value: number;
  max?: number;
  /** Diameter in px. */
  size?: number;
  strokeWidth?: number;
  /** CSS colour of the progress arc. */
  color?: string;
  /** Centre content, e.g. "72%". */
  children?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

export function ProgressCircle({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  color = "var(--chart-1)",
  children,
  className,
  "aria-label": ariaLabel,
}: ProgressCircleProps) {
  const clamped = Math.min(Math.max(value, 0), max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - (max > 0 ? clamped / max : 0));

  return (
    <div
      aria-label={ariaLabel}
      aria-valuemax={max}
      aria-valuemin={0}
      aria-valuenow={clamped}
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        className,
      )}
      data-slot="progress-circle"
      role="progressbar"
      style={{ height: size, width: size }}
    >
      <svg
        aria-hidden="true"
        className="-rotate-90"
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        width={size}
      >
        <circle
          className="stroke-muted"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      {children ? (
        <div className="absolute inset-0 flex items-center justify-center font-medium text-sm tabular-nums">
          {children}
        </div>
      ) : null}
    </div>
  );
}

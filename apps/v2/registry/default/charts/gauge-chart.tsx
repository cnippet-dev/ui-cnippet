"use client";

import type * as React from "react";
import { formatCompact } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type GaugeBand = {
  /** Upper bound of the band, on the gauge's scale. */
  to: number;
  /** CSS colour, e.g. "var(--success)". */
  color: string;
  /** Read out with the value, e.g. "Good". */
  label?: string;
};

export type GaugeChartProps = {
  value: number;
  min?: number;
  max?: number;
  /** Coloured ranges across the arc, ascending. Adds a needle by default. */
  bands?: GaugeBand[];
  /** Colour of the value arc when there are no bands. */
  color?: string;
  /** Default: true when `bands` are set. */
  showNeedle?: boolean;
  valueFormatter?: (value: number) => string;
  /** Text under the value, e.g. "LCP". */
  label?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
};

// Semicircle in a 200×110 box: centre (100, 100), radius 80.
const CX = 100;
const CY = 100;
const R = 80;
const STROKE = 14;

/** Point on the arc at t (0 = left end, 1 = right end). */
function point(t: number) {
  const angle = Math.PI * (1 - t);
  return `${CX + R * Math.cos(angle)} ${CY - R * Math.sin(angle)}`;
}

function arc(from: number, to: number) {
  return `M ${point(from)} A ${R} ${R} 0 0 1 ${point(to)}`;
}

export function GaugeChart({
  value,
  min = 0,
  max = 100,
  bands,
  color = "var(--chart-1)",
  showNeedle = Boolean(bands?.length),
  valueFormatter = formatCompact,
  label,
  className,
  "aria-label": ariaLabel,
}: GaugeChartProps) {
  const span = max - min || 1;
  const toT = (v: number) => Math.min(Math.max((v - min) / span, 0), 1);
  const t = toT(value);
  const band = bands?.find((b) => value <= b.to) ?? bands?.at(-1);

  return (
    <div
      aria-label={ariaLabel ?? (typeof label === "string" ? label : "Gauge")}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={value}
      aria-valuetext={`${valueFormatter(value)}${band?.label ? `, ${band.label}` : ""}`}
      className={cn("relative mx-auto w-full max-w-64", className)}
      data-slot="gauge-chart"
      role="meter"
    >
      <svg aria-hidden="true" className="w-full" viewBox="0 0 200 110">
        {bands?.length ? (
          bands.map((b, i) => (
            <path
              d={arc(toT(i === 0 ? min : (bands[i - 1]?.to ?? min)), toT(b.to))}
              fill="none"
              key={`${b.to}-${b.color}`}
              stroke={b.color}
              strokeWidth={STROKE}
            />
          ))
        ) : (
          <>
            <path
              className="stroke-muted"
              d={arc(0, 1)}
              fill="none"
              strokeLinecap="round"
              strokeWidth={STROKE}
            />
            <path
              className="transition-[stroke-dasharray] duration-700 ease-out motion-reduce:transition-none"
              d={arc(0, 1)}
              fill="none"
              pathLength={100}
              stroke={color}
              strokeDasharray={`${t * 100} 100`}
              strokeLinecap="round"
              strokeWidth={STROKE}
            />
          </>
        )}
        {showNeedle ? (
          <g
            className="transition-transform duration-700 ease-out motion-reduce:transition-none"
            style={{
              transform: `rotate(${t * 180 - 90}deg)`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            <path
              className="fill-foreground"
              d={`M ${CX - 3} ${CY} L ${CX} ${CY - R + 4} L ${CX + 3} ${CY} Z`}
            />
            <circle className="fill-foreground" cx={CX} cy={CY} r={6} />
          </g>
        ) : null}
      </svg>
      <div
        className={cn(
          "flex flex-col items-center",
          showNeedle ? "mt-1" : "absolute inset-x-0 bottom-0",
        )}
      >
        <span className="font-semibold text-2xl tabular-nums tracking-tight">
          {valueFormatter(value)}
        </span>
        {label || band?.label ? (
          <span className="text-muted-foreground text-xs">
            {label}
            {label && band?.label ? " · " : null}
            {band?.label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

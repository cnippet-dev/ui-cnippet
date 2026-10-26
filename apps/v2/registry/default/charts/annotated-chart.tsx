"use client";

import { ReferenceArea, ReferenceLine } from "recharts";
import { AreaChart } from "@/registry/default/charts/area-chart";
import { LineChart } from "@/registry/default/charts/line-chart";
import type { BaseChartProps } from "@/registry/default/lib/chart-utils";

export type ChartEvent = {
  /** `index` value the event happened at, e.g. "Oct 12". */
  x: string;
  label: string;
};

export type ChartTarget = {
  y: number;
  label: string;
};

export type ChartRange = {
  /** First and last `index` values of the period. */
  from: string;
  to: string;
  label?: string;
};

export type AnnotatedChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    chartType?: "area" | "line";
    /** Vertical markers, e.g. deploys or launches. */
    events?: ChartEvent[];
    /** Horizontal lines, e.g. a target or SLA. */
    targets?: ChartTarget[];
    /** Shaded periods, e.g. a campaign or an incident. */
    ranges?: ChartRange[];
  };

const labelClass = "fill-muted-foreground text-[0.625rem]";

export function AnnotatedChart<T extends Record<string, unknown>>({
  chartType = "line",
  events = [],
  targets = [],
  ranges = [],
  children,
  ...chartProps
}: AnnotatedChartProps<T>) {
  const annotations = (
    <>
      {ranges.map((r) => (
        <ReferenceArea
          fill="var(--muted-foreground)"
          fillOpacity={0.08}
          key={`${r.from}-${r.to}`}
          label={
            r.label
              ? {
                  className: labelClass,
                  position: "insideBottom",
                  value: r.label,
                }
              : undefined
          }
          x1={r.from}
          x2={r.to}
        />
      ))}
      {targets.map((t) => (
        <ReferenceLine
          key={`y-${t.y}`}
          label={{
            className: labelClass,
            position: "insideBottomRight",
            value: t.label,
          }}
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          y={t.y}
        />
      ))}
      {events.map((e, i) => (
        <ReferenceLine
          key={`x-${e.x}-${e.label}`}
          label={{
            className: labelClass,
            // Alternate rows so labels of nearby events don't overlap.
            offset: i % 2 ? 20 : 6,
            position: "insideTopLeft",
            value: e.label,
          }}
          stroke="var(--foreground)"
          strokeOpacity={0.4}
          x={e.x}
        />
      ))}
      {children}
    </>
  );
  const all = [
    ...ranges.map((r) => `${r.label ?? "Period"}: ${r.from} to ${r.to}`),
    ...targets.map((t) => `${t.label}: ${t.y}`),
    ...events.map((e) => `${e.label} at ${e.x}`),
  ];

  return (
    <div className="w-full" data-slot="annotated-chart">
      {chartType === "area" ? (
        <AreaChart {...chartProps}>{annotations}</AreaChart>
      ) : (
        <LineChart {...chartProps}>{annotations}</LineChart>
      )}
      {/* Annotations are drawn, not written; list them for screen readers. */}
      {all.length ? (
        <ul className="sr-only">
          {all.map((text) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

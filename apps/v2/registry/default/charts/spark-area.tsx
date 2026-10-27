"use client";

import * as React from "react";
import { Area, AreaChart, YAxis } from "recharts";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  describeChart,
  trendColor,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

export type SparkAreaProps<T extends Record<string, unknown>> = {
  data: T[];
  index: keyof T & string;
  categories: (keyof T & string)[];
  config?: ChartConfig;
  /** Colour a single series green when it ends higher than it starts, red when lower. */
  colorByTrend?: boolean;
  /** Set when a drop is good news (latency, cost): flips the trend colours. */
  invertTrend?: boolean;
  type?: "default" | "stacked";
  curve?: "linear" | "monotone" | "step";
  className?: string;
  "aria-label"?: string;
};

export function SparkArea<T extends Record<string, unknown>>({
  data,
  index,
  categories,
  config,
  colorByTrend = false,
  invertTrend = false,
  type = "default",
  curve = "monotone",
  className,
  "aria-label": ariaLabel,
}: SparkAreaProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [first] = categories;
  const trend =
    colorByTrend && first
      ? trendColor(
          data.map((row) => row[first]),
          invertTrend,
        )
      : undefined;
  const resolvedConfig = buildChartConfig(categories, {
    ...config,
    ...(trend && first
      ? {
          [first]: {
            color: trend,
            icon: config?.[first]?.icon,
            label: config?.[first]?.label,
          },
        }
      : {}),
  });

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Trend", categories, index)}
      className={cn("aspect-auto h-10 w-32", className)}
      config={resolvedConfig}
      role="img"
    >
      <AreaChart data={data} margin={{ bottom: 1, left: 1, right: 1, top: 1 }}>
        <defs>
          {categories.map((key) => (
            <linearGradient
              id={`${id}-${key}`}
              key={key}
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0.4}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${key})`}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <YAxis domain={["dataMin", "dataMax"]} hide />
        {categories.map((key) => (
          <Area
            dataKey={key as string}
            dot={false}
            fill={`url(#${id}-${key})`}
            isAnimationActive={!reduceMotion}
            key={key}
            stackId={type === "stacked" ? "stack" : undefined}
            stroke={`var(--color-${key})`}
            strokeWidth={1.5}
            type={curve}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

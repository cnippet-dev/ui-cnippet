"use client";

import { Line, LineChart, YAxis } from "recharts";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  describeChart,
  trendColor,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

export type SparkLineProps<T extends Record<string, unknown>> = {
  data: T[];
  index: keyof T & string;
  categories: (keyof T & string)[];
  config?: ChartConfig;
  /** Colour a single series green when it ends higher than it starts, red when lower. */
  colorByTrend?: boolean;
  /** Set when a drop is good news (latency, cost): flips the trend colours. */
  invertTrend?: boolean;
  /** Mark the last point with a dot. */
  showLastDot?: boolean;
  curve?: "linear" | "monotone" | "step";
  className?: string;
  "aria-label"?: string;
};

export function SparkLine<T extends Record<string, unknown>>({
  data,
  index,
  categories,
  config,
  colorByTrend = false,
  invertTrend = false,
  showLastDot = false,
  curve = "monotone",
  className,
  "aria-label": ariaLabel,
}: SparkLineProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
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
  const lastIndex = data.length - 1;

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Trend", categories, index)}
      className={cn("aspect-auto h-10 w-32", className)}
      config={resolvedConfig}
      role="img"
    >
      <LineChart data={data} margin={{ bottom: 3, left: 3, right: 3, top: 3 }}>
        <YAxis domain={["dataMin", "dataMax"]} hide />
        {categories.map((key) => (
          <Line
            dataKey={key as string}
            dot={
              showLastDot
                ? (props: { cx?: number; cy?: number; index?: number }) =>
                    props.index === lastIndex ? (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        fill={`var(--color-${key})`}
                        key={`${key}-last`}
                        r={2.5}
                      />
                    ) : (
                      <g key={`${key}-${props.index}`} />
                    )
                : false
            }
            isAnimationActive={!reduceMotion}
            key={key}
            stroke={`var(--color-${key})`}
            strokeWidth={1.5}
            type={curve}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}

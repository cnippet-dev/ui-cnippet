"use client";

import { Bar, BarChart, Cell } from "recharts";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  buildChartConfig,
  describeChart,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { type ChartConfig, ChartContainer } from "@/registry/default/ui/chart";

export type SparkBarProps<T extends Record<string, unknown>> = {
  data: T[];
  index: keyof T & string;
  categories: (keyof T & string)[];
  config?: ChartConfig;
  /** Colour positive bars green and negative bars red, e.g. for win/loss. */
  colorBySign?: boolean;
  type?: "default" | "stacked";
  className?: string;
  "aria-label"?: string;
};

export function SparkBar<T extends Record<string, unknown>>({
  data,
  index,
  categories,
  config,
  colorBySign = false,
  type = "default",
  className,
  "aria-label": ariaLabel,
}: SparkBarProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const resolvedConfig = buildChartConfig(categories, config);

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Bars", categories, index)}
      className={cn("aspect-auto h-10 w-32", className)}
      config={resolvedConfig}
      role="img"
    >
      <BarChart
        barCategoryGap="15%"
        data={data}
        margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
      >
        {categories.map((key) => (
          <Bar
            dataKey={key as string}
            fill={`var(--color-${key})`}
            isAnimationActive={!reduceMotion}
            key={key}
            radius={1}
            stackId={type === "stacked" ? "stack" : undefined}
          >
            {colorBySign
              ? data.map((row, i) => (
                  <Cell
                    fill={
                      Number(row[key]) < 0
                        ? "var(--destructive)"
                        : "var(--success)"
                    }
                    key={i}
                  />
                ))
              : null}
          </Bar>
        ))}
      </BarChart>
    </ChartContainer>
  );
}

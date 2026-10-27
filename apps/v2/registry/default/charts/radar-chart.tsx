"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart as RechartsRadarChart,
} from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  type BaseChartProps,
  buildChartConfig,
  describeChart,
  formatCompact,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
} from "@/registry/default/ui/chart";

export type RadarChartProps<T extends Record<string, unknown>> = Omit<
  BaseChartProps<T>,
  "showXAxis" | "showYAxis" | "yAxisWidth"
> & {
  gridType?: "polygon" | "circle";
  /** Fill the shape under each line. */
  filled?: boolean;
  showDots?: boolean;
};

export function RadarChart<T extends Record<string, unknown>>({
  data,
  index,
  categories,
  config,
  valueFormatter = formatCompact,
  indexFormatter,
  showGrid = true,
  showLegend = categories.length > 1,
  showTooltip = true,
  legendPosition = "bottom",
  loading = false,
  emptyState,
  className,
  children,
  "aria-label": ariaLabel,
  gridType = "polygon",
  filled = true,
  showDots = false,
}: RadarChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const resolvedConfig = buildChartConfig(categories, config);

  if (loading) return <ChartSkeleton className={className} variant="donut" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  return (
    <ChartContainer
      aria-label={ariaLabel ?? describeChart("Radar chart", categories, index)}
      className={cn("w-full", className)}
      config={resolvedConfig}
      role="figure"
    >
      <RechartsRadarChart accessibilityLayer data={data}>
        {showGrid ? <PolarGrid gridType={gridType} /> : null}
        <PolarAngleAxis dataKey={index as string} tickFormatter={formatIndex} />
        {showTooltip ? (
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                labelFormatter={indexFormatter && formatIndex}
                sort={false}
                valueFormatter={valueFormatter}
              />
            }
            cursor={false}
          />
        ) : null}
        {showLegend ? (
          <ChartLegend
            content={<ChartLegendContent />}
            itemSorter={null}
            verticalAlign={legendPosition}
          />
        ) : null}
        {categories.map((key) => (
          <Radar
            dataKey={key as string}
            dot={showDots ? { fillOpacity: 1, r: 3 } : false}
            fill={`var(--color-${key})`}
            fillOpacity={filled ? 0.25 : 0}
            isAnimationActive={!reduceMotion}
            key={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
          />
        ))}
        {children}
      </RechartsRadarChart>
    </ChartContainer>
  );
}

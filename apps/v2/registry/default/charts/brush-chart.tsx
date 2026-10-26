"use client";

import { Area, Brush, AreaChart as RechartsAreaChart } from "recharts";
import { AreaChart } from "@/registry/default/charts/area-chart";
import { LineChart } from "@/registry/default/charts/line-chart";
import type { BaseChartProps } from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";

export type BrushChartProps<T extends Record<string, unknown>> =
  BaseChartProps<T> & {
    chartType?: "area" | "line";
    /** Rows visible at first, counted from the end. Default: all rows. */
    defaultWindow?: number;
    /** Called when the brush moves, with the first and last visible row index. */
    onRangeChange?: (range: { startIndex: number; endIndex: number }) => void;
  };

export function BrushChart<T extends Record<string, unknown>>({
  chartType = "area",
  defaultWindow,
  onRangeChange,
  className,
  children,
  ...chartProps
}: BrushChartProps<T>) {
  const { data, index, categories, indexFormatter } = chartProps;
  const [first] = categories;
  const startIndex =
    defaultWindow === undefined ? 0 : Math.max(data.length - defaultWindow, 0);

  const brush = (
    <Brush
      dataKey={index as string}
      endIndex={Math.max(data.length - 1, 0)}
      fill="var(--background)"
      height={40}
      onChange={(range) => {
        if (range.startIndex !== undefined && range.endIndex !== undefined) {
          onRangeChange?.({
            endIndex: range.endIndex,
            startIndex: range.startIndex,
          });
        }
      }}
      startIndex={startIndex}
      stroke="var(--border)"
      tickFormatter={(value) =>
        indexFormatter ? indexFormatter(String(value)) : String(value)
      }
      travellerWidth={8}
    >
      {/* The overview inside the brush: the first series, muted. */}
      <RechartsAreaChart data={data}>
        {first ? (
          <Area
            dataKey={first as string}
            fill="var(--muted-foreground)"
            fillOpacity={0.15}
            isAnimationActive={false}
            stroke="var(--muted-foreground)"
            strokeOpacity={0.4}
            type="monotone"
          />
        ) : null}
      </RechartsAreaChart>
    </Brush>
  );
  // Brush texts and travellers default to fixed greys; map them to theme tokens.
  const brushClasses = cn(
    "[&_.recharts-brush-texts_text]:fill-muted-foreground [&_.recharts-brush-traveller_rect]:fill-muted-foreground",
    className,
  );

  return chartType === "line" ? (
    <LineChart {...chartProps} className={brushClasses}>
      {brush}
      {children}
    </LineChart>
  ) : (
    <AreaChart {...chartProps} className={brushClasses}>
      {brush}
      {children}
    </AreaChart>
  );
}

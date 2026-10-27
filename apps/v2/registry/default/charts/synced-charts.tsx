"use client";

import * as React from "react";
import { AreaChart } from "@/registry/default/charts/area-chart";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { LineChart } from "@/registry/default/charts/line-chart";
import { cn } from "@/registry/default/lib/utils";
import type { ChartConfig } from "@/registry/default/ui/chart";

export type SyncedChartPanel<T extends Record<string, unknown>> = {
  title: string;
  categories: (keyof T & string)[];
  type?: "area" | "line" | "bar";
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  /** Show the panel's y-axis. Default: true. */
  showYAxis?: boolean;
};

export type SyncedChartsProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Shared x-axis field, e.g. "time". */
  index: keyof T & string;
  panels: SyncedChartPanel<T>[];
  indexFormatter?: (value: string) => string;
  /** Height of each panel's chart. */
  panelClassName?: string;
  yAxisWidth?: number;
  className?: string;
};

export function SyncedCharts<T extends Record<string, unknown>>({
  data,
  index,
  panels,
  indexFormatter,
  panelClassName = "h-28",
  yAxisWidth = 56,
  className,
}: SyncedChartsProps<T>) {
  const syncId = React.useId();

  return (
    <div
      className={cn("grid w-full gap-4", className)}
      data-slot="synced-charts"
    >
      {panels.map((panel, i) => {
        const Chart =
          panel.type === "bar"
            ? BarChart
            : panel.type === "line"
              ? LineChart
              : AreaChart;
        return (
          <div key={panel.title}>
            <div className="mb-1 font-medium text-muted-foreground text-xs">
              {panel.title}
            </div>
            <Chart
              aria-label={`${panel.title} by ${index}`}
              categories={panel.categories}
              className={panelClassName}
              config={panel.config}
              data={data}
              index={index}
              indexFormatter={indexFormatter}
              showLegend={panel.categories.length > 1}
              // Only the bottom panel shows the shared x-axis.
              showXAxis={i === panels.length - 1}
              showYAxis={panel.showYAxis ?? true}
              syncId={syncId}
              valueFormatter={panel.valueFormatter}
              yAxisWidth={yAxisWidth}
            />
          </div>
        );
      })}
    </div>
  );
}

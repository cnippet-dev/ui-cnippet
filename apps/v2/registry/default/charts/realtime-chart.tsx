"use client";

import { PauseIcon, PlayIcon } from "lucide-react";
import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import {
  buildChartConfig,
  formatCompact,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { Button } from "@/registry/default/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

type Point = { t: number } & Record<string, number>;

export type RealtimeChartProps = {
  /** Series keys returned by `onTick`, e.g. ["rps"]. */
  categories: string[];
  /** Called every `interval` ms; returns the next value per series. */
  onTick: () => Record<string, number>;
  /** Milliseconds between points. */
  interval?: number;
  /** Points kept on screen; older ones scroll off. */
  windowSize?: number;
  config?: ChartConfig;
  valueFormatter?: (value: number) => string;
  /** Fixed y-axis range, e.g. [0, 100]; default fits the data. */
  yDomain?: [number, number];
  /** Show the live indicator, latest values and pause button. */
  showControls?: boolean;
  /** Start paused. */
  defaultPaused?: boolean;
  yAxisWidth?: number;
  className?: string;
  "aria-label"?: string;
};

const formatTime = (t: number) =>
  new Date(t).toLocaleTimeString("en-US", {
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
  });

export function RealtimeChart({
  categories,
  onTick,
  interval = 1000,
  windowSize = 60,
  config,
  valueFormatter = formatCompact,
  yDomain,
  showControls = true,
  defaultPaused = false,
  yAxisWidth = 48,
  className,
  "aria-label": ariaLabel,
}: RealtimeChartProps) {
  const [points, setPoints] = React.useState<Point[]>([]);
  const [paused, setPaused] = React.useState(defaultPaused);
  // Keep the latest onTick without restarting the interval on every render.
  const tick = React.useRef(onTick);
  tick.current = onTick;

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setPoints((prev) =>
        [...prev, { ...tick.current(), t: Date.now() } as Point].slice(
          -windowSize,
        ),
      );
    }, interval);
    return () => clearInterval(id);
  }, [paused, interval, windowSize]);

  const resolvedConfig = buildChartConfig(categories, config);
  const latest = points.at(-1);

  return (
    <div className="grid w-full gap-3" data-slot="realtime-chart">
      {showControls ? (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="flex items-center gap-2 text-xs">
            <span
              aria-hidden="true"
              className={cn(
                "size-2 rounded-full",
                paused
                  ? "bg-muted-foreground"
                  : "bg-success motion-safe:animate-pulse",
              )}
            />
            {paused ? "Paused" : "Live"}
          </span>
          {categories.map((key) => (
            <span className="flex items-baseline gap-1.5 text-sm" key={key}>
              <span className="text-muted-foreground text-xs">
                {resolvedConfig[key]?.label}
              </span>
              <span className="font-semibold tabular-nums">
                {latest?.[key] === undefined
                  ? "—"
                  : valueFormatter(latest[key])}
              </span>
            </span>
          ))}
          <Button
            aria-pressed={paused}
            className="ms-auto"
            onClick={() => setPaused((p) => !p)}
            size="xs"
            variant="outline"
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? "Resume" : "Pause"}
          </Button>
        </div>
      ) : null}
      <ChartContainer
        aria-label={ariaLabel ?? `Live chart of ${categories.join(", ")}`}
        className={cn("w-full", className)}
        config={resolvedConfig}
        role="figure"
      >
        <LineChart
          accessibilityLayer
          data={points}
          margin={{ left: 0, right: 12, top: 8 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="t"
            domain={["dataMin", "dataMax"]}
            minTickGap={40}
            scale="time"
            tickFormatter={(value: number) => formatTime(value)}
            tickLine={false}
            tickMargin={8}
            type="number"
          />
          <YAxis
            axisLine={false}
            domain={yDomain ?? ["auto", "auto"]}
            tickFormatter={(value: number) => valueFormatter(value)}
            tickLine={false}
            width={yAxisWidth}
          />
          <ChartTooltip
            content={
              <ChartTooltipList
                config={resolvedConfig}
                labelFormatter={(label) => formatTime(Number(label))}
                sort={false}
                valueFormatter={valueFormatter}
              />
            }
          />
          {categories.map((key) => (
            <Line
              dataKey={key}
              dot={false}
              // A stream redraws every tick; animating each update only adds jitter.
              isAnimationActive={false}
              key={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              type="monotone"
            />
          ))}
        </LineChart>
      </ChartContainer>
    </div>
  );
}

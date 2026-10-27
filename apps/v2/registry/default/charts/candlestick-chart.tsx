"use client";

import type * as React from "react";
import { Bar, CartesianGrid, ComposedChart, XAxis, YAxis } from "recharts";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { ChartTooltipRows } from "@/registry/default/charts/chart-tooltip-presets";
import { useMediaQuery } from "@/registry/default/hooks/use-media-query";
import {
  formatCompact,
  getYAxisDomain,
} from "@/registry/default/lib/chart-utils";
import { cn } from "@/registry/default/lib/utils";
import { ChartContainer, ChartTooltip } from "@/registry/default/ui/chart";

export type CandlestickChartProps<T extends Record<string, unknown>> = {
  data: T[];
  /** Key of the date / period field, e.g. "date". */
  index: keyof T & string;
  open?: keyof T & string;
  high?: keyof T & string;
  low?: keyof T & string;
  close?: keyof T & string;
  /** Adds volume bars along the bottom of the plot. */
  volume?: keyof T & string;
  /** Colour of candles that close higher than they open. */
  upColor?: string;
  /** Colour of candles that close lower than they open. */
  downColor?: string;
  valueFormatter?: (value: number) => string;
  volumeFormatter?: (value: number) => string;
  indexFormatter?: (value: string) => string;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  yAxisWidth?: number;
  loading?: boolean;
  emptyState?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  /** Extra Recharts elements, e.g. a moving-average <Line dataKey="ma7" />. */
  children?: React.ReactNode;
  syncId?: string;
};

type ShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: Record<string, unknown>;
};

export function CandlestickChart<T extends Record<string, unknown>>({
  data,
  index,
  open = "open" as keyof T & string,
  high = "high" as keyof T & string,
  low = "low" as keyof T & string,
  close = "close" as keyof T & string,
  volume,
  upColor = "var(--success)",
  downColor = "var(--destructive)",
  valueFormatter = formatCompact,
  volumeFormatter = formatCompact,
  indexFormatter,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showTooltip = true,
  yAxisWidth = 48,
  loading = false,
  emptyState,
  className,
  children,
  syncId,
  "aria-label": ariaLabel,
}: CandlestickChartProps<T>) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (loading) return <ChartSkeleton className={className} variant="bar" />;
  if (data.length === 0) {
    return emptyState ?? <ChartEmpty className={className} />;
  }

  const n = (row: Record<string, unknown> | undefined, key: string) =>
    Number(row?.[key]);
  const maxVolume = volume ? Math.max(...data.map((row) => n(row, volume))) : 0;
  const formatIndex = (value: unknown) =>
    indexFormatter ? indexFormatter(String(value)) : String(value);

  // The bar spans low→high; open and close are placed on the same scale inside it.
  const Candle = ({
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    payload,
  }: ShapeProps) => {
    const h = n(payload, high);
    const l = n(payload, low);
    const o = n(payload, open);
    const c = n(payload, close);
    const toY = (v: number) => (h === l ? y : y + ((h - v) / (h - l)) * height);
    const color = c >= o ? upColor : downColor;
    const bodyWidth = Math.max(Math.min(width * 0.7, 16), 1);
    const top = toY(Math.max(o, c));
    const cx = x + width / 2;
    return (
      <g>
        <line
          stroke={color}
          strokeWidth={1}
          x1={cx}
          x2={cx}
          y1={y}
          y2={y + height}
        />
        <rect
          fill={color}
          height={Math.max(toY(Math.min(o, c)) - top, 1)}
          width={bodyWidth}
          x={cx - bodyWidth / 2}
          y={top}
        />
      </g>
    );
  };

  return (
    <ChartContainer
      aria-label={ariaLabel ?? `Candlestick chart of price by ${index}`}
      className={cn("w-full", className)}
      config={{}}
      role="figure"
    >
      <ComposedChart
        accessibilityLayer
        data={data}
        margin={{ left: showYAxis ? 0 : 12, right: 12, top: 8 }}
        syncId={syncId}
      >
        {showGrid ? <CartesianGrid vertical={false} /> : null}
        <XAxis
          axisLine={false}
          dataKey={index as string}
          hide={!showXAxis}
          interval="preserveStartEnd"
          minTickGap={16}
          tickFormatter={formatIndex}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          {...getYAxisDomain(
            Math.min(...data.map((row) => n(row, low))),
            Math.max(...data.map((row) => n(row, high))),
          )}
          hide={!showYAxis}
          tickFormatter={(value: number) => valueFormatter(value)}
          tickLine={false}
          width={yAxisWidth}
        />
        {volume ? (
          // Volume only uses the bottom quarter of the plot.
          <>
            <XAxis dataKey={index as string} hide xAxisId="volume" />
            <YAxis domain={[0, maxVolume * 4]} hide yAxisId="volume" />
          </>
        ) : null}
        {showTooltip ? (
          <ChartTooltip
            content={({ active, payload }) => {
              const row = payload?.[0]?.payload as T | undefined;
              if (!active || !row) return null;
              const up = n(row, close) >= n(row, open);
              const rows: [string, string][] = [
                ["Open", valueFormatter(n(row, open))],
                ["High", valueFormatter(n(row, high))],
                ["Low", valueFormatter(n(row, low))],
                ["Close", valueFormatter(n(row, close))],
              ];
              if (volume)
                rows.push(["Volume", volumeFormatter(n(row, volume))]);
              return (
                <ChartTooltipRows
                  color={up ? upColor : downColor}
                  rows={rows}
                  title={formatIndex(row[index])}
                />
              );
            }}
            cursor={false}
          />
        ) : null}
        {volume ? (
          <Bar
            dataKey={volume as string}
            fill="var(--muted-foreground)"
            fillOpacity={0.25}
            isAnimationActive={!reduceMotion}
            xAxisId="volume"
            yAxisId="volume"
          />
        ) : null}
        <Bar
          dataKey={(row: T) => [n(row, low), n(row, high)]}
          isAnimationActive={!reduceMotion}
          name="price"
          shape={Candle}
        />
        {children}
      </ComposedChart>
    </ChartContainer>
  );
}

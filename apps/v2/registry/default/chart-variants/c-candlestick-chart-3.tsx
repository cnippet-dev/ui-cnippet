"use client";

import { Line } from "recharts";
import { CandlestickChart } from "@/registry/default/charts/candlestick-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// 40 trading days of deterministic OHLC data plus a 7-day moving average.
let price = 412;
const candles = Array.from({ length: 40 }, (_, i) => {
  const open = price;
  const close = +(open + Math.sin(i * 0.6) * 6 + Math.cos(i * 1.9) * 3).toFixed(
    2,
  );
  price = close;
  return {
    close,
    date: `Day ${i + 1}`,
    high: +(Math.max(open, close) + 2 + (i % 4)).toFixed(2),
    low: +(Math.min(open, close) - 2 - (i % 3)).toFixed(2),
    open,
  };
});
const data = candles.map((row, i) => {
  const window = candles.slice(Math.max(0, i - 6), i + 1);
  return {
    ...row,
    ma7:
      i < 6
        ? null
        : +(
            window.reduce((sum, c) => sum + c.close, 0) / window.length
          ).toFixed(2),
  };
});

export default function MovingAverage() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Daily candles with a 7-day moving average"
      footer="The moving average is a plain Recharts <Line> passed as a child."
      title="NVX"
    >
      <CandlestickChart
        className="h-48"
        data={data}
        index="date"
        indexFormatter={(v) => v.replace("Day ", "")}
        valueFormatter={(v) => formatCurrency(v, "USD", { compact: false })}
        yAxisWidth={64}
      >
        <Line
          dataKey="ma7"
          dot={false}
          isAnimationActive={false}
          name="7-day average"
          stroke="var(--chart-1)"
          strokeWidth={2}
          type="monotone"
        />
      </CandlestickChart>
    </ChartCard>
  );
}

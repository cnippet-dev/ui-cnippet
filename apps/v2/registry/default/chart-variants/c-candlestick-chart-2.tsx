"use client";

import { CandlestickChart } from "@/registry/default/charts/candlestick-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import {
  formatCompact,
  formatCurrency,
} from "@/registry/default/lib/chart-utils";

// 24 hourly candles with volume, deterministic.
let price = 64200;
const data = Array.from({ length: 24 }, (_, i) => {
  const open = price;
  const close = Math.round(
    open + Math.sin(i * 0.9) * 420 + Math.cos(i * 2.3) * 180,
  );
  price = close;
  return {
    close,
    high: Math.max(open, close) + 120 + (i % 5) * 40,
    hour: `${String(i).padStart(2, "0")}:00`,
    low: Math.min(open, close) - 90 - (i % 3) * 60,
    open,
    volume: Math.round(1800 + Math.abs(close - open) * 6 + (i % 7) * 140),
  };
});

export default function CryptoVolume() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="BTC/USD, hourly candles with traded volume, last 24 hours"
      title="BTC/USD"
      value={formatCurrency(data.at(-1)?.close ?? 0, "USD", { compact: false })}
    >
      <CandlestickChart
        className="h-48"
        data={data}
        index="hour"
        valueFormatter={formatCurrency}
        volume="volume"
        volumeFormatter={(v) => `${formatCompact(v)} BTC`}
      />
    </ChartCard>
  );
}

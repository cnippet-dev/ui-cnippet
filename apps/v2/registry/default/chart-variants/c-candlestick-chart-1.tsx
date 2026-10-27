"use client";

import { CandlestickChart } from "@/registry/default/charts/candlestick-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// 30 trading days of deterministic OHLC data.
let price = 182;
const data = Array.from({ length: 30 }, (_, i) => {
  const open = price;
  const close = +(open + Math.sin(i * 1.7) * 4 + 0.6).toFixed(2);
  price = close;
  return {
    close,
    date: `Oct ${i + 1}`,
    high: +(Math.max(open, close) + 1.5 + (i % 3)).toFixed(2),
    low: +(Math.min(open, close) - 1.2 - (i % 4) * 0.6).toFixed(2),
    open,
  };
});

export default function StockPrice() {
  const last = data.at(-1)?.close ?? 0;
  return (
    <ChartCard
      className="max-w-2xl"
      delta={(last - 182) / 182}
      description="ACME, daily candles, October"
      title="ACME"
      value={formatCurrency(last, "USD", { compact: false })}
    >
      <CandlestickChart
        className="h-48"
        data={data}
        index="date"
        valueFormatter={(v) => formatCurrency(v, "USD", { compact: false })}
        yAxisWidth={64}
      />
    </ChartCard>
  );
}

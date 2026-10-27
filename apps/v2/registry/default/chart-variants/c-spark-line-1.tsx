"use client";

import { SparkLine } from "@/registry/default/charts/spark-line";
import { formatPercent } from "@/registry/default/lib/chart-utils";

// Closing prices, last 10 trading days.
const tickers = [
  {
    prices: [
      182.1, 184.4, 183.2, 186.9, 188.3, 187.5, 190.2, 191.8, 190.9, 193.4,
    ],
    symbol: "AAPL",
  },
  {
    prices: [
      415.2, 412.8, 409.6, 411.3, 406.9, 404.1, 401.7, 403.2, 399.8, 397.5,
    ],
    symbol: "MSFT",
  },
  {
    prices: [
      171.4, 173.9, 176.2, 175.1, 178.8, 181.3, 180.6, 184.2, 186.7, 188.1,
    ],
    symbol: "GOOGL",
  },
  {
    prices: [
      242.6, 238.1, 241.9, 236.4, 231.8, 229.5, 233.2, 227.9, 224.6, 221.3,
    ],
    symbol: "TSLA",
  },
];

export default function StockTicker() {
  return (
    <ul className="w-full max-w-md divide-y rounded-lg border bg-card">
      {tickers.map((t) => {
        const first = t.prices[0] ?? 0;
        const last = t.prices.at(-1) ?? 0;
        const change = (last - first) / first;
        return (
          <li className="flex items-center gap-4 px-4 py-3" key={t.symbol}>
            <span className="w-16 font-medium font-mono text-sm">
              {t.symbol}
            </span>
            <SparkLine
              aria-label={`${t.symbol}, last 10 days`}
              categories={["price"]}
              className="h-8 flex-1"
              colorByTrend
              data={t.prices.map((price, day) => ({ day, price }))}
              index="day"
              showLastDot
            />
            <span className="w-20 text-end text-sm tabular-nums">
              ${last.toFixed(2)}
            </span>
            <span
              className={
                change >= 0
                  ? "w-16 text-end text-sm text-success-foreground tabular-nums"
                  : "w-16 text-end text-destructive-foreground text-sm tabular-nums"
              }
            >
              {formatPercent(change, { signed: true })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { useRef } from "react";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { RealtimeChart } from "@/registry/default/charts/realtime-chart";

export default function LivePrice() {
  // A random walk standing in for a price feed.
  const price = useRef(64250);

  return (
    <ChartCard className="max-w-2xl" title="BTC / USD">
      <RealtimeChart
        categories={["price"]}
        className="h-48"
        config={{ price: { color: "var(--chart-4)", label: "Price" } }}
        interval={800}
        onTick={() => {
          price.current *= 1 + (Math.random() - 0.495) * 0.002;
          return { price: Math.round(price.current) };
        }}
        valueFormatter={(value) =>
          `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        }
        windowSize={50}
        yAxisWidth={64}
      />
    </ChartCard>
  );
}

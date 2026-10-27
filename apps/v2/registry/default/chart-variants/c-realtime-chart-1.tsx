"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RealtimeChart } from "@/registry/default/charts/realtime-chart";

// Stand-in for a websocket: requests per second with noise and the odd burst.
function nextRps() {
  const base = 420 + 60 * Math.sin(Date.now() / 8000);
  const burst = Math.random() < 0.08 ? 180 : 0;
  return { rps: Math.round(base + (Math.random() - 0.5) * 70 + burst) };
}

export default function LiveRequests() {
  return (
    <ChartCard className="max-w-2xl" title="Requests per second">
      <RealtimeChart
        categories={["rps"]}
        className="h-48"
        config={{ rps: { color: "var(--chart-1)", label: "req/s" } }}
        onTick={nextRps}
        windowSize={40}
      />
    </ChartCard>
  );
}

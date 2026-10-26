"use client";

import { SyncedCharts } from "@/registry/default/charts/synced-charts";

// One host, last 60 minutes: a batch job at :35 spikes CPU, memory and network together.
const data = Array.from({ length: 60 }, (_, i) => {
  const job = i >= 35 && i < 44 ? 1 : 0;
  return {
    cpu: Math.round(28 + 6 * Math.sin(i / 4) + job * 48),
    memory: Math.round((5.2 + 0.02 * i + job * 2.1) * 10) / 10,
    network: Math.round(12 + 4 * Math.cos(i / 5) + job * 36),
    time: `14:${String(i).padStart(2, "0")}`,
  };
});

export default function ServerMetrics() {
  return (
    <div className="w-full max-w-2xl rounded-lg border bg-card p-5">
      <div className="mb-3 font-medium text-sm">web-2 · last hour</div>
      <SyncedCharts
        data={data}
        index="time"
        panelClassName="h-20"
        panels={[
          {
            categories: ["cpu"],
            config: { cpu: { color: "var(--chart-1)", label: "CPU" } },
            title: "CPU",
            valueFormatter: (value) => `${value}%`,
          },
          {
            categories: ["memory"],
            config: { memory: { color: "var(--chart-2)", label: "Memory" } },
            title: "Memory",
            type: "line",
            valueFormatter: (value) => `${value} GB`,
          },
          {
            categories: ["network"],
            config: { network: { color: "var(--chart-5)", label: "Network" } },
            title: "Network",
            valueFormatter: (value) => `${value} MB/s`,
          },
        ]}
      />
    </div>
  );
}

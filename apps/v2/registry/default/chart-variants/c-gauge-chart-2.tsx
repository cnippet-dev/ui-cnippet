"use client";

import { GaugeChart } from "@/registry/default/charts/gauge-chart";

const hosts = [
  { cpu: 38, name: "web-1" },
  { cpu: 71, name: "web-2" },
  { cpu: 93, name: "worker-1" },
];

// Same thresholds as the alerting rules: amber from 70%, red from 90%.
function loadColor(cpu: number) {
  if (cpu >= 90) return "var(--destructive)";
  if (cpu >= 70) return "var(--warning)";
  return "var(--success)";
}

export default function CpuLoad() {
  return (
    <div className="grid w-full max-w-lg grid-cols-3 gap-3">
      {hosts.map((h) => (
        <div className="rounded-lg border bg-card p-4" key={h.name}>
          <GaugeChart
            aria-label={`${h.name} CPU load`}
            color={loadColor(h.cpu)}
            label={h.name}
            value={h.cpu}
            valueFormatter={(value) => `${value}%`}
          />
        </div>
      ))}
    </div>
  );
}

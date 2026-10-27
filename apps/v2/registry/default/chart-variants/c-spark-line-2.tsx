"use client";

import { SparkLine } from "@/registry/default/charts/spark-line";
import { Badge } from "@/registry/default/ui/badge";

// p95 latency (ms) per service, last 12 checks.
const services = [
  {
    latency: [118, 122, 119, 125, 121, 117, 120, 123, 119, 116, 121, 118],
    name: "api-gateway",
    status: "Operational",
  },
  {
    latency: [86, 88, 91, 87, 95, 132, 187, 214, 196, 171, 158, 149],
    name: "search",
    status: "Degraded",
  },
  {
    latency: [42, 41, 44, 43, 40, 42, 45, 41, 43, 42, 40, 41],
    name: "auth",
    status: "Operational",
  },
  {
    latency: [204, 198, 211, 207, 202, 199, 205, 210, 203, 201, 206, 200],
    name: "billing",
    status: "Operational",
  },
];

export default function ServiceStatusList() {
  return (
    <ul className="w-full max-w-md divide-y rounded-lg border bg-card">
      {services.map((s) => (
        <li className="flex items-center gap-4 px-4 py-3" key={s.name}>
          <span className="flex-1 font-mono text-sm">{s.name}</span>
          <SparkLine
            aria-label={`${s.name} p95 latency, last 12 checks`}
            categories={["ms"]}
            className="h-7 w-24"
            config={{
              ms: {
                color:
                  s.status === "Degraded" ? "var(--warning)" : "var(--chart-2)",
              },
            }}
            data={s.latency.map((ms, check) => ({ check, ms }))}
            index="check"
          />
          <span className="w-14 text-end text-muted-foreground text-xs tabular-nums">
            {s.latency.at(-1)} ms
          </span>
          <Badge variant={s.status === "Degraded" ? "warning" : "success"}>
            {s.status}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

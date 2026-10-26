"use client";

import { Tracker } from "@/registry/default/charts/tracker";
import { formatDate } from "@/registry/default/lib/chart-utils";

// 90 days ending Oct 25 2026, with a few incidents.
const incidents: Record<number, "Degraded" | "Outage"> = {
  17: "Degraded",
  41: "Outage",
  42: "Degraded",
  73: "Degraded",
};

const days = Array.from({ length: 90 }, (_, i) => {
  const date = formatDate(Date.UTC(2026, 6, 28 + i), {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const status = incidents[i] ?? "Operational";
  return {
    color:
      status === "Outage"
        ? "var(--destructive)"
        : status === "Degraded"
          ? "var(--warning)"
          : "var(--success)",
    key: date,
    tooltip: `${date} — ${status}`,
  };
});

export default function UptimeTracker() {
  return (
    <div className="w-full max-w-xl rounded-lg border bg-card p-5">
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-sm">api.example.com</span>
        <span className="text-muted-foreground text-sm tabular-nums">
          99.94% uptime
        </span>
      </div>
      <Tracker
        aria-label="API status per day, last 90 days"
        className="mt-3"
        data={days}
      />
      <div className="mt-2 flex justify-between text-muted-foreground text-xs">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}

"use client";

import { CalendarHeatmap } from "@/registry/default/charts/calendar-heatmap";
import { ChartCard } from "@/registry/default/charts/chart-card";

const START = Date.UTC(2026, 7, 1);
const DAYS = 92;

// Deterministic habit log: 1 = done, 0 = missed. A streak builds up over time.
const data = Array.from({ length: DAYS }, (_, i) => ({
  date: new Date(START + i * 86_400_000).toISOString().slice(0, 10),
  value: i > 60 || (i * 7) % 5 !== 0 ? 1 : 0,
}));
const done = data.filter((d) => d.value === 1).length;

export default function HabitStreak() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Daily 20-minute run, August to October. Weeks start on Monday."
      footer={`${done} of ${DAYS} days done; current streak 31 days.`}
      title="Running habit"
    >
      <CalendarHeatmap
        cellLabel={(day) => `${day.date}: ${day.value ? "done" : "missed"}`}
        color="var(--success)"
        data={data}
        endDate="2026-10-31"
        minCellSize={14}
        showLegend={false}
        weekStart={1}
      />
    </ChartCard>
  );
}

"use client";

import { CalendarHeatmap } from "@/registry/default/charts/calendar-heatmap";
import { ChartCard } from "@/registry/default/charts/chart-card";

const START = Date.UTC(2025, 9, 27);

// A year of deterministic contributions: more on weekdays, some quiet weeks.
const data = Array.from({ length: 365 }, (_, i) => {
  const date = new Date(START + i * 86_400_000);
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
  const quietWeek = Math.floor(i / 7) % 9 === 4;
  const base = ((i * 37) % 13) - 4;
  return {
    date: date.toISOString().slice(0, 10),
    value: quietWeek ? 0 : Math.max(0, weekend ? base - 3 : base),
  };
});
const total = data.reduce((sum, d) => sum + d.value, 0);

export default function Contributions() {
  return (
    <ChartCard
      className="max-w-3xl"
      description="Commits, reviews and issues, last 12 months"
      title={`${total.toLocaleString("en-US")} contributions`}
    >
      <CalendarHeatmap
        cellLabel={(day) => `${day.date}: ${day.value} contributions`}
        data={data}
        minCellSize={7}
        valueFormatter={(v) => String(v)}
      />
    </ChartCard>
  );
}

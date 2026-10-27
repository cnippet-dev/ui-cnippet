"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Heatmap } from "@/registry/default/charts/heatmap";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, h) => String(h));

// Deterministic sessions: busy on weekday working hours, quiet at night and on weekends.
const data = days.flatMap((day, d) =>
  hours.map((hour, h) => {
    const work = h >= 9 && h <= 17 ? 1 : h >= 7 && h <= 21 ? 0.45 : 0.08;
    const weekend = d >= 5 ? 0.35 : 1;
    const wobble = ((d * 31 + h * 17) % 11) / 20;
    return {
      day,
      hour,
      sessions: Math.round(1200 * work * weekend * (0.8 + wobble)),
    };
  }),
);

export default function ActivityByHour() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Sessions by weekday and hour (UTC), last 4 weeks"
      title="When people use the app"
    >
      <Heatmap
        data={data}
        value="sessions"
        x="hour"
        xFormatter={(hour) => (Number(hour) % 3 === 0 ? hour : "")}
        y="day"
      />
    </ChartCard>
  );
}

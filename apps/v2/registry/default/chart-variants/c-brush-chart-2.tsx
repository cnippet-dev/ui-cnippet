"use client";

import { BrushChart } from "@/registry/default/charts/brush-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Readings every 10 minutes for three days: daily cycle plus a door-left-open dip.
const data = Array.from({ length: 432 }, (_, i) => {
  const minutes = i * 10;
  const day = Math.floor(minutes / 1440) + 23;
  const hh = String(Math.floor((minutes % 1440) / 60)).padStart(2, "0");
  const mm = String(minutes % 60).padStart(2, "0");
  const dip = i > 250 && i < 262 ? -3.5 : 0;
  return {
    humidity: Math.round(46 + 6 * Math.cos((minutes / 1440) * 2 * Math.PI)),
    temperature:
      Math.round(
        (21.5 + 2.2 * Math.sin((minutes / 1440) * 2 * Math.PI - 2) + dip) * 10,
      ) / 10,
    time: `Oct ${day} ${hh}:${mm}`,
  };
});

export default function SensorLog() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Server room sensor, every 10 minutes"
      title="Temperature"
    >
      <BrushChart
        categories={["temperature"]}
        chartType="line"
        className="h-60"
        config={{
          temperature: { color: "var(--chart-5)", label: "Temperature" },
        }}
        data={data}
        index="time"
        valueFormatter={(value) => `${value} °C`}
        yAxisWidth={56}
      />
    </ChartCard>
  );
}

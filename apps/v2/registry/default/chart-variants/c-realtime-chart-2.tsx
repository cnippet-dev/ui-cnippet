"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RealtimeChart } from "@/registry/default/charts/realtime-chart";

// Two rooms drifting slowly with sensor noise; fixed axis so small moves stay small.
function readSensors() {
  const t = Date.now() / 20000;
  const noise = () => (Math.random() - 0.5) * 0.3;
  return {
    lab: Math.round((22.4 + 0.8 * Math.sin(t) + noise()) * 10) / 10,
    office: Math.round((21.1 + 0.5 * Math.cos(t / 2) + noise()) * 10) / 10,
  };
}

export default function LiveTemperature() {
  return (
    <ChartCard className="max-w-2xl" title="Room temperature">
      <RealtimeChart
        categories={["office", "lab"]}
        className="h-48"
        interval={1500}
        onTick={readSensors}
        valueFormatter={(value) => `${value.toFixed(1)} °C`}
        windowSize={30}
        yAxisWidth={56}
        yDomain={[19, 25]}
      />
    </ChartCard>
  );
}

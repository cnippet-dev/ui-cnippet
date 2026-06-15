"use client";

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const PLAN_LIMIT = 10000;

const seats = [
  { label: "Alice Chen", used: 8240 },
  { label: "Bob Kim", used: 3100 },
  { label: "Carol Day", used: 9870 },
  { label: "Dave Osei", used: 1500 },
];

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export default function Particle() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p className="font-medium text-sm">API usage by member</p>
      {seats.map(({ label, used }) => (
        <Meter key={label} max={PLAN_LIMIT} value={used}>
          <div className="flex items-center justify-between gap-2">
            <MeterLabel>{label}</MeterLabel>
            <MeterValue>{() => `${fmt(used)} / ${fmt(PLAN_LIMIT)}`}</MeterValue>
          </div>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  );
}

"use client";

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Meter value={42}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>Storage</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter max={5} value={4}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>Rating</MeterLabel>
          <MeterValue>{(_formatted, value) => `${value} / 5`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Meter max={1000} min={500} value={700}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>Bandwidth</MeterLabel>
          <MeterValue>{(_formatted, value) => `${value} Mbps`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
    </div>
  );
}

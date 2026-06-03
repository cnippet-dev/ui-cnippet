import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

function indicatorColor(value: number) {
  if (value >= 80) return "bg-destructive";
  if (value >= 50) return "bg-amber-500";
  return "bg-green-500";
}

const metrics = [
  { label: "Error rate", value: 12 },
  { label: "Latency", value: 63 },
  { label: "Memory", value: 88 },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {metrics.map(({ label, value }) => (
        <Meter key={label} value={value}>
          <div className="flex items-center justify-between gap-2">
            <MeterLabel>{label}</MeterLabel>
            <MeterValue />
          </div>
          <MeterTrack>
            <MeterIndicator className={indicatorColor(value)} />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  );
}

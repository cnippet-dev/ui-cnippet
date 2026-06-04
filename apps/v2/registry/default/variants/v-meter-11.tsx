import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const resources = [
  { label: "CPU", value: 42 },
  { label: "Memory", value: 68 },
  { label: "Disk", value: 91 },
];

export function Pattern() {
  return (
    <div className="w-full max-w-sm space-y-4">
      {resources.map(({ label, value }) => (
        <Meter key={label} value={value}>
          <div className="flex items-center justify-between gap-2">
            <MeterLabel>{label}</MeterLabel>
            <MeterValue />
          </div>
          <MeterTrack>
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  );
}

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const skills = [
  { label: "TypeScript", value: 90 },
  { label: "React", value: 85 },
  { label: "Node.js", value: 72 },
  { label: "Python", value: 60 },
  { label: "Go", value: 38 },
];

export default function Particle() {
  return (
    <div className="w-full max-w-sm space-y-3">
      {skills.map(({ label, value }) => (
        <Meter key={label} value={value}>
          <div className="flex items-center justify-between gap-2">
            <MeterLabel>{label}</MeterLabel>
            <MeterValue />
          </div>
          <MeterTrack className="h-1.5">
            <MeterIndicator />
          </MeterTrack>
        </Meter>
      ))}
    </div>
  );
}

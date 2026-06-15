import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const score = 72;

function getGrade(value: number) {
  if (value >= 90) return { color: "bg-green-500", grade: "A" };
  if (value >= 80) return { color: "bg-blue-500", grade: "B" };
  if (value >= 70) return { color: "bg-yellow-500", grade: "C" };
  if (value >= 60) return { color: "bg-orange-500", grade: "D" };
  return { color: "bg-destructive", grade: "F" };
}

const { grade, color } = getGrade(score);

export default function Particle() {
  return (
    <div className="w-full max-w-xs space-y-4 rounded-xl border p-5">
      <div className="text-center">
        <span className="font-bold text-4xl tabular-nums">{score}</span>
        <span className="text-lg text-muted-foreground">/100</span>
        <p className="mt-1 font-medium text-muted-foreground text-sm">
          Grade: {grade}
        </p>
      </div>
      <Meter value={score}>
        <MeterTrack className="h-3 rounded-full">
          <MeterIndicator className={`${color} rounded-full`} />
        </MeterTrack>
        <div className="flex justify-between">
          <MeterLabel className="font-normal text-muted-foreground text-xs">
            0
          </MeterLabel>
          <MeterValue className="text-muted-foreground text-xs" />
          <MeterLabel className="font-normal text-muted-foreground text-xs">
            100
          </MeterLabel>
        </div>
      </Meter>
    </div>
  );
}

import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

const steps = [
  { done: true, label: "Add profile photo" },
  { done: true, label: "Set display name" },
  { done: true, label: "Verify email" },
  { done: false, label: "Connect calendar" },
  { done: false, label: "Invite a teammate" },
];

const completed = steps.filter((s) => s.done).length;

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-3 rounded-lg border p-4">
      <Meter max={steps.length} value={completed}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel className="font-medium">Profile strength</MeterLabel>
          <MeterValue>{() => `${completed}/${steps.length}`}</MeterValue>
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <ul className="space-y-1.5">
        {steps.map(({ done, label }) => (
          <li
            className={`flex items-center gap-2 text-xs ${done ? "text-muted-foreground line-through" : ""}`}
            key={label}
          >
            <span
              className={`size-1.5 shrink-0 rounded-full ${done ? "bg-green-500" : "bg-muted-foreground/30"}`}
            />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

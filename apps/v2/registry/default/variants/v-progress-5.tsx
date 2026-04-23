import { CircleCheckIcon, CircleIcon } from "lucide-react";
import { Progress } from "@/registry/default/ui/progress";

const steps = [
  { completed: true, label: "Account" },
  { completed: true, label: "Profile" },
  { completed: false, label: "Preferences" },
  { completed: false, label: "Review" },
];

export function Pattern() {
  const completedSteps = steps.filter((s) => s.completed).length;
  const progressValue = (completedSteps / steps.length) * 100;

  return (
    <div className="mx-auto w-full max-w-xs space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">Setup Progress</span>
        <span className="text-muted-foreground text-xs">
          {completedSteps} of {steps.length} steps
        </span>
      </div>
      <Progress value={progressValue} />
      <div className="flex flex-col gap-2">
        {steps.map((step) => (
          <div className="flex items-center gap-2 text-sm" key={step.label}>
            {step.completed ? (
              <CircleCheckIcon
                aria-hidden="true"
                className="size-4 text-success"
              />
            ) : (
              <CircleIcon
                aria-hidden="true"
                className="size-4 text-muted-foreground"
              />
            )}
            <span
              className={
                step.completed ? "text-foreground" : "text-muted-foreground"
              }
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

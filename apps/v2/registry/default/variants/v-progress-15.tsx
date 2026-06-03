import { CheckIcon, CircleDotIcon, ClockIcon } from "lucide-react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

type StageStatus = "done" | "active" | "pending";

const stages: { label: string; status: StageStatus; time: string }[] = [
  { label: "Checkout", status: "done", time: "3s" },
  { label: "Install", status: "done", time: "42s" },
  { label: "Build", status: "active", time: "1m 12s" },
  { label: "Test", status: "pending", time: "—" },
  { label: "Deploy", status: "pending", time: "—" },
];

const done = stages.filter((s) => s.status === "done").length;

const stageIcon: Record<StageStatus, React.ReactNode> = {
  active: (
    <CircleDotIcon
      aria-hidden="true"
      className="size-4 animate-pulse text-primary"
    />
  ),
  done: (
    <CheckIcon aria-hidden="true" className="size-4 text-success" />
  ),
  pending: (
    <ClockIcon aria-hidden="true" className="size-4 text-muted-foreground" />
  ),
};

export function Pattern() {
  const value = (done / stages.length) * 100;

  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Build pipeline</span>
        <span className="text-xs text-muted-foreground">
          {done}/{stages.length} stages
        </span>
      </div>
      <Progress value={value}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <div className="space-y-2">
        {stages.map(({ label, status, time }) => (
          <div className="flex items-center gap-3" key={label}>
            {stageIcon[status]}
            <span
              className={`flex-1 text-sm ${status === "pending" ? "text-muted-foreground" : ""}`}
            >
              {label}
            </span>
            <span className="tabular-nums text-xs text-muted-foreground">
              {time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

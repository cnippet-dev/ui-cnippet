import { HeartIcon } from "lucide-react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

const RAISED = 8_340;
const GOAL = 15_000;

export function Pattern() {
  const pct = Math.min((RAISED / GOAL) * 100, 100);
  return (
    <div className="w-full max-w-xs space-y-3 rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <HeartIcon aria-hidden="true" className="size-4 text-red-500" />
        <span className="text-sm font-semibold">Community Fund Drive</span>
      </div>
      <Progress value={pct}>
        <ProgressTrack>
          <ProgressIndicator className="bg-red-500" />
        </ProgressTrack>
      </Progress>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-lg font-bold">${RAISED.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">
            raised of ${GOAL.toLocaleString()} goal
          </p>
        </div>
        <p className="text-sm font-medium text-muted-foreground">
          {Math.round(pct)}%
        </p>
      </div>
    </div>
  );
}

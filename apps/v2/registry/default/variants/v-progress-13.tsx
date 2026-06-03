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
        <span className="font-semibold text-sm">Community Fund Drive</span>
      </div>
      <Progress value={pct}>
        <ProgressTrack>
          <ProgressIndicator className="bg-red-500" />
        </ProgressTrack>
      </Progress>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="font-bold text-lg">${RAISED.toLocaleString()}</p>
          <p className="text-muted-foreground text-xs">
            raised of ${GOAL.toLocaleString()} goal
          </p>
        </div>
        <p className="font-medium text-muted-foreground text-sm">
          {Math.round(pct)}%
        </p>
      </div>
    </div>
  );
}

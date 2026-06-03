import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/default/ui/progress";

const TOTAL = 10;
const CURRENT = 4;

export function Pattern() {
  const value = (CURRENT / TOTAL) * 100;
  return (
    <div className="w-full max-w-sm">
      <Progress value={value}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>Survey progress</ProgressLabel>
          <ProgressValue>{() => `${CURRENT} of ${TOTAL}`}</ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  );
}

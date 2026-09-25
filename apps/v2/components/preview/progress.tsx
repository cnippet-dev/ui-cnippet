import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@cnippet/ui/components/progress";
import { Skeleton } from "@cnippet/ui/components/skeleton";

export default function ProgressPreview() {
  return (
    <div className="relative w-52">
      <div className="flex flex-col gap-2.5 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-8" />
        </div>
        <Skeleton className="h-1.5 w-full overflow-hidden rounded-full">
          <div className="h-full w-3/4 rounded-full bg-neutral-300 dark:bg-neutral-800" />
        </Skeleton>
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Progress value={72}>
          <div className="flex items-center justify-between">
            <ProgressLabel>Uploading</ProgressLabel>
            <ProgressValue />
          </div>
          <ProgressTrack>
            <ProgressIndicator />
          </ProgressTrack>
        </Progress>
      </div>
    </div>
  );
}

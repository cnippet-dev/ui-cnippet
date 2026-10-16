"use client";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/default/ui/progress";

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Progress value={64}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <Progress value={64}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>Installing</ProgressLabel>
          <ProgressValue />
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <Progress max={512} value={384}>
        <div className="flex items-center justify-between gap-2">
          <ProgressLabel>Upload</ProgressLabel>
          <ProgressValue>
            {(_formatted, value) => `${value} / 512 MB`}
          </ProgressValue>
        </div>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
    </div>
  );
}

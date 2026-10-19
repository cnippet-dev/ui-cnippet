// title: With custom colors
"use client";

import { useEffect, useState } from "react";

import { Progress } from "@/registry/default/ui/progress";

export function Pattern() {
  const [progress, setProgress] = useState(45);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(75), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        Custom Colors
      </div>

      <Progress
        className="**:data-[slot=progress-indicator]:bg-chart-1"
        value={progress}
      />
      <Progress
        className="**:data-[slot=progress-indicator]:bg-chart-2"
        value={progress}
      />
      <Progress
        className="**:data-[slot=progress-indicator]:bg-chart-3"
        value={progress}
      />
      <Progress
        className="**:data-[slot=progress-indicator]:bg-chart-4"
        value={progress}
      />
      <Progress
        className="**:data-[slot=progress-indicator]:bg-chart-5"
        value={progress}
      />
    </div>
  );
}

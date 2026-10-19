// title: With status messages
"use client";

import { useEffect, useState } from "react";

import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/registry/default/ui/progress";

export function BaseProgressStatus() {
  // Runs past 100 so "Download complete!" holds for about a second before looping.
  const [tick, setTick] = useState(0);
  const downloadProgress = Math.min(100, tick);

  // Get status message based on progress
  const getStatusMessage = (progress: number) => {
    if (progress < 5) return "Initializing download...";
    if (progress < 15) return "Setting up environment...";
    if (progress < 25) return "Connecting to server...";
    if (progress < 35) return "Verifying permissions...";
    if (progress < 50) return "Downloading core files...";
    if (progress < 65) return "Downloading assets...";
    if (progress < 80) return "Downloading dependencies...";
    if (progress < 90) return "Extracting files...";
    if (progress < 95) return "Validating integrity...";
    if (progress < 100) return "Finalizing installation...";
    return "Download complete!";
  };

  useEffect(() => {
    // Download simulation
    const downloadTimer = setInterval(() => {
      setTick((prev) => (prev >= 115 ? 0 : prev + Math.random() * 3 + 1));
    }, 150);

    return () => {
      clearInterval(downloadTimer);
    };
  }, []);

  return (
    <div className="w-full max-w-xs space-y-2">
      <Progress value={downloadProgress}>
        <ProgressLabel>Workspace Setup</ProgressLabel>
        <ProgressTrack>
          {/* No transition on the loop reset, so the bar never slides back under "Initializing". */}
          <ProgressIndicator
            className={
              downloadProgress === 0 ? "transition-none" : "duration-150"
            }
          />
        </ProgressTrack>
        <ProgressValue />
      </Progress>
      <div className="text-muted-foreground text-xs">
        {getStatusMessage(downloadProgress)}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

export function Pattern() {
  const [progress, setProgress] = useState(34);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 0;
        return Math.min(p + Math.random() * 4, 100);
      });
    }, 300);
    return () => clearInterval(id);
  }, []);

  const pct = Math.round(progress);
  const remaining = Math.max(0, Math.ceil(((100 - progress) / 100) * 38));

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="flex items-center gap-2">
        <DownloadIcon aria-hidden="true" className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">Downloading update…</span>
        <span className="ml-auto text-xs tabular-nums text-muted-foreground">
          {pct}%
        </span>
      </div>
      <Progress value={progress}>
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      </Progress>
      <div className="flex justify-between text-xs tabular-nums text-muted-foreground">
        <span>2.4 MB/s</span>
        <span>
          {remaining > 0 ? `~${remaining}s remaining` : "Finalizing…"}
        </span>
      </div>
    </div>
  );
}

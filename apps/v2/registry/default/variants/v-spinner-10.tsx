"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

const STEPS = [
  "Connecting to server…",
  "Authenticating…",
  "Loading workspace…",
  "Almost there…",
];

export function Pattern() {
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  function start() {
    setStepIndex(0);
    let i = 1;
    const interval = setInterval(() => {
      if (i >= STEPS.length) {
        clearInterval(interval);
        setTimeout(() => setStepIndex(null), 600);
        return;
      }
      setStepIndex(i);
      i++;
    }, 700);
  }

  const running = stepIndex !== null;

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-4">
      <div className="flex h-24 w-full items-center justify-center rounded-xl border bg-muted/30">
        {running ? (
          <div className="flex flex-col items-center gap-2">
            <Spinner className="size-5 text-primary" />
            <p className="text-muted-foreground text-xs">
              {STEPS[stepIndex ?? 0]}
            </p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Workspace ready</p>
        )}
      </div>
      <Button
        className="w-full"
        disabled={running}
        onClick={start}
        size="sm"
        variant="outline"
      >
        {running ? "Starting…" : "Launch workspace"}
      </Button>
    </div>
  );
}

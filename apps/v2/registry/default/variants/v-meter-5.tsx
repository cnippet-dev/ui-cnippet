"use client";

import { useEffect, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

export default function Particle() {
  const [value, setValue] = useState(12);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          setRunning(false);
          return 100;
        }
        return v + Math.floor(Math.random() * 8) + 2;
      });
    }, 600);
    return () => clearInterval(id);
  }, [running]);

  function reset() {
    setValue(12);
    setRunning(true);
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <Meter value={Math.min(value, 100)}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>Deploying…</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Button disabled={running} onClick={reset} size="sm" variant="outline">
        {running ? "Running…" : "Restart"}
      </Button>
    </div>
  );
}

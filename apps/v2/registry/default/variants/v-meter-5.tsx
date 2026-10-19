// title: Live CPU load meter with pause
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
  const [value, setValue] = useState(42);
  const [live, setLive] = useState(true);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => {
      // Random walk clamped to 5–95% so the reading looks like real load.
      setValue((v) =>
        Math.min(95, Math.max(5, v + Math.round(Math.random() * 16 - 8))),
      );
    }, 1000);
    return () => clearInterval(id);
  }, [live]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Meter value={value}>
        <div className="flex items-center justify-between gap-2">
          <MeterLabel>CPU load · web-01</MeterLabel>
          <MeterValue />
        </div>
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      </Meter>
      <Button onClick={() => setLive((l) => !l)} size="sm" variant="outline">
        {live ? "Pause" : "Resume"}
      </Button>
    </div>
  );
}

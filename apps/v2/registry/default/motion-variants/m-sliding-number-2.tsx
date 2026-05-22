"use client";

import { SlidingNumber } from "@/registry/default/motion/sliding-number";
import { useEffect, useState } from "react";

function pad(n: number) {
  return n;
}

export default function SlidingNumberClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="flex items-center gap-1 font-mono text-5xl font-bold tabular-nums text-foreground">
        <SlidingNumber padStart value={h} />
        <span className="mb-1 text-muted-foreground">:</span>
        <SlidingNumber padStart value={m} />
        <span className="mb-1 text-muted-foreground">:</span>
        <SlidingNumber padStart value={s} />
      </div>
    </div>
  );
}

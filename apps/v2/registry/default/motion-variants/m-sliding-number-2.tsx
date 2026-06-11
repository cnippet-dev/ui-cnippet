"use client";

import { useEffect, useState } from "react";
import { SlidingNumber } from "@/registry/default/motion/sliding-number";

function _pad(n: number) {
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
      <div className="flex items-center gap-1 font-bold font-mono text-5xl text-foreground tabular-nums">
        <SlidingNumber padStart value={h} />
        <span className="mb-1 text-muted-foreground">:</span>
        <SlidingNumber padStart value={m} />
        <span className="mb-1 text-muted-foreground">:</span>
        <SlidingNumber padStart value={s} />
      </div>
    </div>
  );
}

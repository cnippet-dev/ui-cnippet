"use client";

import { useRef } from "react";
import {
  CountingNumber,
  type CountingNumberRef,
} from "@/registry/default/motion/counting-number";

export default function CountingNumberHero() {
  const ref = useRef<CountingNumberRef>(null);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="text-center">
        <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
          Total revenue processed
        </p>
        <p className="mt-2 font-bold text-6xl text-foreground tracking-tight sm:text-7xl">
          $
          <CountingNumber
            autoStart={true}
            from={0}
            ref={ref}
            target={2847593}
            transition={{ duration: 2.5, ease: "easeOut", type: "tween" }}
          />
        </p>
      </div>
      <button
        className="rounded-full bg-accent px-5 py-2 font-medium text-foreground text-sm hover:bg-accent/80"
        onClick={() => ref.current?.startAnimation()}
        type="button"
      >
        Replay
      </button>
    </div>
  );
}

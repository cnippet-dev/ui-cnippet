"use client";

import { useState } from "react";
import { TextScramble } from "@/registry/default/motion/text-scramble";

export default function TextScrambleTrigger() {
  const [trigger, setTrigger] = useState(true);

  function handleClick() {
    setTrigger(false);
    setTimeout(() => setTrigger(true), 50);
  }

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <TextScramble
        as="p"
        className="font-mono text-xl font-medium tracking-widest text-foreground uppercase"
        duration={0.8}
        speed={0.04}
        trigger={trigger}
      >
        Decrypt on demand
      </TextScramble>
      <button
        className="rounded-md border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        onClick={handleClick}
        type="button"
      >
        Scramble again
      </button>
    </div>
  );
}

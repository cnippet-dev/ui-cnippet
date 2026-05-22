"use client";

import { TextRoll } from "@/registry/default/motion/text-roll";

export default function TextRollHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Introducing
      </p>
      <h1 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <TextRoll duration={0.5} getEnterDelay={(i) => i * 0.04}>
          Design with motion
        </TextRoll>
      </h1>
    </div>
  );
}

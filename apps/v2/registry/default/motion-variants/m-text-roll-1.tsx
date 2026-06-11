"use client";

import { TextRoll } from "@/registry/default/motion/text-roll";

export default function TextRollHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
        Introducing
      </p>
      <h1 className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        <TextRoll duration={0.5} getEnterDelay={(i) => i * 0.04}>
          Design with motion
        </TextRoll>
      </h1>
    </div>
  );
}

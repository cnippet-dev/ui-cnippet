"use client";

import { RollingText } from "@/registry/default/motion/rolling-text";

export default function RollingTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Introducing
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <RollingText
          direction="up"
          duration={0.6}
          staggerDuration={0.04}
        >
          Design with purpose
        </RollingText>
      </h1>
    </div>
  );
}

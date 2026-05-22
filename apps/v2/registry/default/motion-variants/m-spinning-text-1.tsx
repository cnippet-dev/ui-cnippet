"use client";

import { SpinningText } from "@/registry/default/motion/spinning-text";

export default function SpinningTextBadge() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative flex items-center justify-center">
        <SpinningText
          className="h-32 w-32 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
          duration={12}
          fontSize={0.6}
          radius={4.5}
        >
          {"cnippet ui • motion • "}
        </SpinningText>
        <div className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
          <span className="text-lg font-bold">✦</span>
        </div>
      </div>
    </div>
  );
}

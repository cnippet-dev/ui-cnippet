"use client";

import { SpinningText } from "@/registry/default/motion/spinning-text";

export default function SpinningTextCTA() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="group relative flex items-center justify-center">
        <SpinningText
          className="h-40 w-40 text-xs font-medium uppercase tracking-widest text-foreground"
          duration={10}
          fontSize={0.65}
          radius={5}
          reverse
        >
          {"get started • free forever • "}
        </SpinningText>
        <button
          className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-xl text-background transition-transform group-hover:scale-110"
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
}

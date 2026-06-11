"use client";

import { SpinningText } from "@/registry/default/motion/spinning-text";

export default function SpinningTextDuo() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="relative flex items-center justify-center">
        <SpinningText
          className="absolute h-52 w-52 font-semibold text-[10px] text-muted-foreground uppercase tracking-widest"
          duration={20}
          fontSize={0.55}
          radius={6.5}
        >
          {"open source • free to use • copy paste • "}
        </SpinningText>
        <SpinningText
          className="h-32 w-32 font-semibold text-[10px] text-primary uppercase tracking-widest"
          duration={8}
          fontSize={0.6}
          radius={4}
          reverse
        >
          {"motion ui • "}
        </SpinningText>
        <div className="absolute h-8 w-8 rounded-full bg-primary" />
      </div>
    </div>
  );
}

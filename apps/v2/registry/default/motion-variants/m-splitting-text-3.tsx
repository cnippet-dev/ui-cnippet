"use client";

import { SplittingText } from "@/registry/default/motion/splitting-text";

export default function SplittingTextStacked() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-1 px-6">
      <SplittingText
        as="p"
        className="font-semibold text-primary text-xs uppercase tracking-widest"
        preset="fade"
        splitBy="chars"
        staggerDuration={0.04}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        New release
      </SplittingText>
      <SplittingText
        as="h1"
        className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        preset="slide-up"
        splitBy="words"
        staggerDuration={0.08}
        transition={{ damping: 20, stiffness: 200, type: "spring" }}
      >
        Animate anything, effortlessly
      </SplittingText>
      <SplittingText
        as="p"
        className="mt-2 max-w-sm text-center text-muted-foreground text-sm"
        preset="blur"
        splitBy="words"
        staggerDuration={0.04}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        164 motion components built on Framer Motion and Tailwind CSS
      </SplittingText>
    </div>
  );
}

"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ScrollProgress } from "@/registry/default/motion/scroll-progress";

export default function ScrollProgressStyled() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    restDelta: 0.001,
    stiffness: 200,
  });
  const percentage = useTransform(smoothProgress, [0, 1], [0, 100]);

  return (
    <div className="relative flex min-h-50 flex-col items-center justify-start overflow-y-auto px-6">
      <div className="sticky top-0 z-10 flex w-full items-center gap-3 border-b border-border bg-background/80 px-4 py-2 backdrop-blur">
        <ScrollProgress className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
        <motion.span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          {useTransform(percentage, (v) => `${Math.round(v)}%`)}
        </motion.span>
      </div>
      <div className="w-full max-w-lg space-y-4 py-6">
        <h2 className="text-xl font-bold text-foreground">Reading progress</h2>
        {Array.from({ length: 7 }).map((_, i) => (
          <p className="text-sm leading-relaxed text-muted-foreground" key={i}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.
          </p>
        ))}
      </div>
    </div>
  );
}

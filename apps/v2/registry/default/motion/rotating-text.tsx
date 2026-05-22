"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type RotatingTextProps = {
  words: string[];
  interval?: number;
  className?: string;
  transition?: Transition;
  direction?: "up" | "down";
};

export function RotatingText({
  words,
  interval = 2500,
  className,
  transition = { damping: 20, stiffness: 150, type: "spring" },
  direction = "up",
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % words.length),
      interval,
    );
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const enterFrom = direction === "up" ? "100%" : "-100%";
  const exitTo = direction === "up" ? "-100%" : "100%";

  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <span className="invisible">
        {words.reduce((a, b) => (a.length > b.length ? a : b))}
      </span>
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 flex items-center justify-center"
          exit={{ opacity: 0, y: exitTo }}
          initial={{ opacity: 0, y: enterFrom }}
          key={index}
          transition={transition}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

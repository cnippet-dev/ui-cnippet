"use client";

import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export type RollingTextProps = {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "up" | "down";
  perspective?: number;
  transition?: Transition;
  staggerDuration?: number;
};

export function RollingText({
  children,
  className,
  duration = 0.6,
  delay = 0,
  direction = "up",
  perspective = 400,
  transition = { ease: [0.215, 0.61, 0.355, 1] },
  staggerDuration = 0.04,
}: RollingTextProps) {
  const letters = children.split("");
  const yOffset = direction === "up" ? "100%" : "-100%";
  const rotateX = direction === "up" ? -60 : 60;

  return (
    <span
      className={cn("inline-block overflow-hidden", className)}
      style={{ perspective }}
    >
      <span className="sr-only">{children}</span>
      {letters.map((letter, i) => (
        <motion.span
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, rotateX, y: yOffset }}
          key={i}
          transition={{
            ...transition,
            delay: delay + i * staggerDuration,
            duration,
          }}
        >
          {letter === " " ? " " : letter}
        </motion.span>
      ))}
    </span>
  );
}

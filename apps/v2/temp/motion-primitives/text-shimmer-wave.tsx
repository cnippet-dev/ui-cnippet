"use client";
import { motion, type Transition } from "motion/react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

export type TextShimmerWaveProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  zDistance?: number;
  xDistance?: number;
  yDistance?: number;
  spread?: number;
  scaleDistance?: number;
  rotateYDistance?: number;
  transition?: Transition;
};

export function TextShimmerWave({
  children,
  as: Component = "p",
  className,
  duration = 1,
  zDistance = 10,
  xDistance = 2,
  yDistance = -2,
  spread = 1,
  scaleDistance = 1.1,
  rotateYDistance = 10,
  transition,
}: TextShimmerWaveProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );

  return (
    <MotionComponent
      className={cn(
        "relative inline-block [perspective:500px]",
        "[--base-color:#a1a1aa] [--base-gradient-color:#000]",
        "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]",
        className,
      )}
      style={{ color: "var(--base-color)" }}
    >
      {children.split("").map((char, i) => {
        const delay = (i * duration * (1 / spread)) / children.length;

        return (
          <motion.span
            animate={{
              color: [
                "var(--base-color)",
                "var(--base-gradient-color)",
                "var(--base-color)",
              ],
              rotateY: [0, rotateYDistance, 0],
              scale: [1, scaleDistance, 1],
              translateX: [0, xDistance, 0],
              translateY: [0, yDistance, 0],
              translateZ: [0, zDistance, 0],
            }}
            className={cn(
              "inline-block whitespace-pre [transform-style:preserve-3d]",
            )}
            initial={{
              color: "var(--base-color)",
              rotateY: 0,
              scale: 1,
              translateZ: 0,
            }}
            key={i}
            transition={{
              delay,
              duration: duration,
              ease: "easeInOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: (children.length * 0.05) / spread,
              ...transition,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </MotionComponent>
  );
}

"use client";
import { motion, type Transition } from "motion/react";

export type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  onAnimationComplete?: () => void;
};

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: "easeIn" },
  onAnimationComplete,
}: TextRollProps) {
  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <span
          aria-hidden="true"
          className="relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]"
          key={i}
        >
          <motion.span
            animate={{ rotateX: 90 }}
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]"
            initial={{ rotateX: 0 }}
            transition={{
              ...transition,
              delay: getEnterDelay(i),
              duration,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
          <motion.span
            animate={{ rotateX: 0 }}
            className="absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]"
            initial={{ rotateX: 90 }}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
            transition={{
              ...transition,
              delay: getExitDelay(i),
              duration,
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
          <span className="invisible">
            {letter === " " ? "\u00A0" : letter}
          </span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

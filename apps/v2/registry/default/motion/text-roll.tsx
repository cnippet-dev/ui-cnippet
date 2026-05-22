"use client";

import {
  motion,
  type Target,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from "motion/react";

export type TextRollProps = {
  children: string;
  duration?: number;
  getEnterDelay?: (index: number) => number;
  getExitDelay?: (index: number) => number;
  className?: string;
  transition?: Transition;
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  onAnimationComplete?: () => void;
};

const defaultVariants = {
  enter: {
    animate: { rotateX: 90 },
    initial: { rotateX: 0 },
  },
  exit: {
    animate: { rotateX: 0 },
    initial: { rotateX: 90 },
  },
} as const;

export function TextRoll({
  children,
  duration = 0.5,
  getEnterDelay = (i) => i * 0.1,
  getExitDelay = (i) => i * 0.1 + 0.2,
  className,
  transition = { ease: "easeIn" },
  variants,
  onAnimationComplete,
}: TextRollProps) {
  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, i) => (
        <span
          aria-hidden="true"
          className="perspective-[10000px] transform-3d relative inline-block w-auto"
          key={i}
        >
          <motion.span
            animate={variants?.enter?.animate ?? defaultVariants.enter.animate}
            className="backface-hidden absolute inline-block origin-[50%_25%]"
            initial={variants?.enter?.initial ?? defaultVariants.enter.initial}
            transition={{ ...transition, delay: getEnterDelay(i), duration }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
          <motion.span
            animate={variants?.exit?.animate ?? defaultVariants.exit.animate}
            className="backface-hidden absolute inline-block origin-[50%_100%]"
            initial={variants?.exit?.initial ?? defaultVariants.exit.initial}
            onAnimationComplete={
              letters.length === i + 1 ? onAnimationComplete : undefined
            }
            transition={{ ...transition, delay: getExitDelay(i), duration }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
          <span className="invisible">{letter === " " ? " " : letter}</span>
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </span>
  );
}

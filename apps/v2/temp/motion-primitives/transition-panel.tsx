"use client";
import {
  AnimatePresence,
  type MotionProps,
  motion,
  type Transition,
  type Variant,
} from "motion/react";
import { cn } from "@/lib/utils";

export type TransitionPanelProps = {
  children: React.ReactNode[];
  className?: string;
  transition?: Transition;
  activeIndex: number;
  variants?: { enter: Variant; center: Variant; exit: Variant };
} & MotionProps;

export function TransitionPanel({
  children,
  className,
  transition,
  variants,
  activeIndex,
  ...motionProps
}: TransitionPanelProps) {
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence
        custom={motionProps.custom}
        initial={false}
        mode="popLayout"
      >
        <motion.div
          animate="center"
          exit="exit"
          initial="enter"
          key={activeIndex}
          transition={transition}
          variants={variants}
          {...motionProps}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";

import {
  type HTMLMotionProps,
  type LegacyAnimationControls,
  motion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import type * as React from "react";

import { useAutoHeight } from "@/registry/hooks/use-auto-height";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type AutoHeightProps = WithAsChild<
  {
    children: React.ReactNode;
    deps?: React.DependencyList;
    animate?: TargetAndTransition | LegacyAnimationControls;
    transition?: Transition;
  } & Omit<HTMLMotionProps<"div">, "animate">
>;

function AutoHeight({
  children,
  deps = [],
  transition = {
    bounce: 0,
    damping: 30,
    restDelta: 0.01,
    stiffness: 300,
    type: "spring",
  },
  style,
  animate,
  asChild = false,
  ...props
}: AutoHeightProps) {
  const { ref, height } = useAutoHeight<HTMLDivElement>(deps);

  const Comp = asChild ? Slot : motion.div;

  return (
    <Comp
      animate={{ height, ...animate }}
      style={{ overflow: "hidden", ...style }}
      transition={transition}
      {...props}
    >
      <div ref={ref}>{children}</div>
    </Comp>
  );
}

export { AutoHeight, type AutoHeightProps };

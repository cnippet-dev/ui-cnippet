"use client";

import { motion } from "motion/react";
import { Progress as ProgressPrimitive } from "radix-ui";
import type * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";

type ProgressContextType = {
  value: number;
};

const [ProgressProvider, useProgress] =
  getStrictContext<ProgressContextType>("ProgressContext");

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>;

function Progress(props: ProgressProps) {
  return (
    <ProgressProvider value={{ value: props.value ?? 0 }}>
      <ProgressPrimitive.Root data-slot="progress" {...props} />
    </ProgressProvider>
  );
}

const MotionProgressIndicator = motion.create(ProgressPrimitive.Indicator);

type ProgressIndicatorProps = React.ComponentProps<
  typeof MotionProgressIndicator
>;

function ProgressIndicator({
  transition = { damping: 30, stiffness: 100, type: "spring" },
  ...props
}: ProgressIndicatorProps) {
  const { value } = useProgress();

  return (
    <MotionProgressIndicator
      animate={{ x: `-${100 - (value || 0)}%` }}
      data-slot="progress-indicator"
      transition={transition}
      {...props}
    />
  );
}

export {
  Progress,
  type ProgressContextType,
  ProgressIndicator,
  type ProgressIndicatorProps,
  type ProgressProps,
  useProgress,
};

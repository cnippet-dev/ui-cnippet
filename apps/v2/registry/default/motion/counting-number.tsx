"use client";

import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type ValueAnimationTransition,
} from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

export type CountingNumberRef = {
  startAnimation: () => void;
};

export type CountingNumberProps = {
  from?: number;
  target: number;
  transition?: ValueAnimationTransition;
  className?: string;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
};

export const CountingNumber = forwardRef<
  CountingNumberRef,
  CountingNumberProps
>(
  (
    {
      from = 0,
      target = 100,
      transition = { duration: 3, ease: "easeInOut", type: "tween" },
      className,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref,
  ) => {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) =>
      Math.round(latest).toLocaleString(),
    );
    const controlsRef = useRef<AnimationPlaybackControls | null>(null);

    const startAnimation = useCallback(() => {
      controlsRef.current?.stop();
      onStart?.();
      count.set(from);
      controlsRef.current = animate(count, target, {
        ...transition,
        onComplete: () => onComplete?.(),
      });
    }, [from, target, transition, onStart, onComplete, count]);

    useImperativeHandle(ref, () => ({ startAnimation }));

    useEffect(() => {
      if (autoStart) startAnimation();
      return () => controlsRef.current?.stop();
    }, [autoStart, startAnimation]);

    return (
      <motion.span className={cn("tabular-nums", className)} {...props}>
        {rounded}
      </motion.span>
    );
  },
);

CountingNumber.displayName = "CountingNumber";

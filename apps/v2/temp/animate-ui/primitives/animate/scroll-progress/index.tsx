"use client";

import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  type SpringOptions,
  useScroll,
  useSpring,
} from "motion/react";
import * as React from "react";
import { useMotionValueState } from "@/registry/hooks/use-motion-value-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type ScrollProgressDirection = "horizontal" | "vertical";

type ScrollProgressContextType = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
  scale: MotionValue<number>;
  direction: ScrollProgressDirection;
  global: boolean;
};

const [LocalScrollProgressProvider, useScrollProgress] =
  getStrictContext<ScrollProgressContextType>("ScrollProgressContext");

type ScrollProgressProviderProps = {
  children: React.ReactNode;
  global?: boolean;
  transition?: SpringOptions;
  direction?: ScrollProgressDirection;
};

function ScrollProgressProvider({
  global = false,
  transition = { bounce: 0, damping: 40, stiffness: 250 },
  direction = "vertical",
  ...props
}: ScrollProgressProviderProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress, scrollXProgress } = useScroll(
    global ? undefined : { container: containerRef },
  );

  const progress = direction === "vertical" ? scrollYProgress : scrollXProgress;
  const scale = useSpring(progress, transition);

  return (
    <LocalScrollProgressProvider
      value={{
        containerRef,
        direction,
        global,
        progress,
        scale,
      }}
      {...props}
    />
  );
}

type ScrollProgressMode = "width" | "height" | "scaleY" | "scaleX";

type ScrollProgressProps = WithAsChild<
  HTMLMotionProps<"div"> & {
    mode?: ScrollProgressMode;
  }
>;

function ScrollProgress({
  style,
  mode = "width",
  asChild = false,
  ...props
}: ScrollProgressProps) {
  const { scale, direction, global } = useScrollProgress();
  const scaleValue = useMotionValueState(scale);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      data-direction={direction}
      data-global={global}
      data-mode={mode}
      data-slot="scroll-progress"
      style={{
        ...(mode === "width" || mode === "height"
          ? {
              [mode]: `${scaleValue * 100}%`,
            }
          : {
              [mode]: scale,
            }),
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollProgressContainerProps = WithAsChild<HTMLMotionProps<"div">>;

function ScrollProgressContainer({
  ref,
  asChild = false,
  ...props
}: ScrollProgressContainerProps) {
  const { containerRef, direction, global } = useScrollProgress();

  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      data-direction={direction}
      data-global={global}
      data-slot="scroll-progress-container"
      ref={containerRef}
      {...props}
    />
  );
}

export {
  ScrollProgress,
  ScrollProgressContainer,
  type ScrollProgressContainerProps,
  type ScrollProgressContextType,
  type ScrollProgressDirection,
  type ScrollProgressMode,
  type ScrollProgressProps,
  ScrollProgressProvider,
  type ScrollProgressProviderProps,
  useScrollProgress,
};

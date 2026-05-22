"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type BlurProps = WithAsChild<
  {
    children?: React.ReactNode;
    delay?: number;
    initialBlur?: number;
    blur?: number;
    ref?: React.Ref<HTMLElement>;
  } & UseIsInViewOptions &
    HTMLMotionProps<"div">
>;

function Blur({
  ref,
  transition = { damping: 20, stiffness: 200, type: "spring" },
  delay = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  initialBlur = 10,
  blur = 0,
  asChild = false,
  ...props
}: BlurProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewMargin,
      inViewOnce,
    },
  );

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      animate={isInView ? "visible" : "hidden"}
      exit="hidden"
      initial="hidden"
      ref={localRef as React.Ref<HTMLDivElement>}
      transition={{
        ...transition,
        delay: (transition?.delay ?? 0) + delay / 1000,
      }}
      variants={{
        hidden: { filter: `blur(${initialBlur}px)` },
        visible: { filter: `blur(${blur}px)` },
      }}
      {...props}
    />
  );
}

type BlurListProps = Omit<BlurProps, "children"> & {
  children: React.ReactElement | React.ReactElement[];
  holdDelay?: number;
};

function Blurs({
  children,
  delay = 0,
  holdDelay = 0,
  ...props
}: BlurListProps) {
  const array = React.Children.toArray(children) as React.ReactElement[];

  return (
    <>
      {array.map((child, index) => (
        <Blur
          delay={delay + index * holdDelay}
          key={child.key ?? index}
          {...props}
        >
          {child}
        </Blur>
      ))}
    </>
  );
}

export { Blur, type BlurListProps, type BlurProps, Blurs };

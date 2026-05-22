"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type FadeProps = WithAsChild<
  {
    children?: React.ReactNode;
    delay?: number;
    initialOpacity?: number;
    opacity?: number;
    ref?: React.Ref<HTMLElement>;
  } & UseIsInViewOptions &
    HTMLMotionProps<"div">
>;

function Fade({
  ref,
  transition = { damping: 20, stiffness: 200, type: "spring" },
  delay = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  initialOpacity = 0,
  opacity = 1,
  asChild = false,
  ...props
}: FadeProps) {
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
        hidden: { opacity: initialOpacity },
        visible: { opacity },
      }}
      {...props}
    />
  );
}

type FadeListProps = Omit<FadeProps, "children"> & {
  children: React.ReactElement | React.ReactElement[];
  holdDelay?: number;
};

function Fades({
  children,
  delay = 0,
  holdDelay = 0,
  ...props
}: FadeListProps) {
  const array = React.Children.toArray(children) as React.ReactElement[];

  return (
    <>
      {array.map((child, index) => (
        <Fade
          delay={delay + index * holdDelay}
          key={child.key ?? index}
          {...props}
        >
          {child}
        </Fade>
      ))}
    </>
  );
}

export { Fade, type FadeListProps, type FadeProps, Fades };

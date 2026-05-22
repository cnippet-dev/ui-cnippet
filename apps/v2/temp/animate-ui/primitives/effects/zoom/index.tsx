"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type ZoomProps = WithAsChild<
  {
    children?: React.ReactNode;
    delay?: number;
    initialScale?: number;
    scale?: number;
    ref?: React.Ref<HTMLElement>;
  } & UseIsInViewOptions &
    HTMLMotionProps<"div">
>;

function Zoom({
  ref,
  transition = { damping: 20, stiffness: 200, type: "spring" },
  delay = 0,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  initialScale = 0.5,
  scale = 1,
  asChild = false,
  ...props
}: ZoomProps) {
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
        hidden: { scale: initialScale },
        visible: { scale },
      }}
      {...props}
    />
  );
}

type ZoomListProps = Omit<ZoomProps, "children"> & {
  children: React.ReactElement | React.ReactElement[];
  holdDelay?: number;
};

function Zooms({
  children,
  delay = 0,
  holdDelay = 0,
  ...props
}: ZoomListProps) {
  const array = React.Children.toArray(children) as React.ReactElement[];

  return (
    <>
      {array.map((child, index) => (
        <Zoom
          delay={delay + index * holdDelay}
          key={child.key ?? index}
          {...props}
        >
          {child}
        </Zoom>
      ))}
    </>
  );
}

export { Zoom, type ZoomListProps, type ZoomProps, Zooms };

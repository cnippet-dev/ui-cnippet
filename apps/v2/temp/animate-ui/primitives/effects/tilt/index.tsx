"use client";

import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import * as React from "react";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type TiltContextType = {
  sRX: MotionValue<number>;
  sRY: MotionValue<number>;
  transition: SpringOptions;
};

const [TiltProvider, useTilt] =
  getStrictContext<TiltContextType>("TiltContext");

type TiltProps = WithAsChild<
  HTMLMotionProps<"div"> & {
    maxTilt?: number;
    perspective?: number;
    transition?: SpringOptions;
  }
>;

function Tilt({
  maxTilt = 10,
  perspective = 800,
  style,
  transition = {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
  },
  onMouseMove,
  onMouseLeave,
  asChild = false,
  ...props
}: TiltProps) {
  const rX = useMotionValue(0);
  const rY = useMotionValue(0);

  const sRX = useSpring(rX, transition);
  const sRY = useSpring(rY, transition);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseMove?.(e);
      const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const nx = px * 2 - 1;
      const ny = py * 2 - 1;
      rY.set(nx * maxTilt);
      rX.set(-ny * maxTilt);
    },
    [maxTilt, rX, rY, onMouseMove],
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      rX.set(0);
      rY.set(0);
    },
    [rX, rY, onMouseLeave],
  );

  const Comp = asChild ? Slot : motion.div;

  return (
    <TiltProvider value={{ sRX, sRY, transition }}>
      <Comp
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{
          perspective,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
        {...props}
      />
    </TiltProvider>
  );
}

type TiltContentProps = WithAsChild<HTMLMotionProps<"div">>;

function TiltContent({
  children,
  style,
  transition,
  asChild = false,
  ...props
}: TiltContentProps) {
  const { sRX, sRY, transition: tiltTransition } = useTilt();

  const Comp = asChild ? Slot : motion.div;

  return (
    <Comp
      style={{
        rotateX: sRX,
        rotateY: sRY,
        willChange: "transform",
        ...style,
      }}
      transition={transition ?? tiltTransition}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Tilt, TiltContent, type TiltContentProps, type TiltProps };

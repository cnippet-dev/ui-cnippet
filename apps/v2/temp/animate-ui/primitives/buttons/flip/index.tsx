"use client";

import { type HTMLMotionProps, motion, type Variant } from "motion/react";

import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

const buildVariant = ({
  opacity,
  rotation,
  offset,
  isVertical,
  rotateAxis,
}: {
  opacity: number;
  rotation: number;
  offset: string | null;
  isVertical: boolean;
  rotateAxis: string;
}): Variant => ({
  opacity,
  [rotateAxis]: rotation,
  ...(isVertical && offset !== null ? { y: offset } : {}),
  ...(!isVertical && offset !== null ? { x: offset } : {}),
});

type FlipDirection = "top" | "bottom" | "left" | "right";

type FlipButtonContextType = {
  from: FlipDirection;
  isVertical: boolean;
  rotateAxis: string;
};

const [FlipButtonProvider, useFlipButton] =
  getStrictContext<FlipButtonContextType>("FlipButtonContext");

type FlipButtonProps = WithAsChild<
  HTMLMotionProps<"button"> & {
    from?: FlipDirection;
    tapScale?: number;
  }
>;

function FlipButton({
  from = "top",
  tapScale = 0.95,
  asChild = false,
  style,
  ...props
}: FlipButtonProps) {
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  const Component = asChild ? Slot : motion.button;

  return (
    <FlipButtonProvider value={{ from, isVertical, rotateAxis }}>
      <Component
        data-slot="flip-button"
        initial="initial"
        style={{
          display: "inline-grid",
          perspective: "1000px",
          placeItems: "center",
          ...style,
        }}
        whileHover="hover"
        whileTap={{ scale: tapScale }}
        {...props}
      />
    </FlipButtonProvider>
  );
}

type FlipButtonFaceProps = WithAsChild<HTMLMotionProps<"span">>;

function FlipButtonFront({
  transition = { damping: 20, stiffness: 280, type: "spring" },
  asChild = false,
  style,
  ...props
}: FlipButtonFaceProps) {
  const { from, isVertical, rotateAxis } = useFlipButton();

  const frontOffset = from === "top" || from === "left" ? "50%" : "-50%";

  const frontVariants = {
    hover: buildVariant({
      isVertical,
      offset: frontOffset,
      opacity: 0,
      rotateAxis,
      rotation: 90,
    }),
    initial: buildVariant({
      isVertical,
      offset: "0%",
      opacity: 1,
      rotateAxis,
      rotation: 0,
    }),
  };

  const Component = asChild ? Slot : motion.span;

  return (
    <Component
      data-slot="flip-button-front"
      style={{
        alignItems: "center",
        display: "inline-flex",
        gridArea: "1 / 1",
        justifyContent: "center",
        ...style,
      }}
      transition={transition}
      variants={frontVariants}
      {...props}
    />
  );
}

function FlipButtonBack({
  transition = { damping: 20, stiffness: 280, type: "spring" },
  asChild = false,
  style,
  ...props
}: FlipButtonFaceProps) {
  const { from, isVertical, rotateAxis } = useFlipButton();

  const backOffset = from === "top" || from === "left" ? "-50%" : "50%";

  const backVariants = {
    hover: buildVariant({
      isVertical,
      offset: "0%",
      opacity: 1,
      rotateAxis,
      rotation: 0,
    }),
    initial: buildVariant({
      isVertical,
      offset: backOffset,
      opacity: 0,
      rotateAxis,
      rotation: 90,
    }),
  };

  const Component = asChild ? Slot : motion.span;

  return (
    <Component
      data-slot="flip-button-back"
      style={{
        alignItems: "center",
        display: "inline-flex",
        gridArea: "1 / 1",
        justifyContent: "center",
        ...style,
      }}
      transition={transition}
      variants={backVariants}
      {...props}
    />
  );
}

export {
  FlipButton,
  FlipButtonBack,
  type FlipButtonContextType,
  type FlipButtonFaceProps as FlipButtonFrontProps,
  type FlipButtonFaceProps as FlipButtonBackProps,
  FlipButtonFront,
  type FlipButtonProps,
  type FlipDirection,
  useFlipButton,
};

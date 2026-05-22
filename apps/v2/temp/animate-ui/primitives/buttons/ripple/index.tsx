"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type RippleButtonContextType = {
  ripples: Ripple[];
  setRipples: (ripples: Ripple[]) => void;
};

const [RippleButtonProvider, useRippleButton] =
  getStrictContext<RippleButtonContextType>("RippleButtonContext");

type RippleButtonProps = WithAsChild<
  HTMLMotionProps<"button"> & {
    hoverScale?: number;
    tapScale?: number;
  }
>;

function RippleButton({
  ref,
  onClick,
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  style,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      createRipple(event);
      if (onClick) {
        onClick(event);
      }
    },
    [createRipple, onClick],
  );

  const Component = asChild ? Slot : motion.button;

  return (
    <RippleButtonProvider value={{ ripples, setRipples }}>
      <Component
        data-slot="ripple-button"
        onClick={handleClick}
        ref={buttonRef}
        style={{
          overflow: "hidden",
          position: "relative",
          ...style,
        }}
        whileHover={{ scale: hoverScale }}
        whileTap={{ scale: tapScale }}
        {...props}
      />
    </RippleButtonProvider>
  );
}

type RippleButtonRipplesProps = WithAsChild<
  HTMLMotionProps<"span"> & {
    color?: string;
    scale?: number;
  }
>;

function RippleButtonRipples({
  color = "var(--ripple-button-ripple-color)",
  scale = 10,
  transition = { duration: 0.6, ease: "easeOut" },
  asChild = false,
  style,
  ...props
}: RippleButtonRipplesProps) {
  const { ripples } = useRippleButton();

  const Component = asChild ? Slot : motion.span;

  return ripples.map((ripple) => (
    <Component
      animate={{ opacity: 0, scale }}
      initial={{ opacity: 0.5, scale: 0 }}
      key={ripple.id}
      style={{
        backgroundColor: color,
        borderRadius: "50%",
        height: "20px",
        left: ripple.x - 10,
        pointerEvents: "none",
        position: "absolute",
        top: ripple.y - 10,
        width: "20px",
        ...style,
      }}
      transition={transition}
      {...props}
    />
  ));
}

export {
  RippleButton,
  type RippleButtonProps,
  RippleButtonRipples,
  type RippleButtonRipplesProps,
};

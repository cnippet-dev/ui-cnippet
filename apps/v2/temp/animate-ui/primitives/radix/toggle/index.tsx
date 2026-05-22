"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { Toggle as TogglePrimitive } from "radix-ui";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type ToggleContextType = {
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
  disabled?: boolean;
};

const [ToggleProvider, useToggle] =
  getStrictContext<ToggleContextType>("ToggleContext");

type ToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive.Root>,
  "asChild"
> &
  HTMLMotionProps<"button">;

function Toggle({
  pressed,
  defaultPressed,
  onPressedChange,
  disabled,
  ...props
}: ToggleProps) {
  const [isPressed, setIsPressed] = useControlledState({
    defaultValue: defaultPressed,
    onChange: onPressedChange,
    value: pressed,
  });

  return (
    <ToggleProvider value={{ disabled, isPressed, setIsPressed }}>
      <TogglePrimitive.Root
        asChild
        defaultPressed={defaultPressed}
        disabled={disabled}
        onPressedChange={setIsPressed}
        pressed={pressed}
      >
        <motion.button
          data-slot="toggle"
          whileTap={{ scale: 0.95 }}
          {...props}
        />
      </TogglePrimitive.Root>
    </ToggleProvider>
  );
}

type ToggleHighlightProps = HTMLMotionProps<"div">;

function ToggleHighlight({ style, ...props }: ToggleHighlightProps) {
  const { isPressed, disabled } = useToggle();

  return (
    <AnimatePresence>
      {isPressed && (
        <motion.div
          animate={{ opacity: 1 }}
          aria-pressed={isPressed}
          data-disabled={disabled}
          data-slot="toggle-highlight"
          data-state={isPressed ? "on" : "off"}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          style={{ inset: 0, position: "absolute", zIndex: 0, ...style }}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type ToggleItemProps = HTMLMotionProps<"div">;

function ToggleItem({ style, ...props }: ToggleItemProps) {
  const { isPressed, disabled } = useToggle();

  return (
    <motion.div
      aria-pressed={isPressed}
      data-disabled={disabled}
      data-slot="toggle-item"
      data-state={isPressed ? "on" : "off"}
      style={{ position: "relative", zIndex: 1, ...style }}
      {...props}
    />
  );
}

export {
  Toggle,
  type ToggleContextType,
  ToggleHighlight,
  type ToggleHighlightProps,
  ToggleItem,
  type ToggleItemProps,
  type ToggleProps,
  useToggle,
};

"use client";

import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type ToggleContextType = {
  isPressed: boolean;
  setIsPressed: ToggleProps["onPressedChange"];
  disabled?: boolean;
};

const [ToggleProvider, useToggle] =
  getStrictContext<ToggleContextType>("ToggleContext");

type ToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  "render"
> &
  HTMLMotionProps<"button">;

function Toggle({
  value,
  pressed,
  defaultPressed,
  onPressedChange,
  nativeButton,
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
      <TogglePrimitive
        defaultPressed={defaultPressed}
        disabled={disabled}
        nativeButton={nativeButton}
        onPressedChange={setIsPressed}
        pressed={pressed}
        render={
          <motion.button
            data-slot="toggle"
            whileTap={{ scale: 0.95 }}
            {...props}
          />
        }
        value={value}
      />
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
          aria-pressed={isPressed}
          data-slot="toggle-highlight"
          {...(isPressed && { "data-pressed": true })}
          {...(disabled && { "data-disabled": true })}
          animate={{ opacity: 1 }}
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
      data-slot="toggle-item"
      {...(isPressed && { "data-pressed": true })}
      {...(disabled && { "data-disabled": true })}
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

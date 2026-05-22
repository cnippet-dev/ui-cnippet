"use client";

import { Switch as SwitchPrimitives } from "@base-ui-components/react/switch";
import {
  type HTMLMotionProps,
  type LegacyAnimationControls,
  motion,
  type TargetAndTransition,
  type VariantLabels,
} from "motion/react";
import * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type SwitchContextType = {
  isChecked: boolean;
  setIsChecked: SwitchProps["onCheckedChange"];
  isPressed: boolean;
  setIsPressed: (isPressed: boolean) => void;
};

const [SwitchProvider, useSwitch] =
  getStrictContext<SwitchContextType>("SwitchContext");

type SwitchProps = Omit<
  React.ComponentProps<typeof SwitchPrimitives.Root>,
  "render"
> &
  HTMLMotionProps<"button">;

function Switch({
  name,
  defaultChecked,
  checked,
  onCheckedChange,
  nativeButton,
  disabled,
  readOnly,
  required,
  inputRef,
  id,
  ...props
}: SwitchProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  const [isChecked, setIsChecked] = useControlledState({
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
    value: checked,
  });

  return (
    <SwitchProvider
      value={{ isChecked, isPressed, setIsChecked, setIsPressed }}
    >
      <SwitchPrimitives.Root
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        inputRef={inputRef}
        name={name}
        nativeButton={nativeButton}
        onCheckedChange={setIsChecked}
        readOnly={readOnly}
        render={
          <motion.button
            data-slot="switch"
            initial={false}
            onTap={() => setIsPressed(false)}
            onTapCancel={() => setIsPressed(false)}
            onTapStart={() => setIsPressed(true)}
            whileTap="tap"
            {...props}
          />
        }
        required={required}
      />
    </SwitchProvider>
  );
}

type SwitchThumbProps = Omit<
  React.ComponentProps<typeof SwitchPrimitives.Thumb>,
  "render"
> &
  HTMLMotionProps<"div"> & {
    pressedAnimation?:
      | TargetAndTransition
      | VariantLabels
      | boolean
      | LegacyAnimationControls;
  };

function SwitchThumb({
  pressedAnimation,
  transition = { damping: 25, stiffness: 300, type: "spring" },
  ...props
}: SwitchThumbProps) {
  const { isPressed } = useSwitch();

  return (
    <SwitchPrimitives.Thumb
      render={
        <motion.div
          animate={isPressed ? pressedAnimation : undefined}
          data-slot="switch-thumb"
          layout
          transition={transition}
          whileTap="tab"
          {...props}
        />
      }
    />
  );
}

type SwitchIconPosition = "left" | "right" | "thumb";

type SwitchIconProps = HTMLMotionProps<"div"> & {
  position: SwitchIconPosition;
};

function SwitchIcon({
  position,
  transition = { bounce: 0, type: "spring" },
  ...props
}: SwitchIconProps) {
  const { isChecked } = useSwitch();

  const isAnimated = React.useMemo(() => {
    if (position === "right") return !isChecked;
    if (position === "left") return isChecked;
    if (position === "thumb") return true;
    return false;
  }, [position, isChecked]);

  return (
    <motion.div
      animate={isAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      data-slot={`switch-${position}-icon`}
      transition={transition}
      {...props}
    />
  );
}

export {
  Switch,
  type SwitchContextType,
  SwitchIcon,
  type SwitchIconPosition,
  type SwitchIconProps,
  type SwitchProps,
  SwitchThumb,
  type SwitchThumbProps,
  useSwitch,
};

"use client";

import {
  Switch as SwitchPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from "@headlessui/react";
import {
  type HTMLMotionProps,
  type LegacyAnimationControls,
  motion,
  type TargetAndTransition,
  type VariantLabels,
} from "motion/react";
import * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";

type SwitchContextType = {
  isChecked: boolean;
  isPressed: boolean;
};

const [SwitchProvider, useSwitch] =
  getStrictContext<SwitchContextType>("SwitchContext");

type SwitchProps<TTag extends React.ElementType = typeof motion.button> =
  SwitchPrimitiveProps<TTag> &
    HTMLMotionProps<"button"> & {
      as?: TTag;
    };

function Switch<TTag extends React.ElementType = typeof motion.button>(
  props: SwitchProps<TTag>,
) {
  const { as = motion.button, children, ...rest } = props;

  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <SwitchPrimitive
      data-slot="switch"
      initial={false}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      onTapStart={() => setIsPressed(true)}
      whileTap="tap"
      {...rest}
      as={as}
    >
      {(bag) => (
        <SwitchProvider value={{ isChecked: bag.checked, isPressed }}>
          {typeof children === "function" ? children(bag) : children}
        </SwitchProvider>
      )}
    </SwitchPrimitive>
  );
}

type SwitchThumbProps<TTag extends React.ElementType = typeof motion.div> =
  HTMLMotionProps<"div"> & {
    as?: TTag;
    pressedAnimation?:
      | TargetAndTransition
      | VariantLabels
      | boolean
      | LegacyAnimationControls;
  };

function SwitchThumb<TTag extends React.ElementType = typeof motion.div>(
  props: SwitchThumbProps<TTag>,
) {
  const { isPressed, isChecked } = useSwitch();

  const {
    transition = { damping: 25, stiffness: 300, type: "spring" },
    pressedAnimation,
    as: Component = motion.div,
    ...rest
  } = props;

  return (
    <Component
      animate={isPressed ? pressedAnimation : undefined}
      data-slot="switch-thumb"
      layout
      transition={transition}
      whileTap="tab"
      {...(isChecked && { "data-checked": true })}
      {...rest}
    />
  );
}

type SwitchIconPosition = "left" | "right" | "thumb";

type SwitchIconProps<TTag extends React.ElementType = typeof motion.div> =
  HTMLMotionProps<"div"> & {
    position: SwitchIconPosition;
    as?: TTag;
  };

function SwitchIcon<TTag extends React.ElementType = typeof motion.div>(
  props: SwitchIconProps<TTag>,
) {
  const {
    position,
    transition = { bounce: 0, type: "spring" },
    as: Component = motion.div,
    ...rest
  } = props;
  const { isChecked } = useSwitch();

  const isAnimated = React.useMemo(() => {
    if (position === "right") return !isChecked;
    if (position === "left") return isChecked;
    if (position === "thumb") return true;
    return false;
  }, [position, isChecked]);

  return (
    <Component
      animate={isAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      data-slot={`switch-${position}-icon`}
      transition={transition}
      {...rest}
    />
  );
}

export {
  Switch,
  SwitchIcon,
  type SwitchIconProps,
  type SwitchProps,
  SwitchThumb,
  type SwitchThumbProps,
};

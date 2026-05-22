"use client";

import {
  type HTMLMotionProps,
  motion,
  type SVGMotionProps,
} from "motion/react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type CheckboxContextType = {
  isChecked: boolean | "indeterminate";
  setIsChecked: (checked: boolean | "indeterminate") => void;
};

const [CheckboxProvider, useCheckbox] =
  getStrictContext<CheckboxContextType>("CheckboxContext");

type CheckboxProps = HTMLMotionProps<"button"> &
  Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "asChild">;

function Checkbox({
  defaultChecked,
  checked,
  onCheckedChange,
  disabled,
  required,
  name,
  value,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useControlledState({
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
    value: checked,
  });

  return (
    <CheckboxProvider value={{ isChecked, setIsChecked }}>
      <CheckboxPrimitive.Root
        asChild
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        name={name}
        onCheckedChange={setIsChecked}
        required={required}
        value={value}
      >
        <motion.button
          data-slot="checkbox"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        />
      </CheckboxPrimitive.Root>
    </CheckboxProvider>
  );
}

type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>;

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { isChecked } = useCheckbox();

  return (
    <CheckboxPrimitive.Indicator asChild forceMount>
      <motion.svg
        animate={isChecked ? "checked" : "unchecked"}
        data-slot="checkbox-indicator"
        fill="none"
        initial="unchecked"
        stroke="currentColor"
        strokeWidth="3.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        {isChecked === "indeterminate" ? (
          <motion.line
            animate={{
              opacity: 1,
              pathLength: 1,
              transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, pathLength: 0 }}
            strokeLinecap="round"
            x1="5"
            x2="19"
            y1="12"
            y2="12"
          />
        ) : (
          <motion.path
            d="M4.5 12.75l6 6 9-13.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              checked: {
                opacity: 1,
                pathLength: 1,
                transition: {
                  delay: 0.2,
                  duration: 0.2,
                },
              },
              unchecked: {
                opacity: 0,
                pathLength: 0,
                transition: {
                  duration: 0.2,
                },
              },
            }}
          />
        )}
      </motion.svg>
    </CheckboxPrimitive.Indicator>
  );
}

export {
  Checkbox,
  type CheckboxContextType,
  CheckboxIndicator,
  type CheckboxIndicatorProps,
  type CheckboxProps,
  useCheckbox,
};

"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui-components/react/checkbox";
import {
  type HTMLMotionProps,
  motion,
  type SVGMotionProps,
} from "motion/react";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type CheckboxContextType = {
  isChecked: boolean;
  setIsChecked: CheckboxProps["onCheckedChange"];
  isIndeterminate: boolean | undefined;
};

const [CheckboxProvider, useCheckbox] =
  getStrictContext<CheckboxContextType>("CheckboxContext");

type CheckboxProps = Omit<
  React.ComponentProps<typeof CheckboxPrimitive.Root>,
  "render"
> &
  HTMLMotionProps<"button">;

function Checkbox({
  name,
  checked,
  defaultChecked,
  onCheckedChange,
  indeterminate,
  value,
  nativeButton,
  parent,
  disabled,
  readOnly,
  required,
  inputRef,
  id,
  ...props
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useControlledState({
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
    value: checked,
  });

  return (
    <CheckboxProvider
      value={{ isChecked, isIndeterminate: indeterminate, setIsChecked }}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={id}
        indeterminate={indeterminate}
        inputRef={inputRef}
        name={name}
        nativeButton={nativeButton}
        onCheckedChange={setIsChecked}
        parent={parent}
        readOnly={readOnly}
        render={
          <motion.button
            data-slot="checkbox"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
          />
        }
        required={required}
        value={value}
      />
    </CheckboxProvider>
  );
}

type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>;

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { isChecked, isIndeterminate } = useCheckbox();

  return (
    <CheckboxPrimitive.Indicator
      keepMounted
      render={
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
          {isIndeterminate ? (
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
      }
    />
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

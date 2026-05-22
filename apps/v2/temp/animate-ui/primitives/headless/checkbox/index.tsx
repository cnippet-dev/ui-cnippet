"use client";

import {
  Checkbox as CheckboxPrimitive,
  type CheckboxProps as CheckboxPrimitiveProps,
} from "@headlessui/react";
import {
  type HTMLMotionProps,
  motion,
  type SVGMotionProps,
} from "motion/react";
import type * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";

type CheckboxContextType = {
  isChecked: boolean;
  isIndeterminate: boolean;
};

const [CheckboxProvider, useCheckbox] =
  getStrictContext<CheckboxContextType>("CheckboxContext");

type CheckboxProps<TTag extends React.ElementType = typeof motion.button> =
  CheckboxPrimitiveProps<TTag> &
    Omit<
      HTMLMotionProps<"button">,
      "checked" | "onChange" | "defaultChecked" | "children"
    > & {
      as?: TTag;
    };

function Checkbox<TTag extends React.ElementType = typeof motion.button>({
  children,
  ...props
}: CheckboxProps<TTag>) {
  const { as = motion.button, ...rest } = props;

  return (
    <CheckboxPrimitive
      data-slot="checkbox"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
      as={as as React.ElementType}
    >
      {(bag) => (
        <CheckboxProvider
          value={{ isChecked: bag.checked, isIndeterminate: bag.indeterminate }}
        >
          {typeof children === "function" ? children(bag) : children}
        </CheckboxProvider>
      )}
    </CheckboxPrimitive>
  );
}

type CheckboxIndicatorProps = SVGMotionProps<SVGSVGElement>;

function CheckboxIndicator(props: CheckboxIndicatorProps) {
  const { isChecked, isIndeterminate } = useCheckbox();

  return (
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

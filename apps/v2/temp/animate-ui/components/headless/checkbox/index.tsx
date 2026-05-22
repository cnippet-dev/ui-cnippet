import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { motion } from "motion/react";
import type * as React from "react";
import {
  CheckboxIndicator as CheckboxIndicatorPrimitive,
  Checkbox as CheckboxPrimitive,
  type CheckboxProps as CheckboxPrimitiveProps,
} from "@/registry/primitives/headless/checkbox";

const checkboxVariants = cva(
  "peer flex shrink-0 items-center justify-center outline-none transition-colors duration-500 focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&[data-checked],&[data-indeterminate]]:bg-primary [&[data-checked],&[data-indeterminate]]:text-primary-foreground",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "size-5 rounded-sm",
        lg: "size-6 rounded-[7px]",
        sm: "size-4.5 rounded-[5px]",
      },
      variant: {
        accent: "bg-input",
        default: "border bg-background",
      },
    },
  },
);

const checkboxIndicatorVariants = cva("", {
  defaultVariants: {
    size: "default",
  },
  variants: {
    size: {
      default: "size-3.5",
      lg: "size-4",
      sm: "size-3",
    },
  },
});

type CheckboxProps<TTag extends React.ElementType = typeof motion.button> =
  CheckboxPrimitiveProps<TTag> & VariantProps<typeof checkboxVariants>;

function Checkbox<TTag extends React.ElementType = typeof motion.button>({
  className,
  children,
  variant,
  size,
  ...props
}: CheckboxProps<TTag>) {
  return (
    <CheckboxPrimitive
      className={cn(checkboxVariants({ className, size, variant }))}
      {...props}
    >
      {(bag) => (
        <>
          {typeof children === "function" ? children(bag) : children}
          <CheckboxIndicatorPrimitive
            className={cn(checkboxIndicatorVariants({ size }))}
          />
        </>
      )}
    </CheckboxPrimitive>
  );
}

export { Checkbox, type CheckboxProps };

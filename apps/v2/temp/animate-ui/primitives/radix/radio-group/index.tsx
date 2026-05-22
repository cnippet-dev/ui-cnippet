"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type RadioGroupContextType = {
  value: string;
  setValue: (value: string) => void;
};

type RadioGroupItemContextType = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

const [RadioGroupProvider, useRadioGroup] =
  getStrictContext<RadioGroupContextType>("RadioGroupContext");

const [RadioGroupItemProvider, useRadioGroupItem] =
  getStrictContext<RadioGroupItemContextType>("RadioGroupItemContext");

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root>;

function RadioGroup(props: RadioGroupProps) {
  const [value, setValue] = useControlledState({
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
    value: props.value ?? undefined,
  });

  return (
    <RadioGroupProvider value={{ setValue, value }}>
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        {...props}
        onValueChange={setValue}
      />
    </RadioGroupProvider>
  );
}

type RadioGroupIndicatorProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Indicator>,
  "asChild" | "forceMount"
> &
  HTMLMotionProps<"div">;

function RadioGroupIndicator({
  transition = { damping: 16, stiffness: 200, type: "spring" },
  ...props
}: RadioGroupIndicatorProps) {
  const { isChecked } = useRadioGroupItem();

  return (
    <AnimatePresence>
      {isChecked && (
        <RadioGroupPrimitive.Indicator
          asChild
          data-slot="radio-group-indicator"
          forceMount
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            data-slot="radio-group-indicator-circle"
            exit={{ opacity: 0, scale: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            key="radio-group-indicator-circle"
            transition={transition}
            {...props}
          />
        </RadioGroupPrimitive.Indicator>
      )}
    </AnimatePresence>
  );
}

type RadioGroupItemProps = Omit<
  React.ComponentProps<typeof RadioGroupPrimitive.Item>,
  "asChild"
> &
  HTMLMotionProps<"button">;

function RadioGroupItem({
  value: valueProps,
  disabled,
  required,
  ...props
}: RadioGroupItemProps) {
  const { value } = useRadioGroup();
  const [isChecked, setIsChecked] = React.useState(value === valueProps);

  React.useEffect(() => {
    setIsChecked(value === valueProps);
  }, [value, valueProps]);

  return (
    <RadioGroupItemProvider value={{ isChecked, setIsChecked }}>
      <RadioGroupPrimitive.Item
        asChild
        disabled={disabled}
        required={required}
        value={valueProps}
      >
        <motion.button
          data-slot="radio-group-item"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          {...props}
        />
      </RadioGroupPrimitive.Item>
    </RadioGroupItemProvider>
  );
}

export {
  RadioGroup,
  type RadioGroupContextType,
  RadioGroupIndicator,
  type RadioGroupIndicatorProps,
  RadioGroupItem,
  type RadioGroupItemContextType,
  type RadioGroupItemProps,
  type RadioGroupProps,
  useRadioGroup,
  useRadioGroupItem,
};

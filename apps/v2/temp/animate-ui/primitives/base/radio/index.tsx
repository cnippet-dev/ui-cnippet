"use client";

import { Radio as RadioPrimitive } from "@base-ui-components/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui-components/react/radio-group";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type RadioGroupContextType = {
  value: RadioGroupProps["value"];
  setValue: RadioGroupProps["onValueChange"];
};

type RadioContextType = {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
};

const [RadioGroupProvider, useRadioGroup] =
  getStrictContext<RadioGroupContextType>("RadioGroupContext");

const [RadioProvider, useRadio] =
  getStrictContext<RadioContextType>("RadioContext");

type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive>;

function RadioGroup(props: RadioGroupProps) {
  const [value, setValue] = useControlledState({
    defaultValue: props.defaultValue,
    onChange: props.onValueChange,
    value: props.value ?? undefined,
  });

  return (
    <RadioGroupProvider value={{ setValue, value }}>
      <RadioGroupPrimitive
        data-slot="radio-group"
        {...props}
        onValueChange={setValue}
      />
    </RadioGroupProvider>
  );
}

type RadioIndicatorProps = Omit<
  React.ComponentProps<typeof RadioPrimitive.Indicator>,
  "asChild" | "forceMount"
> &
  HTMLMotionProps<"div">;

function RadioIndicator({
  transition = { damping: 16, stiffness: 200, type: "spring" },
  ...props
}: RadioIndicatorProps) {
  const { isChecked } = useRadio();

  return (
    <AnimatePresence>
      {isChecked && (
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          keepMounted
          render={
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              data-slot="radio-group-indicator-circle"
              exit={{ opacity: 0, scale: 0 }}
              initial={{ opacity: 0, scale: 0 }}
              key="radio-group-indicator-circle"
              transition={transition}
              {...props}
            />
          }
        />
      )}
    </AnimatePresence>
  );
}

type RadioProps = Omit<
  React.ComponentProps<typeof RadioPrimitive.Root>,
  "asChild"
> &
  HTMLMotionProps<"button">;

function Radio({
  value: valueProps,
  disabled,
  required,
  ...props
}: RadioProps) {
  const { value } = useRadioGroup();
  const [isChecked, setIsChecked] = React.useState(value === valueProps);

  React.useEffect(() => {
    setIsChecked(value === valueProps);
  }, [value, valueProps]);

  return (
    <RadioProvider value={{ isChecked, setIsChecked }}>
      <RadioPrimitive.Root
        disabled={disabled}
        render={
          <motion.button
            data-slot="radio-group-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
          />
        }
        required={required}
        value={valueProps}
      />
    </RadioProvider>
  );
}

export {
  Radio,
  type RadioContextType,
  RadioGroup,
  type RadioGroupContextType,
  type RadioGroupProps,
  RadioIndicator,
  type RadioIndicatorProps,
  type RadioProps,
  useRadio,
  useRadioGroup,
};

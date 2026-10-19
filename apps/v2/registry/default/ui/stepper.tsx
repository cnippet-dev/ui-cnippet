"use client";

import { CheckIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

type StepState = "completed" | "active" | "inactive";
type Orientation = "horizontal" | "vertical";

type StepperContextValue = {
  value: number;
  onValueChange?: (step: number) => void;
  orientation: Orientation;
};

const StepperContext = React.createContext<StepperContextValue | null>(null);

type StepperItemContextValue = {
  step: number;
  state: StepState;
  disabled: boolean;
};

const StepperItemContext = React.createContext<StepperItemContextValue | null>(
  null,
);

function useStepper() {
  const context = React.useContext(StepperContext);
  if (!context) throw new Error("Stepper parts must be used within <Stepper>.");
  return context;
}

function useStepperItem() {
  const context = React.useContext(StepperItemContext);
  if (!context) {
    throw new Error("Stepper item parts must be used within <StepperItem>.");
  }
  return context;
}

export function Stepper({
  value: valueProp,
  defaultValue = 1,
  onValueChange,
  orientation = "horizontal",
  className,
  ...props
}: Omit<React.ComponentProps<"ol">, "defaultValue"> & {
  /** The active step, starting at 1. Earlier steps show as completed. */
  value?: number;
  defaultValue?: number;
  /** Called when a step trigger is clicked. */
  onValueChange?: (step: number) => void;
  orientation?: Orientation;
}): React.ReactElement {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = valueProp ?? internalValue;

  const handleValueChange = (step: number) => {
    if (valueProp === undefined) setInternalValue(step);
    onValueChange?.(step);
  };

  return (
    <StepperContext.Provider
      value={{ onValueChange: handleValueChange, orientation, value }}
    >
      <ol
        className={cn(
          "group/stepper flex w-full",
          orientation === "horizontal" ? "items-start" : "flex-col",
          className,
        )}
        data-orientation={orientation}
        data-slot="stepper"
        {...props}
      />
    </StepperContext.Provider>
  );
}

export function StepperItem({
  step,
  completed,
  disabled = false,
  className,
  ...props
}: React.ComponentProps<"li"> & {
  step: number;
  /** Force the completed state, e.g. for a step finished out of order. */
  completed?: boolean;
  disabled?: boolean;
}): React.ReactElement {
  const { value, orientation } = useStepper();
  const state: StepState =
    completed || step < value
      ? "completed"
      : step === value
        ? "active"
        : "inactive";

  return (
    <StepperItemContext.Provider value={{ disabled, state, step }}>
      <li
        aria-current={state === "active" ? "step" : undefined}
        className={cn(
          "group/step relative flex not-last:flex-1",
          orientation === "horizontal"
            ? "flex-row items-start"
            : "flex-col items-stretch",
          className,
        )}
        data-disabled={disabled || undefined}
        data-slot="stepper-item"
        data-state={state}
        {...props}
      />
    </StepperItemContext.Provider>
  );
}

export function StepperTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  const { onValueChange, orientation } = useStepper();
  const { step, disabled } = useStepperItem();

  return (
    <button
      className={cn(
        "flex shrink-0 cursor-pointer gap-3 rounded-lg text-start outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-default disabled:opacity-64",
        orientation === "horizontal"
          ? "flex-col items-center text-center"
          : "items-start",
        className,
      )}
      data-slot="stepper-trigger"
      disabled={disabled}
      onClick={(e) => {
        onClick?.(e);
        if (!e.defaultPrevented) onValueChange?.(step);
      }}
      type="button"
      {...props}
    />
  );
}

export function StepperIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  const { step, state } = useStepperItem();

  return (
    <span
      className={cn(
        "relative flex size-7 shrink-0 items-center justify-center rounded-full border border-muted-foreground/32 bg-background font-medium text-muted-foreground text-xs tabular-nums transition-colors",
        "group-data-[state=active]/step:border-primary group-data-[state=active]/step:text-foreground group-data-[state=active]/step:ring-3 group-data-[state=active]/step:ring-primary/16",
        "group-data-[state=completed]/step:border-primary group-data-[state=completed]/step:bg-primary group-data-[state=completed]/step:text-primary-foreground",
        className,
      )}
      data-slot="stepper-indicator"
      {...props}
    >
      {children ??
        (state === "completed" ? (
          <CheckIcon aria-hidden="true" className="size-3.5" />
        ) : (
          step
        ))}
    </span>
  );
}

export function StepperTitle({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      className={cn(
        "block font-medium text-muted-foreground text-sm group-data-[state=active]/step:text-foreground group-data-[state=completed]/step:text-foreground",
        className,
      )}
      data-slot="stepper-title"
      {...props}
    />
  );
}

export function StepperDescription({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      className={cn("block text-muted-foreground text-xs", className)}
      data-slot="stepper-description"
      {...props}
    />
  );
}

export function StepperSeparator({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  const { orientation } = useStepper();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "bg-muted-foreground/24 transition-colors group-last/step:hidden group-data-[state=completed]/step:bg-primary",
        orientation === "horizontal"
          ? "mx-2 mt-3.5 h-px flex-1"
          : "my-1 ms-3.5 min-h-6 w-px flex-1",
        className,
      )}
      data-slot="stepper-separator"
      {...props}
    />
  );
}

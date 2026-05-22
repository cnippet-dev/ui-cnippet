"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  Highlight,
  HighlightItem,
  type HighlightItemProps,
  type HighlightProps,
} from "@/registry/primitives/effects/highlight";

type ToggleGroupContextType = {
  value: string | string[] | undefined;
  setValue: (value: string | string[] | undefined) => void;
  type: "single" | "multiple";
};

const [ToggleGroupProvider, useToggleGroup] =
  getStrictContext<ToggleGroupContextType>("ToggleGroupContext");

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root>;

function ToggleGroup(props: ToggleGroupProps) {
  const [value, setValue] = useControlledState<string | string[] | undefined>({
    defaultValue: props.defaultValue,
    onChange: props.onValueChange as (
      value: string | string[] | undefined,
    ) => void,
    value: props.value,
  });

  return (
    <ToggleGroupProvider value={{ setValue, type: props.type, value }}>
      <ToggleGroupPrimitive.Root
        data-slot="toggle-group"
        {...props}
        onValueChange={setValue}
      />
    </ToggleGroupProvider>
  );
}

type ToggleGroupItemProps = Omit<
  React.ComponentProps<typeof ToggleGroupPrimitive.Item>,
  "asChild"
> &
  HTMLMotionProps<"button">;

function ToggleGroupItem({ value, disabled, ...props }: ToggleGroupItemProps) {
  return (
    <ToggleGroupPrimitive.Item asChild disabled={disabled} value={value}>
      <motion.button
        data-slot="toggle-group-item"
        whileTap={{ scale: 0.95 }}
        {...props}
      />
    </ToggleGroupPrimitive.Item>
  );
}

type ToggleGroupHighlightProps = Omit<HighlightProps, "controlledItems">;

function ToggleGroupHighlight({
  transition = { damping: 25, stiffness: 200, type: "spring" },
  ...props
}: ToggleGroupHighlightProps) {
  const { value } = useToggleGroup();

  return (
    <Highlight
      controlledItems
      data-slot="toggle-group-highlight"
      exitDelay={0}
      transition={transition}
      value={typeof value === "string" ? value : null}
      {...props}
    />
  );
}

type ToggleGroupHighlightItemProps = HighlightItemProps &
  HTMLMotionProps<"div"> & {
    children: React.ReactElement;
  };

function ToggleGroupHighlightItem({
  children,
  style,
  ...props
}: ToggleGroupHighlightItemProps) {
  const { type, value } = useToggleGroup();

  if (type === "single") {
    return (
      <HighlightItem
        data-slot="toggle-group-highlight-item"
        style={{ inset: 0, ...style }}
        {...props}
      >
        {children}
      </HighlightItem>
    );
  }

  if (type === "multiple" && React.isValidElement(children)) {
    const isActive = props.value && value?.includes(props.value);

    const element = children as React.ReactElement<React.ComponentProps<"div">>;

    return React.cloneElement(
      children,
      {
        style: {
          ...element.props.style,
          position: "relative",
        },
        ...element.props,
      },
      <>
        <AnimatePresence>
          {isActive && (
            <motion.div
              animate={{ opacity: 1 }}
              data-slot="toggle-group-highlight-item"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              style={{ inset: 0, position: "absolute", zIndex: 0, ...style }}
              {...props}
            />
          )}
        </AnimatePresence>

        <div
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {element.props.children}
        </div>
      </>,
    );
  }
}

export {
  ToggleGroup,
  type ToggleGroupContextType,
  ToggleGroupHighlight,
  ToggleGroupHighlightItem,
  type ToggleGroupHighlightItemProps,
  type ToggleGroupHighlightProps,
  ToggleGroupItem,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
  useToggleGroup,
};

"use client";

import { Toggle as TogglePrimitive } from "@base-ui-components/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui-components/react/toggle-group";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any[];
  setValue: ToggleGroupProps["onValueChange"];
  multiple: boolean | undefined;
};

const [ToggleGroupProvider, useToggleGroup] =
  getStrictContext<ToggleGroupContextType>("ToggleGroupContext");

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive>;

function ToggleGroup(props: ToggleGroupProps) {
  const [value, setValue] = useControlledState({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValue: props.defaultValue as any[],
    onChange: props.onValueChange,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: props.value as any[],
  });

  return (
    <ToggleGroupProvider value={{ multiple: props.multiple, setValue, value }}>
      <ToggleGroupPrimitive
        data-slot="toggle-group"
        {...props}
        onValueChange={setValue}
      />
    </ToggleGroupProvider>
  );
}

type ToggleProps = Omit<
  React.ComponentProps<typeof TogglePrimitive>,
  "render"
> &
  HTMLMotionProps<"button">;

function Toggle({
  value,
  pressed,
  defaultPressed,
  onPressedChange,
  nativeButton,
  disabled,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      defaultPressed={defaultPressed}
      disabled={disabled}
      nativeButton={nativeButton}
      onPressedChange={onPressedChange}
      pressed={pressed}
      render={
        <motion.button
          data-slot="toggle"
          whileTap={{ scale: 0.95 }}
          {...props}
        />
      }
      value={value}
    />
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
      value={value?.[0] ?? null}
      {...props}
    />
  );
}

type ToggleHighlightProps = HighlightItemProps &
  HTMLMotionProps<"div"> & {
    children: React.ReactElement;
  };

function ToggleHighlight({ children, style, ...props }: ToggleHighlightProps) {
  const { multiple, value } = useToggleGroup();

  if (!multiple) {
    return (
      <HighlightItem
        data-slot="toggle-highlight"
        style={{ inset: 0, ...style }}
        {...props}
      >
        {children}
      </HighlightItem>
    );
  }

  if (multiple && React.isValidElement(children)) {
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
              data-slot="toggle-highlight"
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
  Toggle,
  ToggleGroup,
  type ToggleGroupContextType,
  ToggleGroupHighlight,
  type ToggleGroupHighlightProps,
  type ToggleGroupProps,
  ToggleHighlight,
  type ToggleHighlightProps,
  type ToggleProps,
  useToggleGroup,
};

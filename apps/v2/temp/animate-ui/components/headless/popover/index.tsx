import { cn } from "@workspace/ui/lib/utils";
import type * as React from "react";
import {
  PopoverBackdrop as PopoverBackdropPrimitive,
  type PopoverBackdropProps as PopoverBackdropPrimitiveProps,
  PopoverButton as PopoverButtonPrimitive,
  type PopoverButtonProps as PopoverButtonPrimitiveProps,
  PopoverGroup as PopoverGroupPrimitive,
  type PopoverGroupProps as PopoverGroupPrimitiveProps,
  PopoverPanel as PopoverPanelPrimitive,
  type PopoverPanelProps as PopoverPanelPrimitiveProps,
  Popover as PopoverPrimitive,
  type PopoverProps as PopoverPrimitiveProps,
} from "@/registry/primitives/headless/popover";

type PopoverProps<TTag extends React.ElementType = "div"> =
  PopoverPrimitiveProps<TTag>;

function Popover<TTag extends React.ElementType = "div">(
  props: PopoverProps<TTag>,
) {
  return <PopoverPrimitive {...props} />;
}

type PopoverButtonProps<TTag extends React.ElementType = "button"> =
  PopoverButtonPrimitiveProps<TTag>;

function PopoverButton<TTag extends React.ElementType = "button">(
  props: PopoverButtonProps<TTag>,
) {
  return <PopoverButtonPrimitive {...props} />;
}

type PopoverPanelProps<TTag extends React.ElementType = "div"> =
  PopoverPanelPrimitiveProps<TTag>;

function PopoverPanel<TTag extends React.ElementType = "div">({
  className,
  anchor = { gap: 4, to: "bottom" },
  ...props
}: PopoverPanelProps<TTag>) {
  return (
    <PopoverPanelPrimitive
      anchor={anchor}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden",
        "data-[anchor=top_center]:origin-bottom data-[anchor=top_end]:origin-bottom-right data-[anchor=top_start]:origin-bottom-left",
        "data-[anchor=bottom_center]:origin-top data-[anchor=bottom_end]:origin-top-right data-[anchor=bottom_start]:origin-top-left",
        "data-[anchor=left_center]:origin-right data-[anchor=left_end]:origin-bottom-right data-[anchor=left_start]:origin-top-right",
        "data-[anchor=right_center]:origin-left data-[anchor=right_end]:origin-bottom-left data-[anchor=right_start]:origin-top-left",
        className,
      )}
      {...props}
    />
  );
}

type PopoverBackdropProps<TTag extends React.ElementType = "div"> =
  PopoverBackdropPrimitiveProps<TTag>;

function PopoverBackdrop<TTag extends React.ElementType = "div">(
  props: PopoverBackdropProps<TTag>,
) {
  return <PopoverBackdropPrimitive {...props} />;
}

type PopoverGroupProps<TTag extends React.ElementType = "div"> =
  PopoverGroupPrimitiveProps<TTag>;

function PopoverGroup<TTag extends React.ElementType = "div">(
  props: PopoverGroupProps<TTag>,
) {
  return <PopoverGroupPrimitive {...props} />;
}

export {
  Popover,
  PopoverBackdrop,
  type PopoverBackdropProps,
  PopoverButton,
  type PopoverButtonProps,
  PopoverGroup,
  type PopoverGroupProps,
  PopoverPanel,
  type PopoverPanelProps,
  type PopoverProps,
};

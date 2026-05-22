"use client";

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
} from "@headlessui/react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  type Transition,
} from "motion/react";
import type * as React from "react";

import { getStrictContext } from "@/registry/lib/get-strict-context";

type PopoverContextType = {
  isOpen: boolean;
};

const [PopoverProvider, usePopover] =
  getStrictContext<PopoverContextType>("PopoverContext");

type PopoverProps<TTag extends React.ElementType = "div"> =
  PopoverPrimitiveProps<TTag> & {
    as?: TTag;
  };

function Popover<TTag extends React.ElementType = "div">({
  children,
  ...props
}: PopoverProps<TTag>) {
  return (
    <PopoverPrimitive data-slot="popover" {...props}>
      {(bag) => (
        <PopoverProvider value={{ isOpen: bag.open }}>
          {typeof children === "function" ? children(bag) : children}
        </PopoverProvider>
      )}
    </PopoverPrimitive>
  );
}

type PopoverButtonProps<TTag extends React.ElementType = "button"> =
  PopoverButtonPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverButton<TTag extends React.ElementType = "button">(
  props: PopoverButtonProps<TTag>,
) {
  return <PopoverButtonPrimitive data-slot="popover-button" {...props} />;
}

type PopoverBackdropProps<TTag extends React.ElementType = "div"> =
  PopoverBackdropPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverBackdrop<TTag extends React.ElementType = "div">(
  props: PopoverBackdropProps<TTag>,
) {
  return <PopoverBackdropPrimitive data-slot="popover-backdrop" {...props} />;
}

type PopoverGroupProps<TTag extends React.ElementType = "div"> =
  PopoverGroupPrimitiveProps<TTag> & {
    as?: TTag;
  };

function PopoverGroup<TTag extends React.ElementType = "div">(
  props: PopoverGroupProps<TTag>,
) {
  return <PopoverGroupPrimitive data-slot="popover-group" {...props} />;
}

type PopoverPanelProps<TTag extends React.ElementType = "div"> = Omit<
  PopoverPanelPrimitiveProps<TTag>,
  "transition"
> &
  Omit<HTMLMotionProps<"div">, "children"> & {
    transition?: Transition;
    as?: TTag;
  };

function PopoverPanel<TTag extends React.ElementType = "div">(
  props: PopoverPanelProps<TTag>,
) {
  const {
    transition = { damping: 25, stiffness: 300, type: "spring" },
    as = motion.div,
    ...rest
  } = props;

  const { isOpen } = usePopover();

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPanelPrimitive
          animate={{ opacity: 1, scale: 1, transition }}
          as={as}
          data-slot="popover-panel"
          exit={{ opacity: 0, scale: 0.5, transition }}
          initial={{ opacity: 0, scale: 0.5, transition }}
          key="popover-panel"
          static
          {...rest}
        />
      )}
    </AnimatePresence>
  );
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

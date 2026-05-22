"use client";

import { Popover as PopoverPrimitive } from "@base-ui-components/react/popover";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: PopoverProps["onOpenChange"];
};

const [PopoverProvider, usePopover] =
  getStrictContext<PopoverContextType>("PopoverContext");

type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Root>;

function Popover(props: PopoverProps) {
  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
    value: props?.open,
  });

  return (
    <PopoverProvider value={{ isOpen, setIsOpen }}>
      <PopoverPrimitive.Root
        data-slot="popover"
        {...props}
        onOpenChange={setIsOpen}
      />
    </PopoverProvider>
  );
}

type PopoverTriggerProps = React.ComponentProps<
  typeof PopoverPrimitive.Trigger
>;

function PopoverTrigger(props: PopoverTriggerProps) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

type PopoverPortalProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Portal>,
  "keepMounted"
>;

function PopoverPortal(props: PopoverPortalProps) {
  const { isOpen } = usePopover();

  return (
    <AnimatePresence>
      {isOpen && (
        <PopoverPrimitive.Portal
          data-slot="popover-portal"
          keepMounted
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type PopoverPositionerProps = React.ComponentProps<
  typeof PopoverPrimitive.Positioner
>;

function PopoverPositioner(props: PopoverPositionerProps) {
  return (
    <PopoverPrimitive.Positioner data-slot="popover-positioner" {...props} />
  );
}

type PopoverPopupProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div">;

function PopoverPopup({
  initialFocus,
  finalFocus,
  transition = { damping: 25, stiffness: 300, type: "spring" },
  ...props
}: PopoverPopupProps) {
  return (
    <PopoverPrimitive.Popup
      finalFocus={finalFocus}
      initialFocus={initialFocus}
      render={
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          data-slot="popover-popup"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          key="popover-popup"
          transition={transition}
          {...props}
        />
      }
    />
  );
}

type PopoverBackdropProps = React.ComponentProps<
  typeof PopoverPrimitive.Backdrop
>;

function PopoverBackdrop(props: PopoverBackdropProps) {
  return <PopoverPrimitive.Backdrop data-slot="popover-backdrop" {...props} />;
}

type PopoverArrowProps = React.ComponentProps<typeof PopoverPrimitive.Arrow>;

function PopoverArrow(props: PopoverArrowProps) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}

type PopoverTitleProps = React.ComponentProps<typeof PopoverPrimitive.Title>;

function PopoverTitle(props: PopoverTitleProps) {
  return <PopoverPrimitive.Title data-slot="popover-title" {...props} />;
}

type PopoverDescriptionProps = React.ComponentProps<
  typeof PopoverPrimitive.Description
>;

function PopoverDescription(props: PopoverDescriptionProps) {
  return (
    <PopoverPrimitive.Description data-slot="popover-description" {...props} />
  );
}

type PopoverCloseProps = React.ComponentProps<typeof PopoverPrimitive.Close>;

function PopoverClose(props: PopoverCloseProps) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />;
}

export {
  Popover,
  PopoverArrow,
  type PopoverArrowProps,
  PopoverBackdrop,
  type PopoverBackdropProps,
  PopoverClose,
  type PopoverCloseProps,
  type PopoverContextType,
  PopoverDescription,
  type PopoverDescriptionProps,
  PopoverPopup,
  type PopoverPopupProps,
  PopoverPortal,
  type PopoverPortalProps,
  PopoverPositioner,
  type PopoverPositionerProps,
  type PopoverProps,
  PopoverTitle,
  type PopoverTitleProps,
  PopoverTrigger,
  type PopoverTriggerProps,
  usePopover,
};

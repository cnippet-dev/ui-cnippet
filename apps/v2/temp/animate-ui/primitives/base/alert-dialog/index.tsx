"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui-components/react/alert-dialog";
import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";

import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type AlertDialogContextType = {
  isOpen: boolean;
  setIsOpen: AlertDialogProps["onOpenChange"];
};

const [AlertDialogProvider, useAlertDialog] =
  getStrictContext<AlertDialogContextType>("AlertDialogContext");

type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>;

function AlertDialog(props: AlertDialogProps) {
  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
    value: props?.open,
  });

  return (
    <AlertDialogProvider value={{ isOpen, setIsOpen }}>
      <AlertDialogPrimitive.Root
        data-slot="alert-dialog"
        {...props}
        onOpenChange={setIsOpen}
      />
    </AlertDialogProvider>
  );
}

type AlertDialogTriggerProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Trigger
>;

function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

type AlertDialogPortalProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Portal>,
  "keepMounted"
>;

function AlertDialogPortal(props: AlertDialogPortalProps) {
  const { isOpen } = useAlertDialog();

  return (
    <AnimatePresence>
      {isOpen && (
        <AlertDialogPrimitive.Portal
          data-slot="alert-dialog-portal"
          keepMounted
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type AlertDialogBackdropProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Backdrop>,
  "render"
> &
  HTMLMotionProps<"div">;

function AlertDialogBackdrop({
  transition = { duration: 0.2, ease: "easeInOut" },
  ...props
}: AlertDialogBackdropProps) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-backdrop"
      render={
        <motion.div
          animate={{ filter: "blur(0px)", opacity: 1 }}
          exit={{ filter: "blur(4px)", opacity: 0 }}
          initial={{ filter: "blur(4px)", opacity: 0 }}
          key="alert-dialog-backdrop"
          transition={transition}
          {...props}
        />
      }
    />
  );
}

type AlertDialogFlipDirection = "top" | "bottom" | "left" | "right";

type AlertDialogPopupProps = Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div"> & {
    from?: AlertDialogFlipDirection;
  };

function AlertDialogPopup({
  from = "top",
  initialFocus,
  finalFocus,
  transition = { damping: 25, stiffness: 150, type: "spring" },
  ...props
}: AlertDialogPopupProps) {
  const initialRotation =
    from === "bottom" || from === "left" ? "20deg" : "-20deg";
  const isVertical = from === "top" || from === "bottom";
  const rotateAxis = isVertical ? "rotateX" : "rotateY";

  return (
    <AlertDialogPrimitive.Popup
      finalFocus={finalFocus}
      initialFocus={initialFocus}
      render={
        <motion.div
          animate={{
            filter: "blur(0px)",
            opacity: 1,
            transform: `perspective(500px) ${rotateAxis}(0deg) scale(1)`,
          }}
          data-slot="alert-dialog-popup"
          exit={{
            filter: "blur(4px)",
            opacity: 0,
            transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
          }}
          initial={{
            filter: "blur(4px)",
            opacity: 0,
            transform: `perspective(500px) ${rotateAxis}(${initialRotation}) scale(0.8)`,
          }}
          key="alert-dialog-popup"
          transition={transition}
          {...props}
        />
      }
    />
  );
}

type AlertDialogCloseProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Close
>;

function AlertDialogClose(props: AlertDialogCloseProps) {
  return (
    <AlertDialogPrimitive.Close data-slot="alert-dialog-close" {...props} />
  );
}

type AlertDialogHeaderProps = React.ComponentProps<"div">;

function AlertDialogHeader(props: AlertDialogHeaderProps) {
  return <div data-slot="alert-dialog-header" {...props} />;
}

type AlertDialogFooterProps = React.ComponentProps<"div">;

function AlertDialogFooter(props: AlertDialogFooterProps) {
  return <div data-slot="alert-dialog-footer" {...props} />;
}

type AlertDialogTitleProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Title
>;

function AlertDialogTitle(props: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title data-slot="alert-dialog-title" {...props} />
  );
}

type AlertDialogDescriptionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Description
>;

function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogBackdrop,
  type AlertDialogBackdropProps,
  AlertDialogClose,
  type AlertDialogCloseProps,
  type AlertDialogContextType,
  AlertDialogDescription,
  type AlertDialogDescriptionProps,
  type AlertDialogFlipDirection,
  AlertDialogFooter,
  type AlertDialogFooterProps,
  AlertDialogHeader,
  type AlertDialogHeaderProps,
  AlertDialogPopup,
  type AlertDialogPopupProps,
  AlertDialogPortal,
  type AlertDialogPortalProps,
  type AlertDialogProps,
  AlertDialogTitle,
  type AlertDialogTitleProps,
  AlertDialogTrigger,
  type AlertDialogTriggerProps,
  useAlertDialog,
};

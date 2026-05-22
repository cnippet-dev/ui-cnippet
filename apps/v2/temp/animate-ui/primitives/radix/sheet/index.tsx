"use client";

import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";
import { Dialog as SheetPrimitive } from "radix-ui";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type SheetContextType = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const [SheetProvider, useSheet] =
  getStrictContext<SheetContextType>("SheetContext");

type SheetProps = React.ComponentProps<typeof SheetPrimitive.Root>;

function Sheet(props: SheetProps) {
  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: props.defaultOpen,
    onChange: props.onOpenChange,
    value: props.open,
  });

  return (
    <SheetProvider value={{ isOpen, setIsOpen }}>
      <SheetPrimitive.Root
        data-slot="sheet"
        {...props}
        onOpenChange={setIsOpen}
      />
    </SheetProvider>
  );
}

type SheetTriggerProps = React.ComponentProps<typeof SheetPrimitive.Trigger>;

function SheetTrigger(props: SheetTriggerProps) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

type SheetCloseProps = React.ComponentProps<typeof SheetPrimitive.Close>;

function SheetClose(props: SheetCloseProps) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

type SheetPortalProps = React.ComponentProps<typeof SheetPrimitive.Portal>;

function SheetPortal(props: SheetPortalProps) {
  const { isOpen } = useSheet();

  return (
    <AnimatePresence>
      {isOpen && (
        <SheetPrimitive.Portal data-slot="sheet-portal" forceMount {...props} />
      )}
    </AnimatePresence>
  );
}

type SheetOverlayProps = Omit<
  React.ComponentProps<typeof SheetPrimitive.Overlay>,
  "asChild" | "forceMount"
> &
  HTMLMotionProps<"div">;

function SheetOverlay({
  transition = { duration: 0.2, ease: "easeInOut" },
  ...props
}: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay asChild forceMount>
      <motion.div
        animate={{ filter: "blur(0px)", opacity: 1 }}
        data-slot="sheet-overlay"
        exit={{ filter: "blur(4px)", opacity: 0 }}
        initial={{ filter: "blur(4px)", opacity: 0 }}
        key="sheet-overlay"
        transition={transition}
        {...props}
      />
    </SheetPrimitive.Overlay>
  );
}

type Side = "top" | "bottom" | "left" | "right";

type SheetContentProps = React.ComponentProps<typeof SheetPrimitive.Content> &
  HTMLMotionProps<"div"> & {
    side?: Side;
  };

function SheetContent({
  side = "right",
  transition = { damping: 22, stiffness: 150, type: "spring" },
  style,
  children,
  ...props
}: SheetContentProps) {
  const axis = side === "left" || side === "right" ? "x" : "y";

  const offscreen: Record<Side, { x?: string; y?: string; opacity: number }> = {
    bottom: { opacity: 0, y: "100%" },
    left: { opacity: 0, x: "-100%" },
    right: { opacity: 0, x: "100%" },
    top: { opacity: 0, y: "-100%" },
  };

  const positionStyle: Record<Side, React.CSSProperties> = {
    bottom: { bottom: 0, insetInline: 0 },
    left: { insetBlock: 0, left: 0 },
    right: { insetBlock: 0, right: 0 },
    top: { insetInline: 0, top: 0 },
  };

  return (
    <SheetPrimitive.Content asChild forceMount {...props}>
      <motion.div
        animate={{ [axis]: 0, opacity: 1 }}
        data-side={side}
        data-slot="sheet-content"
        exit={offscreen[side]}
        initial={offscreen[side]}
        key="sheet-content"
        style={{
          position: "fixed",
          ...positionStyle[side],
          ...style,
        }}
        transition={transition}
      >
        {children}
      </motion.div>
    </SheetPrimitive.Content>
  );
}

type SheetHeaderProps = React.ComponentProps<"div">;

function SheetHeader(props: SheetHeaderProps) {
  return <div data-slot="sheet-header" {...props} />;
}

type SheetFooterProps = React.ComponentProps<"div">;

function SheetFooter(props: SheetFooterProps) {
  return <div data-slot="sheet-footer" {...props} />;
}

type SheetTitleProps = React.ComponentProps<typeof SheetPrimitive.Title>;

function SheetTitle(props: SheetTitleProps) {
  return <SheetPrimitive.Title data-slot="sheet-title" {...props} />;
}

type SheetDescriptionProps = React.ComponentProps<
  typeof SheetPrimitive.Description
>;

function SheetDescription(props: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description data-slot="sheet-description" {...props} />
  );
}

export {
  Sheet,
  SheetClose,
  type SheetCloseProps,
  SheetContent,
  type SheetContentProps,
  SheetDescription,
  type SheetDescriptionProps,
  SheetFooter,
  type SheetFooterProps,
  SheetHeader,
  type SheetHeaderProps,
  SheetOverlay,
  type SheetOverlayProps,
  SheetPortal,
  type SheetPortalProps,
  type SheetProps,
  SheetTitle,
  type SheetTitleProps,
  SheetTrigger,
  type SheetTriggerProps,
  useSheet,
};

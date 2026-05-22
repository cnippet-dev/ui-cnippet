"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui-components/react/tooltip";
import {
  AnimatePresence,
  type HTMLMotionProps,
  type MotionValue,
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
} from "motion/react";
import type * as React from "react";
import { useControlledState } from "@/registry/hooks/use-controlled-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";

type TooltipContextType = {
  isOpen: boolean;
  setIsOpen: TooltipProps["onOpenChange"];
  x: MotionValue<number>;
  y: MotionValue<number>;
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

const [LocalTooltipProvider, useTooltip] =
  getStrictContext<TooltipContextType>("TooltipContext");

type TooltipProviderProps = React.ComponentProps<
  typeof TooltipPrimitive.Provider
>;

function TooltipProvider(props: TooltipProviderProps) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" {...props} />;
}

type TooltipProps = React.ComponentProps<typeof TooltipPrimitive.Root> & {
  followCursor?: boolean | "x" | "y";
  followCursorSpringOptions?: SpringOptions;
};

function Tooltip({
  followCursor = false,
  followCursorSpringOptions = { damping: 17, stiffness: 200 },
  ...props
}: TooltipProps) {
  const [isOpen, setIsOpen] = useControlledState({
    defaultValue: props?.defaultOpen,
    onChange: props?.onOpenChange,
    value: props?.open,
  });
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  return (
    <LocalTooltipProvider
      value={{
        followCursor,
        followCursorSpringOptions,
        isOpen,
        setIsOpen,
        x,
        y,
      }}
    >
      <TooltipPrimitive.Root
        data-slot="tooltip"
        {...props}
        onOpenChange={setIsOpen}
      />
    </LocalTooltipProvider>
  );
}

type TooltipTriggerProps = React.ComponentProps<
  typeof TooltipPrimitive.Trigger
>;

function TooltipTrigger({ onMouseMove, ...props }: TooltipTriggerProps) {
  const { x, y, followCursor } = useTooltip();

  const handleMouseMove = (
    event: Parameters<NonNullable<TooltipTriggerProps["onMouseMove"]>>[0],
  ) => {
    onMouseMove?.(event);

    const target = event.currentTarget.getBoundingClientRect();

    if (followCursor === "x" || followCursor === true) {
      const eventOffsetX = event.clientX - target.left;
      const offsetXFromCenter = (eventOffsetX - target.width / 2) / 2;
      x.set(offsetXFromCenter);
    }

    if (followCursor === "y" || followCursor === true) {
      const eventOffsetY = event.clientY - target.top;
      const offsetYFromCenter = (eventOffsetY - target.height / 2) / 2;
      y.set(offsetYFromCenter);
    }
  };

  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      onMouseMove={handleMouseMove}
      {...props}
    />
  );
}

type TooltipPortalProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Portal>,
  "keepMounted"
>;

function TooltipPortal(props: TooltipPortalProps) {
  const { isOpen } = useTooltip();

  return (
    <AnimatePresence>
      {isOpen && (
        <TooltipPrimitive.Portal
          data-slot="tooltip-portal"
          keepMounted
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type TooltipPositionerProps = React.ComponentProps<
  typeof TooltipPrimitive.Positioner
>;

function TooltipPositioner(props: TooltipPositionerProps) {
  return (
    <TooltipPrimitive.Positioner data-slot="tooltip-positioner" {...props} />
  );
}

type TooltipPopupProps = Omit<
  React.ComponentProps<typeof TooltipPrimitive.Popup>,
  "render"
> &
  HTMLMotionProps<"div">;

function TooltipPopup({
  transition = { damping: 25, stiffness: 300, type: "spring" },
  style,
  ...props
}: TooltipPopupProps) {
  const { x, y, followCursor, followCursorSpringOptions } = useTooltip();
  const translateX = useSpring(x, followCursorSpringOptions);
  const translateY = useSpring(y, followCursorSpringOptions);

  return (
    <TooltipPrimitive.Popup
      render={
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          data-slot="tooltip-popup"
          exit={{ opacity: 0, scale: 0.5 }}
          initial={{ opacity: 0, scale: 0.5 }}
          key="tooltip-popup"
          style={{
            x:
              followCursor === "x" || followCursor === true
                ? translateX
                : undefined,
            y:
              followCursor === "y" || followCursor === true
                ? translateY
                : undefined,
            ...style,
          }}
          transition={transition}
          {...props}
        />
      }
    />
  );
}

type TooltipArrowProps = React.ComponentProps<typeof TooltipPrimitive.Arrow>;

function TooltipArrow(props: TooltipArrowProps) {
  return <TooltipPrimitive.Arrow data-slot="tooltip-arrow" {...props} />;
}

export {
  Tooltip,
  TooltipArrow,
  type TooltipArrowProps,
  type TooltipContextType,
  TooltipPopup,
  type TooltipPopupProps,
  TooltipPortal,
  type TooltipPortalProps,
  TooltipPositioner,
  type TooltipPositionerProps,
  type TooltipProps,
  TooltipProvider,
  type TooltipProviderProps,
  TooltipTrigger,
  type TooltipTriggerProps,
  useTooltip,
};

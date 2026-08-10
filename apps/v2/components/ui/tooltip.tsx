"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type * as React from "react";
import { CommandShortcut } from "@/registry/default/ui/command";
import { cn } from "@/lib/utils";

const TooltipCreateHandle = TooltipPrimitive.createHandle;

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

function TooltipTrigger(props: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipPopup({
  className,
  align = "center",
  sideOffset = 4,
  side = "top",
  children,
  ...props
}: TooltipPrimitive.Popup.Props & {
  align?: TooltipPrimitive.Positioner.Props["align"];
  side?: TooltipPrimitive.Positioner.Props["side"];
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"];
}) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none"
        data-slot="tooltip-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <TooltipPrimitive.Popup
          className={cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border bg-popover bg-clip-padding text-popover-foreground text-xs shadow-black/5 shadow-md transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:duration-0 dark:bg-clip-border dark:before:shadow-[0_-1px_--theme(--color-white/8%)]",
            className,
          )}
          data-slot="tooltip-popup"
          {...props}
        >
          <TooltipPrimitive.Viewport
            className="relative size-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:--spacing(2)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity"
            data-slot="tooltip-viewport"
          >
            {children}
          </TooltipPrimitive.Viewport>
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

function TooltipOnHover({
  children,
  content,
  forceClose = false,
  shortcuts,
  className,
  side = "top",
  footerContent,
  align,
  delay = 1000,
}: {
  children: React.ReactNode;
  content?: React.ReactNode;
  footerContent?: React.ReactNode;
  forceClose?: boolean;
  className?: string;
  shortcuts?: string[];
  side?: "bottom" | "left" | "right" | "top";
  align?: "center" | "end" | "start";
  delay?: number;
}) {
  if (forceClose || !content) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<span className="contents" />}>
          {children}
        </TooltipTrigger>
        <TooltipPopup
          align={align}
          className={cn("pr-0 pl-2", { "pr-1.5": !!shortcuts }, className)}
          side={side}
        >
          <div className="flex items-center justify-center">
            <span className="mr-2">{content}</span>
            {shortcuts && (
              <CommandShortcut className="ml-0">{shortcuts}</CommandShortcut>
            )}
          </div>
          {footerContent && (
            <div className="border-t px-2 py-1.5">{footerContent}</div>
          )}
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  );
}

export {
  Tooltip,
  TooltipCreateHandle,
  TooltipOnHover,
  TooltipPopup,
  TooltipPopup as TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};

"use client";

import { GripVerticalIcon } from "lucide-react";
import type * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";
import { cn } from "@/registry/default/lib/utils";

export function ResizablePanelGroup({
  className,
  style,
  ...props
}: ResizablePrimitive.GroupProps): React.ReactElement {
  return (
    <ResizablePrimitive.Group
      className={cn("flex h-full w-full", className)}
      data-slot="resizable-panel-group"
      // The library sets an inline 100% height and width; clear them so size classes like h-80 apply.
      style={{ height: undefined, width: undefined, ...style }}
      {...props}
    />
  );
}

export function ResizablePanel(
  props: ResizablePrimitive.PanelProps,
): React.ReactElement {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />;
}

export function ResizableHandle({
  withHandle,
  className,
  ...props
}: ResizablePrimitive.SeparatorProps & {
  /** Show a grip on the handle so it reads as draggable. */
  withHandle?: boolean;
}): React.ReactElement {
  return (
    <ResizablePrimitive.Separator
      className={cn(
        // aria-orientation is "vertical" for a side-by-side group's handle and "horizontal" for a stacked one.
        "relative flex w-px shrink-0 items-center justify-center bg-border outline-none transition-colors after:absolute after:inset-y-0 after:left-1/2 after:w-2 after:-translate-x-1/2 focus-visible:bg-ring aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:w-full aria-[orientation=horizontal]:after:inset-x-0 aria-[orientation=horizontal]:after:inset-y-auto aria-[orientation=horizontal]:after:top-1/2 aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-2 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:translate-x-0 aria-[orientation=horizontal]:after:-translate-y-1/2 data-[separator=active]:bg-ring data-[separator=hover]:bg-muted-foreground/48 [&[aria-orientation=horizontal]>div]:rotate-90",
        className,
      )}
      data-slot="resizable-handle"
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-background shadow-xs/5">
          <GripVerticalIcon aria-hidden="true" className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  );
}

export { ResizablePrimitive };

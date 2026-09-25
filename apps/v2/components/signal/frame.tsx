import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * The Signal double surface: a tinted shell holding an optional header row and
 * an inner card. Pass `spotlight` for the cursor light.
 */
export function Frame({
  className,
  spotlight = false,
  ...props
}: React.ComponentProps<"div"> & { spotlight?: boolean }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-frame bg-clip-padding p-1",
        className,
      )}
      data-slot="frame"
      data-spotlight={spotlight || undefined}
      {...props}
    />
  );
}

export function FrameHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 px-3 pt-2 pb-2.5",
        className,
      )}
      data-slot="frame-header"
      {...props}
    />
  );
}

export function FrameTitle({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-medium text-[13px] text-foreground tracking-[-0.01em]",
        className,
      )}
      data-slot="frame-title"
      {...props}
    />
  );
}

export function FrameMeta({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("font-mono text-[11px] text-faint", className)}
      data-slot="frame-meta"
      {...props}
    />
  );
}

export function FramePanel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative flex-1 overflow-hidden rounded-xl border bg-card bg-clip-padding shadow-xs/4",
        className,
      )}
      data-slot="frame-panel"
      {...props}
    />
  );
}

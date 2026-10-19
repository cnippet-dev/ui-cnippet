import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

export function Timeline({
  className,
  ...props
}: React.ComponentProps<"ol">): React.ReactElement {
  return (
    <ol
      className={cn(
        "flex flex-col [--timeline-indicator:--spacing(7)]",
        className,
      )}
      data-slot="timeline"
      {...props}
    />
  );
}

export function TimelineItem({
  className,
  ...props
}: React.ComponentProps<"li">): React.ReactElement {
  return (
    <li
      className={cn(
        // The connector runs from below this item's indicator to the next one.
        // muted-foreground, not border: this theme's border is too faint for a 1px line.
        "relative flex gap-3 pb-6 before:absolute before:start-[calc(var(--timeline-indicator)/2-0.5px)] before:top-[calc(var(--timeline-indicator)+--spacing(1))] before:bottom-1 before:w-px before:bg-muted-foreground/24 last:pb-0 last:before:hidden",
        className,
      )}
      data-slot="timeline-item"
      {...props}
    />
  );
}

/**
 * The marker for an item: a dot by default, or pass an icon or avatar.
 * It always fills a fixed square so dots and icons line up on one connector.
 */
export function TimelineIndicator({
  className,
  children,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-(--timeline-indicator) shrink-0 items-center justify-center rounded-full text-muted-foreground [&>svg]:size-3.5",
        children
          ? "border border-muted-foreground/24 bg-background"
          : "before:size-2.5 before:rounded-full before:bg-muted-foreground/48",
        className,
      )}
      data-slot="timeline-indicator"
      {...props}
    >
      {children}
    </span>
  );
}

export function TimelineContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1 pt-[calc((var(--timeline-indicator)-1lh)/2)] text-sm",
        className,
      )}
      data-slot="timeline-content"
      {...props}
    />
  );
}

export function TimelineTitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("text-foreground [&_strong]:font-medium", className)}
      data-slot="timeline-title"
      {...props}
    />
  );
}

export function TimelineDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("text-muted-foreground", className)}
      data-slot="timeline-description"
      {...props}
    />
  );
}

export function TimelineTime({
  className,
  ...props
}: React.ComponentProps<"time">): React.ReactElement {
  return (
    <time
      className={cn("text-muted-foreground text-xs tabular-nums", className)}
      data-slot="timeline-time"
      {...props}
    />
  );
}

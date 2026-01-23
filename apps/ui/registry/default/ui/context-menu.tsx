"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;

const ContextMenuPortal = ContextMenuPrimitive.Portal;

function ContextMenuTrigger(props: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" {...props} />
  );
}

function ContextMenuPositioner({
  className,
  ...props
}: ContextMenuPrimitive.Positioner.Props) {
  return (
    <ContextMenuPrimitive.Positioner
      className={cn("outline-none", className)}
      data-slot="context-menu-positioner"
      {...props}
    />
  );
}

function ContextMenuPopup({
  className,
  ...props
}: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuPrimitive.Popup
      className={cn(
        "transform-origin-[var(--transform-origin)] box-border rounded-md bg-popover text-popover-foreground transition-[transform,opacity] duration-150 data-ending-style:opacity-0",
        "light:shadow-[0_10px_15px_-3px_var(--color-gray-200),0_4px_6px_-4px_var(--color-gray-200)] light:outline light:outline-1 light:outline-gray-200",
        "dark:outline-1 dark:outline-gray-300 dark:-outline-offset-1",
        "py-1",
        className,
      )}
      data-slot="context-menu-popup"
      {...props}
    />
  );
}

function ContextMenuItem({
  className,
  ...props
}: ContextMenuPrimitive.Item.Props) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "user-select-none relative flex cursor-default px-4 py-2 text-sm leading-4 outline-none",
        "data-highlighted:text-gray-50",
        "data-highlighted:before:absolute data-highlighted:before:inset-x-1 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded data-highlighted:before:bg-gray-900 data-highlighted:before:content-['']",
        className,
      )}
      data-slot="context-menu-item"
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuPrimitive.Separator.Props) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("mx-4 my-1.5 h-px bg-gray-200", className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
}

function ContextMenuGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("py-1", className)}
      data-slot="context-menu-group"
      {...props}
    />
  );
}

function ContextMenuLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-4 py-2 font-medium text-muted-foreground text-sm",
        className,
      )}
      data-slot="context-menu-label"
      {...props}
    />
  );
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto text-muted-foreground text-xs tracking-widest",
        className,
      )}
      data-slot="context-menu-shortcut"
      {...props}
    />
  );
}

// Main ContextMenuContent component that combines Portal, Positioner, and Popup
function ContextMenuContent({
  className,
  ...props
}: ContextMenuPrimitive.Popup.Props) {
  return (
    <ContextMenuPortal>
      <ContextMenuPositioner>
        <ContextMenuPopup className={cn("min-w-48", className)} {...props} />
      </ContextMenuPositioner>
    </ContextMenuPortal>
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuPortal,
  ContextMenuPositioner,
  ContextMenuPopup,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuShortcut,
};

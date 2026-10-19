"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ChevronDownIcon } from "lucide-react";
import type React from "react";
import { cn } from "@/registry/default/lib/utils";

export function NavigationMenu({
  className,
  children,
  sideOffset = 8,
  align = "start",
  ...props
}: NavigationMenuPrimitive.Root.Props & {
  sideOffset?: NavigationMenuPrimitive.Positioner.Props["sideOffset"];
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
}): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      className={cn("relative z-10 min-w-max", className)}
      data-slot="navigation-menu"
      {...props}
    >
      {children}
      {/* One shared popup: it resizes and slides between items' content. */}
      <NavigationMenuPrimitive.Portal>
        <NavigationMenuPrimitive.Positioner
          align={align}
          className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--duration) ease-(--easing) [--duration:0.35s] [--easing:cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none"
          collisionPadding={{ left: 16, right: 16 }}
          data-slot="navigation-menu-positioner"
          sideOffset={sideOffset}
        >
          <NavigationMenuPrimitive.Popup
            className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-xl border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[opacity,scale,width,height] duration-(--duration) ease-(--easing) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-96 data-starting-style:scale-96 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-150 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"
            data-slot="navigation-menu-popup"
          >
            <NavigationMenuPrimitive.Viewport
              className="relative size-full overflow-hidden"
              data-slot="navigation-menu-viewport"
            />
          </NavigationMenuPrimitive.Popup>
        </NavigationMenuPrimitive.Positioner>
      </NavigationMenuPrimitive.Portal>
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      className={cn("flex items-center gap-1", className)}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuPrimitive.Item.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Item
      className={cn("relative", className)}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
}

const triggerClassName =
  "inline-flex h-9 shrink-0 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3 font-medium text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent data-popup-open:text-accent-foreground sm:h-8";

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(triggerClassName, className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        className="transition-transform duration-200 data-popup-open:rotate-180"
        data-slot="navigation-menu-icon"
      >
        <ChevronDownIcon aria-hidden="true" className="size-3.5 opacity-72" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        "w-[calc(100vw-2rem)] p-2 transition-[opacity,translate] duration-(--duration) ease-(--easing) data-ending-style:data-[activation-direction=left]:translate-x-1/3 data-ending-style:data-[activation-direction=right]:-translate-x-1/3 data-starting-style:data-[activation-direction=left]:-translate-x-1/3 data-starting-style:data-[activation-direction=right]:translate-x-1/3 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:w-max",
        className,
      )}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

export function NavigationMenuLink({
  className,
  variant = "content",
  ...props
}: NavigationMenuPrimitive.Link.Props & {
  /** "content" for links inside a panel; "trigger" for a top-level link. */
  variant?: "content" | "trigger";
}): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        variant === "trigger"
          ? triggerClassName
          : "flex flex-col gap-0.5 rounded-lg p-2.5 text-sm outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-active:bg-accent",
        className,
      )}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
}

export { NavigationMenuPrimitive };

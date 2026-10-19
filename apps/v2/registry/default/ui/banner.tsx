"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "@/registry/default/lib/utils";

const bannerVariants = cva(
  "flex w-full items-center gap-x-3 gap-y-2 border-b px-4 py-2.5 text-sm max-sm:flex-wrap [&>svg]:size-4 [&>svg]:shrink-0",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-muted/72 [&>svg]:text-muted-foreground",
        error:
          "border-destructive/24 bg-destructive/8 dark:bg-destructive/16 [&>svg]:text-destructive",
        info: "border-info/24 bg-info/8 dark:bg-info/16 [&>svg]:text-info",
        primary:
          "border-transparent bg-primary text-primary-foreground [&_[data-slot=banner-description]]:text-primary-foreground/72",
        success:
          "border-success/24 bg-success/8 dark:bg-success/16 [&>svg]:text-success",
        warning:
          "border-warning/24 bg-warning/8 dark:bg-warning/16 [&>svg]:text-warning",
      },
    },
  },
);

export function Banner({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof bannerVariants>): React.ReactElement {
  return (
    <div
      className={cn(bannerVariants({ variant }), className)}
      data-slot="banner"
      data-variant={variant ?? "default"}
      {...props}
    />
  );
}

export function BannerContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-wrap items-baseline gap-x-2 gap-y-0.5",
        className,
      )}
      data-slot="banner-content"
      {...props}
    />
  );
}

export function BannerTitle({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("font-medium", className)}
      data-slot="banner-title"
      {...props}
    />
  );
}

export function BannerDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <p
      className={cn("text-muted-foreground", className)}
      data-slot="banner-description"
      {...props}
    />
  );
}

export function BannerAction({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("flex shrink-0 items-center gap-2", className)}
      data-slot="banner-action"
      {...props}
    />
  );
}

/** Dismiss button. The banner doesn't hide itself: handle `onClick`. */
export function BannerClose({
  className,
  children,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  return (
    <button
      aria-label="Dismiss"
      className={cn(
        "-me-1.5 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md opacity-72 outline-none transition-[opacity,background-color] hover:bg-current/8 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      data-slot="banner-close"
      type="button"
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" className="size-4" />}
    </button>
  );
}

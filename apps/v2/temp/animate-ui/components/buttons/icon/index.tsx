"use client";

import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
} from "@/registry/primitives/buttons/button";
import {
  Particles,
  ParticlesEffect,
} from "@/registry/primitives/effects/particles";

const buttonVariants = cva(
  "flex shrink-0 items-center justify-center rounded-md outline-none transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "size-9",
        lg: "size-10 rounded-md",
        sm: "size-8 rounded-md",
        xs: "size-7 rounded-md [&_svg:not([class*='size-'])]:size-3.5",
      },
      variant: {
        accent: "bg-accent text-accent-foreground shadow-xs hover:bg-accent/90",
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      },
    },
  },
);

type IconButtonProps = Omit<ButtonPrimitiveProps, "asChild"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
  };

function IconButton({
  className,
  onClick,
  variant,
  size,
  children,
  ...props
}: IconButtonProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [key, setKey] = React.useState(0);

  return (
    <Particles animate={isActive} asChild key={key}>
      <ButtonPrimitive
        className={cn(buttonVariants({ className, size, variant }))}
        data-slot="icon-button"
        onClick={(e) => {
          setKey((prev) => prev + 1);
          setIsActive(true);
          onClick?.(e);
        }}
        {...props}
      >
        {children}
        <ParticlesEffect
          className="size-1 rounded-full bg-neutral-500"
          data-variant={variant}
        />
      </ButtonPrimitive>
    </Particles>
  );
}

export { buttonVariants, IconButton, type IconButtonProps };

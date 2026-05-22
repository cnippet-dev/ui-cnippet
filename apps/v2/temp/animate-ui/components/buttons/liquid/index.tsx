"use client";

import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  LiquidButton as LiquidButtonPrimitive,
  type LiquidButtonProps as LiquidButtonPrimitiveProps,
} from "@/registry/primitives/buttons/liquid";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-[box-shadow,_color,_background-color,_border-color,_outline-color,_text-decoration-color,_fill,_stroke] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
        "icon-lg": "size-10 rounded-md",
        "icon-sm": "size-8 rounded-md",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      },
      variant: {
        default:
          "text-primary shadow-xs [--liquid-button-background-color:var(--accent)] [--liquid-button-color:var(--primary)] hover:text-primary-foreground",
        destructive:
          "text-white shadow-xs [--liquid-button-background-color:var(--accent)] [--liquid-button-color:var(--destructive)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ghost:
          "text-primary shadow-xs [--liquid-button-background-color:var(--transparent)] [--liquid-button-color:var(--primary)] hover:text-primary-foreground",
        secondary:
          "text-secondary shadow-xs [--liquid-button-background-color:var(--accent)] [--liquid-button-color:var(--secondary)] hover:text-secondary-foreground",
      },
    },
  },
);

type LiquidButtonProps = LiquidButtonPrimitiveProps &
  VariantProps<typeof buttonVariants>;

function LiquidButton({
  className,
  variant,
  size,
  ...props
}: LiquidButtonProps) {
  return (
    <LiquidButtonPrimitive
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
}

export { buttonVariants, LiquidButton, type LiquidButtonProps };

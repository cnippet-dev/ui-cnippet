"use client";

import { cn } from "@workspace/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/registry/components/buttons/button";
import {
  RippleButton as RippleButtonPrimitive,
  type RippleButtonProps as RippleButtonPrimitiveProps,
  RippleButtonRipples as RippleButtonRipplesPrimitive,
  type RippleButtonRipplesProps as RippleButtonRipplesPrimitiveProps,
} from "@/registry/primitives/buttons/ripple";

const rippleButtonVariants = {
  accent: "[--ripple-button-ripple-color:var(--accent-foreground)]",
  default: "[--ripple-button-ripple-color:var(--primary-foreground)]",
  destructive: "[--ripple-button-ripple-color:var(--destructive-foreground)]",
  ghost: "[--ripple-button-ripple-color:var(--foreground)]",
  link: "[--ripple-button-ripple-color:var(--primary-foreground)]",
  outline: "[--ripple-button-ripple-color:var(--foreground)]",
  secondary: "[--ripple-button-ripple-color:var(--secondary-foreground)]",
};

type RippleButtonProps = RippleButtonPrimitiveProps &
  VariantProps<typeof buttonVariants>;

function RippleButton({
  className,
  variant,
  size,
  ...props
}: RippleButtonProps) {
  return (
    <RippleButtonPrimitive
      className={cn(
        buttonVariants({ className, size, variant }),
        rippleButtonVariants[variant as keyof typeof rippleButtonVariants],
      )}
      {...props}
    />
  );
}

type RippleButtonRipplesProps = RippleButtonRipplesPrimitiveProps;

function RippleButtonRipples(props: RippleButtonRipplesProps) {
  return <RippleButtonRipplesPrimitive {...props} />;
}

export {
  RippleButton,
  type RippleButtonProps,
  RippleButtonRipples,
  type RippleButtonRipplesProps,
};

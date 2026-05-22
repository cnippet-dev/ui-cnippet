import { cn } from "@workspace/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/registry/components/buttons/button";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  FlipButtonBack as FlipButtonBackPrimitive,
  type FlipButtonBackProps as FlipButtonBackPrimitiveProps,
  FlipButtonFront as FlipButtonFrontPrimitive,
  type FlipButtonFrontProps as FlipButtonFrontPrimitiveProps,
  FlipButton as FlipButtonPrimitive,
  type FlipButtonProps as FlipButtonPrimitiveProps,
} from "@/registry/primitives/buttons/flip";

type FlipButtonContextType = VariantProps<typeof buttonVariants>;

const [FlipButtonProvider, useFlipButton] =
  getStrictContext<FlipButtonContextType>("FlipButtonContext");

type FlipButtonProps = FlipButtonPrimitiveProps &
  VariantProps<typeof buttonVariants>;

function FlipButton({ variant, size, ...props }: FlipButtonProps) {
  return (
    <FlipButtonProvider value={{ size, variant }}>
      <FlipButtonPrimitive {...props} />
    </FlipButtonProvider>
  );
}

type FlipButtonFrontProps = FlipButtonFrontPrimitiveProps &
  VariantProps<typeof buttonVariants>;

function FlipButtonFront({
  variant,
  size,
  className,
  ...props
}: FlipButtonFrontProps) {
  const { variant: buttonVariant, size: buttonSize } = useFlipButton();
  return (
    <FlipButtonFrontPrimitive
      className={cn(
        buttonVariants({
          className,
          size: size ?? buttonSize,
          variant: variant ?? buttonVariant,
        }),
      )}
      {...props}
    />
  );
}

type FlipButtonBackProps = FlipButtonBackPrimitiveProps &
  VariantProps<typeof buttonVariants>;

function FlipButtonBack({
  variant,
  size,
  className,
  ...props
}: FlipButtonBackProps) {
  const { variant: buttonVariant, size: buttonSize } = useFlipButton();
  return (
    <FlipButtonBackPrimitive
      className={cn(
        buttonVariants({
          className,
          size: size ?? buttonSize,
          variant: variant ?? buttonVariant,
        }),
      )}
      {...props}
    />
  );
}

export {
  FlipButton,
  FlipButtonBack,
  type FlipButtonBackProps,
  FlipButtonFront,
  type FlipButtonFrontProps,
  type FlipButtonProps,
};

import { cn } from "@workspace/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { toggleVariants } from "@/registry/components/base/toggle";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  ToggleGroupHighlight as ToggleGroupHighlightPrimitive,
  ToggleGroup as ToggleGroupPrimitive,
  type ToggleGroupProps as ToggleGroupPrimitiveProps,
  ToggleHighlight as ToggleHighlightPrimitive,
  Toggle as TogglePrimitive,
  type ToggleProps as TogglePrimitiveProps,
  useToggleGroup as useToggleGroupPrimitive,
} from "@/registry/primitives/base/toggle-group";

const [ToggleGroupProvider, useToggleGroup] =
  getStrictContext<VariantProps<typeof toggleVariants>>("ToggleGroupContext");

type ToggleGroupProps = ToggleGroupPrimitiveProps &
  VariantProps<typeof toggleVariants>;

function ToggleGroup({
  className,
  variant,
  size,
  children,
  multiple,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      className={cn(
        "group/toggle-group flex w-fit items-center gap-0.5 rounded-lg data-[variant=outline]:border data-[variant=outline]:p-0.5 data-[variant=outline]:shadow-xs",
        className,
      )}
      data-size={size}
      data-variant={variant}
      multiple={multiple}
      {...props}
    >
      <ToggleGroupProvider value={{ size, variant }}>
        {!multiple ? (
          <ToggleGroupHighlightPrimitive className="rounded-md bg-accent">
            {children}
          </ToggleGroupHighlightPrimitive>
        ) : (
          children
        )}
      </ToggleGroupProvider>
    </ToggleGroupPrimitive>
  );
}

type ToggleProps = TogglePrimitiveProps & VariantProps<typeof toggleVariants>;

function Toggle({ className, children, variant, size, ...props }: ToggleProps) {
  const { variant: contextVariant, size: contextSize } = useToggleGroup();
  const { multiple } = useToggleGroupPrimitive();

  return (
    <ToggleHighlightPrimitive
      className={cn(multiple && "rounded-md bg-accent")}
      value={props.value?.toString()}
    >
      <TogglePrimitive
        className={cn(
          toggleVariants({
            size: contextSize || size,
            variant: contextVariant || variant,
          }),
          "min-w-0 flex-1 shrink-0 rounded-md border-0 shadow-none focus:z-10 focus-visible:z-10",
          className,
        )}
        data-size={contextSize || size}
        data-variant={contextVariant || variant}
        {...props}
      >
        {children}
      </TogglePrimitive>
    </ToggleHighlightPrimitive>
  );
}

export { Toggle, ToggleGroup, type ToggleGroupProps, type ToggleProps };

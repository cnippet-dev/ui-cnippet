import { cn } from "@workspace/ui/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { toggleVariants } from "@/registry/components/radix/toggle";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import {
  ToggleGroupHighlightItem as ToggleGroupHighlightItemPrimitive,
  ToggleGroupHighlight as ToggleGroupHighlightPrimitive,
  ToggleGroupItem as ToggleGroupItemPrimitive,
  type ToggleGroupItemProps as ToggleGroupItemPrimitiveProps,
  ToggleGroup as ToggleGroupPrimitive,
  type ToggleGroupProps as ToggleGroupPrimitiveProps,
  useToggleGroup as useToggleGroupPrimitive,
} from "@/registry/primitives/radix/toggle-group";

const [ToggleGroupProvider, useToggleGroup] =
  getStrictContext<VariantProps<typeof toggleVariants>>("ToggleGroupContext");

type ToggleGroupProps = ToggleGroupPrimitiveProps &
  VariantProps<typeof toggleVariants>;

function ToggleGroup({
  className,
  variant,
  size,
  children,
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
      {...props}
    >
      <ToggleGroupProvider value={{ size, variant }}>
        {props.type === "single" ? (
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

type ToggleGroupItemProps = ToggleGroupItemPrimitiveProps &
  VariantProps<typeof toggleVariants>;

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const { variant: contextVariant, size: contextSize } = useToggleGroup();
  const { type } = useToggleGroupPrimitive();

  return (
    <ToggleGroupHighlightItemPrimitive
      className={cn(type === "multiple" && "rounded-md bg-accent")}
      value={props.value}
    >
      <ToggleGroupItemPrimitive
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
      </ToggleGroupItemPrimitive>
    </ToggleGroupHighlightItemPrimitive>
  );
}

export {
  ToggleGroup,
  ToggleGroupItem,
  type ToggleGroupItemProps,
  type ToggleGroupProps,
};

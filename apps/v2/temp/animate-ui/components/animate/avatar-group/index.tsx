import { cn } from "@workspace/ui/lib/utils";
import * as motion from "motion/react-client";
import type * as React from "react";
import {
  AvatarGroup as AvatarGroupPrimitive,
  type AvatarGroupProps as AvatarGroupPropsPrimitive,
  AvatarGroupTooltipArrow as AvatarGroupTooltipArrowPrimitive,
  AvatarGroupTooltip as AvatarGroupTooltipPrimitive,
  type AvatarGroupTooltipProps as AvatarGroupTooltipPropsPrimitive,
} from "@/registry/primitives/animate/avatar-group";

type AvatarGroupProps = AvatarGroupPropsPrimitive;

function AvatarGroup({
  className,
  invertOverlap = true,
  ...props
}: AvatarGroupProps) {
  return (
    <AvatarGroupPrimitive
      className={cn("h-12 -space-x-3", className)}
      invertOverlap={invertOverlap}
      {...props}
    />
  );
}

type AvatarGroupTooltipProps = Omit<
  AvatarGroupTooltipPropsPrimitive,
  "asChild"
> & {
  children: React.ReactNode;
  layout?: boolean | "position" | "size" | "preserve-aspect";
};

function AvatarGroupTooltip({
  className,
  children,
  layout = "preserve-aspect",
  ...props
}: AvatarGroupTooltipProps) {
  return (
    <AvatarGroupTooltipPrimitive
      className={cn(
        "z-50 w-fit text-balance rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs",
        className,
      )}
      {...props}
    >
      <motion.div className="overflow-hidden" layout={layout}>
        {children}
      </motion.div>
      <AvatarGroupTooltipArrowPrimitive
        className="size-3 fill-primary data-[side='left']:translate-x-[-1px] data-[side='right']:translate-x-[1px] data-[side='bottom']:translate-y-[1px] data-[side='top']:translate-y-[-1px]"
        tipRadius={2}
      />
    </AvatarGroupTooltipPrimitive>
  );
}

export {
  AvatarGroup,
  type AvatarGroupProps,
  AvatarGroupTooltip,
  type AvatarGroupTooltipProps,
};

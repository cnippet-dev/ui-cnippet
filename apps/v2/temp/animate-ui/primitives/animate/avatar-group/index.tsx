"use client";

import { type HTMLMotionProps, motion, type Transition } from "motion/react";
import * as React from "react";

import {
  Tooltip,
  TooltipArrow,
  type TooltipArrowProps,
  TooltipContent,
  type TooltipContentProps,
  type TooltipProps,
  TooltipProvider,
  type TooltipProviderProps,
  TooltipTrigger,
} from "@/registry/primitives/animate/tooltip";

type AvatarProps = Omit<HTMLMotionProps<"div">, "translate"> & {
  children: React.ReactNode;
  zIndex: number;
  translate?: string | number;
} & Omit<TooltipProps, "children">;

function AvatarContainer({
  zIndex,
  translate,
  side,
  sideOffset,
  align,
  alignOffset,
  ...props
}: AvatarProps) {
  return (
    <Tooltip
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
    >
      <TooltipTrigger asChild>
        <motion.div
          data-slot="avatar-container"
          initial="initial"
          style={{ position: "relative", zIndex }}
          whileHover="hover"
          whileTap="hover"
        >
          <motion.div
            variants={{
              hover: { y: translate },
              initial: { y: 0 },
            }}
            {...props}
          />
        </motion.div>
      </TooltipTrigger>
    </Tooltip>
  );
}

type AvatarGroupProps = Omit<React.ComponentProps<"div">, "translate"> & {
  children: React.ReactElement[];
  invertOverlap?: boolean;
  translate?: string | number;
  transition?: Transition;
  tooltipTransition?: Transition;
} & Omit<TooltipProviderProps, "children"> &
  Omit<TooltipProps, "children">;

function AvatarGroup({
  ref,
  children,
  id,
  transition = { damping: 17, stiffness: 300, type: "spring" },
  invertOverlap = false,
  translate = "-30%",
  openDelay = 0,
  closeDelay = 0,
  side = "top",
  sideOffset = 25,
  align = "center",
  alignOffset = 0,
  tooltipTransition = { damping: 35, stiffness: 300, type: "spring" },
  style,
  ...props
}: AvatarGroupProps) {
  return (
    <TooltipProvider
      closeDelay={closeDelay}
      id={id}
      openDelay={openDelay}
      transition={tooltipTransition}
    >
      <div
        data-slot="avatar-group"
        ref={ref}
        style={{
          alignItems: "center",
          display: "flex",
          ...style,
        }}
        {...props}
      >
        {children?.map((child, index) => (
          <AvatarContainer
            align={align}
            alignOffset={alignOffset}
            key={index}
            side={side}
            sideOffset={sideOffset}
            transition={transition}
            translate={translate}
            zIndex={
              invertOverlap ? React.Children.count(children) - index : index
            }
          >
            {child}
          </AvatarContainer>
        ))}
      </div>
    </TooltipProvider>
  );
}

type AvatarGroupTooltipProps = TooltipContentProps;

function AvatarGroupTooltip(props: AvatarGroupTooltipProps) {
  return <TooltipContent {...props} />;
}

type AvatarGroupTooltipArrowProps = TooltipArrowProps;

function AvatarGroupTooltipArrow(props: AvatarGroupTooltipArrowProps) {
  return <TooltipArrow {...props} />;
}

export {
  AvatarGroup,
  type AvatarGroupProps,
  AvatarGroupTooltip,
  AvatarGroupTooltipArrow,
  type AvatarGroupTooltipArrowProps,
  type AvatarGroupTooltipProps,
};

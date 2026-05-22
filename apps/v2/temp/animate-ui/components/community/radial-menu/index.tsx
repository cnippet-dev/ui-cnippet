"use client";

import { ContextMenu } from "@base-ui-components/react/context-menu";
import { cn } from "@workspace/ui/lib/utils";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import * as React from "react";

type RadialMenuProps = {
  children?: React.ReactNode;
  menuItems: MenuItem[];
  size?: number;
  iconSize?: number;
  bandWidth?: number;
  innerGap?: number;
  outerGap?: number;
  outerRingWidth?: number;
  onSelect?: (item: MenuItem) => void;
};

type MenuItem = {
  id: number;
  label: string;
  icon: LucideIcon;
};

type Point = { x: number; y: number };

const menuTransition: Transition = {
  damping: 32,
  mass: 1,
  stiffness: 420,
  type: "spring",
};

const wedgeTransition: Transition = {
  duration: 0.05,
  ease: "easeOut",
};

const FULL_CIRCLE = 360;
const START_ANGLE = -90;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(radius: number, angleDeg: number): Point {
  const rad = degToRad(angleDeg);
  return {
    x: Math.cos(rad) * radius,
    y: Math.sin(rad) * radius,
  };
}

function slicePath(
  index: number,
  total: number,
  wedgeRadius: number,
  innerRadius: number,
) {
  if (total <= 0) return "";

  // single item → full donut ring
  if (total === 1) {
    return `
      M ${wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${-wedgeRadius} 0
      A ${wedgeRadius} ${wedgeRadius} 0 1 1 ${wedgeRadius} 0
      M ${innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${-innerRadius} 0
      A ${innerRadius} ${innerRadius} 0 1 0 ${innerRadius} 0
    `;
  }

  const anglePerSlice = FULL_CIRCLE / total;
  const midDeg = START_ANGLE + anglePerSlice * index;
  const halfSlice = anglePerSlice / 2;

  const startDeg = midDeg - halfSlice;
  const endDeg = midDeg + halfSlice;

  const outerStart = polarToCartesian(wedgeRadius, startDeg);
  const outerEnd = polarToCartesian(wedgeRadius, endDeg);
  const innerStart = polarToCartesian(innerRadius, startDeg);
  const innerEnd = polarToCartesian(innerRadius, endDeg);

  const largeArcFlag = anglePerSlice > 180 ? 1 : 0;

  return `
    M ${outerStart.x} ${outerStart.y}
    A ${wedgeRadius} ${wedgeRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}
    L ${innerEnd.x} ${innerEnd.y}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}
    Z
  `;
}

function RadialMenu({
  children,
  menuItems,
  size = 240,
  iconSize = 18,
  bandWidth = 50,
  innerGap = 8,
  outerGap = 8,
  outerRingWidth = 12,
  onSelect,
}: RadialMenuProps) {
  const radius = size / 2;

  const outerRingOuterRadius = radius;
  const outerRingInnerRadius = outerRingOuterRadius - outerRingWidth;

  const wedgeOuterRadius = outerRingInnerRadius - outerGap;
  const wedgeInnerRadius = wedgeOuterRadius - bandWidth;

  const iconRingRadius = (wedgeOuterRadius + wedgeInnerRadius) / 2;

  const centerRadius = Math.max(wedgeInnerRadius - innerGap, 0);

  const slice = 360 / menuItems.length;

  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const resetActive = () => setActiveIndex(null);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetActive();
  };

  return (
    <ContextMenu.Root onOpenChange={handleOpenChange} open={open}>
      <ContextMenu.Trigger
        render={(triggerProps) => {
          return (
            <div
              {...triggerProps}
              className={cn("select-none outline-none", triggerProps.className)}
            >
              {children ? (
                children
              ) : (
                <div className="flex size-80 items-center justify-center rounded-lg border-2 border-dashed">
                  Right-click here.
                </div>
              )}
            </div>
          );
        }}
      />

      <AnimatePresence>
        {open && (
          <ContextMenu.Portal keepMounted>
            <ContextMenu.Positioner
              align="center"
              className="outline-none"
              sideOffset={({ positioner }) => -positioner.height / 2}
            >
              <ContextMenu.Popup
                className="relative overflow-hidden rounded-full shadow-xl outline-none"
                render={
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                    exit={{ opacity: 0, scale: 0.5 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={menuTransition}
                  />
                }
                style={{ height: size, width: size }}
              >
                <svg
                  className="absolute inset-0 size-full"
                  viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}
                >
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const midDeg = START_ANGLE + slice * index;
                    const { x: iconX, y: iconY } = polarToCartesian(
                      iconRingRadius,
                      midDeg,
                    );
                    const ICON_BOX = iconSize * 2;
                    const isActive = activeIndex === index;

                    return (
                      <g
                        className="cursor-pointer"
                        key={item.id}
                        onClick={() => itemRefs.current[index]?.click()}
                        onMouseEnter={() => {
                          setActiveIndex(index);
                          itemRefs.current[index]?.focus();
                        }}
                      >
                        <motion.path
                          className={cn({
                            "fill-neutral-100 dark:fill-neutral-800": !isActive,
                            "fill-neutral-200 dark:fill-neutral-700": isActive,
                          })}
                          d={slicePath(
                            index,
                            menuItems.length,
                            outerRingOuterRadius,
                            outerRingInnerRadius,
                          )}
                          initial={false}
                          transition={wedgeTransition}
                        />
                        <motion.path
                          className={cn(
                            "stroke-1 stroke-neutral-300 dark:stroke-neutral-600",
                            {
                              "fill-neutral-100 dark:fill-neutral-800":
                                !isActive,
                              "fill-neutral-200 dark:fill-neutral-700":
                                isActive,
                            },
                          )}
                          d={slicePath(
                            index,
                            menuItems.length,
                            wedgeOuterRadius,
                            wedgeInnerRadius,
                          )}
                          initial={false}
                          transition={wedgeTransition}
                        />

                        <foreignObject
                          height={ICON_BOX}
                          width={ICON_BOX}
                          x={iconX - ICON_BOX / 2}
                          y={iconY - ICON_BOX / 2}
                        >
                          <ContextMenu.Item
                            aria-label={item.label}
                            className={cn(
                              "flex size-full items-center justify-center rounded-full text-neutral-600 outline-none dark:text-neutral-400",
                              {
                                "text-neutral-900 dark:text-neutral-50":
                                  isActive,
                              },
                            )}
                            onClick={() => {
                              onSelect?.(item);
                            }}
                            onFocus={() => setActiveIndex(index)}
                            ref={(el) => {
                              itemRefs.current[index] =
                                el as HTMLElement | null;
                            }}
                          >
                            <Icon
                              style={{ height: iconSize, width: iconSize }}
                            />
                          </ContextMenu.Item>
                        </foreignObject>
                      </g>
                    );
                  })}

                  <circle
                    className="fill-neutral-100 stroke-1 stroke-neutral-400 opacity-50 dark:fill-neutral-950 dark:stroke-neutral-600"
                    cx={0}
                    cy={0}
                    r={centerRadius}
                  />
                  <circle
                    className="fill-none stroke-neutral-400 dark:stroke-neutral-600"
                    cx={0}
                    cy={0}
                    r={3}
                  />
                </svg>
              </ContextMenu.Popup>
            </ContextMenu.Positioner>
          </ContextMenu.Portal>
        )}
      </AnimatePresence>
    </ContextMenu.Root>
  );
}

export { RadialMenu };

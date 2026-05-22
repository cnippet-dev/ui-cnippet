"use client";

import { type LucideIcon, MousePointer2 } from "lucide-react";
import { motion, type Transition, type Variants } from "motion/react";
import * as React from "react";

type RadialNavProps = {
  size?: number;
  items: RadialNavItem[];
  menuButtonConfig?: MenuButtonConfig;
  defaultActiveId?: number;
  onActiveChange?: (id: number) => void;
};

type RadialNavItem = {
  id: number;
  icon: LucideIcon;
  label: string;
  angle: number;
};

type MenuButtonConfig = {
  iconSize?: number; // px
  buttonSize?: number; // px, button diameter when collapsed
  buttonPadding?: number; // px
};

const defaultMenuButtonConfig: Required<MenuButtonConfig> = {
  buttonPadding: 8,
  buttonSize: 40,
  iconSize: 20,
};

const POINTER_BASE_DEG = 45;

const POINTER_ROT_SPRING = {
  damping: 26,
  stiffness: 220,
  type: "spring",
} as const;

const BUTTON_MOTION_CONFIG = {
  initial: "rest",
  transition: { damping: 25, stiffness: 200, type: "spring" },
  variants: {
    hover: {
      maxWidth: "140px",
      transition: { damping: 35, delay: 0.05, stiffness: 200, type: "spring" },
    },
    rest: { maxWidth: "40px" },
    tap: { scale: 0.95 },
  },
} as const;

const LABEL_VARIANTS: Variants = {
  hover: {
    opacity: 1,
    visibility: "visible",
    width: "auto",
    x: 0,
  },
  rest: { opacity: 0, x: 4 },
  tap: { opacity: 1, visibility: "visible", width: "auto", x: 0 },
};

const LABEL_TRANSITION: Transition = {
  damping: 25,
  stiffness: 200,
  type: "spring",
};

function getPolarCoordinates(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
}

function calculateIconOffset({
  buttonSize,
  iconSize,
  buttonPadding,
  bias = 0,
}: {
  buttonSize: number;
  iconSize: number;
  buttonPadding: number;
  bias?: number;
}) {
  const centerOffset = (buttonSize - iconSize) / 2;
  return centerOffset - buttonPadding + bias;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withDefaults<T extends Record<string, any>>(
  defaults: T,
  overrides?: Partial<T>,
): T {
  return { ...defaults, ...overrides };
}

function normalizeDeg(a: number) {
  return ((a % 360) + 360) % 360;
}

function toNearestTurn(prev: number | undefined, target: number) {
  const b = normalizeDeg(target);
  if (prev === undefined) return b;
  const k = Math.round((prev - b) / 360);
  return b + 360 * k;
}

function useShortestRotation(target: number) {
  const prevRef = React.useRef<number | undefined>(undefined);
  return React.useMemo(() => {
    const next = toNearestTurn(prevRef.current, target);
    prevRef.current = next;
    return next;
  }, [target]);
}

function MenuButton({
  item,
  isActive,
  onActivate,
  menuButtonConfig,
}: {
  item: RadialNavItem;
  isActive?: boolean;
  onActivate?: () => void;
  menuButtonConfig: Required<MenuButtonConfig>;
}) {
  const { icon: Icon, label } = item;
  const { iconSize, buttonSize, buttonPadding } = menuButtonConfig;

  const translateX = calculateIconOffset({
    ...menuButtonConfig,
    bias: -1,
  });

  return (
    <motion.button
      {...BUTTON_MOTION_CONFIG}
      animate={isActive ? "hover" : "rest"}
      aria-label={label}
      aria-pressed={!!isActive}
      className="relative flex items-center space-x-1 overflow-hidden whitespace-nowrap rounded-full border border-neutral-800 bg-background font-medium text-foreground dark:border-neutral-200"
      initial={false}
      onClick={onActivate}
      role="menuitem"
      style={{
        height: buttonSize,
        minWidth: buttonSize,
        padding: buttonPadding,
      }}
      type="button"
    >
      <Icon
        className="shrink-0"
        style={{
          height: iconSize,
          transform: `translateX(${translateX}px)`,
          width: iconSize,
        }}
      />
      <motion.span
        className="invisible w-0 text-sm"
        transition={LABEL_TRANSITION}
        variants={LABEL_VARIANTS}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

// orbitRadius determines how far from the center each item should be placed.
// It positions the CENTER of each small circle exactly on the parent circle's stroke.
// Formula: parentRadius (size/2) minus half of the child diameter (~0.5 accounts for border).
function RadialNav({
  size = 180,
  items,
  menuButtonConfig,
  defaultActiveId,
  onActiveChange,
}: RadialNavProps) {
  const orbitRadius = size / 2 - 0.5;
  const [activeId, setActiveId] = React.useState<number | null>(
    defaultActiveId ?? null,
  );

  const handleActivate = React.useCallback(
    (id: number) => {
      setActiveId(id);
      onActiveChange?.(id);
    },
    [onActiveChange],
  );

  const baseAngle =
    (items.find((it) => it.id === activeId)?.angle ?? 0) + POINTER_BASE_DEG;
  const rotateAngle = useShortestRotation(baseAngle);

  const resolvedMenuButtonConfig = withDefaults(
    defaultMenuButtonConfig,
    menuButtonConfig,
  );

  return (
    <div
      aria-label="Radial navigation"
      className="relative flex items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-200"
      role="menu"
      style={{ height: size, width: size }}
    >
      <motion.div
        animate={{ rotate: rotateAngle }}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={false}
        style={{ originX: 0.5, originY: 0.5 }}
        transition={POINTER_ROT_SPRING}
      >
        <MousePointer2 className="size-5 text-foreground" />
      </motion.div>
      {items.map((item) => {
        const { id, angle } = item;
        const { x, y } = getPolarCoordinates(angle, orbitRadius);
        return (
          <div
            className="group absolute"
            key={id}
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <MenuButton
              isActive={activeId === id}
              item={item}
              menuButtonConfig={resolvedMenuButtonConfig}
              onActivate={() => handleActivate(id)}
            />
          </div>
        );
      })}
    </div>
  );
}

export {
  type MenuButtonConfig,
  RadialNav,
  type RadialNavItem,
  type RadialNavProps,
};

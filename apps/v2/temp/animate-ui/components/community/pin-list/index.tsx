"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Pin } from "lucide-react";
import {
  AnimatePresence,
  type HTMLMotionProps,
  LayoutGroup,
  motion,
  type Transition,
} from "motion/react";
import * as React from "react";

type PinListItem = {
  id: number;
  name: string;
  info: string;
  icon: React.ElementType;
  pinned: boolean;
};

type PinListProps = {
  items: PinListItem[];
  labels?: {
    pinned?: string;
    unpinned?: string;
  };
  transition?: Transition;
  labelMotionProps?: HTMLMotionProps<"p">;
  className?: string;
  labelClassName?: string;
  pinnedSectionClassName?: string;
  unpinnedSectionClassName?: string;
  zIndexResetDelay?: number;
} & HTMLMotionProps<"div">;

function PinList({
  items,
  labels = { pinned: "Pinned Items", unpinned: "All Items" },
  transition = { damping: 20, mass: 0.8, stiffness: 320, type: "spring" },
  labelMotionProps = {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: { opacity: 0 },
    transition: { duration: 0.22, ease: "easeInOut" },
  },
  className,
  labelClassName,
  pinnedSectionClassName,
  unpinnedSectionClassName,
  zIndexResetDelay = 500,
  ...props
}: PinListProps) {
  const [listItems, setListItems] = React.useState(items);
  const [togglingGroup, setTogglingGroup] = React.useState<
    "pinned" | "unpinned" | null
  >(null);

  const pinned = listItems.filter((u) => u.pinned);
  const unpinned = listItems.filter((u) => !u.pinned);

  const toggleStatus = (id: number) => {
    const item = listItems.find((u) => u.id === id);
    if (!item) return;

    setTogglingGroup(item.pinned ? "pinned" : "unpinned");
    setListItems((prev) => {
      const idx = prev.findIndex((u) => u.id === id);
      if (idx === -1) return prev;
      const updated = [...prev];
      const [item] = updated.splice(idx, 1);
      if (!item) return prev;
      const toggled = { ...item, pinned: !item.pinned };
      if (toggled.pinned) updated.push(toggled);
      else updated.unshift(toggled);
      return updated;
    });
    // Reset group z-index after the animation duration (keep in sync with animation timing)
    setTimeout(() => setTogglingGroup(null), zIndexResetDelay);
  };

  return (
    <motion.div className={cn("space-y-10", className)} {...props}>
      <LayoutGroup>
        <div>
          {pinned.length > 0 && (
            <div
              className={cn(
                "relative space-y-3",
                togglingGroup === "pinned" ? "z-5" : "z-10",
                pinnedSectionClassName,
              )}
            >
              {pinned.map((item) => (
                <motion.div
                  className="flex items-center justify-between gap-5 rounded-2xl bg-neutral-200 p-2 dark:bg-neutral-800"
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  onClick={() => toggleStatus(item.id)}
                  transition={transition}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-background p-2">
                      <item.icon className="size-5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="font-medium text-neutral-500 text-xs dark:text-neutral-400">
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-400 dark:bg-neutral-600">
                    <Pin className="size-4 fill-white text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div>
          <AnimatePresence>
            {unpinned.length > 0 && (
              <motion.p
                className={cn(
                  "mb-2 px-3 font-medium text-neutral-500 text-sm dark:text-neutral-300",
                  labelClassName,
                )}
                key="all-label"
                layout
                {...labelMotionProps}
              >
                {labels.unpinned}
              </motion.p>
            )}
          </AnimatePresence>
          {unpinned.length > 0 && (
            <div
              className={cn(
                "relative space-y-3",
                togglingGroup === "unpinned" ? "z-5" : "z-10",
                unpinnedSectionClassName,
              )}
            >
              {unpinned.map((item) => (
                <motion.div
                  className="group flex items-center justify-between gap-5 rounded-2xl bg-neutral-200 p-2 dark:bg-neutral-800"
                  key={item.id}
                  layoutId={`item-${item.id}`}
                  onClick={() => toggleStatus(item.id)}
                  transition={transition}
                >
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-background p-2">
                      <item.icon className="size-5 text-neutral-500 dark:text-neutral-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="font-medium text-neutral-500 text-xs dark:text-neutral-400">
                        {item.info}
                      </div>
                    </div>
                  </div>
                  <div className="flex size-8 items-center justify-center rounded-full bg-neutral-400 opacity-0 transition-opacity duration-250 group-hover:opacity-100 dark:bg-neutral-600">
                    <Pin className="size-4 text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </LayoutGroup>
    </motion.div>
  );
}

export { PinList, type PinListItem, type PinListProps };

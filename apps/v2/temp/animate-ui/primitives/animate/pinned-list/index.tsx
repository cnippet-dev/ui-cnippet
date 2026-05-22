"use client";

import {
  AnimatePresence,
  type HTMLMotionProps,
  LayoutGroup,
  motion,
} from "motion/react";
import * as React from "react";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type PinnedListContextType = {
  movingId: string | null;
  setMovingId: (id: string | null) => void;
  onPinnedChange?: (id: string) => void;
};

type PinnedListItemContextType = {
  id: string;
};

const [PinnedListProvider, usePinnedList] =
  getStrictContext<PinnedListContextType>("PinnedListContext");

const [PinnedListItemProvider, usePinnedListItem] =
  getStrictContext<PinnedListItemContextType>("PinnedListItemContext");

type PinnedListProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
  onPinnedChange?: (id: string) => void;
};

function PinnedList({ children, onPinnedChange, ...props }: PinnedListProps) {
  const [movingId, setMovingId] = React.useState<string | null>(null);

  return (
    <PinnedListProvider value={{ movingId, onPinnedChange, setMovingId }}>
      <motion.div data-slot="pinned-list" {...props}>
        <LayoutGroup>{children}</LayoutGroup>
      </motion.div>
    </PinnedListProvider>
  );
}

type PinnedListPinnedProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function PinnedListPinned(props: PinnedListPinnedProps) {
  return <div data-slot="pinned-list-pinned" {...props} />;
}

type PinnedListUnpinnedProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function PinnedListUnpinned(props: PinnedListUnpinnedProps) {
  return <div data-slot="pinned-list-unpinned" {...props} />;
}

type PinnedListLabelProps = WithAsChild<
  HTMLMotionProps<"p"> & {
    hide?: boolean;
  }
>;

function PinnedListLabel({
  hide = false,
  asChild = false,
  transition = { duration: 0.22, ease: "easeInOut" },
  ...props
}: PinnedListLabelProps) {
  const Component = asChild ? Slot : motion.p;

  return (
    <AnimatePresence initial={false}>
      {!hide && (
        <Component
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key="pinned-list-label"
          layout
          transition={transition}
          {...props}
        />
      )}
    </AnimatePresence>
  );
}

type PinnedListItemsProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

function PinnedListItems(props: PinnedListItemsProps) {
  return <div data-slot="pinned-list-items" {...props} />;
}

type PinnedListItemProps = WithAsChild<
  HTMLMotionProps<"div"> & {
    id: string;
    children: React.ReactNode;
    customTrigger?: boolean;
  }
>;

function PinnedListItem({
  id,
  asChild = false,
  customTrigger = false,
  transition = { damping: 25, mass: 0.8, stiffness: 320, type: "spring" },
  onClick,
  ...props
}: PinnedListItemProps) {
  const { movingId, setMovingId, onPinnedChange } = usePinnedList();

  const Component = asChild ? Slot : motion.div;

  return (
    <PinnedListItemProvider value={{ id }}>
      <Component
        data-slot="pinned-list-item"
        layoutId={`pinned-list-item-${id}`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (!customTrigger) {
            setMovingId(id);
            onPinnedChange?.(id);
          }
          onClick?.(e);
        }}
        onLayoutAnimationComplete={() => {
          if (id === movingId) setMovingId(null);
        }}
        style={{
          position: "relative",
          zIndex: movingId === id ? 10 : undefined,
        }}
        transition={transition}
        whileHover={!customTrigger ? { scale: 1.05 } : undefined}
        whileTap={!customTrigger ? { scale: 0.95 } : undefined}
        {...props}
      />
    </PinnedListItemProvider>
  );
}

type PinnedListTriggerProps = WithAsChild<HTMLMotionProps<"button">>;

function PinnedListTrigger({
  asChild = false,
  onClick,
  ...props
}: PinnedListTriggerProps) {
  const { setMovingId, onPinnedChange } = usePinnedList();
  const { id } = usePinnedListItem();

  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      data-slot="pinned-list-trigger"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setMovingId(id);
        onPinnedChange?.(id);
        onClick?.(e);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    />
  );
}

export {
  PinnedList,
  type PinnedListContextType,
  PinnedListItem,
  type PinnedListItemContextType,
  type PinnedListItemProps,
  PinnedListItems,
  type PinnedListItemsProps,
  PinnedListLabel,
  type PinnedListLabelProps,
  PinnedListPinned,
  type PinnedListPinnedProps,
  type PinnedListProps,
  PinnedListTrigger,
  type PinnedListTriggerProps,
  PinnedListUnpinned,
  type PinnedListUnpinnedProps,
  usePinnedList,
  usePinnedListItem,
};

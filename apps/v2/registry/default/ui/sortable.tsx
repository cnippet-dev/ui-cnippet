"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/registry/default/lib/utils";

const STRATEGIES = {
  grid: rectSortingStrategy,
  horizontal: horizontalListSortingStrategy,
  vertical: verticalListSortingStrategy,
};

/** Pointer and keyboard sensors; the small distance keeps clicks inside items working. */
export function useSortableSensors() {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
}

export interface SortableProps<T> {
  value: T[];
  onValueChange: (value: T[]) => void;
  /** A unique, stable id for each item. */
  getItemValue: (item: T) => UniqueIdentifier;
  orientation?: keyof typeof STRATEGIES;
  children: React.ReactNode;
}

export function Sortable<T>({
  value,
  onValueChange,
  getItemValue,
  orientation = "vertical",
  children,
}: SortableProps<T>): React.ReactElement {
  const sensors = useSortableSensors();
  const ids = value.map(getItemValue);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(active.id);
    const to = ids.indexOf(over.id);
    if (from !== -1 && to !== -1) onValueChange(arrayMove(value, from, to));
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext items={ids} strategy={STRATEGIES[orientation]}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

type SortableItemContextValue = Pick<
  ReturnType<typeof useSortable>,
  "attributes" | "listeners" | "setActivatorNodeRef"
>;

const SortableItemContext =
  React.createContext<SortableItemContextValue | null>(null);

export function SortableItem({
  value,
  asHandle = false,
  disabled = false,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  value: UniqueIdentifier;
  /** Make the whole item draggable instead of only its handle. */
  asHandle?: boolean;
  disabled?: boolean;
}): React.ReactElement {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ disabled, id: value });

  return (
    <SortableItemContext.Provider
      value={{ attributes, listeners, setActivatorNodeRef }}
    >
      <div
        className={cn(
          "relative data-dragging:z-10 data-dragging:opacity-80 data-dragging:shadow-lg",
          asHandle &&
            "cursor-grab touch-none outline-none focus-visible:ring-2 focus-visible:ring-ring data-dragging:cursor-grabbing",
          className,
        )}
        data-dragging={isDragging || undefined}
        data-slot="sortable-item"
        ref={setNodeRef}
        style={{
          ...style,
          // Translate only: scaling would squash items of different sizes.
          transform: CSS.Translate.toString(transform),
          transition,
        }}
        {...(asHandle ? { ...attributes, ...listeners } : {})}
        {...props}
      >
        {children}
      </div>
    </SortableItemContext.Provider>
  );
}

export function SortableItemHandle({
  className,
  children,
  ...props
}: React.ComponentProps<"button">): React.ReactElement {
  const context = React.useContext(SortableItemContext);
  if (!context) {
    throw new Error("SortableItemHandle must be used within <SortableItem>.");
  }
  const { attributes, listeners, setActivatorNodeRef } = context;

  return (
    <button
      aria-label="Drag to reorder"
      className={cn(
        "flex shrink-0 cursor-grab in-data-dragging:cursor-grabbing touch-none items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="sortable-item-handle"
      ref={setActivatorNodeRef}
      type="button"
      {...attributes}
      {...listeners}
      {...props}
    >
      {children ?? <GripVerticalIcon aria-hidden="true" />}
    </button>
  );
}

export { arrayMove };

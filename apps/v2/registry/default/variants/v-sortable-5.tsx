// title: Kanban board with cross-column moves
"use client";

import {
  closestCorners,
  DndContext,
  type DragOverEvent,
  type UniqueIdentifier,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import {
  arrayMove,
  SortableItem,
  useSortableSensors,
} from "@/registry/default/ui/sortable";

type Card = { id: string; title: string; owner: string };
type ColumnId = "todo" | "doing" | "done";

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "todo", title: "To do" },
  { id: "doing", title: "In progress" },
  { id: "done", title: "Done" },
];

const initial: Record<ColumnId, Card[]> = {
  doing: [
    { id: "c3", owner: "JL", title: "Stepper keyboard support" },
    { id: "c4", owner: "MP", title: "Tag Input docs" },
  ],
  done: [{ id: "c5", owner: "SK", title: "File Upload dropzone" }],
  todo: [
    { id: "c1", owner: "MP", title: "Color picker spike" },
    { id: "c2", owner: "SK", title: "Audit chart tokens" },
  ],
};

function findColumn(
  board: Record<ColumnId, Card[]>,
  id: UniqueIdentifier,
): ColumnId | undefined {
  if (id in board) return id as ColumnId;
  return COLUMNS.find((c) => board[c.id].some((card) => card.id === id))?.id;
}

function Column({
  id,
  title,
  cards,
}: {
  id: ColumnId;
  title: string;
  cards: Card[];
}) {
  // Lets cards drop into an empty column.
  const { setNodeRef } = useDroppable({ id });
  return (
    <div className="flex min-w-0 flex-col gap-2 rounded-xl bg-muted/40 p-2">
      <p className="flex items-center justify-between px-1 font-medium text-xs">
        {title}
        <span className="text-muted-foreground tabular-nums">
          {cards.length}
        </span>
      </p>
      <SortableContext
        id={id}
        items={cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex min-h-24 flex-col gap-2" ref={setNodeRef}>
          {cards.map((card) => (
            <SortableItem
              asHandle
              className="flex flex-col gap-2 rounded-lg border bg-background p-2.5 text-sm"
              key={card.id}
              value={card.id}
            >
              {card.title}
              <Avatar className="size-5 self-end">
                <AvatarFallback className="text-[10px]">
                  {card.owner}
                </AvatarFallback>
              </Avatar>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function Particle() {
  const [board, setBoard] = useState(initial);
  const sensors = useSortableSensors();

  // Moves the card into whichever column or card it's over, live while dragging.
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const from = findColumn(board, active.id);
    const to = findColumn(board, over.id);
    if (!from || !to) return;

    setBoard((prev) => {
      const source = prev[from];
      const target = prev[to];
      const fromIndex = source.findIndex((c) => c.id === active.id);
      const card = source[fromIndex];
      if (!card) return prev;

      if (from === to) {
        const toIndex = target.findIndex((c) => c.id === over.id);
        if (toIndex === -1 || toIndex === fromIndex) return prev;
        return { ...prev, [to]: arrayMove(target, fromIndex, toIndex) };
      }

      const overIndex = target.findIndex((c) => c.id === over.id);
      const insertAt = overIndex === -1 ? target.length : overIndex;
      return {
        ...prev,
        [from]: source.filter((c) => c.id !== active.id),
        [to]: [...target.slice(0, insertAt), card, ...target.slice(insertAt)],
      };
    });
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <div className="grid w-full max-w-2xl grid-cols-3 gap-2 max-sm:grid-cols-1">
        {COLUMNS.map((col) => (
          <Column
            cards={board[col.id]}
            id={col.id}
            key={col.id}
            title={col.title}
          />
        ))}
      </div>
    </DndContext>
  );
}

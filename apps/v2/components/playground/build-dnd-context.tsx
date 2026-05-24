"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { createContext, type ReactNode, useContext, useState } from "react";
import { usePlaygroundStore } from "@/lib/playground/store";
import { findNodeById, findParentOf } from "@/lib/playground/tree-utils";

// ── Context to share active drag info with CanvasNode drop zones ───────────

interface DragInfo {
  /** ID of the node or sidebar item being dragged */
  activeId: string | null;
  /** "sidebar" or "canvas" */
  source: string | null;
  registryId: string | null;
}

const DragInfoCtx = createContext<DragInfo>({
  activeId: null,
  registryId: null,
  source: null,
});

export function useDragInfo() {
  return useContext(DragInfoCtx);
}

// ── BuildDndContext ────────────────────────────────────────────────────────

interface BuildDndContextProps {
  children: ReactNode;
}

export function BuildDndContext({ children }: BuildDndContextProps) {
  const tree = usePlaygroundStore((s) => s.tree);
  const addNode = usePlaygroundStore((s) => s.addNode);
  const moveNode = usePlaygroundStore((s) => s.moveNode);

  const [activeInfo, setActiveInfo] = useState<DragInfo>({
    activeId: null,
    registryId: null,
    source: null,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart({ active }: DragStartEvent) {
    setActiveInfo({
      activeId: active.id as string,
      registryId: active.data.current?.registryId ?? null,
      source: active.data.current?.source ?? null,
    });
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveInfo({ activeId: null, registryId: null, source: null });
    if (!over) return;

    const overId = String(over.id);
    const source = active.data.current?.source as string;

    // ── Sidebar drop → create a new node ──────────────────────────────────
    if (source === "sidebar") {
      const registryId = active.data.current?.registryId as string;
      const nodeType = active.data.current?.nodeType as
        | "component"
        | "layout"
        | undefined;

      // "droppable-{parentId}" means dropped inside a layout's drop zone
      if (overId.startsWith("droppable-")) {
        const parentId = overId.replace("droppable-", "");
        addNode(registryId, nodeType, parentId);
      } else {
        // Dropped on a root-level sortable item — add to root
        addNode(registryId, nodeType, null);
      }
      return;
    }

    // ── Canvas drag → move existing node ──────────────────────────────────
    if (source === "canvas") {
      const nodeId = active.data.current?.nodeId as string;
      if (nodeId === overId) return;

      if (overId.startsWith("droppable-")) {
        // Dropped into a layout's drop zone — append as last child
        const parentId = overId.replace("droppable-", "");
        if (nodeId === parentId) return; // Can't drop into itself
        const parent = findNodeById(tree, parentId);
        addNodeIntoLayout(nodeId, parentId, parent?.children.length ?? 0);
      } else {
        // Dropped on a sibling sortable node — reorder within same container
        const overParent = findParentOf(tree, overId);
        const targetParentId = overParent?.id ?? null;
        const siblings = overParent ? overParent.children : tree;
        const newIndex = siblings.findIndex((n) => n.id === overId);
        moveNode(nodeId, targetParentId, newIndex);
      }
      return;
    }
  }

  function addNodeIntoLayout(nodeId: string, parentId: string, index: number) {
    moveNode(nodeId, parentId, index);
  }

  return (
    <DragInfoCtx.Provider value={activeInfo}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        {children}

        <DragOverlay dropAnimation={{ duration: 150, easing: "ease" }}>
          {activeInfo.activeId && activeInfo.registryId ? (
            <div className="cursor-grabbing rounded-lg border border-gray-950/15 bg-white px-3 py-2 shadow-lg dark:border-white/15 dark:bg-neutral-900">
              <span className="font-mono text-[11px] text-gray-950/60 dark:text-white/50">
                {activeInfo.registryId}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </DragInfoCtx.Provider>
  );
}

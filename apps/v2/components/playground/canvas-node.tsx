//biome-ignore-all lint/correctness/noUnusedFunctionParameters: <>

"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDeleteBinLine, RiDraggable } from "@remixicon/react";
import { Suspense, useEffect, useState } from "react";
import { buildLayoutClasses } from "@/lib/playground/layout-blocks";
import { getCatalogEntry } from "@/lib/playground/registry-catalog";
import { usePlaygroundStore } from "@/lib/playground/store";
import type { PlaygroundNode } from "@/lib/playground/types";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import { useDragInfo } from "./build-dnd-context";

// ── Shared props ──────────────────────────────────────────────────────────

interface CanvasNodeProps {
  node: PlaygroundNode;
  /** id of the parent layout node, or null for root */
  parentId: string | null;
  isSelected: boolean;
}

// ── Main dispatcher ───────────────────────────────────────────────────────

export function CanvasNode({ node, parentId, isSelected }: CanvasNodeProps) {
  if (node.type === "layout") {
    return (
      <LayoutCanvasNode
        isSelected={isSelected}
        node={node}
        parentId={parentId}
      />
    );
  }
  return (
    <ComponentCanvasNode
      isSelected={isSelected}
      node={node}
      parentId={parentId}
    />
  );
}

// ── Component node ────────────────────────────────────────────────────────

function ComponentCanvasNode({ node, parentId, isSelected }: CanvasNodeProps) {
  const [mounted, setMounted] = useState(false);
  const selectNode = usePlaygroundStore((s) => s.selectNode);
  const removeNode = usePlaygroundStore((s) => s.removeNode);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    data: {
      nodeId: node.id,
      nodeType: "component",
      parentId,
      source: "canvas",
    },
    id: node.id,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const style = { transform: CSS.Transform.toString(transform), transition };
  const catalogEntry = getCatalogEntry(node.registryId);

  return (
    <div
      className={cn(
        "group rounded-xl border bg-white transition-all dark:bg-neutral-900",
        isSelected
          ? "border-gray-950/20 shadow-sm dark:border-white/20"
          : "border-gray-950/8 dark:border-white/10",
        isDragging && "opacity-40",
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
      ref={setNodeRef}
      style={style}
    >
      <NodeToolbar
        dragAttributes={attributes}
        dragListeners={listeners}
        nodeId={node.id}
        onRemove={() => removeNode(node.id)}
        registryId={node.registryId}
      />

      <div className="flex items-center justify-center overflow-auto p-6">
        {!mounted ? (
          <div className="h-8 w-24 animate-pulse rounded-md bg-gray-950/5 dark:bg-white/8" />
        ) : catalogEntry ? (
          <catalogEntry.LiveRenderer props={node.props} />
        ) : (
          <FallbackRenderer registryId={node.registryId} />
        )}
      </div>
    </div>
  );
}

// ── Layout node ───────────────────────────────────────────────────────────

function LayoutCanvasNode({ node, parentId, isSelected }: CanvasNodeProps) {
  const selectNode = usePlaygroundStore((s) => s.selectNode);
  const removeNode = usePlaygroundStore((s) => s.removeNode);
  const dragInfo = useDragInfo();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    data: { nodeId: node.id, nodeType: "layout", parentId, source: "canvas" },
    id: node.id,
  });

  // The inner drop zone accepts components/layouts dragged in
  const droppableId = `droppable-${node.id}`;
  const { setNodeRef: setDropRef, isOver } = useDroppable({ id: droppableId });

  const style = { transform: CSS.Transform.toString(transform), transition };
  const layoutClasses = buildLayoutClasses(node.registryId, node.props);
  const childIds = node.children.map((c) => c.id);

  const isDragActive = !!dragInfo.activeId;
  const isEmpty = node.children.length === 0;

  return (
    <div
      className={cn(
        "group rounded-xl border bg-white transition-all dark:bg-neutral-900",
        isSelected
          ? "border-gray-950/20 shadow-sm dark:border-white/20"
          : "border-gray-950/8 dark:border-white/10",
        isDragging && "opacity-40",
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
      ref={setNodeRef}
      style={style}
    >
      <NodeToolbar
        dragAttributes={attributes}
        dragListeners={listeners}
        isLayout
        nodeId={node.id}
        onRemove={() => removeNode(node.id)}
        registryId={node.registryId}
      />

      {/* Children area */}
      <div
        className={cn(
          "relative min-h-20 rounded-b-xl p-3 transition-colors",
          layoutClasses,
          isEmpty && "flex items-center justify-center",
          isOver && "bg-blue-50/60 dark:bg-blue-950/20",
          isDragActive && !isOver && "bg-gray-950/2 dark:bg-white/2",
        )}
        ref={setDropRef}
      >
        {isEmpty ? (
          <p
            className={cn(
              "pointer-events-none select-none font-mono text-[11px] transition-colors",
              isOver
                ? "text-blue-500 dark:text-blue-400"
                : "text-gray-950/20 dark:text-white/20",
            )}
          >
            {isOver ? "Release to drop" : "Drop components here"}
          </p>
        ) : (
          <SortableContext
            items={childIds}
            strategy={verticalListSortingStrategy}
          >
            {node.children.map((child) => (
              <CanvasNode
                isSelected={false /* selection is flat for now */}
                key={child.id}
                node={child}
                parentId={node.id}
              />
            ))}
          </SortableContext>
        )}

        {/* Drop hint overlay when dragging over a non-empty layout */}
        {!isEmpty && isOver && (
          <div className="pointer-events-none absolute inset-0 rounded-b-xl border-2 border-blue-400/50 border-dashed dark:border-blue-500/40" />
        )}
      </div>
    </div>
  );
}

// ── Shared toolbar ────────────────────────────────────────────────────────

function NodeToolbar({
  registryId,
  nodeId,
  dragAttributes,
  dragListeners,
  onRemove,
  isLayout = false,
}: {
  registryId: string;
  nodeId: string;
  dragAttributes: ReturnType<typeof useSortable>["attributes"];
  dragListeners: ReturnType<typeof useSortable>["listeners"];
  onRemove: () => void;
  isLayout?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-3 py-1.5",
        "border-gray-950/6 border-b dark:border-white/8",
        isLayout && "rounded-t-xl",
      )}
    >
      <button
        {...dragAttributes}
        {...dragListeners}
        aria-label="Drag to reorder"
        className="cursor-grab touch-none text-gray-950/20 transition-colors hover:text-gray-950/50 active:cursor-grabbing dark:text-white/20 dark:hover:text-white/50"
        type="button"
      >
        <RiDraggable className="size-3.5" />
      </button>

      <span className="font-mono text-[10px] text-gray-950/30 dark:text-white/25">
        {registryId}
      </span>

      <button
        aria-label="Remove"
        className="rounded p-0.5 text-gray-950/20 transition-colors hover:bg-red-50 hover:text-red-500 dark:text-white/20 dark:hover:bg-red-950/30 dark:hover:text-red-400"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        type="button"
      >
        <RiDeleteBinLine className="size-3" />
      </button>
    </div>
  );
}

// ── Fallback renderer ─────────────────────────────────────────────────────

function FallbackRenderer({ registryId }: { registryId: string }) {
  const Component = Index[registryId]?.component ?? null;
  if (!Component) {
    return (
      <p className="font-mono text-gray-950/30 text-xs dark:text-white/30">
        No preview
      </p>
    );
  }
  return (
    <Suspense
      fallback={
        <div className="h-8 w-24 animate-pulse rounded-md bg-gray-950/5 dark:bg-white/8" />
      }
    >
      <Component />
    </Suspense>
  );
}

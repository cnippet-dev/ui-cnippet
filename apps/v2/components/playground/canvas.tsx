"use client";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, useEffect, useState } from "react";
import { buildLayoutClasses } from "@/lib/playground/layout-blocks";
import { getCatalogEntry } from "@/lib/playground/registry-catalog";
import { usePlaygroundStore } from "@/lib/playground/store";
import type { PlaygroundNode } from "@/lib/playground/types";
import { cn } from "@/lib/utils";
import { Index } from "@/registry/__index__";
import { CanvasNode } from "./canvas-node";
import { EmptyState } from "./empty-state";

// ── Inspect mode canvas ───────────────────────────────────────────────────

export function InspectCanvas({
  variantKey,
  previewWidth,
}: {
  variantKey: string;
  previewWidth?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Component = variantKey ? Index[variantKey]?.component : null;

  return (
    <div className="flex flex-1 items-center justify-center overflow-auto p-8">
      <div
        className="flex w-full justify-center transition-all duration-300"
        style={previewWidth ? { maxWidth: previewWidth } : undefined}
      >
        {!mounted ? (
          <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-950/5 dark:bg-white/8" />
        ) : (
          <AnimatePresence initial={false} mode="wait">
            {Component ? (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                initial={{ opacity: 0, y: 6 }}
                key={variantKey}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                <Suspense
                  fallback={
                    <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-950/5 dark:bg-white/8" />
                  }
                >
                  <Component />
                </Suspense>
              </motion.div>
            ) : (
              <motion.p
                animate={{ opacity: 1 }}
                className="font-mono text-gray-950/30 text-xs dark:text-white/30"
                initial={{ opacity: 0 }}
                key="empty"
              >
                Select a component from the sidebar
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

// ── Build mode canvas ─────────────────────────────────────────────────────
// DnD context lives in BuildDndContext (parent). This component just renders
// the root SortableContext and its nodes.

export function BuildCanvas({ previewWidth }: { previewWidth?: string }) {
  const tree = usePlaygroundStore((s) => s.tree);
  const selectedId = usePlaygroundStore((s) => s.selectedId);
  const selectNode = usePlaygroundStore((s) => s.selectNode);
  const [isPreview, setIsPreview] = useState(false);

  const rootIds = tree.map((n) => n.id);

  if (tree.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* ── Mode tab toggle ─────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-center border-gray-950/8 border-b py-2 dark:border-white/10">
        <div className="flex rounded-md border border-gray-950/8 p-0.5 dark:border-white/10">
          <button
            className={cn(
              "rounded px-3 py-1 font-mono text-[11px] transition-colors",
              !isPreview
                ? "bg-gray-950/6 text-gray-950 dark:bg-white/10 dark:text-white"
                : "text-gray-950/40 hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60",
            )}
            onClick={() => setIsPreview(false)}
            type="button"
          >
            Build
          </button>
          <button
            className={cn(
              "rounded px-3 py-1 font-mono text-[11px] transition-colors",
              isPreview
                ? "bg-gray-950/6 text-gray-950 dark:bg-white/10 dark:text-white"
                : "text-gray-950/40 hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60",
            )}
            onClick={() => setIsPreview(true)}
            type="button"
          >
            Preview
          </button>
        </div>
      </div>

      {/* ── Canvas content ───────────────────────────────────────────────── */}
      {isPreview ? (
        <div className="flex flex-1 items-start justify-center overflow-y-auto p-8">
          <div
            className="w-full transition-all duration-300"
            style={previewWidth ? { maxWidth: previewWidth } : undefined}
          >
            {tree.map((node) => (
              <PreviewNode key={node.id} node={node} />
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-1 items-start justify-center overflow-y-auto p-6"
          onClick={() => selectNode(null)}
        >
          <div
            className="flex w-full flex-col gap-4 transition-all duration-300"
            style={previewWidth ? { maxWidth: previewWidth } : undefined}
          >
            <SortableContext
              items={rootIds}
              strategy={verticalListSortingStrategy}
            >
              {tree.map((node) => (
                <CanvasNode
                  isSelected={selectedId === node.id}
                  key={node.id}
                  node={node}
                  parentId={null}
                />
              ))}
            </SortableContext>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Preview node — clean render without chrome ────────────────────────────

function PreviewNode({ node }: { node: PlaygroundNode }) {
  if (node.type === "layout") {
    const layoutClasses = buildLayoutClasses(node.registryId, node.props);
    return (
      <div className={cn("min-h-4", layoutClasses)}>
        {node.children.map((child) => (
          <PreviewNode key={child.id} node={child} />
        ))}
      </div>
    );
  }

  const entry = getCatalogEntry(node.registryId);
  if (entry) {
    return <entry.LiveRenderer props={node.props} />;
  }

  // Fallback: render the raw variant component
  const Component = Index[node.registryId]?.component ?? null;
  if (!Component) return null;
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

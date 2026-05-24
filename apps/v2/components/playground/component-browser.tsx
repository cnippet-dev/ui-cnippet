"use client";

import { useDraggable } from "@dnd-kit/core";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { catalogue } from "@/components/components-page/registry";
import { layoutBlocks } from "@/lib/playground/layout-blocks";
import { usePlaygroundStore } from "@/lib/playground/store";
import type { PlaygroundMode } from "@/lib/playground/types";
import { cn } from "@/lib/utils";

interface ComponentBrowserProps {
  mode: PlaygroundMode;
  selectedComponent: string;
  selectedVariant: string;
}

export function ComponentBrowser({
  mode,
  selectedComponent,
  selectedVariant,
}: ComponentBrowserProps) {
  const [, setComponent] = useQueryState(
    "component",
    parseAsString.withDefault(""),
  );
  const [, setVariant] = useQueryState(
    "variant",
    parseAsString.withDefault(""),
  );
  const addNode = usePlaygroundStore((s) => s.addNode);

  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(["Layouts", ...catalogue.map((c) => c.label)]),
  );

  const query = search.toLowerCase().trim();

  const filteredCatalogue = catalogue
    .map((cat) => ({
      ...cat,
      components: cat.components.filter(
        (comp) =>
          !query ||
          comp.name.toLowerCase().includes(query) ||
          comp.variants.some((v) => v.label.toLowerCase().includes(query)),
      ),
    }))
    .filter((cat) => cat.components.length > 0);

  const filteredLayouts = layoutBlocks.filter(
    (b) => !query || b.label.toLowerCase().includes(query),
  );

  function toggle(label: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function handleVariantClick(compName: string, variantKey: string) {
    if (mode === "inspect") {
      setComponent(compName.toLowerCase());
      setVariant(variantKey);
    } else {
      addNode(variantKey, "component", null);
    }
  }

  return (
    <div className="flex h-full flex-col border-gray-950/8 border-r dark:border-white/10">
      {/* Search */}
      <div className="border-gray-950/8 border-b px-3 py-2 dark:border-white/10">
        <input
          className="w-full rounded-md border border-gray-950/10 bg-transparent px-2.5 py-1.5 font-mono text-xs outline-none placeholder:text-gray-950/30 focus:border-gray-950/20 dark:border-white/10 dark:focus:border-white/20 dark:placeholder:text-white/30"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          type="search"
          value={search}
        />
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {/* ── Layouts section (Build mode only) ── */}
        {mode === "build" && filteredLayouts.length > 0 && (
          <div>
            <button
              className="flex w-full items-center justify-between px-3 py-1.5 font-mono font-semibold text-[10px] text-gray-950/40 uppercase tracking-widest hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60"
              onClick={() => toggle("Layouts")}
              type="button"
            >
              Layouts
              <span className="text-[10px]">
                {expandedCategories.has("Layouts") ? "−" : "+"}
              </span>
            </button>

            {expandedCategories.has("Layouts") && (
              <div className="mb-2">
                {filteredLayouts.map((block) => (
                  <DraggableLayoutItem
                    id={block.id}
                    key={block.id}
                    label={block.label}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Component categories ── */}
        {filteredCatalogue.map((cat) => {
          const isExpanded = expandedCategories.has(cat.label) || !!query;
          return (
            <div key={cat.label}>
              <button
                className="flex w-full items-center justify-between px-3 py-1.5 font-mono font-semibold text-[10px] text-gray-950/40 uppercase tracking-widest hover:text-gray-950/70 dark:text-white/30 dark:hover:text-white/60"
                onClick={() => toggle(cat.label)}
                type="button"
              >
                {cat.label}
                <span className="text-[10px]">{isExpanded ? "−" : "+"}</span>
              </button>

              {isExpanded && (
                <div className="mb-1">
                  {cat.components.map((comp) => {
                    const isActive =
                      mode === "inspect" &&
                      selectedComponent === comp.name.toLowerCase();
                    return (
                      <div key={comp.name}>
                        <div
                          className={cn(
                            "flex items-center px-3 py-1 font-mono text-xs",
                            isActive
                              ? "text-gray-950 dark:text-white"
                              : "text-gray-950/60 dark:text-white/50",
                          )}
                        >
                          <span className="flex-1 truncate">{comp.name}</span>
                        </div>

                        <div className="mb-0.5">
                          {comp.variants.map((v) => {
                            const isVariantActive =
                              isActive && selectedVariant === v.key;
                            return (
                              <button
                                className={cn(
                                  "flex w-full items-center gap-2 rounded px-4 py-1 text-left font-mono text-[11px] transition-colors",
                                  isVariantActive
                                    ? "bg-gray-950/5 text-gray-950 dark:bg-white/8 dark:text-white"
                                    : "text-gray-950/50 hover:bg-gray-950/3 hover:text-gray-950/80 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white/70",
                                )}
                                key={v.key}
                                onClick={() =>
                                  handleVariantClick(comp.name, v.key)
                                }
                                type="button"
                              >
                                {isVariantActive && (
                                  <span className="size-1 shrink-0 rounded-full bg-gray-950 dark:bg-white" />
                                )}
                                <span
                                  className={cn(
                                    !isVariantActive && "pl-3",
                                    "truncate",
                                  )}
                                >
                                  {v.label}
                                </span>
                                {mode === "build" && (
                                  <span className="ml-auto shrink-0 text-gray-950/20 dark:text-white/20">
                                    +
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Draggable layout block item ────────────────────────────────────────────

function DraggableLayoutItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    data: { nodeType: "layout", registryId: id, source: "sidebar" },
    id: `sidebar-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "mx-2 mb-1 flex cursor-grab items-center gap-2 rounded-md border border-gray-950/10 border-dashed px-2 py-1.5 transition-colors active:cursor-grabbing dark:border-white/10",
        isDragging
          ? "opacity-40"
          : "hover:border-gray-950/20 hover:bg-gray-950/3 dark:hover:border-white/20 dark:hover:bg-white/5",
      )}
    >
      <span className="font-mono text-[10px] text-gray-950/25 dark:text-white/20">
        ⣿
      </span>
      <span className="font-mono text-[11px] text-gray-950/60 dark:text-white/50">
        {label}
      </span>
    </div>
  );
}

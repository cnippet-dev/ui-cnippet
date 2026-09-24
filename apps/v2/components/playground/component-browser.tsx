"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { catalogue } from "@/components/components-page/registry";
import { cn } from "@/lib/utils";

interface ComponentBrowserProps {
  selectedComponent: string;
  selectedVariant: string;
}

export function ComponentBrowser({
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

  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(catalogue.map((c) => c.label)),
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

  function toggle(label: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      next.has(label) ? next.delete(label) : next.add(label);
      return next;
    });
  }

  function handleVariantClick(compName: string, variantKey: string) {
    setComponent(compName.toLowerCase());
    setVariant(variantKey);
  }

  return (
    <div className="flex h-full flex-col border-border border-r">
      {/* Search */}
      <div className="border-border border-b px-3 py-2">
        <input
          className="w-full rounded-md border border-border bg-transparent px-2.5 py-1.5 font-mono text-xs outline-none placeholder:text-faint focus:border-border-strong"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          type="search"
          value={search}
        />
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        {filteredCatalogue.map((cat) => {
          const isExpanded = expandedCategories.has(cat.label) || !!query;
          return (
            <div key={cat.label}>
              <button
                className="flex w-full items-center justify-between px-3 py-1.5 font-mono font-semibold text-[10px] text-faint uppercase tracking-widest hover:text-foreground"
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
                      selectedComponent === comp.name.toLowerCase();
                    return (
                      <div key={comp.name}>
                        <div
                          className={cn(
                            "flex items-center px-3 py-1 font-mono text-xs",
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
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
                                    ? "bg-muted text-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                                )}
                                key={v.key}
                                onClick={() =>
                                  handleVariantClick(comp.name, v.key)
                                }
                                type="button"
                              >
                                {isVariantActive && (
                                  <span className="size-1 shrink-0 rounded-full bg-signal" />
                                )}
                                <span
                                  className={cn(
                                    !isVariantActive && "pl-3",
                                    "truncate",
                                  )}
                                >
                                  {v.label}
                                </span>
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

"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { VariantCard } from "./variant-card";

export interface VariantEntry {
  name: string;
  description: string;
  category: string;
}

interface ExploreShowcaseProps {
  variants: VariantEntry[];
  categories: string[];
}

export function ExploreShowcase({
  variants,
  categories,
}: ExploreShowcaseProps) {
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString.withDefault(categories[0] ?? ""),
  );
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const id = setTimeout(
      () => setDebouncedQuery(search.trim().toLowerCase()),
      200,
    );
    return () => clearTimeout(id);
  }, [search]);

  const query = debouncedQuery;
  const filtered = variants.filter((v) => {
    if (query) {
      return (
        v.name.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    }
    return v.category === activeCategory;
  });

  return (
    <div className="space-y-0">
      {/* Search bar — full width with border lines matching page style */}
      <div className="relative flex items-center gap-2 border-gray-950/5 border-b py-3 dark:border-white/10">
        <SearchIcon className="size-3.5 shrink-0 text-black/30 dark:text-white/30" />
        <input
          className="flex-1 bg-transparent font-mono text-black/80 text-xs outline-none placeholder:text-black/30 dark:text-white/80 dark:placeholder:text-white/30"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setSearch("")}
          placeholder="Search variants, components…"
          ref={inputRef}
          type="text"
          value={search}
        />
        {search && (
          <button
            aria-label="Clear search"
            className="shrink-0 text-black/30 transition-colors hover:text-black/60 dark:text-white/30 dark:hover:text-white/60"
            onClick={() => {
              setSearch("");
              inputRef.current?.focus();
            }}
            type="button"
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>

      {/* Tab strip */}
      {!search && (
        <div className="relative flex flex-wrap">
          {categories.map((cat) => (
            <TabButton
              active={activeCategory === cat}
              key={cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabButton>
          ))}
        </div>
      )}

      {/* Variant grid */}
      <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 lg:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((variant) => (
            <VariantCard
              category={variant.category}
              description={variant.description}
              key={variant.name}
              name={variant.name}
            />
          ))
        ) : (
          <p className="col-span-full py-12 text-center font-mono text-black/30 text-xs dark:text-white/30">
            No variants found for &ldquo;{search}&rdquo;.
          </p>
        )}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={
        active
          ? "rounded-none bg-gray-950 px-3 py-1 font-mono text-white text-xs dark:bg-white dark:text-gray-950"
          : "cursor-pointer rounded-none bg-transparent px-3 py-3 font-mono text-gray-950/60 text-xs transition-colors hover:border-gray-950/20 hover:text-gray-950 dark:border-white/10 dark:text-white/50 dark:hover:border-white/20 dark:hover:text-white"
      }
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

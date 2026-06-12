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

const SECTIONS = [
  { id: "core", label: "Core" },
  { id: "text animations", label: "Text Animations" },
  { id: "scroll animations", label: "Scroll Animations" },
] as const;

interface ExploreShowcaseProps {
  variants: VariantEntry[];
  categories: string[];
  textAnimVariants: VariantEntry[];
  textAnimCategories: string[];
  scrollAnimVariants: VariantEntry[];
  scrollAnimCategories: string[];
}

export function ExploreShowcase({
  variants,
  categories,
  textAnimVariants,
  textAnimCategories,
  scrollAnimVariants,
  scrollAnimCategories,
}: ExploreShowcaseProps) {
  const [section, setSection] = useQueryState(
    "section",
    parseAsString.withDefault("core"),
  );
  const [activeCategory, setActiveCategory] = useQueryState(
    "category",
    parseAsString.withDefault(""),
  );
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const activeVariants =
    section === "text animations"
      ? textAnimVariants
      : section === "scroll animations"
        ? scrollAnimVariants
        : variants;

  const activeCategories =
    section === "text animations"
      ? textAnimCategories
      : section === "scroll animations"
        ? scrollAnimCategories
        : categories;

  const handleSectionChange = (next: string) => {
    setSection(next);
    setActiveCategory("");
  };

  const resolvedCategory =
    activeCategory && activeCategories.includes(activeCategory)
      ? activeCategory
      : (activeCategories[0] ?? "");

  React.useEffect(() => {
    const id = setTimeout(
      () => setDebouncedQuery(search.trim().toLowerCase()),
      200,
    );
    return () => clearTimeout(id);
  }, [search]);

  const query = debouncedQuery;
  const filtered = activeVariants.filter((v) => {
    if (query) {
      return (
        v.name.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    }
    return v.category === resolvedCategory;
  });

  return (
    <div className="space-y-0">
      {/* Section tabs — Core / Text Animations / Scroll Animations */}
      <div className="relative flex border-gray-950/5 border-b dark:border-white/10">
        {SECTIONS.map((s) => (
          <button
            className={
              section === s.id
                ? "border-gray-950 border-b-2 px-4 py-3 font-mono text-gray-950 text-xs dark:border-white dark:text-white"
                : "cursor-pointer px-4 py-3 font-mono text-gray-950/40 text-xs transition-colors hover:text-gray-950 dark:text-white/40 dark:hover:text-white"
            }
            key={s.id}
            onClick={() => handleSectionChange(s.id)}
            type="button"
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
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

      {/* Component category tab strip */}
      {!search && (
        <div className="relative flex flex-wrap">
          {activeCategories.map((cat) => (
            <TabButton
              active={resolvedCategory === cat}
              key={cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat
                .split(" ")
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(" ")}
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
              reloadable={section !== "core"}
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

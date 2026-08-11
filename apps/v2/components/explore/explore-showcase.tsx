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
      <div className="relative flex border-b border-dashed">
        {SECTIONS.map((s) => (
          <button
            className={
              section === s.id
                ? "-mb-px border-cnippet-blue border-b-2 px-4 py-3 font-mono text-foreground text-xs"
                : "cursor-pointer px-4 py-3 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
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
      <div className="relative flex items-center gap-2 border-b border-dashed py-3">
        <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
        <input
          className="flex-1 bg-transparent font-mono text-foreground text-xs outline-none placeholder:text-muted-foreground/70"
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
            className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
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
        <div className="relative flex flex-wrap gap-1.5 border-b border-dashed py-3">
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
          <p className="col-span-full py-12 text-center font-mono text-muted-foreground text-xs">
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
          ? "rounded-[2px] border border-cnippet-blue/40 border-dashed bg-cnippet-blue/10 px-2.5 py-1 font-mono text-[11px] text-foreground"
          : "cursor-pointer rounded-[2px] border border-dashed px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-cnippet-blue/40 hover:text-foreground"
      }
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

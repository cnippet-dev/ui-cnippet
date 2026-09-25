"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { cn } from "@/lib/utils";
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
    <div>
      {/* Toolbar — sticky under the header while browsing (md+; on phones the
          wrapped category list is too tall to pin). */}
      <div className="relative z-20 -mx-2 mb-6 rounded-2xl border bg-frame/90 p-1 backdrop-blur-xl md:sticky md:top-[calc(var(--header-height)+0.75rem+1px)]">
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <div className="no-scrollbar flex gap-0.5 overflow-x-auto">
            {SECTIONS.map((s) => (
              <button
                aria-pressed={section === s.id}
                className={cn(
                  "h-8 shrink-0 cursor-pointer rounded-lg px-3 font-medium text-[13px] transition-colors duration-150",
                  section === s.id
                    ? "bg-background text-foreground shadow-xs/5 ring-1 ring-border"
                    : "text-muted-foreground hover:text-foreground",
                )}
                key={s.id}
                onClick={() => handleSectionChange(s.id)}
                type="button"
              >
                {s.label}
              </button>
            ))}
          </div>

          <label className="flex h-8 flex-1 items-center gap-2 rounded-lg border bg-background px-2.5 transition-colors focus-within:border-border-strong focus-within:ring-2 focus-within:ring-ring md:ms-auto md:max-w-72">
            <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
            <input
              aria-label="Search variants"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground/70"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setSearch("")}
              placeholder="Search variants, components…"
              ref={inputRef}
              type="text"
              value={search}
            />
            {search ? (
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
            ) : null}
          </label>
        </div>

        {!search ? (
          // Wraps so every category is visible at once.
          <div className="mt-1 flex flex-wrap gap-x-1 gap-y-0.5 border-t px-1 pt-1.5 pb-0.5">
            <span className="flex h-7 shrink-0 items-center ps-1 pe-1.5 font-mono text-[11px] text-faint">
              {"//"}
            </span>
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
        ) : null}
      </div>

      <p className="mb-4 font-mono text-[12px] text-faint">
        {search
          ? `// ${filtered.length} results for "${search}"`
          : `// ${filtered.length} variants · ${resolvedCategory}`}
      </p>

      {/* Variant grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
          <p className="col-span-full rounded-2xl border border-dashed py-16 text-center text-[14px] text-muted-foreground">
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
      aria-pressed={active}
      className={cn(
        "h-7 shrink-0 cursor-pointer rounded-md px-2.5 text-[12.5px] transition-colors duration-150",
        active
          ? "bg-signal-soft font-medium text-signal"
          : "text-muted-foreground hover:bg-background hover:text-foreground",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

"use client";

import {
  ArrowUpRightIcon,
  PanelLeftIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";
import { VariantCard, type VariantKind } from "./variant-card";

export interface VariantEntry {
  name: string;
  description: string;
  category: string;
  docsUrl?: string;
}

// Categories whose variants need the full row; two columns would leave each
// one too narrow and force horizontal scrolling.
const WIDE_CATEGORIES = new Set([
  "data table",
  "sidebar",
  // Motion: page-section layouts (sticky panels, scroll boxes, devices)
  "sticky scroll reveal",
  "container scroll",
  "hero parallax",
  "scroll image reveal",
  "macbook scroll",
  "horizontal scroll",
  "scroll direction header",
  "sticky footer",
  "scroll snap sections",
  "stacking cards",
  "text flipping board",
]);

export interface ShowcaseGroup {
  id: string;
  label: string;
  variants: VariantEntry[];
  categories: string[];
}

interface ExploreShowcaseProps {
  variants: VariantEntry[];
  categories: string[];
  groups: ShowcaseGroup[];
}

const KINDS: { id: VariantKind; label: string; lead: string }[] = [
  {
    id: "core",
    label: "Core",
    lead: "Primitives and composites — forms, overlays, data, navigation.",
  },
  {
    id: "motion",
    label: "Motion",
    lead: "Animated components — hit replay on a card to run it again.",
  },
  {
    id: "chart",
    label: "Charts",
    lead: "Data visualisation — cartesian, polar, micro and interactive charts.",
  },
];

const kindOf = (section: string): VariantKind =>
  section === "core" ? "core" : section === "charts" ? "chart" : "motion";

const titleCase = (s: string) =>
  s
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

export function ExploreShowcase({
  variants,
  categories,
  groups,
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
  const [navOpen, setNavOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Every navigable section: core, each motion group, charts.
  const sections: ShowcaseGroup[] = [
    { categories, id: "core", label: "Core", variants },
    ...groups,
  ];
  const activeSection =
    sections.find((s) => s.id === section) ?? (sections[0] as ShowcaseGroup);
  const kind = kindOf(activeSection.id);
  const kindInfo = KINDS.find((k) => k.id === kind);

  const resolvedCategory =
    activeCategory && activeSection.categories.includes(activeCategory)
      ? activeCategory
      : (activeSection.categories[0] ?? "");

  React.useEffect(() => {
    const id = setTimeout(
      () => setDebouncedQuery(search.trim().toLowerCase()),
      200,
    );
    return () => clearTimeout(id);
  }, [search]);

  const select = (sectionId: string, category = "") => {
    setSection(sectionId);
    setActiveCategory(category);
    setSearch("");
    setNavOpen(false);
  };

  const selectKind = (next: VariantKind) => {
    if (next === kind && !search) return;
    const target = sections.find((s) => kindOf(s.id) === next);
    if (target) select(target.id);
  };

  const kindCount = (k: VariantKind) =>
    sections
      .filter((s) => kindOf(s.id) === k)
      .reduce((n, s) => n + s.variants.length, 0);

  const query = debouncedQuery;
  // Search spans every kind; browsing shows one category of one section.
  const results = query
    ? sections.flatMap((s) =>
        s.variants
          .filter(
            (v) =>
              v.name.toLowerCase().includes(query) ||
              v.description.toLowerCase().includes(query) ||
              v.category.toLowerCase().includes(query),
          )
          .map((v) => ({ ...v, kind: kindOf(s.id) })),
      )
    : activeSection.variants
        .filter((v) => v.category === resolvedCategory)
        .map((v) => ({ ...v, kind }));
  // Search results mix categories, so they keep the multi-column grid.
  const wide = !query && WIDE_CATEGORIES.has(resolvedCategory);
  const categoryDocs = !query ? results.find((v) => v.docsUrl)?.docsUrl : null;

  const nav = (
    <ExploreNav
      activeCategory={query ? "" : resolvedCategory}
      activeSection={activeSection.id}
      kind={kind}
      onSelect={select}
      sections={sections}
    />
  );

  return (
    <div className="lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:gap-8">
      {/* The column stretches to the grid's height so its rule runs to the
          section end; only the inner list is sticky. */}
      <aside className="hidden border-e lg:block">
        <div className="no-scrollbar sticky top-[calc(var(--header-height)+0.75rem+1px)] max-h-[calc(100svh-var(--header-height)-1.5rem)] overflow-y-auto py-8 pe-4">
          {nav}
        </div>
      </aside>

      <div className="min-w-0 pt-6 pb-16 md:pb-24 lg:pt-8">
        {/* Toolbar — sticky under the header while browsing (md+). */}
        <div className="relative z-20 mb-8 rounded-2xl border bg-frame/90 p-1 backdrop-blur-xl md:sticky md:top-[calc(var(--header-height)+0.75rem+1px)]">
          <div className="flex flex-wrap items-center gap-1">
            <Sheet onOpenChange={setNavOpen} open={navOpen}>
              <SheetTrigger
                aria-label="Browse categories"
                className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-background hover:text-foreground lg:hidden"
              >
                <PanelLeftIcon className="size-4" />
              </SheetTrigger>
              <SheetPopup className="max-w-72" side="left">
                <SheetTitle className="sr-only">Browse categories</SheetTitle>
                <SheetPanel className="pt-6">{nav}</SheetPanel>
              </SheetPopup>
            </Sheet>

            <div aria-label="Library" className="flex gap-0.5" role="group">
              {KINDS.map((k) => {
                const active = !search && kind === k.id;
                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      "flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 font-medium text-[13px] transition-colors duration-150",
                      active
                        ? "bg-background text-foreground shadow-xs/5 ring-1 ring-border dark:bg-card dark:ring-border-strong"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    key={k.id}
                    onClick={() => selectKind(k.id)}
                    type="button"
                  >
                    {k.label}
                    <span className="font-mono text-[11px] text-faint tabular-nums">
                      {kindCount(k.id)}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="flex h-8 min-w-48 flex-1 items-center gap-2 rounded-lg border bg-background px-2.5 transition-colors focus-within:border-border-strong focus-within:ring-2 focus-within:ring-ring md:ms-auto md:max-w-80">
              <SearchIcon className="size-3.5 shrink-0 text-muted-foreground" />
              <input
                aria-label="Search all variants"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground/70"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearch("")}
                placeholder="Search core, motion and charts…"
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
        </div>

        {/* Heading for what's on screen */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div className="min-w-0">
            <p className="font-mono text-[12px] text-faint lowercase">
              {search
                ? `// search · ${results.length} results`
                : `// ${kind}${kind === "motion" ? ` / ${activeSection.label}` : ""} · ${results.length} variants`}
            </p>
            <h2 className="mt-1.5 font-heading font-semibold text-[24px] text-foreground tracking-[-0.035em] md:text-[28px]">
              {search ? (
                <>&ldquo;{search}&rdquo;</>
              ) : (
                titleCase(resolvedCategory)
              )}
            </h2>
            {!search ? (
              <p className="mt-1 text-[14px] text-muted-foreground">
                {kindInfo?.lead}
              </p>
            ) : null}
          </div>
          {categoryDocs ? (
            <Link
              className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 font-medium text-[13px] text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-foreground"
              href={categoryDocs}
            >
              Read the docs
              <ArrowUpRightIcon className="size-3.5" />
            </Link>
          ) : null}
        </div>

        {/* Variant grid */}
        <div
          className={cn("grid grid-cols-1 gap-4", !wide && "lg:grid-cols-2")}
        >
          {results.length > 0 ? (
            results.map((variant) => (
              <VariantCard
                description={variant.description}
                docsUrl={variant.docsUrl}
                key={variant.name}
                kind={variant.kind}
                name={variant.name}
                showKind={!!query}
              />
            ))
          ) : (
            <p className="col-span-full rounded-2xl border bg-dots py-16 text-center text-[14px] text-muted-foreground">
              No variants found for &ldquo;{search}&rdquo;.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ExploreNav({
  sections,
  kind,
  activeSection,
  activeCategory,
  onSelect,
}: {
  sections: ShowcaseGroup[];
  kind: VariantKind;
  activeSection: string;
  activeCategory: string;
  onSelect: (section: string, category: string) => void;
}) {
  const visible = sections.filter((s) => kindOf(s.id) === kind);
  return (
    <nav aria-label="Variant categories" className="space-y-6">
      {visible.map((s) => (
        <div key={s.id}>
          <p className="mb-1.5 flex items-center justify-between px-2.5 font-mono text-[11px] text-faint lowercase">
            <span>{`// ${s.label}`}</span>
            <span className="tabular-nums">{s.variants.length}</span>
          </p>
          <ul className="space-y-px">
            {s.categories.map((cat) => {
              const active = activeSection === s.id && activeCategory === cat;
              const count = s.variants.filter((v) => v.category === cat).length;
              return (
                <li key={cat}>
                  <button
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-8 w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2.5 text-start text-[13px] transition-colors duration-150",
                      active
                        ? "bg-accent text-foreground ring-1 ring-border before:absolute before:inset-y-2 before:-left-px before:w-0.5 before:rounded-full before:bg-signal"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    onClick={() => onSelect(s.id, cat)}
                    type="button"
                  >
                    <span className="truncate">{titleCase(cat)}</span>
                    <span className="font-mono text-[11px] text-faint tabular-nums">
                      {count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

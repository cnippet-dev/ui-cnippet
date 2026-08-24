import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The homepage reads as a numbered document. Every rail prints
 * `index / TOTAL` so the reader always knows where they are and how much is
 * left. Bump this if you add or remove a section.
 */
export const SECTION_TOTAL = "07";

/**
 * Surface tones carry meaning, not decoration. Two of them are *named* — a
 * section the reader should be able to recognise by its colour alone while
 * scrolling:
 *   core    — Install, indigo. The one-command setup, the design-system spine.
 *   wire    — Blocks, amber. Tier 2: the ready-made pages layer.
 *   default — supporting sections.
 *   muted   — secondary sections with no identity of their own.
 *
 * The hue lives in the *edges* — the sticky rail, the left bar and the top
 * hairline — never in the body. Tinting the whole band made long stretches of
 * coloured page and drowned the content; the reading surface stays white in
 * every section, and the colour does its work at the boundaries.
 */
export type SectionTone = "core" | "wire" | "orbit" | "default" | "muted";

const TONE_SURFACE: Record<SectionTone, string> = {
  core: "bg-background",
  default: "bg-background",
  muted: "bg-muted/40 dark:bg-muted/20",
  orbit: "bg-background",
  wire: "bg-background",
};

const RAIL_SURFACE: Record<SectionTone, string> = {
  core: "bg-[var(--surface-core-rail)]",
  default: "bg-muted/90 dark:bg-muted/60",
  muted: "bg-muted/90 dark:bg-muted/60",
  orbit: "bg-[var(--surface-orbit-rail)]",
  wire: "bg-[var(--surface-wire-rail)]",
};

/** The left bar + top hairline that carry a named section's hue. */
const TONE_EDGE: Partial<Record<SectionTone, { bar: string; line: string }>> = {
  core: { bar: "bg-cnippet-indigo", line: "bg-[var(--border-core)]" },
  orbit: { bar: "bg-cnippet-yellow", line: "bg-[var(--border-orbit)]" },
  wire: { bar: "bg-cnippet-green", line: "bg-[var(--border-wire)]" },
};

type SectionProps = {
  children: ReactNode;
  className?: string;
  id: string;
  tone?: SectionTone;
};

/**
 * A homepage section. Sections stack vertically and are separated by a single
 * hairline rule — no cards, no shadows, no rounded corners.
 */
export function Section({
  children,
  className,
  id,
  tone = "default",
}: SectionProps) {
  const edge = TONE_EDGE[tone];

  return (
    <section
      // scroll-mt clears the 56px navbar + the 44px sticky rail.
      className={cn(
        "relative scroll-mt-28 border-b border-dashed",
        TONE_SURFACE[tone],
        className,
      )}
      id={id}
    >
      {edge ? (
        <>
          {edge.bar ? (
            <span
              aria-hidden="true"
              className={cn("absolute inset-y-0 left-0 w-1", edge.bar)}
            />
          ) : null}
          {/* A solid top hairline in the band's own hue, so its upper edge is
              defined even where the surface tint is subtle. */}
          <span
            aria-hidden="true"
            className={cn("absolute inset-x-0 top-0 h-px", edge.line)}
          />
        </>
      ) : null}
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  className?: string;
  index: string;
  meta?: string;
  title: string;
  tone?: SectionTone;
  /**
   * Denominator for the `index / total` counter. Defaults to the homepage's
   * SECTION_TOTAL. Any other page that numbers its sections must pass its own,
   * or the rail will tell the reader there are seven sections when there are
   * five.
   */
  total?: string;
};

/**
 * The sticky orientation rail. Deliberately NOT the page background — it is a
 * raised, blurred surface with its own top and bottom hairline, so it reads as
 * a marker rather than as another divider.
 */
export function SectionHeader({
  className,
  index,
  meta,
  title,
  tone = "default",
  total = SECTION_TOTAL,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "sticky top-14 z-40 flex items-center gap-3 border-y border-dashed px-5 py-3 backdrop-blur-md sm:gap-4 sm:px-8",
        RAIL_SURFACE[tone],
        className,
      )}
    >
      <span className="font-mono text-[12px] tabular-nums tracking-[0.14em]">
        <span className="text-cnippet-accent">{index}</span>
        <span className="text-muted-foreground">/{total}</span>
      </span>

      <span aria-hidden="true" className="h-3 w-px bg-border" />

      <h2 className="font-mono text-[12px] text-foreground uppercase tracking-[0.16em]">
        {title}
      </h2>

      {meta ? (
        <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground uppercase tracking-[0.16em] sm:inline">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

type SectionBodyProps = {
  children: ReactNode;
  className?: string;
};

export function SectionBody({ children, className }: SectionBodyProps) {
  return (
    <div className={cn("px-5 py-10 sm:px-8 sm:py-14", className)}>
      {children}
    </div>
  );
}

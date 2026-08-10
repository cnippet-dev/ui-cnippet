import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * A homepage section. Sections stack vertically and are separated by a single
 * hairline rule — no cards, no shadows, no rounded corners.
 */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section className={cn("border-b border-dashed", className)} id={id}>
      {children}
    </section>
  );
}

type SectionHeaderProps = {
  className?: string;
  index: string;
  meta?: string;
  title: string;
};

/**
 * The mono rail that opens every section: `01  WHAT IS CNIPPET` on the left,
 * optional meta pushed to the right edge.
 */
export function SectionHeader({
  className,
  index,
  meta,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        // Sticks just below the sticky navbar (h-14) while its section is in view.
        "sticky top-14 z-40 flex items-center gap-3 border-b border-dashed bg-background px-5 py-4 sm:gap-4 sm:px-8",
        className,
      )}
    >
      <span className="font-mono text-[11px] text-cnippet-accent tabular-nums tracking-[0.18em]">
        {index}
      </span>
      <h2 className="font-mono text-[11px] text-foreground uppercase tracking-[0.18em]">
        {title}
      </h2>
      {meta ? (
        <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground tracking-[0.18em] sm:inline">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

type SectionBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionBody({ children, className }: SectionBodyProps) {
  return (
    <div className={cn("px-5 py-10 sm:px-8 sm:py-14", className)}>
      {children}
    </div>
  );
}

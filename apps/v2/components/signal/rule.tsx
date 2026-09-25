import { cn } from "@/lib/utils";

/**
 * A full-width hairline with square nodes where it crosses the <EdgeLines />
 * — the registration marks that separate sections.
 */
export function Rule({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative z-1 h-px w-full bg-border", className)}
    >
      <Nodes />
    </div>
  );
}

/** Just the two nodes, for hairlines drawn by something else (a border-t). */
export function Nodes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-1 hidden xl:block",
        className,
      )}
    >
      <div className="relative mx-auto max-w-(--container)">
        <span className="absolute top-0 left-0 size-1.75 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-border-strong bg-background" />
        <span className="absolute top-0 right-0 size-1.75 translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-border-strong bg-background" />
      </div>
    </div>
  );
}

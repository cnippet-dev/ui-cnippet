import { cn } from "@/lib/utils";

export function ParticleCardContainer({
  children,
  className,
  footer,
}: {
  children: React.ReactNode;
  className?: string;
  footer: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "after:-inset-[5px] after:-z-1 relative flex min-w-0 flex-col rounded-xl border bg-muted/50 bg-clip-padding before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_2px_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:rounded-[calc(var(--radius-xl)+4px)] after:border after:border-border/50 after:bg-clip-padding dark:after:bg-background/72",
        className,
      )}
    >
      <div className="-m-px flex min-h-50 min-w-0 flex-1 flex-col flex-wrap items-center justify-center overflow-x-auto rounded-t-xl rounded-b-lg border bg-background p-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-xl)-1px)] lg:px-8 lg:py-12 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]">
        {children}
      </div>
      <div className="flex items-center gap-3 rounded-b-xl p-2">{footer}</div>
    </div>
  );
}

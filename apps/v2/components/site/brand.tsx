import { PrefetchLink } from "@/components/prefetch-link";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Brand({ className }: { className?: string }) {
  return (
    <PrefetchLink
      aria-label="Cnippet UI home"
      className={cn(
        "group/brand flex shrink-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      href="/"
    >
      <span className="inset-shadow-[0_1px_--theme(--color-white/16%)] flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs transition-transform duration-250 ease-out-expo group-hover/brand:-rotate-6">
        <Logo className="size-4.5" />
      </span>
      <span className="font-semibold text-[15px] text-foreground tracking-[-0.03em]">
        cnippet
        <span className="ms-0.5 font-mono font-normal text-[12px] text-faint tracking-normal">
          /ui
        </span>
      </span>
    </PrefetchLink>
  );
}

"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type DocsTopBarProps = {
  previous?: { url: string; name?: React.ReactNode } | null;
  next?: { url: string; name?: React.ReactNode } | null;
};

export function DocsTopBar({ previous, next }: DocsTopBarProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div
      className="sticky top-14 z-40 border-y border-dashed bg-muted/95 backdrop-blur-md dark:bg-muted/60"
      data-slot="docs-topbar"
    >
      <div className="flex h-full min-w-0 items-center justify-between gap-3 px-5 py-2 sm:px-8">
        <div className="flex min-w-0 items-center gap-1.5 font-mono text-[12px] text-muted-foreground uppercase tracking-[0.14em]">
          {segments.map((seg, i) => (
            <span className="flex items-center gap-1.5" key={i}>
              {i > 0 && <span className="text-muted-foreground/40">/</span>}
              <span
                className={cn(
                  i === segments.length - 1 ? "text-foreground" : "",
                )}
              >
                {seg.replace(/-/g, " ")}
              </span>
            </span>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span
            aria-hidden="true"
            className="hidden h-3 w-px bg-border sm:inline-block"
          />
          {previous && (
            <Link
              className="inline-flex size-7 items-center justify-center rounded-[2px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href={previous.url}
            >
              <ArrowLeft className="size-3.5" />
              <span className="sr-only">Previous</span>
            </Link>
          )}
          {next && (
            <Link
              className="inline-flex size-7 items-center justify-center rounded-[2px] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href={next.url}
            >
              <ArrowRight className="size-3.5" />
              <span className="sr-only">Next</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

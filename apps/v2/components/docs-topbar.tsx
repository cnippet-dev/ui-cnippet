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
      className="sticky top-14 z-40 h-(--docs-topbar-height) border-b border-dashed bg-background/95 backdrop-blur-sm"
      data-slot="docs-topbar"
    >
      <div className="flex h-full min-w-0 items-center justify-between gap-3 px-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-1 font-mono text-muted-foreground text-xs">
          {segments.map((seg, i) => (
            <span className="flex items-center gap-1" key={i}>
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
        <div className="flex shrink-0 items-center gap-1">
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

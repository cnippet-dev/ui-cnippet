"use client";

import { ArrowLeft, ArrowRight, PanelLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DocsNav, type PageTree } from "@/components/docs-sidebar";
import { PrefetchLink } from "@/components/prefetch-link";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

type DocsTopBarProps = {
  next?: { url: string; name?: React.ReactNode } | null;
  previous?: { url: string; name?: React.ReactNode } | null;
  tree: PageTree;
};

const iconButton =
  "inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground";

/**
 * Sticky bar at the top of the docs canvas: mobile nav trigger, the path as a
 * mono breadcrumb, and prev/next.
 */
export function DocsTopBar({ next, previous, tree }: DocsTopBarProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [open, setOpen] = useState(false);

  return (
    <div
      className="sticky top-(--header-height) z-30 flex h-(--docs-topbar-height) items-center gap-2 border-b bg-background/85 px-3 backdrop-blur-xl md:rounded-t-canvas md:px-4"
      data-slot="docs-topbar"
    >
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger
          aria-label="Open docs navigation"
          className={cn(iconButton, "lg:hidden")}
        >
          <PanelLeft className="size-4" />
        </SheetTrigger>
        <SheetPopup className="max-w-72" side="left">
          <SheetTitle className="sr-only">Docs navigation</SheetTitle>
          <SheetPanel className="pt-6">
            <DocsNav onNavigate={() => setOpen(false)} tree={tree} />
          </SheetPanel>
        </SheetPopup>
      </Sheet>

      <ol className="flex min-w-0 items-center gap-1.5 font-mono text-[12px] text-faint lowercase">
        {segments.map((seg, i) => (
          <li className="flex min-w-0 items-center gap-1.5" key={`${i}-${seg}`}>
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            <span
              className={cn(
                "truncate",
                i === segments.length - 1 && "text-foreground",
              )}
            >
              {seg.replace(/-/g, " ")}
            </span>
          </li>
        ))}
      </ol>

      <div className="ms-auto flex shrink-0 items-center gap-0.5">
        {previous ? (
          <PrefetchLink className={iconButton} href={previous.url}>
            <ArrowLeft className="size-3.5" />
            <span className="sr-only">Previous</span>
          </PrefetchLink>
        ) : null}
        {next ? (
          <PrefetchLink className={iconButton} href={next.url}>
            <ArrowRight className="size-3.5" />
            <span className="sr-only">Next</span>
          </PrefetchLink>
        ) : null}
      </div>
    </div>
  );
}

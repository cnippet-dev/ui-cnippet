"use client";

import { CopyIcon, PencilIcon } from "lucide-react";
import { useRef } from "react";
import { ScrollDirectionHeader } from "@/registry/default/motion/scroll-direction-header";

export default function ScrollDirectionHeaderDocsToolbar() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-96 w-full overflow-y-auto" ref={containerRef}>
      {/* Stays while reading down; slides away when scrolling back up. */}
      <ScrollDirectionHeader
        className="border-b bg-background/90 backdrop-blur"
        containerRef={containerRef}
        hideOn="up"
      >
        <div className="mx-auto flex h-11 max-w-2xl items-center justify-between px-6 text-sm">
          <span className="text-muted-foreground">
            Docs / Guides / <span className="text-foreground">Deploying</span>
          </span>
          <div className="flex gap-1">
            <button
              aria-label="Copy page link"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              type="button"
            >
              <CopyIcon className="size-4" />
            </button>
            <button
              aria-label="Edit this page"
              className="flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
              type="button"
            >
              <PencilIcon className="size-4" />
            </button>
          </div>
        </div>
      </ScrollDirectionHeader>
      <article className="mx-auto max-w-2xl space-y-4 px-6 py-8">
        <h3 className="font-bold text-2xl text-foreground">Deploying</h3>
        {Array.from({ length: 8 }, (_, i) => (
          <p className="text-muted-foreground" key={i}>
            Push to your main branch and every commit builds a preview. Promote
            a preview to production when the checks pass.
          </p>
        ))}
      </article>
    </div>
  );
}

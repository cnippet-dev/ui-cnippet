"use client";

import { useRef } from "react";
import { ScrollDirectionHeader } from "@/registry/default/motion/scroll-direction-header";

const paragraphs = Array.from({ length: 8 }, (_, i) => i);

export default function ScrollDirectionHeaderSite() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-96 w-full overflow-y-auto" ref={containerRef}>
      <ScrollDirectionHeader
        className="border-b bg-background/80 backdrop-blur"
        containerRef={containerRef}
      >
        <nav className="mx-auto flex h-14 max-w-2xl items-center justify-between px-6">
          <a className="font-semibold text-foreground" href="#top">
            Northwind
          </a>
          <div className="flex gap-5 text-muted-foreground text-sm">
            <a href="#product">Product</a>
            <a href="#pricing">Pricing</a>
            <a href="#blog">Blog</a>
          </div>
        </nav>
      </ScrollDirectionHeader>
      <article className="mx-auto max-w-2xl space-y-4 px-6 py-10">
        <h3 className="font-bold text-2xl text-foreground">
          Scroll down to hide the header, up to bring it back
        </h3>
        {paragraphs.map((i) => (
          <p className="text-muted-foreground" key={i}>
            The header gets out of the way while you read and comes back the
            moment you scroll up, so navigation is always one flick away.
          </p>
        ))}
      </article>
    </div>
  );
}

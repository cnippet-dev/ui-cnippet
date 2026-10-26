"use client";

import { useRef } from "react";
import { ScrollImageReveal } from "@/registry/default/motion/scroll-image-reveal";

export default function ScrollImageRevealCaseStudy() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-6"
      ref={containerRef}
    >
      <div className="mx-auto max-w-2xl py-16">
        <p className="font-medium text-muted-foreground text-sm">Case study</p>
        <h3 className="mt-1 font-bold text-3xl text-foreground tracking-tight">
          Rebuilding booking for Alpine Huts
        </h3>
        <p className="mt-3 text-muted-foreground">
          Scroll to reveal the cover. Bookings went up 38% in the first season
          after the redesign.
        </p>
        <div className="h-40" />
        <ScrollImageReveal
          alt="Mountain range at sunset"
          className="aspect-video rounded-2xl"
          containerRef={containerRef}
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=675&fit=crop&dpr=2&q=80"
        />
        <div className="h-48" />
      </div>
    </div>
  );
}

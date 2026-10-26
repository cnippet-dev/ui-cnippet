"use client";

import { useRef } from "react";
import { ScrollImageReveal } from "@/registry/default/motion/scroll-image-reveal";

export default function ScrollImageRevealCircle() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-96 w-full overflow-y-auto" ref={containerRef}>
      <div className="flex h-64 items-end justify-center pb-8 text-center">
        <h3 className="font-bold text-4xl text-foreground tracking-tight">
          Chase the light
        </h3>
      </div>
      <ScrollImageReveal
        alt="Northern lights over a snowy landscape"
        className="h-96 w-full"
        containerRef={containerRef}
        offset={["start end", "end end"]}
        shape="circle"
        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1400&h=800&fit=crop&dpr=2&q=80"
      />
      <p className="py-16 text-center text-muted-foreground">
        Arctic photo tours · Winter 2025
      </p>
    </div>
  );
}

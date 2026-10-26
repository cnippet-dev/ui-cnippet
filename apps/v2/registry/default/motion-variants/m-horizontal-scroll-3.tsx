"use client";

import { useRef } from "react";
import { HorizontalScroll } from "@/registry/default/motion/horizontal-scroll";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=560&fit=crop&dpr=2&q=80`;

const gallery = [
  ["Northern lights", "1531366936337-7c912a4589a7"],
  ["Meadow", "1500530855697-b586d89ba3ee"],
  ["Lake", "1470071459604-3b5ec3a7fe05"],
  ["Valley", "1501785888041-af3ef285b470"],
  ["Skyline", "1449824913935-59a10b8d2000"],
  ["Coast", "1505142468610-359e7d316be0"],
];

export default function HorizontalScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-96 w-full overflow-y-auto" ref={containerRef}>
      <HorizontalScroll
        containerRef={containerRef}
        panelClassName="h-96"
        speed={1.5}
      >
        {gallery.map(([alt, id]) => (
          <figure className="w-48 shrink-0" key={id}>
            <img
              alt={alt}
              className="aspect-5/7 w-full rounded-xl object-cover"
              src={photo(id ?? "")}
            />
            <figcaption className="mt-2 text-muted-foreground text-xs">
              {alt}
            </figcaption>
          </figure>
        ))}
      </HorizontalScroll>
    </div>
  );
}

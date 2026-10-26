"use client";

import { useRef } from "react";
import { ScrollImageReveal } from "@/registry/default/motion/scroll-image-reveal";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=800&fit=crop&dpr=2&q=80`;

const tiles = [
  { alt: "Forest path", direction: "left", id: "1441974231531-c6227db76b6e" },
  { alt: "Ocean waves", direction: "up", id: "1505142468610-359e7d316be0" },
  {
    alt: "Desert valley",
    direction: "right",
    id: "1509316785289-025f5b846b35",
  },
] as const;

export default function ScrollImageRevealGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-6"
      ref={containerRef}
    >
      <div className="mx-auto max-w-2xl py-16">
        <h3 className="font-bold text-2xl text-foreground tracking-tight">
          Three ways to spend a weekend
        </h3>
        <div className="h-48" />
        <div className="grid grid-cols-3 gap-3">
          {tiles.map((tile) => (
            <ScrollImageReveal
              alt={tile.alt}
              className="aspect-3/4 rounded-xl"
              containerRef={containerRef}
              direction={tile.direction}
              key={tile.id}
              src={photo(tile.id)}
            />
          ))}
        </div>
        <div className="h-48" />
      </div>
    </div>
  );
}

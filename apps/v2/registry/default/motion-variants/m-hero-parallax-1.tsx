"use client";

import { useRef } from "react";
import { HeroParallax } from "@/registry/default/motion/hero-parallax";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=448&fit=crop&dpr=2&q=80`;

const work = [
  ["Summit", "1506905925346-21bda4d32df4"],
  ["Tidal", "1505142468610-359e7d316be0"],
  ["Canopy", "1441974231531-c6227db76b6e"],
  ["Metro", "1477959858617-67f85cf4f1df"],
  ["Dune", "1509316785289-025f5b846b35"],
  ["Aurora", "1531366936337-7c912a4589a7"],
  ["Ridge", "1501785888041-af3ef285b470"],
  ["Lakeside", "1470071459604-3b5ec3a7fe05"],
  ["Skyline", "1449824913935-59a10b8d2000"],
].map(([title, id]) => ({
  link: "#",
  thumbnail: photo(id ?? ""),
  title: title ?? "",
}));

export default function HeroParallaxPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      <HeroParallax containerRef={containerRef} distance={400} products={work}>
        <h3 className="font-bold text-4xl text-foreground tracking-tight">
          Selected work
        </h3>
        <p className="mt-2 max-w-md text-muted-foreground">
          Brand and product design for teams who care about the details.
        </p>
      </HeroParallax>
    </div>
  );
}

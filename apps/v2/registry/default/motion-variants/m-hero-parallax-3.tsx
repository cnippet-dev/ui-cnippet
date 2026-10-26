"use client";

import { useRef } from "react";
import { HeroParallax } from "@/registry/default/motion/hero-parallax";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=448&fit=crop&dpr=2&q=80`;

const shots = [
  ["Northern lights", "1531366936337-7c912a4589a7"],
  ["Peak", "1506905925346-21bda4d32df4"],
  ["Coast", "1505142468610-359e7d316be0"],
  ["Forest", "1441974231531-c6227db76b6e"],
  ["Valley", "1501785888041-af3ef285b470"],
  ["Lake", "1470071459604-3b5ec3a7fe05"],
  ["Dunes", "1509316785289-025f5b846b35"],
  ["Meadow", "1500530855697-b586d89ba3ee"],
  ["Night city", "1477959858617-67f85cf4f1df"],
].map(([title, id]) => ({
  link: "#",
  thumbnail: photo(id ?? ""),
  title: title ?? "",
}));

export default function HeroParallaxDepth() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      {/* Rows move at different speeds, so they read as separate depths. */}
      <HeroParallax
        containerRef={containerRef}
        distance={300}
        products={shots}
        rowSpeeds={[0.5, 1, 1.6]}
      >
        <h3 className="font-bold text-4xl text-foreground tracking-tight">
          Field notes, 2024
        </h3>
        <p className="mt-2 text-muted-foreground">
          A year of landscapes from six continents.
        </p>
      </HeroParallax>
    </div>
  );
}

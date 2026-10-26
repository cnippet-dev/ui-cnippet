"use client";

import { useRef } from "react";
import { HeroParallax } from "@/registry/default/motion/hero-parallax";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=640&h=448&fit=crop&dpr=2&q=80`;

const templates = [
  ["Travel blog", "1500530855697-b586d89ba3ee"],
  ["Surf shop", "1505142468610-359e7d316be0"],
  ["City guide", "1477959858617-67f85cf4f1df"],
  ["Hiking club", "1501785888041-af3ef285b470"],
  ["Photo studio", "1531366936337-7c912a4589a7"],
  ["Camp booking", "1470071459604-3b5ec3a7fe05"],
  ["Desert tours", "1509316785289-025f5b846b35"],
  ["Real estate", "1449824913935-59a10b8d2000"],
].map(([title, id]) => ({
  link: "#",
  thumbnail: photo(id ?? ""),
  title: title ?? "",
}));

export default function HeroParallaxTemplates() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      <HeroParallax
        containerRef={containerRef}
        distance={300}
        products={templates}
        rows={2}
      >
        <p className="font-medium text-muted-foreground text-sm">
          120+ templates
        </p>
        <h3 className="mt-1 font-bold text-4xl text-foreground tracking-tight">
          Start from a finished site
        </h3>
      </HeroParallax>
    </div>
  );
}

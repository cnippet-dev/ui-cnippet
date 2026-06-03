//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const CHANGELOG = [
  {
    date: "Jun 2026",
    items: [
      "Redesigned command palette",
      "New chart variants",
      "Dark mode improvements",
    ],
    tag: "v2.4.0",
    tagColor: "bg-emerald-500",
  },
  {
    date: "Apr 2026",
    items: [
      "Base UI migration complete",
      "New autocomplete component",
      "Bug fixes",
    ],
    tag: "v2.3.0",
    tagColor: "bg-blue-500",
  },
  {
    date: "Feb 2026",
    items: [
      "Carousel with thumbnails",
      "Accordion multi-mode",
      "Performance improvements",
    ],
    tag: "v2.2.0",
    tagColor: "bg-violet-500",
  },
  {
    date: "Dec 2025",
    items: ["Initial stable release", "30+ components", "CLI installer"],
    tag: "v2.0.0",
    tagColor: "bg-amber-500",
  },
];

export default function Particle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {CHANGELOG.map((release, i) => (
            <div
              className="min-w-[220px] shrink-0 rounded-xl border bg-card p-4"
              key={i}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-bold text-[10px] text-white",
                    release.tagColor,
                  )}
                >
                  {release.tag}
                </span>
                <span className="text-muted-foreground text-xs">
                  {release.date}
                </span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {release.items.map((item) => (
                  <li className="text-xs" key={item}>
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5">
        {CHANGELOG.map((_, i) => (
          <button
            aria-label={`Scroll to ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected
                ? "w-5 bg-primary"
                : "w-1.5 bg-muted-foreground/30",
            )}
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

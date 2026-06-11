//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const MEDIA = [
  {
    bg: "from-violet-400 to-indigo-600",
    caption: "Brand identity refresh",
    type: "Image",
  },
  {
    bg: "from-sky-400 to-cyan-600",
    caption: "Product launch 2026",
    type: "Video",
  },
  {
    bg: "from-rose-400 to-pink-600",
    caption: "Social media kit",
    type: "Image",
  },
  {
    bg: "from-amber-400 to-orange-500",
    caption: "Campaign assets",
    type: "Image",
  },
  { bg: "from-emerald-400 to-teal-600", caption: "Demo reel", type: "Video" },
];

export default function Particle() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {MEDIA.map((item, i) => (
            <CarouselItem key={i}>
              <div
                className={cn(
                  "relative flex h-48 items-end rounded-xl bg-linear-to-br p-4",
                  item.bg,
                )}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="w-fit rounded-md bg-black/30 px-2 py-0.5 font-medium text-[10px] text-white">
                    {item.type}
                  </span>
                  <span className="font-semibold text-sm text-white drop-shadow">
                    {item.caption}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex items-center justify-between px-1 text-muted-foreground text-xs">
        <span>
          {current + 1} of {count}
        </span>
        <div className="flex gap-1">
          {MEDIA.map((_, i) => (
            <span
              className={cn(
                "block h-1 rounded-full transition-all",
                i === current
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30",
              )}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

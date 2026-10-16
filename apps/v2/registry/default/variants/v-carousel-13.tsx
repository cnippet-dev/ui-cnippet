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
    bg: "from-chart-1/32 to-chart-1/4",
    caption: "Brand identity refresh",
    type: "Image",
  },
  {
    bg: "from-chart-2/32 to-chart-2/4",
    caption: "Product launch 2026",
    type: "Video",
  },
  {
    bg: "from-chart-3/32 to-chart-3/4",
    caption: "Social media kit",
    type: "Image",
  },
  {
    bg: "from-chart-4/32 to-chart-4/4",
    caption: "Campaign assets",
    type: "Image",
  },
  { bg: "from-chart-5/32 to-chart-5/4", caption: "Demo reel", type: "Video" },
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
                  <span className="w-fit rounded-md bg-background/80 px-2 py-0.5 font-medium text-[10px] text-foreground">
                    {item.type}
                  </span>
                  <span className="font-semibold text-foreground text-sm">
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

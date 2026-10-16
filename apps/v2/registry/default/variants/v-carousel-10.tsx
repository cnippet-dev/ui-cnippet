"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/registry/default/ui/carousel";

const GALLERY = [
  { bg: "from-chart-1/32 to-chart-1/4", id: 1, label: "Mountain Sunset" },
  { bg: "from-chart-2/32 to-chart-2/4", id: 2, label: "Ocean Waves" },
  { bg: "from-chart-3/32 to-chart-3/4", id: 3, label: "Forest Path" },
  { bg: "from-chart-4/32 to-chart-4/4", id: 4, label: "City Lights" },
  { bg: "from-chart-5/32 to-chart-5/4", id: 5, label: "Desert Dunes" },
  { bg: "from-chart-1/32 to-chart-1/4", id: 6, label: "Northern Lights" },
];

export default function Particle() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      const idx = api.selectedScrollSnap();
      setSelected(idx);
      thumbApi?.scrollTo(idx);
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, thumbApi]);

  return (
    <div className="w-full max-w-sm space-y-2">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {GALLERY.map((item) => (
            <CarouselItem key={item.id}>
              <div
                className={cn(
                  "relative flex h-52 flex-col items-center justify-end rounded-xl border bg-linear-to-br pb-4 text-foreground",
                  item.bg,
                )}
              >
                <p className="font-medium text-sm">{item.label}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="overflow-hidden" ref={thumbRef}>
        <div className="flex gap-2 px-px py-1">
          {GALLERY.map((item, i) => (
            <button
              aria-label={`View ${item.label}`}
              className={cn(
                "shrink-0 rounded-lg transition-all duration-200",
                selected === i
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-50 hover:opacity-80",
              )}
              key={item.id}
              onClick={() => api?.scrollTo(i)}
              type="button"
            >
              <div
                className={cn("h-12 w-16 rounded-lg bg-linear-to-br", item.bg)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

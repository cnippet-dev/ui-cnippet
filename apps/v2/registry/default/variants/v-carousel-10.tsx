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
  { id: "1506905925346-21bda4d32df4", label: "Mountain Sunset" },
  { id: "1505142468610-359e7d316be0", label: "Ocean Waves" },
  { id: "1441974231531-c6227db76b6e", label: "Forest Path" },
  { id: "1477959858617-67f85cf4f1df", label: "City Lights" },
  { id: "1509316785289-025f5b846b35", label: "Desert Valley" },
  { id: "1531366936337-7c912a4589a7", label: "Northern Lights" },
];

function photo(id: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${id}?w=${width}&h=${height}&fit=crop&dpr=2&q=80`;
}

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
              <figure className="relative h-52 overflow-hidden rounded-xl border bg-muted">
                <img
                  alt={item.label}
                  className="size-full object-cover"
                  src={photo(item.id, 400, 208)}
                />
                {/* Scrim keeps the caption legible on any photo. */}
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-4 pt-8 pb-3 font-medium text-sm text-white">
                  {item.label}
                </figcaption>
              </figure>
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
              <img
                alt=""
                className="h-12 w-16 rounded-lg bg-muted object-cover"
                src={photo(item.id, 64, 48)}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// title: Media gallery carousel with caption badge and progress dots
"use client";

import { PlayIcon } from "lucide-react";
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

type Media = {
  caption: string;
  duration?: string;
  id: string;
  type: "Image" | "Video";
};

const MEDIA: Media[] = [
  {
    caption: "Lake retreat — campaign hero",
    id: "1501785888041-af3ef285b470",
    type: "Image",
  },
  {
    caption: "Highlands drone footage",
    duration: "0:42",
    id: "1470071459604-3b5ec3a7fe05",
    type: "Video",
  },
  {
    caption: "Downtown — social kit",
    id: "1449824913935-59a10b8d2000",
    type: "Image",
  },
  {
    caption: "Road trip — billboard",
    id: "1500530855697-b586d89ba3ee",
    type: "Image",
  },
  {
    caption: "Coastline demo reel",
    duration: "1:15",
    id: "1505142468610-359e7d316be0",
    type: "Video",
  },
];

export default function Particle() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    setCount(api.scrollSnapList().length);
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {MEDIA.map((item) => (
            <CarouselItem key={item.id}>
              <figure className="relative h-48 overflow-hidden rounded-xl bg-muted">
                <img
                  alt={item.caption}
                  className="size-full object-cover"
                  src={`https://images.unsplash.com/photo-${item.id}?w=400&h=192&fit=crop&dpr=2&q=80`}
                />
                {item.type === "Video" && (
                  <span className="absolute inset-0 m-auto flex size-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <PlayIcon
                      aria-hidden="true"
                      className="ms-0.5 size-5 fill-current"
                    />
                  </span>
                )}
                {/* Scrim keeps the caption legible on any photo. */}
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-linear-to-t from-black/70 to-transparent px-4 pt-10 pb-3 text-white">
                  <span className="flex items-center gap-1.5">
                    <span className="rounded-md bg-white/20 px-2 py-0.5 font-medium text-[10px] backdrop-blur-sm">
                      {item.type}
                    </span>
                    {item.duration && (
                      <span className="font-medium text-[11px] text-white/80 tabular-nums">
                        {item.duration}
                      </span>
                    )}
                  </span>
                  <span className="font-semibold text-sm">{item.caption}</span>
                </figcaption>
              </figure>
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
          {MEDIA.map((item, i) => (
            <span
              className={cn(
                "block h-1 rounded-full transition-all",
                i === current
                  ? "w-4 bg-primary"
                  : "w-1.5 bg-muted-foreground/30",
              )}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

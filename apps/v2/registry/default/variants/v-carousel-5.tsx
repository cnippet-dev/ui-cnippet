// title: Autoplay with Indicators
//biome-ignore-all lint/suspicious/noArrayIndexKey:<>

"use client";

import useEmblaCarousel from "embla-carousel-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    bg: "from-chart-1/32 to-chart-1/4",
    label: "Build fast",
    sub: "Ship production-ready components today",
  },
  {
    bg: "from-chart-2/32 to-chart-2/4",
    label: "Stay consistent",
    sub: "One design system, every surface",
  },
  {
    bg: "from-chart-3/32 to-chart-3/4",
    label: "Scale with ease",
    sub: "From prototype to enterprise",
  },
  {
    bg: "from-chart-4/32 to-chart-4/4",
    label: "Fully accessible",
    sub: "WCAG 2.1 AA out of the box",
  },
  {
    bg: "from-chart-5/32 to-chart-5/4",
    label: "Open source",
    sub: "Free forever, community-driven",
  },
];

export default function Particle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 2500);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide, i) => (
            <div className="min-w-0 shrink-0 grow-0 basis-full" key={i}>
              <div
                className={cn(
                  "flex h-48 flex-col items-center justify-center rounded-2xl border bg-linear-to-br text-foreground",
                  slide.bg,
                )}
              >
                <p className="font-bold text-xl">{slide.label}</p>
                <p className="mt-1 text-muted-foreground text-sm">
                  {slide.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30",
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

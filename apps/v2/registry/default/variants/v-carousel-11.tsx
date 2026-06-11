//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { QuoteIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    avatar: "AK",
    name: "Alex Kim",
    quote:
      "Dropped ui-cnippet into our Next.js app in under an hour. The components are polished and the DX is excellent.",
    role: "CTO, Launchpad",
  },
  {
    avatar: "SR",
    name: "Sara Reyes",
    quote:
      "Finally a library that treats accessibility as a first-class feature, not an afterthought.",
    role: "Lead Designer, Craft",
  },
  {
    avatar: "MN",
    name: "Marcus Ng",
    quote:
      "The Tailwind integration is seamless. I was able to match our brand without touching any source files.",
    role: "Frontend Engineer, Orbit",
  },
  {
    avatar: "JP",
    name: "Jade Park",
    quote:
      "Honestly the best component library I've used. Shadcn-compatible and actively maintained.",
    role: "Indie Developer",
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

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((t, i) => (
            <div className="min-w-0 shrink-0 grow-0 basis-full" key={i}>
              <div className="flex flex-col gap-4 rounded-xl border bg-card p-6">
                <QuoteIcon className="size-5 text-primary" />
                <p className="text-sm leading-relaxed">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-primary font-bold text-[11px] text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5">
        {TESTIMONIALS.map((_, i) => (
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

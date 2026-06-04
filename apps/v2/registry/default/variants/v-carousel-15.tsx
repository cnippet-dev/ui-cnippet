//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { CheckIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    bg: "bg-violet-50 dark:bg-violet-950/40",
    description:
      "Browse, copy, and install 50+ production-ready components with a single command.",
    icon: "⚡",
    title: "Instant CLI install",
  },
  {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    description:
      "Every component meets WCAG 2.1 AA, with full keyboard navigation built in.",
    icon: "♿",
    title: "Accessibility first",
  },
  {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    description:
      "Powered by Tailwind CSS — override any style without fighting specificity wars.",
    icon: "🎨",
    title: "Fully themeable",
  },
  {
    bg: "bg-amber-50 dark:bg-amber-950/40",
    description:
      "Built on Base UI primitives so unstyled logic stays separate from visual styles.",
    icon: "🧩",
    title: "Headless foundation",
  },
];

export default function Particle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
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
          {FEATURES.map((f, i) => (
            <div className="min-w-0 shrink-0 grow-0 basis-full" key={i}>
              <div className={cn("flex flex-col gap-4 rounded-xl p-6", f.bg)}>
                <span className="text-3xl">{f.icon}</span>
                <div>
                  <p className="font-semibold">{f.title}</p>
                  <p className="mt-1 text-muted-foreground text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <div className="flex gap-1.5">
          {FEATURES.map((_, i) => (
            <button
              aria-label={`Go to ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-muted-foreground/30",
              )}
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              type="button"
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="rounded-full border px-3 py-1 text-xs hover:bg-muted disabled:opacity-30"
            disabled={current === 0}
            onClick={() => emblaApi?.scrollPrev()}
            type="button"
          >
            Prev
          </button>
          <button
            className="rounded-full border bg-primary px-3 py-1 text-primary-foreground text-xs hover:bg-primary/90 disabled:opacity-30"
            disabled={current === FEATURES.length - 1}
            onClick={() => emblaApi?.scrollNext()}
            type="button"
          >
            {current === FEATURES.length - 1 ? (
              <span className="flex items-center gap-1">
                <CheckIcon className="size-3" /> Done
              </span>
            ) : (
              "Next"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

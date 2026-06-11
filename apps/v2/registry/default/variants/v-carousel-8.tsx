//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  CheckIcon,
  CodeIcon,
  LayersIcon,
  PaletteIcon,
  RocketIcon,
  ZapIcon,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

const STEPS = [
  {
    desc: "Let's get your workspace set up in just a few steps.",
    icon: RocketIcon,
    title: "Welcome aboard",
  },
  {
    desc: "Pick a color palette that matches your brand identity.",
    icon: PaletteIcon,
    title: "Choose a theme",
  },
  {
    desc: "Select the UI building blocks your project needs.",
    icon: LayersIcon,
    title: "Pick your components",
  },
  {
    desc: "Run a single command to add components to your project.",
    icon: CodeIcon,
    title: "Install via CLI",
  },
  {
    desc: "Start building — your design system is ready to ship.",
    icon: ZapIcon,
    title: "You're all set!",
  },
];

export default function Particle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ watchDrag: false });
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const isLast = current === STEPS.length - 1;

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-6">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-muted-foreground text-xs">
          <span>Getting started</span>
          <span>
            Step {current + 1} of {STEPS.length}
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((current + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div className="min-w-0 shrink-0 grow-0 basis-full" key={i}>
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon aria-hidden="true" className="size-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-muted-foreground text-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={current === 0}
          onClick={() => emblaApi?.scrollPrev()}
          variant="outline"
        >
          Back
        </Button>
        <Button
          className="flex-1"
          onClick={() => !isLast && emblaApi?.scrollNext()}
        >
          {isLast ? (
            <>
              <CheckIcon />
              Finish
            </>
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
}

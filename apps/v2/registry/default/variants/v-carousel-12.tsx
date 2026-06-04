//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";

const PRICING = [
  {
    cta: "Get started",
    features: ["5 projects", "2 GB storage", "Community support"],
    highlight: false,
    name: "Free",
    price: "$0",
  },
  {
    cta: "Start trial",
    features: [
      "Unlimited projects",
      "50 GB storage",
      "Priority support",
      "Team collaboration",
    ],
    highlight: true,
    name: "Pro",
    price: "$12",
  },
  {
    cta: "Contact us",
    features: ["Custom limits", "SSO & SAML", "SLA guarantee", "Dedicated CSM"],
    highlight: false,
    name: "Enterprise",
    price: "Custom",
  },
];

export default function Particle() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: 1 });
  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setCurrent(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {PRICING.map((plan, i) => (
            <div className="min-w-0 shrink-0 grow-0 basis-full px-1" key={i}>
              <div
                className={cn(
                  "flex flex-col gap-4 rounded-xl border p-5",
                  plan.highlight && "border-primary ring-2 ring-primary",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">{plan.name}</span>
                  {plan.highlight && <Badge size="sm">Popular</Badge>}
                </div>
                <div className="font-bold text-2xl">
                  {plan.price}
                  <span className="font-normal text-muted-foreground text-sm">
                    {plan.price !== "Custom" ? "/mo" : ""}
                  </span>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li className="text-muted-foreground text-xs" key={f}>
                      · {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full rounded-md py-2 font-medium text-sm transition-colors",
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border hover:bg-muted",
                  )}
                  type="button"
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          aria-label="Previous"
          className="rounded-full border p-1.5 hover:bg-muted disabled:opacity-30"
          disabled={current === 0}
          onClick={() => emblaApi?.scrollPrev()}
          type="button"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <span className="text-muted-foreground text-xs">
          {current + 1} / {PRICING.length}
        </span>
        <button
          aria-label="Next"
          className="rounded-full border p-1.5 hover:bg-muted disabled:opacity-30"
          disabled={current === PRICING.length - 1}
          onClick={() => emblaApi?.scrollNext()}
          type="button"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}

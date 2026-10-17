"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CameraIcon,
  KeyboardIcon,
  MouseIcon,
  PlugIcon,
  ShoppingCartIcon,
  SunIcon,
} from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/registry/default/ui/carousel";

const PRODUCTS = [
  {
    badge: "Bestseller",
    bg: "bg-chart-1/12",
    icon: KeyboardIcon,
    iconColor: "text-chart-1",
    id: 1,
    name: "Mechanical Keyboard",
    price: "$149",
  },
  {
    badge: "New",
    bg: "bg-chart-2/12",
    icon: MouseIcon,
    iconColor: "text-chart-2",
    id: 2,
    name: "Ergonomic Mouse",
    price: "$89",
  },
  {
    badge: "Sale",
    bg: "bg-chart-3/12",
    icon: PlugIcon,
    iconColor: "text-chart-3",
    id: 3,
    name: "USB-C Hub 7-in-1",
    price: "$59",
  },
  {
    badge: "Popular",
    bg: "bg-chart-4/12",
    icon: CameraIcon,
    iconColor: "text-chart-4",
    id: 4,
    name: "4K Webcam",
    price: "$199",
  },
  {
    badge: "Sale",
    bg: "bg-chart-5/12",
    icon: SunIcon,
    iconColor: "text-chart-5",
    id: 5,
    name: "LED Desk Lamp",
    price: "$45",
  },
];

export default function Particle() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", update);
    api.on("reInit", update);
    update();
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="w-full max-w-xs space-y-3">
      <Carousel
        // Fade the peeking next card so it reads as "more this way", not a clip.
        className={cn(
          "w-full",
          canScrollNext && "mask-r-from-75% mask-r-to-100%",
        )}
        opts={{ align: "start" }}
        setApi={setApi}
      >
        <CarouselContent>
          {PRODUCTS.map((p) => (
            <CarouselItem className="basis-3/4 sm:basis-2/3" key={p.id}>
              <Card className="overflow-hidden">
                <div
                  className={cn("flex h-36 items-center justify-center", p.bg)}
                >
                  <p.icon
                    aria-hidden="true"
                    className={cn("size-14", p.iconColor)}
                    strokeWidth={1.25}
                  />
                </div>
                <CardContent className="space-y-2 p-3">
                  <div className="flex items-start gap-2">
                    <p className="flex-1 font-medium text-sm leading-snug">
                      {p.name}
                    </p>
                    <Badge className="shrink-0" size="sm" variant="secondary">
                      {p.badge}
                    </Badge>
                  </div>
                  <p className="font-bold">{p.price}</p>
                  <Button className="w-full" size="sm">
                    <ShoppingCartIcon />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        <Button
          className="size-8 rounded-full"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="sr-only">Previous slide</span>
        </Button>
        <Button
          className="size-8 rounded-full"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon className="size-4" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>
    </div>
  );
}

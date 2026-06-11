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
    bg: "bg-violet-100 dark:bg-violet-950",
    icon: KeyboardIcon,
    iconColor: "text-violet-500 dark:text-violet-400",
    id: 1,
    name: "Mechanical Keyboard",
    price: "$149",
  },
  {
    badge: "New",
    bg: "bg-sky-100 dark:bg-sky-950",
    icon: MouseIcon,
    iconColor: "text-sky-500 dark:text-sky-400",
    id: 2,
    name: "Ergonomic Mouse",
    price: "$89",
  },
  {
    badge: "Sale",
    bg: "bg-emerald-100 dark:bg-emerald-950",
    icon: PlugIcon,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    id: 3,
    name: "USB-C Hub 7-in-1",
    price: "$59",
  },
  {
    badge: "Popular",
    bg: "bg-rose-100 dark:bg-rose-950",
    icon: CameraIcon,
    iconColor: "text-rose-500 dark:text-rose-400",
    id: 4,
    name: "4K Webcam",
    price: "$199",
  },
  {
    badge: "Sale",
    bg: "bg-amber-100 dark:bg-amber-950",
    icon: SunIcon,
    iconColor: "text-amber-500 dark:text-amber-400",
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
      <Carousel className="w-full" opts={{ align: "start" }} setApi={setApi}>
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

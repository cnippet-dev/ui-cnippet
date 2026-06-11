//biome-ignore-all lint/suspicious/noArrayIndexKey:<>

"use client";

import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

const TESTIMONIALS = [
  {
    initials: "AP",
    name: "Alice Park",
    quote:
      "Cut our design-system setup from weeks to a single afternoon. The component quality is outstanding.",
    rating: 5,
    role: "Frontend Lead, Vercel",
  },
  {
    initials: "BT",
    name: "Ben Torres",
    quote:
      "We ship across 3 products with cnippet. Consistent, accessible, and easy to extend — exactly what we needed.",
    rating: 5,
    role: "CTO, Linear",
  },
  {
    initials: "CK",
    name: "Celia Kim",
    quote:
      "The Figma-to-code fidelity is remarkable. My team ships faster because they trust the components.",
    rating: 5,
    role: "Product Designer, Figma",
  },
  {
    initials: "DM",
    name: "Dan Moss",
    quote:
      "Best component library I've used. Open source, well-documented, and it just works.",
    rating: 5,
    role: "Indie Developer",
  },
];

export default function Particle() {
  return (
    <Carousel className="w-full max-w-sm" opts={{ loop: true }}>
      <CarouselContent>
        {TESTIMONIALS.map((t, i) => (
          <CarouselItem key={i}>
            <Card>
              <CardContent className="space-y-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon
                      className="size-4 fill-amber-400 text-amber-400"
                      key={j}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="text-xs">
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

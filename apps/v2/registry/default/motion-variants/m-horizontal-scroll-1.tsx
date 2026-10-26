"use client";

import { useRef } from "react";
import { HorizontalScroll } from "@/registry/default/motion/horizontal-scroll";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=576&h=320&fit=crop&dpr=2&q=80`;

const cases = [
  {
    client: "Alpine Huts",
    id: "1506905925346-21bda4d32df4",
    result: "+38% bookings",
  },
  {
    client: "Tidewater",
    id: "1505142468610-359e7d316be0",
    result: "2× faster checkout",
  },
  { client: "Grove", id: "1441974231531-c6227db76b6e", result: "-24% churn" },
  {
    client: "Nightline",
    id: "1477959858617-67f85cf4f1df",
    result: "1M monthly riders",
  },
  {
    client: "Dunewalk",
    id: "1509316785289-025f5b846b35",
    result: "4.9★ app rating",
  },
];

export default function HorizontalScrollCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-80 w-full overflow-y-auto" ref={containerRef}>
      <HorizontalScroll containerRef={containerRef} panelClassName="h-80">
        {cases.map((c) => (
          <article
            className="w-64 shrink-0 overflow-hidden rounded-2xl border bg-card"
            key={c.client}
          >
            <img
              alt=""
              className="h-36 w-full object-cover"
              src={photo(c.id)}
            />
            <div className="p-4">
              <h3 className="font-semibold text-foreground">{c.client}</h3>
              <p className="text-muted-foreground text-sm">{c.result}</p>
            </div>
          </article>
        ))}
      </HorizontalScroll>
      <p className="py-10 text-center text-muted-foreground text-sm">
        See all case studies →
      </p>
    </div>
  );
}

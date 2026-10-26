"use client";

import { ScrollSnapSections } from "@/registry/default/motion/scroll-snap-sections";

const quotes = [
  {
    author: "Maya Chen, CTO at Tidewater",
    id: "q-maya",
    quote: "We cut our release cycle from two weeks to two days.",
  },
  {
    author: "Leo Park, founder of Grove",
    id: "q-leo",
    quote: "The only tool our designers and engineers both love.",
  },
  {
    author: "Ana Ruiz, PM at Nightline",
    id: "q-ana",
    quote: "Onboarding a new hire now takes an afternoon.",
  },
];

export default function ScrollSnapSectionsTestimonials() {
  return (
    <ScrollSnapSections
      className="h-80 w-full"
      sections={quotes.map((q) => ({
        content: (
          <figure className="mx-auto max-w-lg px-8 text-center">
            <blockquote className="font-medium text-2xl text-foreground tracking-tight">
              “{q.quote}”
            </blockquote>
            <figcaption className="mt-4 text-muted-foreground text-sm">
              {q.author}
            </figcaption>
          </figure>
        ),
        id: q.id,
        label: q.author,
      }))}
    />
  );
}

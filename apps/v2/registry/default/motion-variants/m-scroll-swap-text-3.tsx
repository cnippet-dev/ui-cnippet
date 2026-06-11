"use client";
import { useRef } from "react";
import { ScrollSwapText } from "@/registry/default/motion/scroll-swap-text";

const quotes = [
  { author: "Sarah K.", text: "The animation quality is exceptional." },
  { author: "Marco R.", text: "Saved us weeks of development time." },
  { author: "Priya M.", text: "Our conversion rate jumped 30%." },
  { author: "Tom B.", text: "Best component library we have used." },
  { author: "Yuki T.", text: "The docs are incredibly clear." },
];

export default function ScrollSwapTextTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div
        className="h-48 w-full max-w-sm overflow-y-scroll"
        ref={containerRef}
      >
        {quotes.map((q, i) => (
          <div
            className="border-border border-b px-1 py-5 last:border-0"
            key={i}
          >
            <ScrollSwapText
              as="p"
              className="text-base text-foreground italic"
              containerRef={containerRef}
            >
              {`"${q.text}"`}
            </ScrollSwapText>
            <p className="mt-1 text-muted-foreground text-sm">{q.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useRef } from "react";
import { ScrollSwapText } from "@/registry/default/motion/scroll-swap-text";

const quotes = [
  { text: "The animation quality is exceptional.", author: "Sarah K." },
  { text: "Saved us weeks of development time.", author: "Marco R." },
  { text: "Our conversion rate jumped 30%.", author: "Priya M." },
  { text: "Best component library we have used.", author: "Tom B." },
  { text: "The docs are incredibly clear.", author: "Yuki T." },
];

export default function ScrollSwapTextTestimonials() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div
        ref={containerRef}
        className="h-48 w-full max-w-sm overflow-y-scroll"
      >
        {quotes.map((q, i) => (
          <div key={i} className="border-b border-border px-1 py-5 last:border-0">
            <ScrollSwapText
              as="p"
              containerRef={containerRef}
              className="text-base italic text-foreground"
            >
              {`"${q.text}"`}
            </ScrollSwapText>
            <p className="mt-1 text-sm text-muted-foreground">{q.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

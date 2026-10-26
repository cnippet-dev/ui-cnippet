"use client";

import { ScrollSnapSections } from "@/registry/default/motion/scroll-snap-sections";

const chapters = [
  {
    body: "Scroll to begin.",
    id: "story-intro",
    tint: "bg-sky-500/10",
    title: "Meet Aero",
  },
  {
    body: "980 grams, all day battery.",
    id: "story-light",
    tint: "bg-amber-500/10",
    title: "Impossibly light",
  },
  {
    body: "A 14″ panel that stays readable in sunlight.",
    id: "story-screen",
    tint: "bg-violet-500/10",
    title: "Brighter screen",
  },
  {
    body: "From $1,299. Ships next week.",
    id: "story-price",
    tint: "bg-emerald-500/10",
    title: "Yours today",
  },
];

export default function ScrollSnapSectionsStory() {
  return (
    <ScrollSnapSections
      className="h-96 w-full"
      sections={chapters.map((c) => ({
        className: c.tint,
        content: (
          <div className="px-6 text-center">
            <h3 className="font-bold text-4xl text-foreground tracking-tight">
              {c.title}
            </h3>
            <p className="mt-2 text-muted-foreground">{c.body}</p>
          </div>
        ),
        id: c.id,
        label: c.title,
      }))}
    />
  );
}

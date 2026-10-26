"use client";

import { useRef } from "react";
import { StickyScrollReveal } from "@/registry/default/motion/sticky-scroll-reveal";

function Release({ version, notes }: { version: string; notes: string[] }) {
  return (
    <div className="flex size-full flex-col justify-center gap-4 p-8">
      <span className="w-fit rounded-full border px-2.5 py-0.5 font-mono text-muted-foreground text-xs">
        {version}
      </span>
      <ul className="space-y-2">
        {notes.map((note) => (
          <li
            className="flex items-center gap-2 text-foreground text-sm"
            key={note}
          >
            <span className="size-1.5 rounded-full bg-foreground/60" />
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}

const releases = [
  {
    content: (
      <Release
        notes={["Command palette", "Faster search", "Dark mode polish"]}
        version="v3.0"
      />
    ),
    description:
      "Our biggest release yet, rebuilt around keyboard-first navigation.",
    title: "March — v3.0",
  },
  {
    content: <Release notes={["Shared views", "CSV export"]} version="v2.8" />,
    description: "Share filtered views with anyone on your team.",
    title: "February — v2.8",
  },
  {
    content: (
      <Release notes={["Webhooks", "API rate limits raised"]} version="v2.7" />
    ),
    description: "Automate anything with the new webhook events.",
    title: "January — v2.7",
  },
];

export default function StickyScrollRevealChangelog() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-6"
      ref={containerRef}
    >
      <StickyScrollReveal
        className="mx-auto max-w-3xl py-24"
        containerRef={containerRef}
        items={releases}
      />
    </div>
  );
}

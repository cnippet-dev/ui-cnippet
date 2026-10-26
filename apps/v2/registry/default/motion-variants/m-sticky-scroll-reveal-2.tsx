"use client";

import { useRef } from "react";
import { StickyScrollReveal } from "@/registry/default/motion/sticky-scroll-reveal";

function Step({ n, lines }: { n: number; lines: string[] }) {
  return (
    <div className="flex size-full flex-col justify-center gap-3 bg-muted/40 p-8">
      <span className="flex size-10 items-center justify-center rounded-full bg-foreground font-semibold text-background">
        {n}
      </span>
      {lines.map((line) => (
        <div
          className="rounded-lg border bg-background px-3 py-2 text-foreground text-sm"
          key={line}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

const steps = [
  {
    content: <Step lines={["Acme Inc.", "acme.com"]} n={1} />,
    description: "Add your company name and domain so teammates can find you.",
    title: "Create your workspace",
  },
  {
    content: (
      <Step lines={["maya@acme.com", "leo@acme.com", "+ Add more"]} n={2} />
    ),
    description: "Send invites by email. They join with one click.",
    title: "Invite your team",
  },
  {
    content: <Step lines={["GitHub · connected", "Slack · connected"]} n={3} />,
    description: "Bring in your repos and chat so updates flow automatically.",
    title: "Connect your tools",
  },
];

export default function StickyScrollRevealOnboarding() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-6"
      ref={containerRef}
    >
      <StickyScrollReveal
        className="mx-auto max-w-3xl py-24"
        containerRef={containerRef}
        items={steps}
      />
    </div>
  );
}

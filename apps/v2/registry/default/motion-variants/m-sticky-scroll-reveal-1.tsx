"use client";

import {
  BarChart3Icon,
  BellIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";
import { useRef } from "react";
import { StickyScrollReveal } from "@/registry/default/motion/sticky-scroll-reveal";

function Visual({ icon: Icon, tint }: { icon: typeof ZapIcon; tint: string }) {
  return (
    <div className={`flex size-full items-center justify-center ${tint}`}>
      <Icon className="size-16 text-foreground/70" strokeWidth={1.25} />
    </div>
  );
}

const items = [
  {
    content: <Visual icon={ZapIcon} tint="bg-amber-500/10" />,
    description:
      "Deploys finish in seconds, with previews for every pull request.",
    title: "Instant deploys",
  },
  {
    content: <Visual icon={BarChart3Icon} tint="bg-sky-500/10" />,
    description:
      "Track latency, errors and traffic without wiring up a dashboard.",
    title: "Built-in analytics",
  },
  {
    content: <Visual icon={BellIcon} tint="bg-violet-500/10" />,
    description: "Get pinged in Slack the moment a check fails in production.",
    title: "Smart alerts",
  },
  {
    content: <Visual icon={ShieldCheckIcon} tint="bg-emerald-500/10" />,
    description: "SSO, audit logs and role-based access on every plan.",
    title: "Secure by default",
  },
];

export default function StickyScrollRevealFeatures() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-6"
      ref={containerRef}
    >
      <StickyScrollReveal
        className="mx-auto max-w-3xl py-24"
        containerRef={containerRef}
        items={items}
      />
    </div>
  );
}

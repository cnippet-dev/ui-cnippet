import dynamic from "next/dynamic";

const SiteHeader = dynamic(
  () => import("@/components/shared/header/site-header"),
);

import { BrainCircuit, ChartSpline, SquareKanban, Zap } from "lucide-react";

const Hero = dynamic(() => import("@/components/home/hero"));
const Components = dynamic(() => import("@/components/home/components"));
const Testimonial = dynamic(() => import("@/components/home/testimonial"));
const Blocks = dynamic(() => import("@/components/home/blocks"));
const Footer = dynamic(() => import("@/components/shared/footer"));

import ReactLenis from "lenis/react";
import type { ReactNode } from "react";
import {
  BorderBottomWithDots,
  BorderTopWithDots,
} from "@/components/grid-design";
import HighlightCode from "@/components/home/highlight-code";

export interface HeroTabsDashboardTab {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  panelTitle: string;
  panelDescription: string;
}

export interface HeroTabsDashboardProps {
  badgeText?: string;
  badgeLink?: string;
  badgeLinkText?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  tabs?: HeroTabsDashboardTab[];
  brandName?: string;
  className?: string;
  highlightCodeSection?: ReactNode;
}
function HeroTabs({ tabs }: { tabs: HeroTabsDashboardTab[] }) {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-6">
        <div className="relative z-20 grid grid-cols-4 items-center justify-center gap-px divide-x divide-foreground/8 border-foreground/8 border-x *:h-12 dark:divide-foreground/10 dark:border-neutral-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                className="group flex w-full cursor-pointer items-center justify-center px-1.5"
                key={tab.id}
              >
                <div
                  className={
                    "flex h-8 w-full items-center justify-center gap-1.5 rounded-none px-3 text-xs ring-1 transition-all duration-150 hover:text-foreground group-active:scale-[0.98] dark:border-neutral-800 dark:ring-neutral-800 [&>svg]:size-3.5"
                  }
                >
                  <Icon />
                  <span className="max-md:hidden">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const defaultTabs: HeroTabsDashboardTab[] = [
  {
    icon: SquareKanban,
    id: "task-board",
    label: "Task Management",
    panelDescription:
      "Assign, track, and prioritize work across sprints with drag-and-drop boards and real-time status updates.",
    panelTitle: "Task Management",
  },
  {
    icon: ChartSpline,
    id: "data-insights",
    label: "Data Analytics",
    panelDescription:
      "Surface key metrics from every pipeline stage. Spot trends, identify blockers, and make decisions backed by live data.",
    panelTitle: "Data Analytics",
  },
  {
    icon: BrainCircuit,
    id: "ai-copilot",
    label: "AI Assistant",
    panelDescription:
      "Get context-aware recommendations, auto-generated summaries, and predictive alerts — all trained on your workflow.",
    panelTitle: "AI Assistant",
  },
  {
    icon: Zap,
    id: "auto-flows",
    label: "Automations",
    panelDescription:
      "Connect triggers and actions across your stack. Build repeatable processes that run without manual intervention.",
    panelTitle: "Automations",
  },
];

export default function Page({ tabs = defaultTabs }) {
  return (
    <ReactLenis root>
      <SiteHeader />
      <main className="dark:bg-sidebar">
        <Hero />
        <div className="relative">
          <BorderTopWithDots />
          <div className="relative px-4 pt-6 pb-3">
            <div className="relative mx-auto max-w-6xl border-x dark:bg-sidebar">
              <HeroTabs tabs={tabs} />
            </div>
          </div>
          <BorderBottomWithDots />
        </div>
        <Components />
        <HighlightCode />
        <Testimonial />
        <Blocks />
      </main>
      <Footer />
    </ReactLenis>
  );
}

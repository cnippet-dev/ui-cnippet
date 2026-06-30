import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import { cn } from "@/lib/utils";
import FlipWordsHero from "@/registry/default/motion-variants/m-flip-words-1";
import MorphingTextHero from "@/registry/default/motion-variants/m-morphing-text-1";
import SpinningTextBadge from "@/registry/default/motion-variants/m-spinning-text-1";
import TextGradientHero from "@/registry/default/motion-variants/m-text-gradient-1";
import TextLoopStatus from "@/registry/default/motion-variants/m-text-loop-2";
import TextRevealHero from "@/registry/default/motion-variants/m-text-reveal-1";
import TextRotateHero from "@/registry/default/motion-variants/m-text-rotate-1";
import TextShimmerHero from "@/registry/default/motion-variants/m-text-shimmer-1";
import TypewriterHero from "@/registry/default/motion-variants/m-typewriter-1";
import VerticalCutRevealHero from "@/registry/default/motion-variants/m-vertical-cut-reveal-1";

type MotionItem = {
  preview: React.ReactNode;
  tag: string;
  title: string;
  url: string;
  featured?: boolean;
};

const items: MotionItem[] = [
  {
    featured: true,
    preview: <TextRevealHero />,
    tag: "text",
    title: "text reveal",
    url: "/motion/text-animations/text-reveal",
  },
  {
    featured: true,
    preview: <TypewriterHero />,
    tag: "text",
    title: "typewriter",
    url: "/motion/text-animations/typewriter",
  },
  {
    featured: true,
    preview: <FlipWordsHero />,
    tag: "text",
    title: "flip words",
    url: "/motion/text-animations/flip-words",
  },
  {
    preview: <TextGradientHero />,
    tag: "text",
    title: "text gradient",
    url: "/motion/text-animations/text-gradient",
  },
  {
    preview: <SpinningTextBadge />,
    tag: "motion",
    title: "spinning text",
    url: "/motion/text-animations/spinning-text",
  },
  {
    preview: <TextLoopStatus />,
    tag: "text",
    title: "text loop",
    url: "/motion/text-animations/text-loop",
  },
  {
    featured: true,
    preview: <TextShimmerHero />,
    tag: "text",
    title: "text shimmer",
    url: "/motion/text-animations/text-shimmer",
  },
  {
    preview: <TextRotateHero />,
    tag: "text",
    title: "text rotate",
    url: "/motion/text-animations/text-rotate",
  },
  {
    featured: true,
    preview: <VerticalCutRevealHero />,
    tag: "text",
    title: "vertical cut reveal",
    url: "/motion/text-animations/vertical-cut-reveal",
  },
  {
    featured: true,
    preview: <MorphingTextHero />,
    tag: "text",
    title: "morphing text",
    url: "/motion/text-animations/morphing-text",
  },
];

export default function MotionComponents() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />

      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-2">
          <p className="font-medium font-mono text-cnippet-blue text-sm">
            [motion · 40+ animations]
          </p>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            Interfaces
            <br />
            in motion.
          </h2>
        </div>
        <Link
          className="hidden shrink-0 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-cnippet-blue md:inline-flex"
          href="/explore?tab=motion"
        >
          View all motion →
        </Link>
      </div>

      <div className="relative grid gap-0 md:grid-cols-4">
        <FullWidthBorder className="top-0" />
        {items.map((item, index) => (
          <Link
            className={cn(
              "group relative flex flex-col border-b border-dashed transition-colors hover:bg-cnippet-blue/5",
              item.featured && "md:col-span-2",
              index % 4 !== 3 && !item.featured && "md:border-r",
            )}
            href={item.url}
            key={item.title}
          >
            <div
              className={cn(
                "relative overflow-hidden",
                item.featured
                  ? "h-64 bg-background-100 dark:bg-background-200 md:h-72"
                  : "h-48 bg-background-100 dark:bg-background-200",
              )}
            >
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                {item.preview}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background-100 to-transparent dark:from-background-200" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-background-100 to-transparent dark:from-background-200" />
            </div>

            <div className="flex items-center justify-between border-t border-dashed px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-1.5 shrink-0 rounded-full bg-cnippet-blue/40 transition-colors duration-200 group-hover:bg-cnippet-blue" />
                <span className="font-mono text-sm capitalize transition-colors duration-200 group-hover:text-cnippet-blue">{item.title}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="rounded-[2px] border border-dashed px-1.5 py-px font-mono text-[10px] text-muted-foreground uppercase">
                  {item.tag}
                </span>
                <ArrowUpRight className="size-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center border-t border-dashed px-4 py-4">
        <Link
          className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-dashed px-4 font-medium text-sm transition-colors duration-200 hover:border-cnippet-blue/40 hover:bg-cnippet-blue/5 hover:text-cnippet-blue"
          href="/explore?tab=motion"
        >
          View all motion components <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}

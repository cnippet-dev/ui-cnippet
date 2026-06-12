import { Button } from "@cnippet/ui/components/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
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

// Row 1: TextReveal(2) + Typewriter + FlipWords          = 4 cols
// Row 2: TextGradient + SpinningText + Counting + Loop   = 4 cols
// Row 3: TextShimmer + VertCut + Morphing + TextRotate   = 4 cols
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
    <div className="relative mt-20 max-w-full">
      <div>
        <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
          {"Motion · 40+ components"}
        </div>

        <div className="relative before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
          <h2 className="text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:text-5xl lg:text-6xl">
            Interfaces in motion
          </h2>
        </div>

        <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:h-px max-sm:px-4 dark:text-white/40">
          Animated text, numbers, and scroll effects. Copy and drop into your
          project.
        </div>

        <Separator />
      </div>

      <div className="relative mt-10 before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10">
        <div className="grid grid-cols-2 gap-px bg-gray-950/5 md:grid-cols-4 dark:bg-white/[0.06]">
          {items.map((item) => (
            <Link
              className={cn(
                "group relative flex flex-col justify-between bg-white transition-colors dark:bg-neutral-950",
                item.featured && "col-span-2",
              )}
              href={item.url}
              key={item.title}
            >
              <div
                className={cn(
                  "relative h-full overflow-hidden",
                  item.featured
                    ? "h-full bg-[length:20px_20px] bg-[radial-gradient(var(--color-neutral-200)_1px,transparent_1px)] md:h-80 dark:bg-[radial-gradient(var(--color-neutral-800)_1px,transparent_1px)]"
                    : "h-52 bg-neutral-50 dark:bg-neutral-900/50",
                )}
              >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  {item.preview}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-neutral-950" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white dark:from-neutral-950" />

                {/* {item.featured && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full border border-gray-950/8 bg-white/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-gray-950/40 backdrop-blur-sm dark:border-white/8 dark:bg-neutral-950/80 dark:text-white/30">
                    <span className="size-1 rounded-full bg-primary" />
                    featured
                  </span>
                )} */}
              </div>

              <div className="flex items-center justify-between border-gray-950/5 border-t px-4 py-3 dark:border-white/6 dark:group-hover:bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-gray-950/15 dark:bg-white/15" />
                  <span className="font-mono text-gray-950/55 text-xs capitalize tracking-tight dark:text-white/45">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-full border border-gray-950/8 px-1.5 py-px font-mono text-[10px] text-gray-950/25 uppercase tracking-wider dark:border-white/8 dark:text-white/20">
                    {item.tag}
                  </span>
                  <ArrowUpRight className="size-3 text-gray-950/25 opacity-0 transition-all duration-200 group-hover:opacity-100 dark:text-white/30" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="relative mt-10 flex gap-2 px-2 before:absolute before:top-0 before:left-[-100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:left-[-100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10 dark:before:bg-white/10">
        <Button
          className="text-balance rounded-none py-5 tracking-tight"
          render={<Link href="/explore?tab=motion" />}
        >
          View all motion components <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-7 w-full border-edge border-y lg:h-10",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10",
        "before:absolute before:right-[calc(100%+var(--gutter-width))] before:-z-1 before:h-7 before:w-screen before:border-border/50! before:border-edge before:border-y lg:before:h-10 dark:before:border-border",
        "after:absolute after:left-[calc(100%+var(--gutter-width))] after:-z-1 after:h-7 after:w-screen after:border-border/50! after:border-edge after:border-y lg:after:h-10 dark:after:border-border",
        className,
      )}
    />
  );
}

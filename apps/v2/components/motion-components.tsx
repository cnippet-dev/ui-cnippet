import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Section, SectionBody, SectionHeader } from "@/components/home/section";
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
    <Section id="motion">
      <SectionHeader
        index="04"
        meta="[40+ animations]"
        title="Interfaces in motion"
      />

      <SectionBody className="p-0 sm:p-0">
        <div className="border-b border-dashed px-5 py-6 sm:px-8">
          <p className="max-w-md text-[14px] text-muted-foreground leading-relaxed">
            Text and scroll animations for headlines, badges, and status — drop
            in and go. Ten of forty-plus, live below.
          </p>
        </div>

        <div className="grid gap-0 md:grid-cols-4">
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
                    ? "h-64 bg-background-100 md:h-72 dark:bg-background-200"
                    : "h-48 bg-background-100 dark:bg-background-200",
                )}
              >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  {item.preview}
                </div>
                <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background-100 to-transparent dark:from-background-200" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-linear-to-b from-background-100 to-transparent dark:from-background-200" />
                <span className="pointer-events-none absolute inset-0 opacity-0 ring-1 ring-cnippet-blue/20 ring-inset transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex items-center justify-between border-t border-dashed px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 rounded-full bg-cnippet-blue/40 transition-colors duration-200 group-hover:bg-cnippet-blue" />
                  <span className="font-mono text-sm capitalize transition-colors duration-200 group-hover:text-cnippet-blue">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="rounded-xs border border-dashed px-1.5 py-px font-mono text-[10px] text-muted-foreground uppercase transition-colors duration-200 group-hover:border-cnippet-blue/40 group-hover:text-cnippet-blue">
                    {item.tag}
                  </span>
                  <ArrowUpRight className="size-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center border-t border-dashed px-5 py-4 sm:px-8">
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-xs border border-dashed px-4 font-medium text-sm transition-colors duration-200 hover:border-cnippet-blue/40 hover:bg-cnippet-blue/5 hover:text-cnippet-blue"
            href="/explore?tab=motion"
          >
            View all motion components <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </SectionBody>
    </Section>
  );
}

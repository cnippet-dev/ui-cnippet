import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CornerPlus } from "@/components/layout/corner-plus";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import { SectionKicker } from "@/components/layout/section-kicker";
import { cn } from "@/lib/utils";

const blocks = [
  {
    number: "6",
    title: "blog",
    url: "https://blocks.cnippet.dev/sections/blog",
  },
  {
    number: "4",
    title: "contact",
    url: "https://blocks.cnippet.dev/sections/contact",
  },
  {
    number: "5",
    title: "feature",
    url: "https://blocks.cnippet.dev/sections/feature",
  },
  {
    number: "8",
    title: "hero",
    url: "https://blocks.cnippet.dev/sections/hero",
  },
];

export default function Blocks() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <CornerPlus className="left-0 -translate-x-1/2" />
      <CornerPlus className="right-0 translate-x-1/2" />

      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-3">
          <SectionKicker color="yellow">
            blocks · sections & pages
          </SectionKicker>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            From components
            <br />
            to complete pages.
          </h2>
        </div>
        <Link
          className="hidden shrink-0 items-center gap-1.5 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:border-cnippet-yellow/40 hover:text-cnippet-yellow md:inline-flex"
          href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
          rel="noopener"
          target="_blank"
        >
          Explore Blocks <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthBorder className="top-0" />
        {blocks.map((item, index) => (
          <Link
            className={cn(
              "group flex flex-col border-b border-dashed transition-colors hover:bg-cnippet-yellow/5 lg:border-b-0",
              index < blocks.length - 1 && "lg:border-r",
              index % 2 === 0 && "sm:border-r lg:border-r-0",
              index % 2 === 0 && index < blocks.length - 1 && "lg:border-r",
              index >= blocks.length - 2 && "sm:border-b-0",
            )}
            href={item.url}
            key={item.title}
            rel="noopener"
            target="_blank"
          >
            <div className="relative overflow-hidden bg-background-100 dark:bg-background-200">
              <span className="absolute top-3 left-3 z-10 rounded-[2px] border border-dashed bg-background/70 px-1.5 py-px font-mono text-[10px] text-muted-foreground uppercase backdrop-blur-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Image
                alt={`${item.title} block preview`}
                className="aspect-video w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
                height={1080}
                loading="lazy"
                src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1770126024/${item.title}.png`}
                width={1920}
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <ArrowUpRight className="translate-2 group-hover:translate-0 pointer-events-none absolute right-3 bottom-3 size-4 text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100" />
            </div>
            <div className="flex items-center justify-between border-t border-dashed px-4 py-3">
              <span className="font-medium text-sm capitalize transition-colors duration-200 group-hover:text-cnippet-yellow">
                {item.title}
              </span>
              <span className="font-mono text-muted-foreground text-xs">
                {item.number} blocks
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center border-t border-dashed px-4 py-4">
        <Link
          className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-dashed px-4 font-medium text-sm transition-colors duration-200 hover:border-cnippet-yellow/40 hover:bg-cnippet-yellow/5 hover:text-cnippet-yellow"
          href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
          rel="noopener"
          target="_blank"
        >
          Explore Blocks <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <CornerPlus className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
      <CornerPlus className="right-0 bottom-0 translate-x-1/2 translate-y-1/2" />
    </section>
  );
}

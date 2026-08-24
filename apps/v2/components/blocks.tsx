import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionBody, SectionHeader } from "@/components/home/section";
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
    <Section id="blocks" tone="orbit">
      <SectionHeader
        className="border-t-0"
        index="06"
        meta="[sections & pages]"
        title="From components to complete pages"
        tone="orbit"
      />

      <SectionBody className="p-0 sm:p-0">
        <div className="flex items-center justify-between gap-4 border-b border-dashed px-5 py-6 sm:px-8">
          <p className="max-w-sm text-[14px] text-muted-foreground leading-relaxed">
            Copy-paste entire sections — hero, pricing, blog, and more — built
            from the same primitives.
          </p>
          <Link
            className="hidden shrink-0 items-center gap-1.5 rounded-xs border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:border-cnippet-yellow/40 hover:text-cnippet-yellow md:inline-flex"
            href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
            rel="noopener"
            target="_blank"
          >
            Explore Blocks <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="absolute top-3 left-3 z-10 rounded-xs border border-dashed bg-background/70 px-1.5 py-px font-mono text-[10px] text-muted-foreground uppercase backdrop-blur-sm">
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

        <div className="flex items-center border-t border-dashed px-5 py-4 sm:px-8">
          <Link
            className="inline-flex h-9 items-center gap-2 rounded-xs border border-dashed px-4 font-medium text-sm transition-colors duration-200 hover:border-cnippet-yellow/40 hover:bg-cnippet-yellow/5 hover:text-cnippet-yellow"
            href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
            rel="noopener"
            target="_blank"
          >
            Explore Blocks <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </SectionBody>
    </Section>
  );
}

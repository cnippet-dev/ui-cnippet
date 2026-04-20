import { Button } from "@cnippet/ui/components/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="relative mt-20 max-w-full">
      <div>
        <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
          Blocks
        </div>

        <div className="relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
          <h2 className="text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:text-5xl lg:text-6xl">
            From components to complete pages
          </h2>
        </div>

        <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:h-px max-sm:px-4 dark:text-white/40">
          Hero sections, pricing tables, dashboards, authentication flows, and
          more — all customizable with Tailwind.
        </div>

        <Separator />
      </div>

      <div className="relative mt-10 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {blocks.map((item, index) => {
            const k = `${item.title}-${index}`;
            return (
              <div
                className="relative border-gray-950/5 border-r border-b px-2 py-4 max-sm:px-4 dark:border-white/10"
                key={k}
              >
                <Link
                  className="peer relative inline-flex w-full overflow-hidden"
                  href={item.url}
                  target="_blank"
                >
                  <Image
                    alt={`${item.title} block preview`}
                    className="aspect-video h-52 w-full object-cover"
                    height={1080}
                    loading="lazy"
                    src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1770126024/${item.title}.png`}
                    width={1920}
                  />
                </Link>

                <div className="mt-3 flex items-center justify-between [&_a]:peer-hover:underline">
                  <h3>
                    <Link
                      className="text-lg capitalize hover:underline"
                      href={item.url}
                      target="_blank"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="font-mono text-black/40 text-xs dark:text-white/40">
                    {item.number} blocks
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10 flex gap-2 px-2 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10 dark:before:bg-white/10">
        <Button
          className="text-balance rounded-none py-2 tracking-tight"
          render={
            <Link
              href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
              target="_blank"
            />
          }
        >
          Explore Blocks <ArrowRight />
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

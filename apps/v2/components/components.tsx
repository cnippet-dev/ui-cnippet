import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CornerPlus } from "@/components/layout/corner-plus";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import { SectionKicker } from "@/components/layout/section-kicker";
import { cn } from "@/lib/utils";
import { AccordionPreview } from "./preview/accordion";
import AlertPreview from "./preview/alert";
import AvatarPreview from "./preview/avatar";
import BadgePreview from "./preview/badge";
import BreadcrumbPreview from "./preview/breadcrumb";
import ButtonPreview from "./preview/button";
import CheckboxPreview from "./preview/checkbox";
import DialogPreview from "./preview/dialog";

const items = [
  {
    number: "3",
    preview: <AccordionPreview />,
    title: "accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "3",
    preview: <AlertPreview />,
    title: "alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "3",
    preview: <AvatarPreview />,
    title: "avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "3",
    preview: <BadgePreview />,
    title: "badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "2",
    preview: <BreadcrumbPreview />,
    title: "breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "2",
    preview: <ButtonPreview />,
    title: "button",
    url: "/ui/actions/button",
  },
  {
    number: "4",
    preview: <CheckboxPreview />,
    title: "checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "5",
    preview: <DialogPreview />,
    title: "dialog",
    url: "/ui/overlays/dialog",
  },
];

export default function Components() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <CornerPlus className="left-0 -translate-x-1/2" />
      <CornerPlus className="right-0 translate-x-1/2" />

      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-3">
          <SectionKicker color="orange">components · 57+</SectionKicker>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            Production-ready
            <br />
            components.
          </h2>
        </div>
        <Link
          className="hidden shrink-0 items-center gap-1.5 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:border-cnippet-orange/40 hover:text-cnippet-orange md:inline-flex"
          href="/explore"
        >
          View all components <ArrowRight className="size-3" />
        </Link>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
        <FullWidthBorder className="top-0" />
        {items.map((item, index) => (
          <Link
            className={cn(
              "group relative flex flex-col border-b border-dashed transition-colors hover:bg-cnippet-orange/5",
              index % 4 !== 3 && "lg:border-r",
              index % 2 === 0 && "sm:border-r lg:border-r-0",
              index % 2 === 0 && index % 4 !== 3 && "lg:border-r",
              index >= items.length - 4 && "lg:border-b-0",
              index >= items.length - 2 && "sm:border-b-0",
            )}
            href={item.url}
            key={item.title}
          >
            <div
              className="relative flex h-52 items-center justify-center overflow-hidden bg-background-100 p-6 dark:bg-background-200"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
                backgroundSize: "18px 18px",
              }}
            >
              <span className="absolute top-3 left-3 font-mono text-[10px] text-muted-foreground/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="transition-transform duration-300 ease-out group-hover:scale-[1.05]">
                {item.preview}
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-dashed px-4 py-3">
              <span className="font-medium text-sm capitalize transition-colors duration-200 group-hover:text-cnippet-orange">
                {item.title}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-muted-foreground text-xs">
                {item.number} variants
                <ArrowUpRight className="size-3 text-muted-foreground opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-cnippet-orange group-hover:opacity-100" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center border-t border-dashed px-4 py-4">
        <Link
          className="inline-flex h-9 items-center gap-2 rounded-[2px] border border-dashed px-4 font-medium text-sm transition-colors duration-200 hover:border-cnippet-orange/40 hover:bg-cnippet-orange/5 hover:text-cnippet-orange"
          href="/explore"
        >
          View all components <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}

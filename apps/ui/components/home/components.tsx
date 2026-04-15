import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { AccordionPreview } from "./preview/accordion";
import AlertPreview from "./preview/alert";
import AvatarPreview from "./preview/avatar";
import BadgePreview from "./preview/badge";
import BreadcrumbPreview from "./preview/breadcrumb";
import ButtonPreview from "./preview/button";
import CheckboxPreview from "./preview/checkbox";
import DialogPreview from "./preview/dialog";

const _items = [
  {
    number: "2",
    title: "accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "5",
    title: "alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "4",
    title: "avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "3",
    title: "badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "2",
    title: "breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "3",
    title: "button",
    url: "/ui/actions/button",
  },
  {
    number: "4",
    title: "checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "5",
    title: "dialog",
    url: "/ui/overlays/dialog",
  },
];

const items2 = [
  {
    number: "3",
    preview: <AccordionPreview />,
    title: "accordion",
    url: "/ui/overlays/accordion",
  },
  {
    number: "3",
    preview: <AlertPreview />,
    title: "alert",
    url: "/ui/overlays/alert",
  },
  {
    number: "3",
    preview: <AvatarPreview />,
    title: "avatar",
    url: "/ui/overlays/avatar",
  },
  {
    number: "3",
    preview: <BadgePreview />,
    title: "badge",
    url: "/ui/overlays/badge",
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
    <div className="relative mt-20 max-w-full">
      <div>
        <div className="relative flex h-16 items-end whitespace-pre px-2 font-mono text-black/40 text-xs/6 tracking-tighter after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 sm:h-24 dark:text-white/40 dark:after:bg-white/10">
          Components
        </div>

        <div className="relative before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
          <h2 className="text-balance px-2 text-4xl tracking-tighter max-sm:px-4 max-lg:font-medium sm:text-5xl lg:text-6xl">
            Production-ready components
          </h2>
        </div>

        <div className="relative mt-5 px-2 font-mono text-black/40 tracking-tighter before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] after:absolute after:bottom-0 after:h-px max-sm:px-4 dark:text-white/40">
          Build React interfaces faster with accessible, composable UI
          components. Copy, paste, and make it yours.
        </div>

        <Separator />
      </div>

      <div className="relative mt-10 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 dark:before:bg-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items2.map((item, _index) => (
            <div
              className="group relative cursor-pointer"
              key={`${item.title}`}
            >
              <div className="m-4 flex h-60 items-center justify-center bg-neutral-100 p-4 dark:bg-neutral-900">
                {item.preview}
              </div>
              <div className="mt-3 flex items-center justify-between px-4 [&_a]:peer-hover:underline">
                <h3>
                  <Link
                    className="text-lg capitalize hover:underline"
                    href={item.url}
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="font-mono text-black/40 text-xs dark:text-white/40">
                  {item.number} components
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-10 flex gap-2 px-2 before:absolute before:top-0 before:-left-[100vw] before:h-px before:w-[200vw] before:bg-gray-950/5 after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 max-sm:px-4 dark:after:bg-white/10 dark:before:bg-white/10">
        <Button
          className="text-balance rounded-none py-2 tracking-tight"
          render={<Link href="/ui/actions/button" />}
        >
          View all components <ArrowRight />
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

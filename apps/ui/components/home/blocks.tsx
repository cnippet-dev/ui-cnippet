import Image from "next/image";
import Link from "next/link";
import { BorderBottomWithDots } from "../grid-design";
import { Button } from "../ui/button";

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

const _blocks = [
  {
    number: "5",
    title: "blog",
    url: "/sections/blog",
  },
  {
    number: "3",
    title: "contact",
    url: "/sections/contact",
  },
  {
    number: "3",
    title: "feature",
    url: "/sections/feature",
  },
  {
    number: "3",
    title: "hero",
    url: "/sections/hero",
  },
];

function Badge({
  badgeText,
  badgeLink,
  badgeLinkText,
  position,
}: {
  badgeText: string;
  badgeLink?: string;
  badgeLinkText?: string;
  position?: "center" | "left" | "right";
}) {
  return (
    <div
      className={`relative mr-auto w-fit bg-foreground/5 p-1 ${position === "center" ? "mx-auto" : position === "left" ? "mr-auto" : "ml-auto"} `}
    >
      <div
        aria-hidden="true"
        className="absolute top-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-1 right-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute right-1 bottom-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div className="relative flex h-fit items-center gap-2 px-3">
        <span className="text-sm text-title">{badgeText}</span>
        {badgeLink && (
          <>
            <span className="block h-3 w-px bg-foreground/5" />
            <a className="text-primary text-sm" href={badgeLink}>
              {badgeLinkText}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section>
      <div className="relative">
        <section className="px-4 md:px-0">
          <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="space-y-6">
              <div className="space-y-4 sm:space-y-6">
                <Badge
                  badgeLink="https://blocks.cnippet.dev/"
                  badgeLinkText="Visit site"
                  badgeText="Cnippet Blocks"
                  position="left"
                />
                <h2 className="font-figtree font-medium text-2xl leading-tight sm:text-3xl md:text-4xl">
                  From components to complete pages in minutes
                </h2>
                <p className="max-w-3xl text-muted-foreground text-sm leading-relaxed sm:text-base">
                  Pre-built sections, full pages, and production-ready templates
                  that reuse Cnippet UI primitives. Hero sections, pricing
                  tables, dashboards, authentication flows, and more — all
                  customizable with Tailwind.
                </p>
              </div>

              <div>
                <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {_blocks.map((item, index) => (
                    <div key={`${item.title}-${index}`}>
                      <div className="space-y-3 text-center">
                        <Link
                          className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                          href={`https://blocks.cnippet.dev/sections/${item.title}`}
                          target="_blank"
                        >
                          <Image
                            alt={`${item.title} component preview`}
                            className="aspect-video h-44 w-full object-cover"
                            height={1080}
                            loading="lazy"
                            src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1770126024/${item.title}.png`}
                            width={1920}
                          />
                        </Link>

                        <div className="[&_a]:peer-hover:underline">
                          <h2>
                            <Link
                              className="font-medium text-sm capitalize hover:underline sm:text-base"
                              href={item.url}
                            >
                              {item.title === "process"
                                ? "How it works"
                                : item.title}
                            </Link>
                          </h2>
                          <p className="text-muted-foreground text-xs sm:text-[13px]">
                            {item.number} Components
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="group relative mx-auto max-w-6xl overflow-hidden border-x">
            <Button
              className="relative not-disabled:inset-shadow-none w-full rounded-none border-none py-5 text-lg text-white shadow-none dark:bg-neutral-900"
              render={
                <Link
                  href="https://blocks.cnippet.dev/?ref=ui.cnippet.dev"
                  target="_blank"
                />
              }
            >
              <span className="relative z-10">Explore Blocks</span>
              <div className="absolute right-0 bottom-0 left-0 z-0 h-full w-0 bg-neutral-800 transition-all duration-500 ease-in-out group-hover:w-full" />
            </Button>
          </div>
        </section>
        <BorderBottomWithDots />
      </div>
    </section>
  );
}

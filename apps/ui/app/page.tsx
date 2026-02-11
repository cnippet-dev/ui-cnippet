"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/shared/header/site-header";
import { Footer } from "@/components/shared/footer";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";

const _items = [
  {
    number: "2  ",
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

export default function Home() {
  return (
    <> 
    {/* <button
        onClick={() => sendGTMEvent({ event: 'buttonClicked', value: 'xyz' })}
      >
        Send Event
      </button> */}
    
      <SiteHeader />

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-20 sm:px-6 sm:py-28 md:py-40 lg:px-8">
          <div>
            <div className="">
              <div className="absolute inset-0 z-0 flex-none overflow-hidden bg-amber-100 [-webkit-mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] [mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] dark:bg-neutral-800" />

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 text-center sm:space-y-6">
                <Badge className="rounded-full px-3 py-1 text-xs sm:text-sm">
                  Build Faster Than Ever
                </Badge>
                <h1 className="px-4 font-figtree font-medium text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
                <p className="max-w-2xl px-4 text-base text-muted-foreground sm:text-lg md:text-xl">
                  Production-ready React components, smart animations &
                  insightful charts.
                </p>
                <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-2 sm:px-0">
                  <Button
                    className="mx-auto w-fit rounded-full border-blue-700 bg-blue-700 px-6 py-2.5 text-white hover:bg-blue-800 sm:w-auto"
                    render={<Link href="/" />}
                  >
                    Get Started
                  </Button>
                  <Button
                    className="mx-auto w-fit px-6 py-2.5 sm:w-auto"
                    render={<Link href="/ui/actions/button" />}
                    variant="ghost"
                  >
                    Explore components
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h1 className="mb-3 font-figtree font-normal text-2xl sm:mb-4 sm:text-3xl md:text-4xl">
              Essential UI components
            </h1>
            <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
              Build React interfaces faster with production-ready UI components.
              Perfectly integrated with Next.js. Custom Tailwind styling,
              zero-config setup.
            </p>
          </div>
          <div>
            <div className="">
              <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {_items.map((item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <div className="space-y-3 text-center">
                      <Link
                        className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                        href={item.url}
                      >
                        <Image
                          alt={`${item.title} component preview`}
                          className="h-44 w-full object-cover sm:h-48 md:h-52"
                          height={1080}
                          loading="lazy"
                          src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                          width={1920}
                        />
                      </Link>

                      <div className="[&_a]:peer-hover:underline">
                        <h2>
                          <Link
                            className="font-medium text-sm capitalize hover:underline sm:text-base"
                            href={item.url}
                          >
                            {item.title}
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
      </section>

      <Footer />
    </>
  );
}

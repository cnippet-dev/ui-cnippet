"use client";

import { fadeUp } from "cnippet-aos";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/shared/header/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const items = [
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
      <SiteHeader />
      <section className="border-b">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x py-40">
          <div>
            <div className="">
              <div className="absolute inset-0 z-0 flex-none overflow-hidden bg-amber-100 [-webkit-mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] [mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] dark:bg-neutral-800" />

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 text-center">
                <Badge className="rounded-full px-2 py-0.5">
                  Build Faster Than Ever
                </Badge>
                <h1 className="font-figtree font-medium text-6xl">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
                <p className="text-lg">
                  Production-ready React components, smart animations &
                  insightful charts.
                </p>
                <div className="space-x-2">
                  <Button
                    className="rounded-full border-blue-700 bg-blue-700 px-5 py-2 text-white"
                    size="lg"
                  >
                    Get Started
                  </Button>
                  <Button
                    className="rounded-full px-5 py-2"
                    size="lg"
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

      <section className="border-b">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-2 py-10">
          <h1 className="mb-2 font-figtree font-normal text-4xl">
            Essential UI components
          </h1>
          <p className="max-w-xl text-neutral-500">
            Build React interfaces faster with production-ready UI components.
            Perfectly integrated with Next.js. Custom Tailwind styling,
            zero-config setup.
          </p>
          <div>
            <div className="">
              <div className="grid max-w-7xl grid-cols-1 gap-5 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.title}-${index}`}
                    {...fadeUp({
                      delay: 0.5 + index * 0.1,
                      duration: 0.8,
                      once: true,
                      scroll: true,
                    })}
                  >
                    <div className="space-y-3 text-center">
                      <Link
                        className="peer relative inline-flex overflow-hidden rounded-md border sm:flex dark:border-zinc-700/80"
                        href={item.url}
                      >
                        <Image
                          alt=""
                          className="h-52 w-full object-cover"
                          height={1080}
                          src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                          width={1920}
                        />
                      </Link>

                      <div className="[&amp;_a]:peer-hover:underline">
                        <h2>
                          <a
                            className="font-medium text-sm capitalize hover:underline"
                            href={item.url}
                          >
                            {item.title}
                          </a>
                        </h2>
                        <p className="text-[13px] text-muted-foreground">
                          {item.number} Components
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

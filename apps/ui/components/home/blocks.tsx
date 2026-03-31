"use client";
import { fadeUpBlur } from "cnippet-aos";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  BorderBottomWithDots,
  BorderTopWithDots,
} from "@/components/grid-design";
import { Button } from "@/components/ui/button";

const _blocks = [
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
    <section className="relative">
      <div className="relative px-4 md:px-0">
        <BorderTopWithDots />

        <div className="mx-auto flex max-w-6xl items-center border-x px-4 pt-6 pb-4">
          <div className="relative flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
            <motion.h2
              className="font-normal text-2xl uppercase sm:text-3xl md:text-6xl"
              {...fadeUpBlur({
                delay: 0.1,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Blocks
            </motion.h2>
            <motion.p
              className="text-neutral-400 text-xs md:w-72 md:text-right"
              {...fadeUpBlur({
                delay: 0.2,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Pre-built sections, full pages, and production-ready templates
              that reuse Cnippet UI primitives.
            </motion.p>
          </div>
        </div>

        <BorderBottomWithDots />
      </div>

      <div className="relative px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="space-y-6">
            <motion.div
              className="space-y-4 sm:space-y-6"
              {...fadeUpBlur({
                delay: 0.1,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              <div className="relative mr-auto w-fit bg-foreground/5 p-1">
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
                  <span className="text-sm text-title">Cnippet Blocks</span>
                  <span className="block h-3 w-px bg-foreground/5" />
                  <a
                    className="text-primary text-sm"
                    href="https://blocks.cnippet.dev/"
                  >
                    Visit site
                  </a>
                </div>
              </div>
              <h3 className="font-figtree font-medium text-2xl leading-tight sm:text-3xl md:text-4xl">
                From components to complete pages in minutes
              </h3>
              <p className="max-w-3xl text-muted-foreground text-sm leading-relaxed sm:text-base">
                Hero sections, pricing tables, dashboards, authentication flows,
                and more — all customizable with Tailwind.
              </p>
            </motion.div>

            <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {_blocks.map((item, index) => (
                <motion.div
                  key={`${item.title}-${index}`}
                  {...fadeUpBlur({
                    delay: 0.1 + index * 0.08,
                    duration: 0.5,
                    scroll: true,
                    y: 20,
                  })}
                >
                  <div className="space-y-3 text-center">
                    <Link
                      className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                      href={`https://blocks.cnippet.dev/sections/${item.title}`}
                      target="_blank"
                    >
                      <Image
                        alt={`${item.title} block preview`}
                        className="aspect-video h-44 w-full object-cover"
                        height={1080}
                        loading="lazy"
                        src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1770126024/${item.title}.png`}
                        width={1920}
                      />
                    </Link>

                    <div className="[&_a]:peer-hover:underline">
                      <h3>
                        <Link
                          className="font-medium text-sm capitalize hover:underline sm:text-base"
                          href={item.url}
                          target="_blank"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground text-xs sm:text-[13px]">
                        {item.number} Components
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
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
      </div>
    </section>
  );
}

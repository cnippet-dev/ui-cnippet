"use client";
import { fadeUpBlur } from "cnippet-aos";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  BorderBottomWithDots,
  BorderTopWithDots,
} from "@/components/grid-design";

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

export default function Components() {
  return (
    <section className="relative">
      <div className="relative px-4 md:px-0">
        <BorderTopWithDots />

        <motion.div
          className="mx-auto flex max-w-6xl items-center border-x px-4 pt-6 pb-4"
          {...fadeUpBlur({ duration: 0.25, scroll: false, y: 10 })}
        >
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
              Components
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
              Build React interfaces faster with production-ready UI components.
              Perfectly integrated with Next.js. Custom Tailwind styling,
              zero-config setup.
            </motion.p>
          </div>
        </motion.div>

        <BorderBottomWithDots />
      </div>

      <div className="relative px-4 md:px-0">
        <motion.div
          className="mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8"
          {...fadeUpBlur({ duration: 0.25, scroll: false, y: 10 })}
        >
          <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            {_items.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                {...fadeUpBlur({
                  delay: 0.1 + index * 0.06,
                  duration: 0.5,
                  scroll: true,
                  y: 20,
                })}
              >
                <div className="space-y-3 text-center">
                  <Link
                    className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                    href={item.url}
                  >
                    <Image
                      alt={`${item.title} component preview`}
                      className="aspect-video h-52 w-full object-cover"
                      height={1080}
                      loading="eager"
                      src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                      width={1920}
                    />
                  </Link>

                  <div className="[&_a]:peer-hover:underline">
                    <h3>
                      <Link
                        className="font-medium text-sm capitalize hover:underline sm:text-base"
                        href={item.url}
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
          <motion.div
            className="mt-10 text-center"
            {...fadeUpBlur({ delay: 0.5, duration: 0.5, scroll: true, y: 20 })}
          >
            <Link
              className="inline-flex h-9 items-center justify-center gap-2 rounded-none border px-6 text-sm transition-colors hover:bg-muted/50"
              href="/ui/actions/button"
            >
              View all components →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { fadeUpBlur } from "cnippet-aos";
import { motion } from "motion/react";
import Link from "next/link";

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
      <div className="relative px-4 pt-1.5 md:px-0">
        <motion.div
          className="mx-auto max-w-6xl border-x px-2 md:px-0"
          {...fadeUpBlur({ duration: 0.25, scroll: false, y: 10 })}
        >
          <div className="mx-auto max-w-3xl py-32 text-center">
            <motion.div
              className="mb-4"
              {...fadeUpBlur({
                delay: 0.1,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              <Badge
                badgeLink="/docs/introduction"
                badgeLinkText="Learn more"
                badgeText="Now available for Enterprise"
                position="center"
              />
            </motion.div>

            <motion.h1
              className="text-balance font-normal text-4xl text-foreground sm:text-5xl lg:text-6xl"
              {...fadeUpBlur({
                delay: 0.2,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Ship stunning interfaces faster with Cnippet UI.
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 mb-8 max-w-xl text-balance text-lg text-muted-foreground"
              {...fadeUpBlur({
                delay: 0.3,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              Build accessible, composable React components with Base UI and
              Tailwind CSS. Copy, paste, and make it yours.
            </motion.p>
            <motion.div
              className="flex items-center justify-center gap-4"
              {...fadeUpBlur({
                delay: 0.4,
                duration: 0.5,
                scroll: true,
                y: 20,
              })}
            >
              <Link
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-none border-[0.5px] border-white/10 bg-primary px-4 py-2 font-medium text-primary-foreground text-sm shadow-black/15 shadow-md transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                href="/docs/get-started"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-none border border-transparent bg-card px-4 py-2 font-medium text-sm shadow-black/15 shadow-sm ring-1 ring-foreground/10 transition-colors duration-200 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 dark:ring-foreground/15 dark:hover:bg-muted/50"
                href="/ui/actions/button"
              >
                Browse Components
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

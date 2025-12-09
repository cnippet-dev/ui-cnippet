import type React from "react";
import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RiArrowRightUpLine, RiSparkling2Fill } from "@remixicon/react";
import { fadeUp, zoomIn } from "cnippet-aos";

import { Button } from "@/components/ui/button";
import Typewriter from "@/components/motion/typewriter";

const Hero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div className="h-full">
        <section className="relative flex h-full items-center justify-center overflow-hidden px-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="animate-blob absolute top-0 left-1/4 h-96 w-96 rounded-full opacity-20 mix-blend-multiply blur-3xl filter" />
            <div className="animate-blob animation-delay-2000 absolute right-1/4 bottom-0 h-96 w-96 rounded-full opacity-20 mix-blend-multiply blur-3xl filter" />
          </div>

          <div className="relative">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6 sm:py-36 md:px-8 md:py-40">
              <motion.div
                {...fadeUp({ delay: 0.1, duration: 0.8 })}
                className="mb-4 space-y-3"
              >
                <p className="text-primary/70 text-xs font-medium tracking-widest uppercase sm:text-sm">
                  Build Faster Than Ever
                </p>

                <h1 className="text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 0.3,
                  duration: 0.6,
                  y: 20,
                })}
                className="text-muted-foreground mb-6 max-w-xl"
              >
                <span>
                  {
                    "Production-ready React components, smart animations & insightful charts. Perfect for "
                  }
                </span>
                <Typewriter
                  text={["Startups", "Developers", "Agencies", "Teams"]}
                  speed={70}
                  className="text-pretty text-blue-600"
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar={"_"}
                />
              </motion.div>

              <motion.div
                ref={ref}
                {...zoomIn({
                  delay: 0.6,
                  duration: 0.5,
                })}
                className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
              >
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-full shadow-lg transition-all hover:shadow-xl sm:w-auto"
                >
                  <Link href="/docs/introduction" className="flex items-center gap-2">
                    Get Started
                    <RiArrowRightUpLine className="size-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-full bg-transparent sm:w-auto"
                >
                  <Link href="/ui/actions/button">View Components</Link>
                </Button>
              </motion.div>

              <motion.div
                {...fadeUp({ delay: 0.8, duration: 0.6 })}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {["100+ Components", "Open Source", "TypeScript"].map(
                  (feature) => (
                    <div
                      key={feature}
                      className="bg-accent/10 text-accent-foreground border-accent/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
                    >
                      <RiSparkling2Fill className="size-3" />
                      {feature}
                    </div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  },
);

Hero.displayName = "Hero";

export default Hero;

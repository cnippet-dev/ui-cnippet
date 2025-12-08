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
        <section className="relative flex items-center justify-center h-full overflow-hidden px-4 sm:px-6">
          <div className="absolute inset-0 opacity-50 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          </div>

          <div className="relative">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-28 sm:py-36 md:py-40 text-center">
              <motion.div
                {...fadeUp({ delay: 0.1, duration: 0.8 })}
                className="mb-4 space-y-3"
              >
                <p className="text-xs sm:text-sm font-medium tracking-widest text-primary/70 uppercase">
                  Build Faster Than Ever
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight text-balance">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
              </motion.div>

              <motion.div
                {...fadeUp({
                  delay: 0.3,
                  duration: 0.6,
                  y: 20,
                })}
                className="mb-6 max-w-xl  text-muted-foreground"
              >
                <span>
                  {
                    "Production-ready React components, smart animations & insightful charts. Perfect for "
                  }
                </span>
                <Typewriter
                  text={[
                    "Startups",
                    "Developers",
                    "Agencies",
                    "Teams",
                  ]}
                  speed={70}
                  className="text-blue-600 text-pretty"
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
                  className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
                >
                  <Link href="/components" className="flex items-center gap-2">
                    Get Started
                    <RiArrowRightUpLine className="size-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full bg-transparent w-full sm:w-auto"
                >
                  <Link href="/docs">View Components</Link>
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
                      className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent-foreground border border-accent/20"
                    >
                      <RiSparkling2Fill className="size-3" />
                      {feature}
                    </div>
                  )
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);

Hero.displayName = "Hero";

export default Hero;

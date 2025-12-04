import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { RiArrowRightUpLine, RiSparkling2Fill } from "@remixicon/react";
import { fadeUp, fadeUpBlur, zoomIn } from "cnippet-aos";
import Spline from "@splinetool/react-spline";

import { Button } from "@/components/ui/button";
import { TextLoop } from "@/components/motion/text-loop";
import "./home.css";

const Hero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <>
        <div
          style={{
            position: "relative",
            height: "100vh",
            zIndex: 0,
          }}
          className=" w-full max-w-full px-10 isolate
        "
        >
          <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />
        </div>

        <div className="hero-header w-full">
          <section className="relative flex items-center justify-center h-full ">
            <div className="relative z-10">
              <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-32 text-center">
                <motion.h1
                  {...fadeUpBlur({ delay: 0.1, duration: 0.8 })}
                  className="font-normal mb-6 max-w-full text-4xl tracking-tight leading-tight text-gray-900 md:text-6xl lg:text-5xl dark:text-gray-100"
                >
                  Build faster with production-ready{" "}
                  <motion.span
                    {...zoomIn({ delay: 0.1, duration: 0.5 })}
                    className="relative mt-2 rounded-lg inline-flex items-center border border-dashed px-4"
                  >
                    <RiSparkling2Fill className="size-10 text-indigo-600" />
                    Cnippet UI
                  </motion.span>{" "}
                  components
                </motion.h1>

                <motion.div
                  {...fadeUp({
                    delay: 0.3,
                    duration: 0.6,
                    y: 20,
                  })}
                  className="mb-8 max-w-2xl text-center text-lg leading-relaxed tracking-tight wrap-break-word text-gray-700 dark:text-gray-400"
                >
                  Production-ready React components, animations, and charts to
                  ship your next project faster. Perfect for{" "}
                  <motion.span
                    {...zoomIn({ delay: 0.3, duration: 0.5 })}
                    className="inline-block w-24 text-left font-semibold text-gray-900 dark:text-gray-100"
                  >
                    <TextLoop
                      interval={5}
                      className="font-mono text-lg font-normal"
                    >
                      <span>Startups</span>
                      <span>Developers</span>
                      <span>Agencies</span>
                      <span>Teams</span>
                    </TextLoop>
                  </motion.span>
                </motion.div>

                <motion.div
                  ref={ref}
                  {...zoomIn({
                    delay: 0.6,
                    duration: 0.5,
                  })}
                  className="mb-4 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <Button
                    size="lg"
                    className="group cursor-pointer rounded-full bg-indigo-700/90 px-8 py-1 border-none text-sm text-white shadow-none hover:bg-indigo-700"
                  >
                    <Link
                      href="/components"
                      className="flex items-center gap-2"
                    >
                      Get Started
                      <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500" />
                    </Link>
                  </Button>

                  <Button
                    variant="secondary"
                    size="lg"
                    className="flex items-center space-x-2 shadow-none rounded-full text-sm"
                  >
                    <Link href="/docs">View Components</Link>
                  </Button>
                </motion.div>

                <motion.p
                  {...fadeUp({ delay: 0.8, duration: 0.4 })}
                  className="text-xs text-gray-700 dark:text-gray-400"
                >
                  Open-source • TypeScript • Fully customizable
                </motion.p>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
);

Hero.displayName = "Hero";

export default Hero;

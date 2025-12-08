"use client";

import TextRotate from "@/components/motion/text-rotate";

import { useEffect } from "react";
import { motion, stagger, LayoutGroup, useAnimate } from "motion/react";

import Floating, {
  FloatingElement,
} from "@/components/motion/parallax-floating";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TextShimmerWave } from "@/components/motion/text-wave";
import BoxCarouselDemo from "@/components/routes/home/_c/box-carousel-demo";
import VerticalCutReveal from "@/components/routes/home/_c/vertical-cut-reveal-demo";
import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { zoomIn } from "cnippet-aos";
import BreathingText from "@/components/motion/breathing-text";
import MarqueeAlongSvgPathDemo from "./_c/marquee-along-svg-path-demo";
import Typewriter from "@/components/motion/typewriter";
import CirclingElementsDemo from "./_c/circling-elements-demo";
import TextCursorProximityDemo from "@/components/routes/home/_c/text-cursor-proximity-demo";

const exampleImages = [
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h7.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h2.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h3.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h4.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h5.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h6.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h7.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h8.jpg",
  },
];

const Hero = () => {
  const [scope, animate] = useAnimate();

  // useEffect(() => {
  //   animate(
  //     "img",
  //     { opacity: [0, 1] },
  //     { duration: 0.5, delay: stagger(0.15) }
  //   );
  // }, []);

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center grain bg-black overflow-hidden"
      ref={scope}
    >
      {/* <motion.div
        className="z-50 text-center space-y-4 items-center max-w-xl flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-50 text-white font-calendas italic">
          Build faster with production-ready Cnippet UI components
        </p>
        <p className="text-xs z-50 hover:scale-110 transition-transform bg-white text-black rounded-full py-2 w-20 cursor-pointer">
          Download
        </p>
      </motion.div> */}
      <div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-6xl flex flex-col gap-2 items-center justify-center dark:text-muted text-white font-light overflow-hidden p-12 sm:p-20 md:p-24">
        <LayoutGroup>
          <motion.div className="flex relative z-100 whitespace-pre" layout>
            <motion.span
              className="pt-0.5 sm:pt-1 md:pt-2"
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              Ship{" "}
            </motion.span>
            <TextRotate
              texts={[
                "stunning-interfaces",
                "pixel-perfect ✨",
                "production-ready",
                "bulletproof",
                "premium",
                "dev-candy 🍬",
                "code-bliss",
                "slick-UI",
                "crisp-designs",
                "fire-components 🔥",
              ]}
              mainClassName="text-white px-2 sm:px-2 md:px-3 bg-violet-700 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-xl"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={4000}
            />
            <motion.span
              className="pt-0.5 sm:pt-1 md:pt-2"
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              {" "}
              faster
            </motion.span>
          </motion.div>
        </LayoutGroup>

        <motion.p>with Cnippet UI.</motion.p>

        <motion.p className=" pt-10 text-base max-w-xl text-center">
          Production-ready React components, smart animations & insightful
          charts. Perfect for startups, developers, agencies and driven teams.
        </motion.p>

        <motion.div
          {...zoomIn({
            delay: 0.6,
            duration: 0.5,
          })}
          className="mt-4 flex flex-col relative z-100 items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
        >
          <Button
            size="lg"
            render={<Link href="/ui/actions/button" />}
            className="group cursor-pointer rounded-full bg-indigo-700/90 px-8 py-1 border-none text-sm text-white shadow-none hover:bg-indigo-700"
          >
            Get Started
            <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500" />
          </Button>
        </motion.div>
      </div>

      <Floating sensitivity={-1} className="overflow-hidden z-90">
        <FloatingElement depth={0.5} className="top-[40%] left-[1%] ">
          <BoxCarouselDemo />
        </FloatingElement>

        <FloatingElement depth={0.5} className="top-[10%] left-[25%] ">
          <div className="text-3xl sm:text-4xl md:text-5xl flex flex-row gap-12 items-center justify-center font-overused-grotesk">
            <div className="flex flex-col items-center justify-center text-white">
              <BreathingText
                staggerDuration={0.08}
                fromFontVariationSettings="'wght' 100, 'slnt' 0"
                toFontVariationSettings="'wght' 800, 'slnt' -10"
              >
                Breathing Text
              </BreathingText>
            </div>
          </div>
        </FloatingElement>

        <FloatingElement depth={2} className="top-[5%] left-[2%] ">
          <div className="md:text-3xl lg:text-4xl sm:text-2xl text-xl flex flex-row items-start justify-start text-white font-normal overflow-hidden p-16 pt-48">
            <p className="whitespace-pre-wrap">
              <span> </span>
              <Typewriter
                text={[
                  "This",
                  "is",
                  "what a ",
                  "typewritter",
                  "effect looks like 😊",
                ]}
                speed={70}
                className="text-yellow-500 text-pretty"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar={"_"}
              />
            </p>
          </div>
        </FloatingElement>

        <FloatingElement depth={2} className="top-[0%] right-0">
          <div className=" -z-10 overflow-hidden">
            <MarqueeAlongSvgPathDemo />
          </div>
        </FloatingElement>

        <FloatingElement depth={3} className="top-[80%] left-[70%]">
            <TextCursorProximityDemo />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export default Hero;

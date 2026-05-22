"use client";

import { Play, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { cn } from "@/lib/utils";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
}

const animationVariants = {
  fade: {
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    initial: { opacity: 0 },
  },
  "from-bottom": {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    initial: { opacity: 0, y: "100%" },
  },
  "from-center": {
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    initial: { opacity: 0, scale: 0.5 },
  },
  "from-left": {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
    initial: { opacity: 0, x: "-100%" },
  },
  "from-right": {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
    initial: { opacity: 0, x: "100%" },
  },
  "from-top": {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-100%" },
    initial: { opacity: 0, y: "-100%" },
  },
  "left-in-right-out": {
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
    initial: { opacity: 0, x: "-100%" },
  },
  "top-in-bottom-out": {
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
    initial: { opacity: 0, y: "-100%" },
  },
};

export function HeroVideoDialog({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
  className,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={cn("relative", className)}>
      <button
        aria-label="Play video"
        className="group relative cursor-pointer border-0 bg-transparent p-0"
        onClick={() => setIsVideoOpen(true)}
        type="button"
      >
        <img
          alt={thumbnailAlt}
          className="w-full rounded-md border shadow-lg transition-all duration-200 ease-out group-hover:brightness-[0.8]"
          height={1080}
          src={thumbnailSrc}
          width={1920}
        />
        <div className="absolute inset-0 flex scale-[0.9] items-center justify-center rounded-2xl transition-all duration-200 ease-out group-hover:scale-100">
          <div className="flex size-28 items-center justify-center rounded-full bg-primary/10 backdrop-blur-md">
            <div
              className={
                "relative flex size-20 scale-100 items-center justify-center rounded-full bg-linear-to-b from-primary/30 to-primary shadow-md transition-all duration-200 ease-out group-hover:scale-[1.2]"
              }
            >
              <Play
                className="size-8 scale-100 fill-white text-white transition-transform duration-200 ease-out group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                setIsVideoOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <motion.div
              {...selectedAnimation}
              className="relative mx-4 aspect-video w-full max-w-4xl md:mx-0"
              transition={{ damping: 30, stiffness: 300, type: "spring" }}
            >
              <motion.button className="absolute -top-16 right-0 rounded-full bg-neutral-900/50 p-2 text-white text-xl ring-1 backdrop-blur-md dark:bg-neutral-100/50 dark:text-black">
                <XIcon className="size-5" />
              </motion.button>
              <div className="relative isolate z-1 size-full overflow-hidden rounded-2xl border-2 border-white">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="mt-0 size-full rounded-2xl"
                  src={videoSrc}
                  title="Hero Video player"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

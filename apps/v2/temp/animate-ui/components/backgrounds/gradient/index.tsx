"use client";

import { cn } from "@workspace/ui/lib/utils";
import { type HTMLMotionProps, motion } from "motion/react";

type GradientBackgroundProps = HTMLMotionProps<"div">;

function GradientBackground({
  className,
  transition = {
    duration: 15,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
  },
  ...props
}: GradientBackgroundProps) {
  return (
    <motion.div
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      className={cn(
        "size-full bg-[length:400%_400%] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
        className,
      )}
      data-slot="gradient-background"
      transition={transition}
      {...props}
    />
  );
}

export { GradientBackground, type GradientBackgroundProps };

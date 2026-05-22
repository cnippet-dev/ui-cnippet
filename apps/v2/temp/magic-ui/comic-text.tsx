"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type ComicTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: number;
};

export function ComicText({
  children,
  className,
  style,
  fontSize = 5,
}: ComicTextProps) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }

  const dotColor = "#EF4444";
  const backgroundColor = "#FACC15";

  return (
    <motion.div
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      className={cn("select-none text-center", className)}
      initial={{ opacity: 0, rotate: -2, scale: 0.8 }}
      style={{
        backgroundClip: "text",
        backgroundColor: backgroundColor,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${dotColor} 1px, transparent 0)`,
        backgroundSize: "8px 8px",
        filter: `
          drop-shadow(5px 5px 0px #000000) 
          drop-shadow(3px 3px 0px ${dotColor})
        `,
        fontFamily: "'Bangers', 'Comic Sans MS', 'Impact', sans-serif",
        fontSize: `${fontSize}rem`,
        fontWeight: "900",
        textTransform: "uppercase",
        transform: "skewX(-10deg)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        WebkitTextStroke: `${fontSize * 0.35}px #000000`, // Thick black outline
        ...style,
      }}
      transition={{
        duration: 0.6,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}

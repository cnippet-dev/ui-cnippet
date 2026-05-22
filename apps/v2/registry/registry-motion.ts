import type { Registry } from "shadcn/schema";
import type { RegistryCategory } from "./registry-categories";

type MotionItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

function createMotion(options: {
  name: string;
  description: string;
  categories: RegistryCategory[];
  dependencies?: string[];
}): MotionItem {
  return {
    categories: options.categories,
    dependencies: options.dependencies ?? ["motion"],
    description: options.description,
    files: [
      {
        path: `motion/${options.name}.tsx`,
        target: `components/motion/${options.name}.tsx`,
        type: "registry:ui",
      },
    ],
    name: options.name,
    type: "registry:ui",
  };
}

export const motionComponents: MotionItem[] = [
  // Text Animation
  createMotion({
    categories: ["text animation"],
    description:
      "Characters or words animate in with fade, slide-up, or blur and stagger",
    name: "text-reveal",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Characters scramble through random glyphs before resolving to the final text",
    name: "text-scramble",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Text scrambles on hover then resolves back to original",
    name: "scramble-hover",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Characters appear one by one with an optional blinking cursor",
    name: "typewriter",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Cycles through an array of strings with smooth exit and enter transitions",
    name: "text-loop",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Smooth character-level morphing between two strings using shared layout",
    name: "text-morph",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Words roll in and out vertically like a slot machine",
    name: "text-roll",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Words flip in 3D on a timer along X or Y axis rotation",
    name: "flip-words",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Rotating text with configurable enter/exit animations and stagger",
    name: "text-rotate",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Text reveals with a vertical clip-path wipe per character, word, or line",
    name: "vertical-cut-reveal",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Each letter swaps position vertically on hover",
    name: "letter-swap-hover",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Letters rotate in 3D space on hover revealing a second face",
    name: "letter-3d-swap",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Letters swap in random order on hover for a glitchy effect",
    name: "random-letter-swap",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Gradient shine sweeps across text continuously",
    name: "text-shimmer",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Wave-like shimmer ripples across text characters",
    name: "text-shimmer-wave",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Animated gradient colors flowing through text",
    name: "text-gradient",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Background highlight animates behind text on scroll or hover",
    name: "text-highlight",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Animates from a start value to a target number",
    name: "counting-number",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Digits slide up or down independently when value changes (odometer style)",
    name: "sliding-number",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Smooth spring-based number interpolation",
    name: "animated-number",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Text arranged in a circle rotating continuously",
    name: "spinning-text",
  }),
  createMotion({
    categories: ["text animation", "svg animation"],
    description: "Text follows an SVG path, optionally animated",
    name: "text-along-path",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Characters scale and opacity pulse in a wave pattern using variable fonts",
    name: "breathing-text",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Text splits into characters or words with individual animation control",
    name: "splitting-text",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Text rolls in from top or bottom with 3D perspective",
    name: "rolling-text",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Single-slot word rotator with configurable transitions",
    name: "rotating-text",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Smooth blur-based morphing between words",
    name: "morphing-text",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Characters animate in with randomized vibrant colors",
    name: "colorful-text",
  }),
  createMotion({
    categories: ["text animation"],
    description:
      "Characters decrypt from gibberish in a military terminal style",
    name: "encrypted-text",
  }),
  createMotion({
    categories: ["text animation"],
    description: "Words fade in sequentially as if being AI-generated",
    name: "text-generate-effect",
  }),
  createMotion({
    categories: ["text animation", "scroll animation"],
    description: "Text content swaps and transforms tied to scroll position",
    name: "scroll-swap-text",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Variable font weight and width changes per letter on hover",
    name: "variable-font-hover",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Font axes respond to cursor distance from each character",
    name: "variable-font-cursor-proximity",
  }),
  createMotion({
    categories: ["text animation", "hover animation"],
    description: "Characters scale and transform based on cursor distance",
    name: "text-cursor-proximity",
  }),
];

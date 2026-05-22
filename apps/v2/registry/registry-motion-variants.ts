import type { Registry } from "shadcn/schema";
import type { RegistryCategory } from "./registry-categories";

type MotionVariantItem = Omit<Registry["items"][number], "categories"> & {
  categories?: RegistryCategory[];
};

function categories<T extends RegistryCategory[]>(...cats: T): T {
  return cats;
}

function createMotionVariant(options: {
  category: RegistryCategory;
  name: string;
  description?: string;
  dependencies?: string[];
  meta?: { className: string };
}): MotionVariantItem {
  return {
    categories: categories(options.category),
    description: options.description ?? `Basic ${options.category}`,
    files: [
      { path: `motion-variants/${options.name}.tsx`, type: "registry:block" },
    ],
    meta: options.meta ?? { className: "" },
    name: options.name,
    registryDependencies: (options.dependencies ?? []).map(
      (d) => `@cnippet/${d}`,
    ),
    type: "registry:block",
  };
}

export const motionVariants: MotionVariantItem[] = [
  // --- text-reveal ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-reveal"],
      description: [
        "Hero headline — word-by-word fade-in-blur reveal",
        "Character scale — letter-level scale reveal for short taglines",
        "Stacked content block — eyebrow, headline, and body with sequential delays",
      ][i],
      name: `m-text-reveal-${i + 1}`,
    }),
  ),

  // --- text-scramble ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-scramble"],
      description: [
        "Hero headline — auto-scramble on mount resolving left-to-right",
        "Click to retrigger — manually replays the scramble via trigger prop",
        "Scrambled stats — staggered duration across a metric row",
      ][i],
      name: `m-text-scramble-${i + 1}`,
    }),
  ),

  // --- scramble-hover ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["scramble-hover"],
      description: [
        "Navigation links — each link scrambles independently on hover",
        "Hero heading — center reveal direction for a symmetric decode",
        "Repository card — title and metadata scramble with different settings",
      ][i],
      name: `m-scramble-hover-${i + 1}`,
    }),
  ),

  // --- typewriter ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["typewriter"],
      description: [
        "Hero headline — types once with a block-underscore cursor",
        "Looping phrases — cycles through strings with delete animation",
        "Terminal prompt — monospace CLI-style with block cursor",
      ][i],
      name: `m-typewriter-${i + 1}`,
    }),
  ),

  // --- text-loop ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-loop"],
      description: [
        "Looping adjectives — cycles benefit words inline in a heading",
        "Animated status badge — rich content items in a pill with slide transition",
        "Horizontal slide — custom variants swap fade+y for a left-to-right slide",
      ][i],
      name: `m-text-loop-${i + 1}`,
    }),
  ),

  // --- text-morph ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-morph"],
      description: [
        "Word cycler — button group drives character-level morphing between words",
        "Auto-cycling plan name — interval advances through strings in a card",
        "Morphing placeholder — placeholder morphs character-by-character as user types",
      ][i],
      name: `m-text-morph-${i + 1}`,
    }),
  ),
];

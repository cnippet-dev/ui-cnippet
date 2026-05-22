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

  // --- text-rotate ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-rotate"],
      description: [
        "Hero inline — audience descriptor cycles in a heading with character stagger",
        "Manual step control — prev/next buttons drive word-by-word rotation via ref",
        "Feature ticker — short feature strings rotate with fade+y tween and dot indicators",
      ][i],
      name: `m-text-rotate-${i + 1}`,
    }),
  ),

  // --- vertical-cut-reveal ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["vertical-cut-reveal"],
      description: [
        "Hero headline — word-by-word upward clip reveal with left-to-right stagger",
        "Character logotype — center-out stagger on a short brand name",
        "Stacked lines — alternating reverse direction per line with sequential delays",
      ][i],
      name: `m-vertical-cut-reveal-${i + 1}`,
    }),
  ),

  // --- letter-swap-hover ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["letter-swap-hover"],
      description: [
        "Navigation links — each link swaps independently on hover",
        "CTA buttons — filled and outlined buttons with opposite swap directions",
        "Stats row — labels use center-out stagger beneath stat figures",
      ][i],
      name: `m-letter-swap-hover-${i + 1}`,
    }),
  ),

  // --- text-shimmer ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-shimmer"],
      description: [
        "Hero headline — slow sweep on a large heading",
        "Status badges — system-state and AI-processing badges with active shimmer loop",
        "Feature list — heading and three feature strings shimmer at different speeds",
      ][i],
      name: `m-text-shimmer-${i + 1}`,
    }),
  ),

  // --- text-shimmer-wave ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-shimmer-wave"],
      description: [
        "Hero heading — gentle wave with moderate z and y distance",
        "Loading states — fast wave on short strings alongside spinners and pulse indicators",
        "Exaggerated logotype — pushed scale, rotateY, and zDistance on a short all-caps word",
      ][i],
      name: `m-text-shimmer-wave-${i + 1}`,
    }),
  ),

  // --- text-roll ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-roll"],
      description: [
        "Hero headline — letter-by-letter 3D roll reveal for a landing page heading",
        "Stats row — three TextRoll instances with offset delays animate key metrics with replay",
        "Navigation links — staggered roll-in across nav items on mount",
      ][i],
      name: `m-text-roll-${i + 1}`,
    }),
  ),

  // --- flip-words ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["flip-words"],
      description: [
        "Hero inline — adjectives flip inside a heading with primary colour accent",
        "CTA button — action verbs flip inside a full-width button for a sense of urgency",
        "Testimonial card — audience descriptor cycles in a pull-quote layout",
      ][i],
      name: `m-flip-words-${i + 1}`,
    }),
  ),

  // --- counting-number ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["counting-number"],
      description: [
        "Stats section — four counters animate a social-proof grid on mount",
        "Large hero metric — single full-width counter with imperative replay via ref",
        "Dashboard metrics — three gradient counters inside bordered cards with different durations",
      ][i],
      name: `m-counting-number-${i + 1}`,
    }),
  ),

  // --- scroll-reveal ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "scroll animation",
      dependencies: ["scroll-reveal"],
      description: [
        "Feature cards — three cards slide up and fade in with staggered delays on scroll",
        "Feature section — image slides from left, text from right in a split layout",
        "Stepped list — each item slides in from the left with incrementing delay",
      ][i],
      name: `m-scroll-reveal-${i + 1}`,
    }),
  ),

  // --- scroll-progress ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "scroll animation",
      dependencies: ["scroll-progress"],
      description: [
        "Fixed reading bar — 1px bar pinned to viewport top tracks window scroll",
        "In-container progress — gradient bar in card header scoped to a scrollable div",
        "Styled bar with percentage — rounded gradient bar with live percentage label",
      ][i],
      name: `m-scroll-progress-${i + 1}`,
    }),
  ),
];

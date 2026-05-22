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

  // --- text-gradient ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-gradient"],
      description: [
        "Hero heading — violet to cyan looping gradient sweep",
        "Inline word accent — single word with fast orange-to-green sweep inside static heading",
        "Pricing cards — each tier has its own palette and speed",
      ][i],
      name: `m-text-gradient-${i + 1}`,
    }),
  ),

  // --- text-highlight ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-highlight"],
      description: [
        "Scroll triggered — key phrase highlights ltr on viewport entry",
        "Hover triggered — highlight fills in on mouse enter and resets on leave",
        "Direction picker — buttons call ref to demonstrate all four sweep directions",
      ][i],
      name: `m-text-highlight-${i + 1}`,
    }),
  ),

  // --- sliding-number ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["sliding-number"],
      description: [
        "Increment/decrement — +/- buttons drive a single odometer display",
        "Live clock — hours, minutes, seconds as separate padded sliding numbers",
        "Pricing plan switcher — price and seat count animate on tier change",
      ][i],
      name: `m-sliding-number-${i + 1}`,
    }),
  ),

  // --- animated-number ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["animated-number"],
      description: [
        "Stepper — +10/-10 buttons spring the figure through intermediate values",
        "Upload progress — percentage label animates alongside a CSS progress bar",
        "Dashboard metrics — three KPI cards spring on multiplier toggle",
      ][i],
      name: `m-animated-number-${i + 1}`,
    }),
  ),

  // --- breathing-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["breathing-text"],
      description: [
        "Weight + width wave — wght and wdth axes breathe left to right",
        "Center pulse — short logotype word pulses outward from center",
        "Heading + subtitle pair — two instances with opposite stagger directions",
      ][i],
      name: `m-breathing-text-${i + 1}`,
    }),
  ),

  // --- splitting-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["splitting-text"],
      description: [
        "Hero headline — word-level slide-up with spring transition",
        "Preset explorer — buttons switch all five presets on character-level split",
        "Stacked content block — eyebrow, headline, body with different presets",
      ][i],
      name: `m-splitting-text-${i + 1}`,
    }),
  ),

  // --- rolling-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["rolling-text"],
      description: [
        "Hero headline — letters roll up with tight stagger on mount",
        "Stacked display lines — three lines with incremental delay offsets",
        "Navigation links — roll down from above with per-item delay",
      ][i],
      name: `m-rolling-text-${i + 1}`,
    }),
  ),

  // --- rotating-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["rotating-text"],
      description: [
        "Hero inline — adjectives rotate inside a heading with stable width",
        "Framed CTA — action phrases rotate inside a bordered card",
        "Testimonial audience — direction down cycles target audience descriptor",
      ][i],
      name: `m-rotating-text-${i + 1}`,
    }),
  ),

  // --- morphing-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["morphing-text"],
      description: [
        "Auto-cycling hero words — four short action words blur-dissolve in sequence",
        "Tech stack card — stack names morph inside a product card",
        "Hero section — morphing headline anchored by static eyebrow and body copy",
      ][i],
      name: `m-morphing-text-${i + 1}`,
    }),
  ),

  // --- spinning-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["spinning-text"],
      description: [
        "Badge ring — spinning label orbits a centered icon",
        "CTA orbit — reversed ring around a clickable arrow button",
        "Concentric rings — two rings at different radii, speeds, and directions",
      ][i],
      name: `m-spinning-text-${i + 1}`,
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

  // --- colorful-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["colorful-text"],
      description: [
        "Hero headline — full sentence reveals character-by-character with random vibrant colours",
        "Brand logotype — short all-caps word with custom violet-to-teal palette",
        "Cycling phrases — button replays the colour animation across multiple phrases",
      ][i],
      name: `m-colorful-text-${i + 1}`,
    }),
  ),

  // --- encrypted-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["encrypted-text"],
      description: [
        "Hero headline — large heading decrypts left-to-right on mount",
        "Terminal session — CLI commands decrypt sequentially on Enter",
        "Direction picker — buttons replay with each of four revealDirection values",
      ][i],
      name: `m-encrypted-text-${i + 1}`,
    }),
  ),

  // --- text-generate-effect ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-generate-effect"],
      description: [
        "Hero headline — word-by-word blur-fade reveal for landing page headings",
        "AI chat response — assistant card regenerates text on demand via trigger",
        "Stacked content block — eyebrow, headline, and body with different stagger settings",
      ][i],
      name: `m-text-generate-effect-${i + 1}`,
    }),
  ),

  // --- letter-3d-swap ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["letter-3d-swap"],
      description: [
        "Navigation links — letters rotate upward on hover with colour change between faces",
        "CTA buttons — filled and outlined buttons with opposite rotateDirection values",
        "Direction showcase — four rows compare top, right, bottom, and left rotations",
      ][i],
      name: `m-letter-3d-swap-${i + 1}`,
    }),
  ),

  // --- random-letter-swap ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["random-letter-swap"],
      description: [
        "Navigation links — each link shuffles independently on hover",
        "CTA buttons — two buttons with reverse prop contrast for visual distinction",
        "Tag chips — technology tags inside pill badges shuffle on hover",
      ][i],
      name: `m-random-letter-swap-${i + 1}`,
    }),
  ),

  // --- scroll-swap-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["scroll-swap-text"],
      description: [
        "Feature list — each item slides in as the scrollable container is scrolled",
        "Step-by-step process — numbered steps swap in as they cross the scroll threshold",
        "Testimonial quotes — pull quotes scroll into view one at a time",
      ][i],
      name: `m-scroll-swap-text-${i + 1}`,
    }),
  ),

  // --- variable-font-hover ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["variable-font-hover"],
      description: [
        "Navigation links — letters bold from center outward on hover",
        "Hero headline — two lines with inverted weight axes contrast on hover",
        "CTA links — three links each using a different staggerFrom origin",
      ][i],
      name: `m-variable-font-hover-${i + 1}`,
    }),
  ),

  // --- variable-font-cursor-proximity ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["variable-font-cursor-proximity"],
      description: [
        "Hero headline — characters grow from ultra-light to black near cursor",
        "Dual lines — mirrored inverted axes with gaussian falloff",
        "Navigation — nav items respond to proximity with exponential falloff",
      ][i],
      name: `m-variable-font-cursor-proximity-${i + 1}`,
    }),
  ),

  // --- text-cursor-proximity ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-cursor-proximity"],
      description: [
        "Scale — characters grow as cursor approaches with linear falloff",
        "Opacity reveal — two hidden lines appear as cursor sweeps with gaussian falloff",
        "Scale and color — characters grow and shift colour with exponential falloff",
      ][i],
      name: `m-text-cursor-proximity-${i + 1}`,
    }),
  ),

  // --- text-along-path ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text animation",
      dependencies: ["text-along-path"],
      description: [
        "Circular badge — text loops continuously around a circular path",
        "Wave path — text flows along a sinusoidal wave in auto mode",
        "Curved path with visible stroke — cubic Bézier with showPath for debugging",
      ][i],
      name: `m-text-along-path-${i + 1}`,
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

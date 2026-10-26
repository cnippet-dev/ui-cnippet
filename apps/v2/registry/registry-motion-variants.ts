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
      category: "text reveal",
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
      category: "text scramble",
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
      category: "scramble hover",
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
      category: "typewriter",
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
      category: "text loop",
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
      category: "text morph",
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
      category: "text rotate",
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
      category: "vertical cut reveal",
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
      category: "letter swap hover",
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
      category: "text shimmer",
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
      category: "text shimmer wave",
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
      category: "text gradient",
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
      category: "text highlight",
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
      category: "sliding number",
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
      category: "animated number",
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
      category: "breathing text",
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
      category: "splitting text",
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
      category: "rolling text",
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
      category: "rotating text",
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
      category: "morphing text",
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
      category: "spinning text",
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
      category: "text roll",
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
      category: "flip words",
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
      category: "counting number",
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
      category: "colorful text",
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
      category: "encrypted text",
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
      category: "text generate effect",
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
      category: "letter 3d swap",
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
      category: "random letter swap",
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
      category: "scroll swap text",
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
      category: "variable font hover",
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
      category: "variable font cursor proximity",
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
      category: "text cursor proximity",
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
      category: "text along path",
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
      category: "scroll reveal",
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
      category: "scroll progress",
      dependencies: ["scroll-progress"],
      description: [
        "Fixed reading bar — 1px bar pinned to viewport top tracks window scroll",
        "In-container progress — gradient bar in card header scoped to a scrollable div",
        "Styled bar with percentage — rounded gradient bar with live percentage label",
      ][i],
      name: `m-scroll-progress-${i + 1}`,
    }),
  ),

  // --- scroll-velocity-text ---
  ...Array.from({ length: 4 }, (_, i) =>
    createMotionVariant({
      category: "scroll velocity text",
      dependencies: ["scroll-velocity-text"],
      description: [
        "Word marquee — continuous horizontal scroll of tech-stack words, speeds up on scroll",
        "Opposing rows — two rows scrolling in opposite directions, velocity-reactive",
        "Pill marquee — badge-style items scrolling continuously at a fixed speed",
        "Logo row — a customer logo strip that speeds up with scrolling",
      ][i],
      name: `m-scroll-velocity-text-${i + 1}`,
    }),
  ),

  // --- parallax-floating ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "parallax floating",
      dependencies: ["parallax-floating"],
      description: [
        "Floating shapes — geometric shapes at different depths follow the cursor",
        "Floating card — card with glow blobs and dot accents at independent depth layers",
        "Floating symbols — abstract symbols drift at different depths following cursor",
      ][i],
      name: `m-parallax-floating-${i + 1}`,
    }),
  ),

  // --- stacking-cards ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "stacking cards",
      dependencies: ["stacking-cards"],
      description: [
        "Feature cards — three feature cards stack as you scroll through the section",
        "Testimonial cards — customer quotes stack on scroll with subtle scaling",
        "Process steps — numbered steps stack sequentially on scroll",
      ][i],
      name: `m-stacking-cards-${i + 1}`,
    }),
  ),

  // --- progressive-blur ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "progressive blur",
      dependencies: ["progressive-blur"],
      description: [
        "List fade — content list with progressive blur fade at the bottom",
        "Gallery edges — horizontal row of cards with left and right edge blur",
        "Nav overflow — horizontal nav bar with right-edge blur for overflow indication",
      ][i],
      name: `m-progressive-blur-${i + 1}`,
    }),
  ),

  // --- canvas-text ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "canvas text",
      dependencies: ["canvas-text"],
      description: [
        "Landing hero — one word of the headline filled with flowing token-colored lines",
        "Pricing card — the price drawn in custom brand colors",
        "Section label — a small animated eyebrow above a feature heading",
      ][i],
      name: `m-canvas-text-${i + 1}`,
    }),
  ),

  // --- text-flipping-board ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "text flipping board",
      dependencies: ["text-flipping-board"],
      description: [
        "Departures board — four rows that flip to the next set of flights",
        "Announcement bar — a single row cycling through promo messages",
        "Countdown — a launch timer where each second is one flip",
      ][i],
      name: `m-text-flipping-board-${i + 1}`,
    }),
  ),

  // --- sticky-scroll-reveal ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "sticky scroll reveal",
      dependencies: ["sticky-scroll-reveal"],
      description: [
        "Feature walkthrough — four features with a sticky illustration panel",
        "Onboarding steps — numbered setup steps with a sticky form preview",
        "Changelog — release highlights with a sticky notes panel",
      ][i],
      name: `m-sticky-scroll-reveal-${i + 1}`,
    }),
  ),

  // --- container-scroll ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "container scroll",
      dependencies: ["container-scroll"],
      description: [
        "Dashboard reveal — an analytics screen tilts flat under a headline",
        "Mobile app — a phone-shaped card with a chat screen",
        "Video frame — a keynote poster with a play button tilts into view",
      ][i],
      name: `m-container-scroll-${i + 1}`,
    }),
  ),

  // --- hero-parallax ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "hero parallax",
      dependencies: ["hero-parallax"],
      description: [
        "Portfolio wall — three rows of project shots under a studio intro",
        "Template gallery — two rows of site templates",
        "Multi-depth — rows moving at different speeds for a layered hero",
      ][i],
      name: `m-hero-parallax-${i + 1}`,
    }),
  ),

  // --- scroll-image-reveal ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "scroll image reveal",
      dependencies: ["scroll-image-reveal"],
      description: [
        "Case study cover — the cover image wipes up as you reach it",
        "Circle hero — a full-width photo expands from a circle",
        "Reveal grid — three tiles wiping in from different edges",
      ][i],
      name: `m-scroll-image-reveal-${i + 1}`,
    }),
  ),

  // --- macbook-scroll ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "macbook scroll",
      dependencies: ["macbook-scroll"],
      description: [
        "Product launch — the lid opens onto a wallpaper with a NEW badge",
        "App screen — custom UI rendered on the laptop screen",
        "Demo video — a video poster with player controls on screen",
      ][i],
      name: `m-macbook-scroll-${i + 1}`,
    }),
  ),

  // --- horizontal-scroll ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "horizontal scroll",
      dependencies: ["horizontal-scroll"],
      description: [
        "Case studies — cards with results scroll sideways while pinned",
        "Company timeline — milestones by year on a horizontal track",
        "Photo gallery — tall images in a fast horizontal strip",
      ][i],
      name: `m-horizontal-scroll-${i + 1}`,
    }),
  ),

  // --- scroll-direction-header ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "scroll direction header",
      dependencies: ["scroll-direction-header"],
      description: [
        "Site header — hides while reading down, returns on scroll up",
        "Mobile tab bar — a bottom bar that slides away while browsing",
        "Docs toolbar — stays while reading, slides away on scroll up",
      ][i],
      name: `m-scroll-direction-header-${i + 1}`,
    }),
  ),

  // --- sticky-footer ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "sticky footer",
      dependencies: [
        ["sticky-footer"],
        ["sticky-footer", "button"],
        ["sticky-footer", "button", "input"],
      ][i],
      description: [
        "Brand footer — oversized wordmark uncovered at the end of the page",
        "CTA footer — a sign-up prompt revealed under an FAQ",
        "Newsletter footer — an email form revealed under a post list",
      ][i],
      name: `m-sticky-footer-${i + 1}`,
    }),
  ),

  // --- scroll-snap-sections ---
  ...Array.from({ length: 3 }, (_, i) =>
    createMotionVariant({
      category: "scroll snap sections",
      dependencies: ["scroll-snap-sections"],
      description: [
        "Product story — four full-height chapters with dot navigation",
        "Onboarding slides — horizontal slides in a phone-sized frame",
        "Testimonials — one quote per snapped section",
      ][i],
      name: `m-scroll-snap-sections-${i + 1}`,
    }),
  ),
];

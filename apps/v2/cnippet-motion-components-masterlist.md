# Cnippet Motion — Complete Component Master List

> A comprehensive catalog of all motion/animated components to build for **Cnippet UI Motion**, organized by category. Each component includes a brief description, suggested engine (Motion / GSAP / CSS), complexity tier, and reference sources.

---

## Format Convention

Following the same structure as the reference libraries (fancy & motion-primitives):

```
src/motion/
├── components/       ← Core component source files
│   ├── text/
│   ├── scroll/
│   ├── ...
├── examples/         ← Demo/preview files for each component
│   ├── text/
│   ├── scroll/
│   ├── ...
```

Each component ships with:
- **Component file** — self-contained, copy-paste ready (`"use client"`)
- **1–5 Example files** — real-world demos showcasing variants/props
- **Registry entry** — name, dependencies, description, type

---

## 1. Text Animations

The largest and most in-demand category. Text animations are the #1 reason devs reach for motion libraries.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 1 | **Text Reveal** | Characters/words animate in (fade, slide-up, blur) with stagger | Motion | Basic | motion-primitives `text-effect` |
| 2 | **Text Scramble** | Characters scramble through random glyphs before resolving | Motion | Basic | motion-primitives `text-scramble`, fancy `scramble-in` |
| 3 | **Scramble Hover** | Text scrambles on hover, then resolves back | Motion | Basic | fancy `scramble-hover` |
| 4 | **Typewriter** | Characters appear one by one with optional blinking cursor | CSS/Motion | Basic | fancy `typewriter`, aceternity `typewriter-effect` |
| 5 | **Text Loop** | Cycles through an array of strings with exit/enter transitions | Motion | Basic | motion-primitives `text-loop` |
| 6 | **Text Morph** | Smooth character-level morphing between two strings | Motion | Intermediate | motion-primitives `text-morph` |
| 7 | **Text Roll** | Words roll in/out vertically like a slot machine | Motion | Basic | motion-primitives `text-roll` |
| 8 | **Flip Words** | Words flip in 3D on a timer (X or Y axis rotation) | Motion | Basic | aceternity `flip-words` |
| 9 | **Text Rotate** | Rotating text with configurable enter/exit animations & stagger | Motion | Intermediate | fancy `text-rotate` |
| 10 | **Vertical Cut Reveal** | Text reveals with a vertical clip-path wipe (per char/word/line) | Motion | Intermediate | fancy `vertical-cut-reveal` |
| 11 | **Letter Swap Hover** | Each letter swaps to a new position/character on hover | Motion | Intermediate | fancy `letter-swap-forward-anim` |
| 12 | **Letter 3D Swap** | Letters rotate in 3D space on hover, revealing new faces | Motion | Advanced | fancy `letter-3d-swap` |
| 13 | **Random Letter Swap** | Letters swap in random order on hover for a glitchy effect | Motion | Intermediate | fancy `random-letter-swap-*` |
| 14 | **Text Shimmer** | Gradient shine sweeps across text continuously | CSS/Motion | Basic | motion-primitives `text-shimmer` |
| 15 | **Text Shimmer Wave** | Wave-like shimmer ripple across text characters | Motion | Intermediate | motion-primitives `text-shimmer-wave` |
| 16 | **Text Gradient** | Animated gradient colors flowing through text | CSS | Basic | animate-ui `gradient-text` |
| 17 | **Text Highlight** | Background highlight animates behind text on scroll/hover | Motion | Basic | animate-ui `highlight-text`, fancy `text-highlighter` |
| 18 | **Counting Number** | Animates from 0 to target number (integer counter) | Motion | Basic | animate-ui `counting-number`, fancy `basic-number-ticker` |
| 19 | **Sliding Number** | Digits slide up/down independently when value changes (odometer) | Motion | Intermediate | motion-primitives `sliding-number` |
| 20 | **Animated Number** | Smooth spring-based number interpolation | Motion | Basic | motion-primitives `animated-number` |
| 21 | **Spinning Text** | Text arranged in a circle, rotating continuously | Motion | Intermediate | motion-primitives `spinning-text` |
| 22 | **Text Along Path** | Text follows an SVG path, optionally animated on scroll | SVG/GSAP | Intermediate | fancy `text-along-path` |
| 23 | **Breathing Text** | Characters scale/opacity pulse in a wave pattern | CSS/Motion | Basic | fancy `breathing-text` |
| 24 | **Splitting Text** | Text splits into chars/words with individual animation control | Motion | Basic | animate-ui `splitting-text` |
| 25 | **Rolling Text** | Text rolls in from top/bottom with 3D perspective | Motion | Basic | animate-ui `rolling-text` |
| 26 | **Rotating Text** | Single-slot word rotator with configurable transitions | Motion | Basic | animate-ui `rotating-text` |
| 27 | **Morphing Text** | Smooth SVG-path-based morphing between words | Motion | Advanced | animate-ui `morphing-text` |
| 28 | **Colorful Text** | Characters animate in with randomized vibrant colors | Motion | Basic | aceternity `colourful-text` |
| 29 | **Encrypted Text** | Characters decrypt from gibberish, military terminal style | JS/Motion | Basic | aceternity `encrypted-text` |
| 30 | **Canvas Text** | Animated curved colored lines clipped to text shape | Canvas/GSAP | Advanced | aceternity `canvas-text` |
| 31 | **Text Flipping Board** | Split-flap / Vestaboard style flip transitions | Motion | Advanced | aceternity `text-flipping-board` |
| 32 | **Text Generate Effect** | Words/chars fade in sequentially as if being AI-generated | Motion | Basic | aceternity `text-generate-effect` |
| 33 | **Scroll & Swap Text** | Text content swaps/transforms tied to scroll position | GSAP/Motion | Intermediate | fancy `scroll-and-swap-text` |
| 34 | **Variable Font Hover** | Variable font weight/width changes per letter on hover | CSS/JS | Intermediate | fancy `variable-font-hover-by-letter` |
| 35 | **Variable Font Cursor Proximity** | Font axes respond to cursor distance from each character | JS | Advanced | fancy `variable-font-cursor-proximity` |
| 36 | **Text Cursor Proximity** | Characters scale/transform based on cursor distance | Motion | Advanced | fancy `text-cursor-proximity` |

---

## 2. Scroll Animations

The second most requested category — scroll-driven reveals, progress, parallax, and velocity effects.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 37 | **Scroll Reveal** | Elements animate in when entering viewport (fade, slide, scale, blur) | Motion | Basic | animate-ui, motion-primitives `in-view` |
| 38 | **Scroll Progress** | Progress bar/indicator tied to scroll position | Motion | Basic | motion-primitives `scroll-progress`, animate-ui |
| 39 | **Scroll Velocity Text** | Text marquee speed reacts to scroll velocity | Motion | Intermediate | magic-ui `scroll-based-velocity` |
| 40 | **Sticky Scroll Reveal** | Content sections pin and reveal alongside scrolling text | GSAP/Motion | Advanced | aceternity `sticky-scroll-reveal` |
| 41 | **Container Scroll Animation** | 3D perspective rotation tied to scroll (mockup reveals) | Motion | Intermediate | aceternity `container-scroll-animation` |
| 42 | **Hero Parallax** | Multi-layer parallax hero section with depth on scroll | Motion | Intermediate | aceternity `hero-parallax` |
| 43 | **Parallax Floating** | Elements float at different scroll speeds for depth effect | Motion | Intermediate | fancy `parallax-floating` |
| 44 | **Stacking Cards** | Cards stack/unstack on scroll like a deck | GSAP/Motion | Intermediate | fancy `stacking-cards` |
| 45 | **Scroll Image Reveal** | Image progressively reveals (clip-path / mask) on scroll | GSAP | Intermediate | motion.dev tutorials |
| 46 | **Macbook Scroll** | 3D laptop opens/closes tied to scroll progress | Motion | Advanced | aceternity `macbook-scroll` |
| 47 | **Horizontal Scroll** | Scroll-jacked horizontal scrolling section | GSAP | Intermediate | common pattern |
| 48 | **Scroll Direction Header** | Header hides/shows based on scroll direction | Motion | Basic | motion.dev `scroll-direction-hide-header` |
| 49 | **Progressive Blur** | Content blurs progressively at edges of scroll container | CSS/Motion | Basic | motion-primitives `progressive-blur` |
| 50 | **Sticky Footer** | Footer element sticks and animates into view on scroll | CSS/Motion | Basic | fancy `sticky-footer` |
| 51 | **Scroll Snap Sections** | Full-page sections with smooth scroll-snap and transitions | CSS/GSAP | Intermediate | common trend |

---

## 3. Hover & Interaction Animations

Cursor-driven, gesture-driven, and hover-triggered micro-interactions.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 52 | **Magnetic** | Elements attract toward cursor on hover | Motion | Basic | motion-primitives `magnetic` |
| 53 | **Tilt** | 3D tilt/parallax on hover based on cursor position | Motion | Basic | motion-primitives `tilt`, animate-ui |
| 54 | **Spotlight** | Light/glow effect follows cursor over a surface | Motion | Basic | motion-primitives `spotlight`, aceternity |
| 55 | **Glow Effect** | Animated glow border/fill follows cursor movement | Motion | Basic | motion-primitives `glow-effect` |
| 56 | **Border Trail** | Animated trail races around element border | Motion | Intermediate | motion-primitives `border-trail` |
| 57 | **Cursor** | Custom animated cursor with follower/trail | Motion | Basic | motion-primitives `cursor`, animate-ui |
| 58 | **Image Zoom** | Smooth zoom-in on hover (like a magnifying lens) | Motion | Basic | animate-ui `image-zoom`, aceternity `lens` |
| 59 | **Direction Aware Hover** | Card content slides in from the direction the cursor entered | Motion | Intermediate | aceternity `direction-aware-hover` |
| 60 | **Card Hover Effect** | Multi-layer parallax/elevation shift on card hover | Motion | Intermediate | aceternity `card-hover-effect` |
| 61 | **3D Card Effect** | Card rotates in 3D with elevated floating child elements | Motion | Advanced | aceternity `3d-card-effect` |
| 62 | **Wobble Card** | Card wobbles/jiggles on hover with spring physics | Motion | Basic | aceternity `wobble-card` |
| 63 | **Hover Border Gradient** | Animated gradient border on hover | CSS/Motion | Basic | aceternity `hover-border-gradient` |
| 64 | **Moving Border** | Gradient conic border that rotates continuously | CSS | Basic | aceternity `moving-border` |
| 65 | **Link Preview** | Hover over a link to see an animated preview popover | Motion | Intermediate | aceternity `link-preview` |
| 66 | **Image Comparison** | Before/after slider with draggable divider | Motion | Basic | motion-primitives `image-comparison` |
| 67 | **Click Effect** | Ripple/particle burst on click | Motion | Basic | animate-ui `click-effect` |
| 68 | **Shine** | Diagonal shine sweep on hover | CSS | Basic | animate-ui `shine` |
| 69 | **Focus Cards** | Hovered card sharpens, siblings blur | Motion | Basic | aceternity `focus-cards` |

---

## 4. Layout & Transition Animations

Component-level transitions: mount/unmount, morphing, panels, and layout shifts.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 70 | **Animated Group** | Staggered entrance animation for a group of children | Motion | Basic | motion-primitives `animated-group` |
| 71 | **Transition Panel** | Panels crossfade/slide between different content states | Motion | Basic | motion-primitives `transition-panel` |
| 72 | **Morphing Dialog** | Dialog morphs from its trigger element (shared layout) | Motion | Advanced | motion-primitives `morphing-dialog` |
| 73 | **Morphing Popover** | Popover morphs from trigger with fluid shape transitions | Motion | Advanced | motion-primitives `morphing-popover` |
| 74 | **Animated Modal** | Modal with spring-based enter/exit + overlay fade | Motion | Basic | aceternity `animated-modal` |
| 75 | **Animated Tooltip** | Tooltip with smooth enter/exit and follow cursor option | Motion | Basic | aceternity `animated-tooltip` |
| 76 | **Flip Card** | Card flips 180° to reveal back content | Motion | Basic | animate-ui `flip-card` |
| 77 | **Auto Height** | Smooth height animation when content changes | Motion | Basic | animate-ui `auto-height` |
| 78 | **Accordion** | Collapsible sections with smooth height + opacity animation | Motion | Basic | motion-primitives `accordion` |
| 79 | **Disclosure** | Show/hide content with animated transitions | Motion | Basic | motion-primitives `disclosure` |
| 80 | **Animated Tabs** | Tab content crossfades/slides with layout animation | Motion | Basic | animate-ui `tabs`, aceternity `animated-testimonials` |
| 81 | **Page Transition** | Route-level enter/exit animation for Next.js App Router | Motion | Intermediate | common pattern |
| 82 | **Expandable Card** | Card expands to full-screen with shared layout animation | Motion | Advanced | aceternity `expandable-card` |
| 83 | **Spring** | Generic spring-animated wrapper for any transform property | Motion | Basic | animate-ui `spring` |

---

## 5. Marquee & Infinite Scroll

Continuous movement loops — a staple of modern landing pages.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 84 | **Simple Marquee** | Infinite horizontal/vertical scroll of content | CSS/Motion | Basic | fancy `simple-marquee` |
| 85 | **Infinite Slider** | Seamless looping content slider | Motion | Basic | motion-primitives `infinite-slider` |
| 86 | **Marquee Along SVG Path** | Items travel along a custom SVG path endlessly | Motion/SVG | Advanced | fancy `marquee-along-svg-path` |
| 87 | **3D Marquee** | Marquee with 3D perspective rotation | Motion | Intermediate | fancy `simple-marquee-3d`, aceternity `3d-marquee` |
| 88 | **Drag Marquee** | Marquee that can be dragged to scrub speed/direction | Motion | Intermediate | fancy `simple-marquee-drag` |
| 89 | **Logo Cloud / Infinite Moving Cards** | Continuous logo or card scroll (common social proof pattern) | CSS/Motion | Basic | aceternity `infinite-moving-cards` |
| 90 | **Velocity Marquee** | Marquee speed tied to scroll velocity | Motion | Intermediate | magic-ui `scroll-based-velocity` |

---

## 6. Background & Decorative Effects

Ambient animations for hero sections, cards, and page backgrounds.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 91 | **Animated Gradient** | Smooth morphing gradient background (SVG or CSS) | CSS/SVG | Basic | fancy `animated-gradient-with-svg` |
| 92 | **Pixel Trail** | Grid of pixels that light up following cursor movement | Canvas/JS | Intermediate | fancy `pixel-trail` |
| 93 | **Aurora Background** | Northern-lights style flowing gradient | CSS | Basic | aceternity `aurora-background` |
| 94 | **Background Beams** | Animated light beams radiating across background | Motion | Intermediate | aceternity `background-beams` |
| 95 | **Meteors** | Falling meteor/shooting star particles | CSS | Basic | aceternity `meteors` |
| 96 | **Sparkles** | Randomly twinkling sparkle particles | Motion | Basic | aceternity `sparkles` |
| 97 | **Particles** | Configurable particle system (connect, repel, attract) | Canvas | Intermediate | animate-ui `particles` |
| 98 | **Grid & Dot Backgrounds** | Animated grid lines or dot patterns | CSS/SVG | Basic | aceternity `grid-and-dot-backgrounds` |
| 99 | **Wavy Background** | Undulating wave animation | SVG/CSS | Basic | aceternity `wavy-background` |
| 100 | **Vortex** | Swirling vortex particle effect | Canvas | Advanced | aceternity `vortex` |
| 101 | **Background Ripple** | Concentric ripple rings expanding outward | CSS/SVG | Basic | aceternity `background-ripple-effect` |
| 102 | **Gradient Animation** | Multi-color gradient that shifts and morphs over time | CSS | Basic | aceternity `gradient-animation` |
| 103 | **Canvas Reveal Effect** | Canvas-based paint/reveal on hover/scroll | Canvas | Intermediate | aceternity `canvas-reveal-effect` |
| 104 | **Tracing Beam** | Beam of light traces along a path as you scroll | SVG/Motion | Intermediate | aceternity `tracing-beam` |
| 105 | **Lamp Effect** | Spotlight cone illumination from top | CSS/SVG | Basic | aceternity `lamp-effect` |
| 106 | **Animated Background** | Segmented control / tab background that slides to active item | Motion | Basic | motion-primitives `animated-background` |
| 107 | **Shooting Stars** | Stars streak across the background periodically | CSS | Basic | aceternity `shooting-stars` |
| 108 | **Glowing Stars** | Stars gently pulse and glow | CSS | Basic | aceternity `glowing-stars` |
| 109 | **Motion Grid** | Animated grid cells with staggered entrance | Motion | Basic | animate-ui `motion-grid` |

---

## 7. Navigation & UI Chrome

Animated navigation patterns, toolbars, and docks.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 110 | **Dock** | macOS-style dock with magnification on hover | Motion | Intermediate | motion-primitives `dock`, aceternity `floating-dock` |
| 111 | **Floating Navbar** | Navbar that shrinks/morphs on scroll | Motion | Intermediate | aceternity `floating-navbar` |
| 112 | **Dynamic Toolbar** | Toolbar that morphs content based on state | Motion | Intermediate | motion-primitives `toolbar-dynamic` |
| 113 | **Expandable Toolbar** | Toolbar that expands to reveal extra actions | Motion | Intermediate | motion-primitives `toolbar-expandable` |
| 114 | **Animated Tabs** | Tab indicator slides/morphs between active tab | Motion | Basic | motion-primitives (animated-background as tabs) |
| 115 | **Sidebar** | Collapsible sidebar with smooth width/opacity animation | Motion | Basic | aceternity `sidebar` |
| 116 | **Radial Menu** | Circular expanding menu from a center point | Motion | Intermediate | animate-ui `radial-menu` |
| 117 | **Radial Nav** | Radial navigation with arc-based items | Motion | Intermediate | animate-ui `radial-nav` |
| 118 | **Command Palette** | Animated command menu with search and transitions | Motion | Intermediate | motion.dev examples |
| 119 | **Theme Toggler** | Animated dark/light mode toggle (sun↔moon morph) | Motion | Basic | animate-ui `theme-toggler` |

---

## 8. Carousel & Slider

Beyond simple swipe — animated, physics-based, and 3D carousels.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 120 | **Box Carousel** | 3D box/cube rotation carousel | Motion | Intermediate | fancy `box-carousel` |
| 121 | **Carousel** | Horizontal/vertical draggable carousel with momentum | Motion | Basic | motion-primitives `carousel` |
| 122 | **Motion Carousel** | Carousel with spring-based snap and gesture control | Motion | Intermediate | animate-ui `motion-carousel` |
| 123 | **Apple Cards Carousel** | Apple-style expandable card carousel | Motion | Advanced | aceternity `apple-cards-carousel` |
| 124 | **Images Slider** | Full-bleed image slider with crossfade/slide transitions | Motion | Basic | aceternity `images-slider` |

---

## 9. Physics & Simulation

Physics-engine-powered effects using Matter.js, Rapier, or custom springs.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 125 | **Gravity** | Elements fall and collide with realistic physics | Matter.js | Advanced | fancy `gravity` |
| 126 | **Cursor Attractor & Gravity** | Elements are attracted to cursor with gravitational pull | Matter.js | Advanced | fancy `cursor-attractor-and-gravity` |
| 127 | **Elastic Line** | SVG line that stretches and snaps with spring physics | Motion | Intermediate | fancy `elastic-line` |
| 128 | **Drag Elements** | Freely draggable elements with momentum and bounds | Motion | Basic | fancy `drag-elements` |
| 129 | **Float** | Elements gently float up/down with randomized easing | Motion | Basic | fancy `float` |
| 130 | **Screensaver** | Bouncing element (DVD screensaver style) | JS | Basic | fancy `screensaver` |
| 131 | **Draggable Card** | Card with physics-based drag, throw, and bounce | Motion | Intermediate | aceternity `draggable-card` |

---

## 10. Image & Media

Animations specifically for images, video, and visual media.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 132 | **Image Trail** | Trail of images follows cursor movement | Motion | Intermediate | fancy `image-trail` |
| 133 | **Parallax Hero Images** | Multi-depth parallax images in hero sections | Motion | Intermediate | aceternity `parallax-hero-images` |
| 134 | **Card Stack** | Swipeable/dismissable stack of image cards | Motion | Intermediate | aceternity `card-stack` |
| 135 | **Hero Video Dialog** | Click thumbnail to expand into video modal | Motion | Basic | magic-ui |
| 136 | **Pixelated Canvas** | Image rendered as interactive pixel grid | Canvas | Intermediate | aceternity `pixelated-canvas` |

---

## 11. SVG & Path Animations

SVG-specific drawing, morphing, and path-based effects.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 137 | **Draw SVG** | SVG paths draw on screen (signature, icon, illustration) | GSAP/CSS | Intermediate | common pattern |
| 138 | **SVG Mask Effect** | Content reveals through animated SVG mask | SVG/Motion | Intermediate | aceternity `svg-mask-effect` |
| 139 | **Element Along SVG Path** | Element follows/animates along an SVG path | GSAP/Motion | Intermediate | fancy `element-along-svg-path` |
| 140 | **Circling Elements** | Items orbit in a circle with configurable radius/speed | Motion | Basic | fancy `circling-elements` |
| 141 | **Wave SVG Paths** | Animated wave pattern using SVG paths | SVG | Basic | aceternity `svg-paths-wave` |
| 142 | **Morph Shape** | One SVG shape smoothly morphs into another | GSAP | Advanced | common GSAP pattern |

---

## 12. Filter & Shader Effects

CSS/SVG filter-based and WebGL shader effects.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 143 | **Gooey SVG Filter** | Metaball/gooey merging effect between elements | SVG Filter | Intermediate | fancy `gooey-svg-filter` |
| 144 | **Pixelate SVG Filter** | Pixelation filter on hover/transition | SVG Filter | Basic | fancy `pixelate-svg-filter` |
| 145 | **Blur Transition** | Element blurs in/out as enter/exit transition | Motion | Basic | animate-ui `blur` |
| 146 | **Noise Background** | Animated film grain / noise texture overlay | CSS/Canvas | Basic | aceternity `noise-background` |
| 147 | **Dither Shader** | Real-time ordered dithering effect | WebGL/Canvas | Advanced | aceternity `dither-shader` |
| 148 | **Glare Card** | Card with animated glare/reflection on hover | CSS | Basic | aceternity `glare-card` |

---

## 13. Button & Micro-Interaction

Animated buttons, loaders, and small stateful interactions.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 149 | **Shimmer Button** | Button with animated shimmer/shine sweep | CSS | Basic | magic-ui |
| 150 | **Stateful Button** | Button transitions between idle → loading → success states | Motion | Basic | aceternity `stateful-button` |
| 151 | **Animated Underline** | Link underline animates in from center/left/right on hover | CSS/Motion | Basic | fancy `underline-*` |
| 152 | **Underline to Background** | Underline expands into full background fill on hover | CSS | Basic | fancy `underline-to-background` |
| 153 | **Multi-Step Loader** | Step-based loading animation with progress stages | Motion | Intermediate | aceternity `multi-step-loader` |
| 154 | **Loader** | Assorted animated loading spinners/indicators | CSS/Motion | Basic | aceternity `loader` |
| 155 | **Notification List** | Stacking toast/notification animations | Motion | Basic | animate-ui `notification-list` |
| 156 | **Share Button** | Animated share menu that expands with options | Motion | Basic | animate-ui `share-button` |

---

## 14. Block / Composition Components

Higher-level composed components that combine multiple primitives into full sections.

| # | Component | Description | Engine | Tier | Ref |
|---|-----------|-------------|--------|------|-----|
| 157 | **Media Between Text** | Image/video sandwiched between two text blocks, reveals on scroll | Motion | Intermediate | fancy `media-between-text` |
| 158 | **CSS Box** | 3D CSS box with animated faces (hover/scroll triggered) | CSS | Intermediate | fancy `css-box` |
| 159 | **Bento Grid** | Animated bento-style grid layout with staggered reveals | Motion | Intermediate | aceternity `bento-grid` |
| 160 | **Timeline** | Vertical/horizontal animated timeline with scroll-driven progress | Motion | Intermediate | aceternity `timeline` |
| 161 | **Compare** | Side-by-side comparison with animated slider/highlights | Motion | Basic | aceternity `compare` |
| 162 | **Animated Testimonials** | Auto-cycling testimonials with smooth transitions | Motion | Basic | aceternity `animated-testimonials` |
| 163 | **Pinned List** | List items pin and stack as you scroll through them | GSAP/Motion | Intermediate | animate-ui `pin-list` |
| 164 | **Management Bar** | Animated action bar that morphs for different contexts | Motion | Intermediate | animate-ui `management-bar` |

---

## Summary by Category

| Category | Count | Priority |
|----------|-------|----------|
| Text Animations | 36 | 🔴 Critical — highest demand |
| Scroll Animations | 15 | 🔴 Critical — second most requested |
| Hover & Interaction | 18 | 🟠 High |
| Layout & Transitions | 14 | 🟠 High |
| Marquee & Infinite Scroll | 7 | 🟠 High |
| Background & Decorative | 19 | 🟡 Medium |
| Navigation & UI Chrome | 10 | 🟡 Medium |
| Carousel & Slider | 5 | 🟡 Medium |
| Physics & Simulation | 7 | 🟡 Medium |
| Image & Media | 5 | 🟢 Nice to have |
| SVG & Path | 6 | 🟢 Nice to have |
| Filter & Shader | 6 | 🟢 Nice to have |
| Button & Micro-Interaction | 8 | 🟢 Nice to have |
| Block / Composition | 8 | 🟢 Nice to have |
| **Total** | **164** | |

---

## Engine Legend

| Engine | When to Use |
|--------|-------------|
| **Motion** (Framer Motion) | Declarative React animations, layout transitions, gestures, mount/unmount, spring physics |
| **GSAP** | Timeline sequencing, scroll-driven scrubbing (ScrollTrigger), SVG path animation, fine-grained control |
| **CSS** | Simple transitions, keyframe loops, hover states — zero JS bundle cost |
| **Canvas** | Pixel manipulation, particle systems, high-performance rendering |
| **SVG** | Path drawing, morphing, filters, masks |
| **Matter.js** | Rigid body physics simulation (gravity, collision) |

---

## Implementation Notes

1. **`prefers-reduced-motion`** — Every component must respect this. Disable or simplify animations when enabled.
2. **`"use client"`** — All components require this directive for Next.js App Router compatibility.
3. **Tree-shakeable** — Each component is standalone. No shared runtime bundle.
4. **GSAP licensing** — Stick to free plugins (ScrollTrigger, Flip, Observer). Avoid paid Club plugins (SplitText, MorphSVG, ScrollSmoother) or clearly label them.
5. **Bundle transparency** — Document which engine each component uses so users can opt in selectively.
6. **CLI support** — `npx cnippet@latest add text-reveal` / `npx cnippet@latest add scroll-reveal`

---

## References

- **fancy** (zip) — 44 components, 95 examples across text, blocks, carousel, background, physics, image, filter
- **motion-primitives** (zip) — 33 core components focused on text, layout, scroll, and interaction
- **Aceternity UI** — 200+ animated components, strongest in backgrounds, cards, text, and scroll effects
- **Magic UI** — 50+ components, strong in marquee, buttons, and decorative effects
- **Animate UI** — Motion + Shadcn CLI distribution, strong in text effects, transitions, and micro-interactions
- **ScrollX UI** — 60+ components with emphasis on scroll and layout animations

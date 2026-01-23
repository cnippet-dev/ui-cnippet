// import type React from "react";
// import { forwardRef } from "react";
// import Link from "next/link";
// import { motion } from "motion/react";
// import { RiArrowRightUpLine, RiSparkling2Fill } from "@remixicon/react";
// import { fadeUp, zoomIn } from "cnippet-aos";

// import { Button } from "@/components/ui/button";
// import Typewriter from "@/components/motion/typewriter";

// const Hero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   (props, ref) => {
//     return (
//       <div className="h-full">
//         <section className="relative flex h-full items-center justify-center overflow-hidden px-4 sm:px-6">
//           <div className="pointer-events-none absolute inset-0 opacity-50">
//             <div className="animate-blob absolute top-0 left-1/4 h-96 w-96 rounded-full opacity-20 mix-blend-multiply blur-3xl filter" />
//             <div className="animate-blob animation-delay-2000 absolute right-1/4 bottom-0 h-96 w-96 rounded-full opacity-20 mix-blend-multiply blur-3xl filter" />
//           </div>

//           <div className="relative">
//             <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-4 py-28 text-center sm:px-6 sm:py-36 md:px-8 md:py-40">
//               <motion.div
//                 {...fadeUp({ delay: 0.1, duration: 0.8 })}
//                 className="mb-4 space-y-3"
//               >
//                 <p className="text-primary/70 text-xs font-medium tracking-widest uppercase sm:text-sm">
//                   Build Faster Than Ever
//                 </p>

//                 <h1 className="text-4xl leading-tight font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
//                   Ship stunning interfaces faster with Cnippet UI.
//                 </h1>
//               </motion.div>

//               <motion.p
//                 {...fadeUp({
//                   delay: 0.3,
//                   duration: 0.6,
//                   y: 20,
//                 })}
//                 className="text-muted-foreground max-w-xl"
//               >
//                 Production-ready React components, smart animations & insightful
//                 charts.
//               </motion.p>
//               <motion.div
//                 {...fadeUp({
//                   delay: 0.4,
//                   duration: 0.6,
//                   y: 20,
//                 })}
//                 className="text-muted-foreground mb-6 max-w-xl"
//               >
//                 <span>{" Perfect for "}</span>
//                 <Typewriter
//                   text={["Startups", "Developers", "Agencies", "Teams"]}
//                   speed={70}
//                   className="text-pretty text-blue-600"
//                   waitTime={1500}
//                   deleteSpeed={40}
//                   cursorChar={"_"}
//                 />
//               </motion.div>

//               <motion.div
//                 ref={ref}
//                 {...zoomIn({
//                   delay: 0.6,
//                   duration: 0.5,
//                 })}
//                 className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-3"
//               >
//                 <Button
//                   size="lg"
//                   className="bg-primary hover:bg-primary/90 text-primary-foreground w-full rounded-full shadow-lg transition-all hover:shadow-xl sm:w-auto"
//                 >
//                   <Link
//                     href="/docs/introduction"
//                     className="flex items-center gap-2"
//                   >
//                     Get Started
//                     <RiArrowRightUpLine className="size-4" />
//                   </Link>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   size="lg"
//                   className="w-full rounded-full bg-transparent sm:w-auto"
//                 >
//                   <Link href="/ui/actions/button">View Components</Link>
//                 </Button>
//               </motion.div>

//               <motion.div
//                 {...fadeUp({ delay: 0.8, duration: 0.6 })}
//                 className="flex flex-wrap items-center justify-center gap-3"
//               >
//                 {["100+ Components", "Open Source", "TypeScript"].map(
//                   (feature) => (
//                     <div
//                       key={feature}
//                       className="bg-accent/10 text-accent-foreground border-accent/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
//                     >
//                       <RiSparkling2Fill className="size-3" />
//                       {feature}
//                     </div>
//                   ),
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   },
// );

// Hero.displayName = "Hero";

// export default Hero;

"use client";

import { useEffect, useRef } from "react";
import Typewriter from "@/components/motion/typewriter";

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

export default function Hero() {
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate words
    const words = document.querySelectorAll<HTMLElement>(".word");
    words.forEach((word) => {
      const delay = Number.parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.animation = "word-appear 0.8s ease-out forwards";
      }, delay);
    });

    // Mouse gradient
    const gradient = gradientRef.current;
    function onMouseMove(e: MouseEvent) {
      if (gradient) {
        gradient.style.left = `${e.clientX - 192}px`;
        gradient.style.top = `${e.clientY - 192}px`;
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    // Word hover effects
    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(200, 180, 160, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    // Click ripple effect
    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(200, 180, 160, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    // Floating elements on scroll
    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document
          .querySelectorAll<HTMLElement>(".floating-element")
          .forEach((el, index) => {
            setTimeout(() => {
              el.style.animationPlayState = "running";
            }, index * 200);
          });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div>
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            height="60"
            id="grid"
            patternUnits="userSpaceOnUse"
            width="60"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(200,180,160,0.08)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect fill="url(#grid)" height="100%" width="100%" />
        <line
          className="grid-line"
          style={{ animationDelay: "0.5s" }}
          x1="0"
          x2="100%"
          y1="20%"
          y2="20%"
        />
        <line
          className="grid-line"
          style={{ animationDelay: "1s" }}
          x1="0"
          x2="100%"
          y1="80%"
          y2="80%"
        />
        <line
          className="grid-line"
          style={{ animationDelay: "1.5s" }}
          x1="20%"
          x2="20%"
          y1="0"
          y2="100%"
        />
        <line
          className="grid-line"
          style={{ animationDelay: "2s" }}
          x1="80%"
          x2="80%"
          y1="0"
          y2="100%"
        />
        <line
          className="grid-line"
          style={{ animationDelay: "2.5s", opacity: 0.05 }}
          x1="50%"
          x2="50%"
          y1="0"
          y2="100%"
        />
        <line
          className="grid-line"
          style={{ animationDelay: "3s", opacity: 0.05 }}
          x1="0"
          x2="100%"
          y1="50%"
          y2="50%"
        />
        <circle
          className="detail-dot"
          cx="20%"
          cy="20%"
          r="2"
          style={{ animationDelay: "3s" }}
        />
        <circle
          className="detail-dot"
          cx="80%"
          cy="20%"
          r="2"
          style={{ animationDelay: "3.2s" }}
        />
        <circle
          className="detail-dot"
          cx="20%"
          cy="80%"
          r="2"
          style={{ animationDelay: "3.4s" }}
        />
        <circle
          className="detail-dot"
          cx="80%"
          cy="80%"
          r="2"
          style={{ animationDelay: "3.6s" }}
        />
        <circle
          className="detail-dot"
          cx="50%"
          cy="50%"
          r="1.5"
          style={{ animationDelay: "4s" }}
        />
      </svg>

      <div className="relative flex min-h-screen flex-col items-center justify-between px-8 py-12 md:px-6 md:py-20">
        {/* Top tagline */}
        <div className="text-center">
          <h2
            className="font-light font-mono text-xs uppercase tracking-[0.2em] opacity-80 md:text-sm"
            style={{ color: colors[200] }}
          >
            Build Faster Than Ever
          </h2>
          <div
            className="mt-4 h-px w-16 opacity-30"
            style={{
              background: `linear-gradient(to right, transparent, ${colors[200]}, transparent)`,
            }}
          />
        </div>

        {/* Main headline */}
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="font-extralight text-3xl text-decoration leading-tight tracking-tight md:text-5xl lg:text-6xl"
            style={{ color: colors[50] }}
          >
            <div className="mb-4 md:mb-6">
              Ship stunning interfaces faster with Cnippet UI.
            </div>
            <div
              className="mx-auto max-w-3xl font-thin text-2xl leading-relaxed md:text-3xl lg:text-3xl"
              style={{ color: colors[200] }}
            >
              Production-ready React components, smart animations & insightful
              charts. Perfect for{" "}
              <Typewriter
                className="text-pretty"
                cursorChar={"_"}
                deleteSpeed={80}
                speed={150}
                text={["Startups", "Developers", "Agencies", "Teams"]}
                waitTime={1500}
              />
            </div>
          </h1>
          <div
            className="absolute top-1/2 -left-8 h-px w-4 opacity-20"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.5s",
              background: colors[200],
            }}
          />
          <div
            className="absolute top-1/2 -right-8 h-px w-4 opacity-20"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "3.7s",
              background: colors[200],
            }}
          />
        </div>

        {/* Bottom tagline */}
        <div className="text-center">
          <h2
            className="font-light font-mono text-xs uppercase tracking-[0.2em] opacity-80 md:text-sm"
            style={{ color: colors[200] }}
          >
            100+ Components 🔷 Open Source 🔶 TypeScript
          </h2>
          <div
            className="mt-6 flex justify-center space-x-4 opacity-0"
            style={{
              animation: "word-appear 1s ease-out forwards",
              animationDelay: "4.5s",
            }}
          >
            <div
              className="h-1 w-1 rounded-full opacity-40"
              style={{ background: colors[200] }}
            />
            <div
              className="h-1 w-1 rounded-full opacity-60"
              style={{ background: colors[200] }}
            />
            <div
              className="h-1 w-1 rounded-full opacity-40"
              style={{ background: colors[200] }}
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none fixed h-96 w-96 rounded-full opacity-0 blur-3xl transition-all duration-500 ease-out"
        id="mouse-gradient"
        ref={gradientRef}
        style={{
          background: `radial-gradient(circle, ${colors[500]}0D 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}

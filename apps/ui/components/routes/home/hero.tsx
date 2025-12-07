// import { forwardRef } from "react";
// import Link from "next/link";
// import { motion } from "motion/react";
// import { RiArrowRightUpLine, RiSparkling2Fill } from "@remixicon/react";
// import { fadeUp, fadeUpBlur, zoomIn } from "cnippet-aos";
// import Spline from "@splinetool/react-spline";

// import { Button } from "@/components/ui/button";
// import { TextLoop } from "@/components/motion/text-loop";
// import "./home.css";

// const Hero = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
//   (props, ref) => {
//     return (
//       <>
//         <div
//           style={{
//             position: "relative",
//             height: "100vh",
//             zIndex: 0,
//           }}
//           className=" w-full max-w-full px-10 isolate
//         "
//         >
//           <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" />
//         </div>

//         <div className="hero-header w-full">
//           <section className="relative flex items-center justify-center h-full ">
//             <div className="relative z-10">
//               <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-32 text-center">
//                 <motion.h1
//                   {...fadeUpBlur({ delay: 0.1, duration: 0.8 })}
//                   className="font-normal mb-6 max-w-full text-4xl tracking-tight leading-tight text-gray-900 md:text-6xl lg:text-5xl dark:text-gray-100"
//                 >
//                   Build faster with production-ready{" "}
//                   <motion.span
//                     {...zoomIn({ delay: 0.1, duration: 0.5 })}
//                     className="relative mt-2 rounded-lg inline-flex items-center border border-dashed px-4"
//                   >
//                     <RiSparkling2Fill className="size-10 text-indigo-600" />
//                     Cnippet UI
//                   </motion.span>{" "}
//                   components
//                 </motion.h1>

//                 <motion.div
//                   {...fadeUp({
//                     delay: 0.3,
//                     duration: 0.6,
//                     y: 20,
//                   })}
//                   className="mb-8 max-w-2xl text-center text-lg leading-relaxed tracking-tight wrap-break-word text-gray-700 dark:text-gray-400"
//                 >
//                   Production-ready React components, animations, and charts to
//                   ship your next project faster. Perfect for{" "}
//                   <motion.span
//                     {...zoomIn({ delay: 0.3, duration: 0.5 })}
//                     className="inline-block w-24 text-left font-semibold text-gray-900 dark:text-gray-100"
//                   >
//                     <TextLoop
//                       interval={5}
//                       className="font-mono text-lg font-normal"
//                     >
//                       <span>Startups</span>
//                       <span>Developers</span>
//                       <span>Agencies</span>
//                       <span>Teams</span>
//                     </TextLoop>
//                   </motion.span>
//                 </motion.div>

//                 <motion.div
//                   ref={ref}
//                   {...zoomIn({
//                     delay: 0.6,
//                     duration: 0.5,
//                   })}
//                   className="mb-4 flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
//                 >
//                   <Button
//                     size="lg"
//                     className="group cursor-pointer rounded-full bg-indigo-700/90 px-8 py-1 border-none text-sm text-white shadow-none hover:bg-indigo-700"
//                   >
//                     <Link
//                       href="/components"
//                       className="flex items-center gap-2"
//                     >
//                       Get Started
//                       <RiArrowRightUpLine className="group-hover:rotate-45 transition-all duration-500" />
//                     </Link>
//                   </Button>

//                   <Button
//                     variant="secondary"
//                     size="lg"
//                     className="flex items-center space-x-2 shadow-none rounded-full text-sm"
//                   >
//                     <Link href="/docs">View Components</Link>
//                   </Button>
//                 </motion.div>

//                 <motion.p
//                   {...fadeUp({ delay: 0.8, duration: 0.4 })}
//                   className="text-xs text-gray-700 dark:text-gray-400"
//                 >
//                   Open-source • TypeScript • Fully customizable
//                 </motion.p>
//               </div>
//             </div>
//           </section>
//         </div>
//       </>
//     );
//   }
// );

// Hero.displayName = "Hero";

// export default Hero;


"use client"

import * as React from "react"
import { type VariantProps, cva } from "class-variance-authority"
import { type HTMLMotionProps, type MotionValue, motion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { FloatingElement } from "@/components/motion/parallax-floating"

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
      `,
        fourCells: `
        grid-cols-3 grid-rows-2
        [&>*:first-child]:col-span-1
        [&>*:nth-child(2)]:col-span-2
        [&>*:nth-child(3)]:col-span-2
      `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined)
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error("useContainerScrollContext must be used within a ContainerScroll Component")
  }
  return context
}
const ContainerScroll = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn("relative min-h-screen w-full", className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return <div ref={ref} className={cn(bentoGridVariants({ variant }), className)} {...props} />
})
BentoGrid.displayName = "BentoGrid"

const BentoCell = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    depth?: number
    useFloating?: boolean
  }
>(({ className, style, children, depth = 1, useFloating = false, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext()
  const cellRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => cellRef.current as HTMLDivElement)

  // When scroll is 0-10%, floating element handles the animation
  // When scroll > 10%, scroll transforms take over
  const finalTranslate = useTransform(scrollYProgress, (value) => {
    // Only apply scroll animation when scroll > 10% (0.1)
    if (value > 0.1) {
      // Normalize scroll progress from 0.1-0.9 to 0-1 range
      const progress = (value - 0.1) / 0.8
      // Animate from -35% to 0%
      return `${-35 + progress * 35}%`
    }
    // During floating phase (0-10%), no translate
    return "0%"
  })

  const finalScale = useTransform(scrollYProgress, (value) => {
    // Only apply scroll animation when scroll > 10% (0.1)
    if (value > 0.1) {
      // Normalize scroll progress from 0.1-0.9 to 0-1 range
      const progress = (value - 0.1) / 0.8
      // Animate from 0.5 to 1
      return 0.5 + progress * 0.5
    }
    // During floating phase (0-10%), no scale transform
    return 1
  })

  // Track whether floating should be disabled (when scroll > 10%)
  const [floatingDisabled, setFloatingDisabled] = React.useState(false)

  React.useEffect(() => {
    if (!useFloating) return

    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Disable floating when scroll passes 10% threshold
      setFloatingDisabled(value > 0.1)
    })
    return unsubscribe
  }, [scrollYProgress, useFloating])

  // When useFloating is true, wrap with FloatingElement for 0-10% animation
  // Scroll transforms activate after 10%
  if (useFloating) {
    return (
      <div ref={cellRef} className={cn("relative", className)} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        <FloatingElement depth={depth} className="w-full h-full" disabled={floatingDisabled}>
          <motion.div
            className="w-full h-full"
            style={{
              translate: finalTranslate,
              scale: finalScale,
            }}
          >
            {children}
          </motion.div>
        </FloatingElement>
      </div>
    )
  }

  return (
    <motion.div
      ref={cellRef}
      className={className}
      style={{ translate: finalTranslate, scale: finalScale, ...style }}
      {...props}
    >
      {children}
    </motion.div>
  )
})
BentoCell.displayName = "BentoCell"

const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const position = useTransform(scrollYProgress, (pos) => (pos >= 0.6 ? "absolute" : "fixed"))
    return (
      <motion.div
        ref={ref}
        className={cn("left-1/2 top-1/2  size-fit", className)}
        style={{
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    )
  },
)
ContainerScale.displayName = "ContainerScale"
export { ContainerScroll, BentoGrid, BentoCell, ContainerScale }

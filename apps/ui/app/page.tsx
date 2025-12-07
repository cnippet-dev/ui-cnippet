// "use client";

// import dynamic from "next/dynamic";
// import { ReactLenis } from "lenis/react";

// const Hero = dynamic(() => import("@/components/routes/home/hero"));
// const Components = dynamic(() => import("@/components/routes/home/components"));

// export default function Home() {
//   return (
//     <>
//       <ReactLenis root>
//         <div className="">
//           <main className="">
//             <Hero />
//             <Components />
//           </main>
//         </div>
//       </ReactLenis>
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

import Floating, {
  FloatingElement,
} from "@/components/motion/parallax-floating";
import Component from "@/registry/default/variants/v-accordion-1";
import { Button } from "@/components/ui/button";
import { Link, Loader2, MailOpen } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { TextRoll } from "@/components/motion/text-roll";
import { TextShimmerWave } from "@/components/motion/text-wave";
import Cursor1 from "@/components/motion/cursor-demo";
import BoxCarouselDemo from "@/components/routes/home/_c/box-carousel-demo";
import VerticalCutReveal from "@/components/routes/home/_c/vertical-cut-reveal-demo";

const exampleImages = [
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h7.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h2.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h3.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h4.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h5.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h6.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h7.jpg",
  },
  {
    url: "https://res.cloudinary.com/dcxm3ccir/image/upload/v1762330718/h8.jpg",
  },
];

const Preview = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <div
      className="flex w-dvw h-dvh justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-50 text-center space-y-4 items-center max-w-xl flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl z-50 text-white font-calendas italic">
          Build faster with production-ready Cnippet UI components
        </p>
        <p className="text-xs z-50 hover:scale-110 transition-transform bg-white text-black rounded-full py-2 w-20 cursor-pointer">
          Download
        </p>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={5} className="top-[8%] left-[11%] ">
          {/* <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[0].url}
            className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          /> */}
          <div className="flex flex-wrap max-w-sm gap-2 items-center justify-center">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>

            {/* <Button variant="link">
                <Link href="/">Link</Link>
            </Button> */}
            <Button variant="outline" size="icon">
              <ChevronRight />
            </Button>
            <Button>
              <MailOpen /> Login with Email
            </Button>
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          </div>
        </FloatingElement>
        <FloatingElement depth={1} className="top-[10%] left-[32%]">
          <div>
            <TextShimmerWave className="font-mono text-xl" duration={1}>
              Generating code...
            </TextShimmerWave>
          </div>
        </FloatingElement>
        <FloatingElement depth={2} className="top-[2%] left-[53%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[2].url}
            className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[0%] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[3].url}
            className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={5} className="top-[40%] left-[2%]">
          <BoxCarouselDemo />
        </FloatingElement>

        <FloatingElement depth={2} className="top-[50%] left-[77%]">
          <VerticalCutReveal/>
        </FloatingElement>

        {/* <FloatingElement depth={1} className="top-[73%] left-[15%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={exampleImages[5].url}
            className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement> */}

        <FloatingElement depth={1} className="top-[70%] left-[50%]">
          <BoxCarouselDemo />
        </FloatingElement>
      </Floating>
    </div>
  );
};

export default Preview;

// import { BentoCell, BentoGrid, ContainerScale, ContainerScroll } from "@/components/routes/home/hero"
// import Floating from "@/components/motion/parallax-floating"
// import { Button } from "@/components/ui/button"

// const IMAGES = [
//   "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=2368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D",
//   "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8fDB8fHww",
// ]

// const DEPTHS = [0.5, 1, 2, 1, 1.5]

// export default function HeroDemo() {
//   return (
//     <ContainerScroll className="h-[350vh]">
//       <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
//         <Floating sensitivity={-1} className="overflow-hidden">
//           {IMAGES.map((imageUrl, index) => (
//             <BentoCell
//               key={index}
//               className="overflow-hidden rounded-xl shadow-xl"
//               useFloating={true}
//               depth={DEPTHS[index] || 1}
//             >
//               <img className="size-full object-cover object-center" src={imageUrl || "/placeholder.svg"} alt="" />
//             </BentoCell>
//           ))}
//         </Floating>
//       </BentoGrid>

//       <ContainerScale className="relative z-10 text-center">
//         <h1 className="max-w-xl text-5xl font-bold tracking-tighter text-slate-800">Your Animated Hero</h1>
//         <p className="my-6 max-w-xl text-sm text-slate-700 md:text-base">
//           Yet another hero section, this time with scroll trigger animations, animating the hero content with motion.
//         </p>
//         <div className="flex items-center justify-center gap-4">
//           <Button className="bg-indigo-500 px-4 py-2 font-medium hover:bg-indigo-400">Get Started</Button>
//           <Button variant="link" className="bg-transparent px-4 py-2 font-medium">
//             Learn more
//           </Button>
//         </div>
//       </ContainerScale>
//     </ContainerScroll>
//   )
// }

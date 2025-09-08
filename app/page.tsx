"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";

import { ReactLenis } from "lenis/react";

const Navbar = dynamic(() => import("@/components/shared/navbar/index"));
const Hero = dynamic(() => import("@/components/routes/home/hero"));
const Components = dynamic(() => import("@/components/routes/home/components"));
// const Features = dynamic(() => import("@/components/routes/home/features"));
// const Feedback = dynamic(() => import("@/components/routes/home/feedback"));
// const Faq = dynamic(() => import("@/components/routes/home/faq"));
// const Cta = dynamic(() => import("@/components/routes/home/cta"));
const Footer = dynamic(() => import("@/components/shared/footer"));

const CursorPointer = dynamic(() => import("@/components/cursor-pointer"));

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    // const componentsRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <ReactLenis root>
                <div className="">
                    <CursorPointer
                        targets={[
                            { id: "hero", ref: heroRef },
                            // { id: "components", ref: componentsRef },
                        ]}
                    />

                    <Navbar />
                    <main className="dark:bg-background">
                        <Hero ref={heroRef} />
                        <Components />
                        {/* <Sections ref={targetRef} count={15} /> */}
                        {/* <Features /> */}

                        {/* <SlidingImages /> */}
                        {/* <Faq /> */}
                        {/* <Cta /> */}
                    </main>
                    <Footer />
                </div>
            </ReactLenis>
        </>
    );
}

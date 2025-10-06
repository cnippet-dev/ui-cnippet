"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";

const Navbar = dynamic(() => import("@/components/shared/navbar/index"));
const Hero = dynamic(() => import("@/components/routes/home/hero"));
const Components = dynamic(() => import("@/components/routes/home/components"));
const HowToUse = dynamic(() => import("@/components/routes/home/how-to-use"));
const Footer = dynamic(() => import("@/components/shared/footer"));

const CursorPointer = dynamic(() => import("@/components/cursor-pointer"));

export default function Home() {
    const heroRef = useRef<HTMLDivElement>(null);
    const howToUseRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLButtonElement>(null);

    return (
        <>
            <ReactLenis root>
                <div className="">
                    <CursorPointer
                        targets={[
                            { id: "hero", ref: heroRef },
                            { id: "how-to-use", ref: howToUseRef },
                            { id: "footer", ref: footerRef },
                        ]}
                    />

                    <Navbar />
                    <main className="dark:bg-background">
                        <Hero ref={heroRef} />
                        <Components />
                        <HowToUse ref={howToUseRef} />
                    </main>
                    <Footer ref={footerRef} />
                </div>
            </ReactLenis>
        </>
    );
}

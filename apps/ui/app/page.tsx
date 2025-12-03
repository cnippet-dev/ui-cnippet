"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";

const Hero = dynamic(() => import("@/components/routes/home/hero"));
const Components = dynamic(() => import("@/components/routes/home/components"));

const CursorPointer = dynamic(() => import("@/components/cursor-pointer"));

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const howToUseRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <div className="">
        <CursorPointer
          targets={[
            { id: "hero", ref: heroRef },
            { id: "how-to-use", ref: howToUseRef },
            { id: "footer", ref: footerRef },
          ]}
        />

        <main className="">
          <Hero ref={heroRef} />
          <Components/>
        </main>
      </div>
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";

const Hero = dynamic(() => import("@/components/routes/home/hero"));

export default function Home() {
  return (
    <>
      <ReactLenis root>
        <div className="">
          <main className="">
            <Hero />
            {/* <Components /> */}
          </main>
        </div>
      </ReactLenis>
    </>
  );
}


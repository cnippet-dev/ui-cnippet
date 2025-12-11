"use client";

import dynamic from "next/dynamic";
import { ReactLenis } from "lenis/react";
import { Footer } from "@/components/shared/footer";
import CalendarDemo from "@/registry/default/variants/v-context-menu-1";

const Hero = dynamic(() => import("@/components/routes/home/hero"));
const Components = dynamic(() => import("@/components/routes/home/components"));

export default function Home() {
  return (
    <>
      {/* <ReactLenis root>
        <div className="">
          <main className="">
            <Hero />
            <Components />
          </main>
        </div>
      </ReactLenis>
      <Footer /> */}
      <CalendarDemo/>
    </>
  );
}

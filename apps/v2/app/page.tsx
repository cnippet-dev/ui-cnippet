import type { Metadata } from "next";
import Blocks from "@/components/blocks";
import Components from "@/components/components";
import { Closing } from "@/components/home/closing";
import { Hero } from "@/components/home/hero";
import { Install } from "@/components/home/install";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { Why } from "@/components/home/why";
import { HomeThemes } from "@/components/home-themes";
import MotionComponents from "@/components/motion-components";

export const metadata: Metadata = {
  description:
    "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
  openGraph: {
    description:
      "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
    title: "Cnippet UI",
    url: "https://ui.cnippet.dev",
  },
  title: "Cnippet UI",
  twitter: {
    description:
      "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
    title: "Cnippet UI",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-6xl border-x border-dashed bg-background">
        <SiteHeader />
        <main>
          <Hero />
          <Why />
          <Install />

          {/* Component showcase sections */}
          <Components />
          <MotionComponents />
          <HomeThemes />
          <Blocks />

          <Closing />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

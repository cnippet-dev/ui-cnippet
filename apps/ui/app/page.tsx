import dynamic from "next/dynamic";

const SiteHeader = dynamic(
  () => import("@/components/shared/header/site-header"),
);

const Hero = dynamic(() => import("@/components/home/hero"));
const Components = dynamic(() => import("@/components/home/components"));
const HighlightCode = dynamic(() => import("@/components/home/highlight-code"));
const Testimonial = dynamic(() => import("@/components/home/testimonial"));
const Blocks = dynamic(() => import("@/components/home/blocks"));
const Footer = dynamic(() => import("@/components/shared/footer"));

import ReactLenis from "lenis/react";

export default function Page() {
  return (
    <ReactLenis root>
      <SiteHeader />
      <main className="dark:bg-sidebar">
        <Hero />
        <Components />
        <HighlightCode />
        <Testimonial />
        <Blocks />
      </main>
      <Footer />
    </ReactLenis>
  );
}

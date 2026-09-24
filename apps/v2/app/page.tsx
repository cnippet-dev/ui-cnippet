import type { Metadata } from "next";
import Blocks from "@/components/blocks";
import Components from "@/components/components";
import { Closing } from "@/components/home/closing";
import { Hero } from "@/components/home/hero";
import { Install } from "@/components/home/install";
import { Why } from "@/components/home/why";
import { HomeThemes } from "@/components/home-themes";
import { SiteShell } from "@/components/site/site-shell";

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
    <SiteShell>
      <Hero />
      <Why />
      <Install />
      <Components />
      <HomeThemes />
      <Blocks />
      <Closing />
    </SiteShell>
  );
}

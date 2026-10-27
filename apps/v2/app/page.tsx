import type { Metadata } from "next";
import Blocks from "@/components/blocks";
import Components from "@/components/components";
import { Closing } from "@/components/home/closing";
import { Hero } from "@/components/home/hero";
import { Install } from "@/components/home/install";
import { Why } from "@/components/home/why";
import { HomeThemes } from "@/components/home-themes";
import { SiteShell } from "@/components/site/site-shell";
import { twitterBase } from "@/lib/config";

export const metadata: Metadata = {
  // Explicit "/": a relative "./" renders as "/index" on the static homepage.
  alternates: { canonical: "/" },
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
    ...twitterBase,
    description:
      "Ship stunning interfaces faster. Build accessible, composable React components with Base UI and Tailwind CSS.",
    title: "Cnippet UI",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": "https://ui.cnippet.dev/#website",
      "@type": "WebSite",
      name: "Cnippet UI",
      publisher: { "@id": "https://www.cnippet.dev/#organization" },
      url: "https://ui.cnippet.dev",
    },
    {
      "@type": "SoftwareSourceCode",
      codeRepository: "https://github.com/cnippet-dev/ui-cnippet",
      description: metadata.description,
      license: "https://opensource.org/licenses/MIT",
      name: "Cnippet UI",
      programmingLanguage: "TypeScript",
      publisher: { "@id": "https://www.cnippet.dev/#organization" },
      url: "https://ui.cnippet.dev",
    },
  ],
};

export default function HomePage() {
  return (
    <SiteShell>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
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

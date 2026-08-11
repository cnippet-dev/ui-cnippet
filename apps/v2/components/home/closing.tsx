import Link from "next/link";
import { Section, SectionBody, SectionHeader } from "@/components/home/section";
import { Button } from "@/registry/default/ui/button";

const PATHS = [
  {
    body: "Browse the full catalog, copy what you need, own the source.",
    cta: "Explore components →",
    external: false,
    href: "/explore",
    label: "The library",
  },
  {
    body: "Get set up in minutes — CLI, theming, and every component documented.",
    cta: "Read the docs →",
    external: false,
    href: "/docs/introduction",
    label: "The docs",
  },
  {
    body: "Star it, fork it, open an issue — everything here is MIT licensed.",
    cta: "View on GitHub →",
    external: true,
    href: "https://github.com/cnippet-dev/ui-cnippet",
    label: "The source",
  },
];

export function Closing() {
  return (
    <Section className="border-b-0" id="start">
      <SectionHeader
        index="07"
        meta="three ways in"
        title="Ready to stop rebuilding?"
      />

      <div className="border-b border-dashed px-5 py-8 sm:px-8">
        <p className="max-w-lg text-[15px] text-muted-foreground leading-relaxed">
          Join the developers building with Cnippet UI. 97 components, 40+
          motion variants — MIT licensed, $0 forever.
        </p>
      </div>

      <SectionBody className="grid divide-y divide-dashed p-0 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:p-0">
        {PATHS.map((path) => (
          <div
            className="flex flex-col px-5 py-10 sm:px-8 sm:py-14"
            key={path.label}
          >
            <div className="font-mono text-[11px] text-cnippet-accent uppercase tracking-[0.18em]">
              {path.label}
            </div>

            <p className="mt-4 flex-1 text-[14px] text-muted-foreground leading-relaxed">
              {path.body}
            </p>

            <Button
              className="mt-6 w-fit"
              render={
                path.external ? (
                  <Link href={path.href} rel="noreferrer" target="_blank" />
                ) : (
                  <Link href={path.href} />
                )
              }
              variant="outline"
            >
              {path.cta}
            </Button>
          </div>
        ))}
      </SectionBody>
    </Section>
  );
}

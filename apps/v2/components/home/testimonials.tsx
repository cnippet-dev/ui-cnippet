import { FullWidthBorder } from "@/components/layout/full-width-border";
import { Facehash } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    company: "Launchpad",
    handle: "@jordanpark",
    name: "Jordan Park",
    role: "Founder",
    text: "Cnippet took us from wireframes to a live product in 6 weeks. The design quality and the code they handed off was better than anything we got from agencies twice the cost.",
  },
  {
    company: "Finstack",
    handle: "@aishaokafor",
    name: "Aisha Okafor",
    role: "CPO",
    text: "They rebuilt our onboarding flow and drop-off fell by 40%. What impressed me most was that they understood the product problem — not just the design brief.",
  },
  {
    company: "Orbit Labs",
    handle: "@lucasf_cto",
    name: "Lucas Ferreira",
    role: "CTO",
    text: "Working with Cnippet felt like having an in-house team. They moved fast, communicated clearly, and the code they shipped was production-quality from day one.",
  },
  {
    company: "indie hacker",
    handle: "@marcusbld",
    name: "Marcus Lee",
    role: "Solo Founder",
    text: "Went from blank Next.js to a live landing page in an afternoon. The components just work, the TypeScript types are perfect, and I didn't have to read a single prop table.",
  },
  {
    company: "Stripe",
    handle: "@priya_ux",
    name: "Priya Sharma",
    role: "Staff Design Engineer",
    text: "The design system cnippet uses — 2px radius, dashed borders, mono labels — has influenced how I think about visual systems. Clean without being sterile.",
  },
  {
    company: "Stackform",
    handle: "@tomn_eng",
    name: "Tom Nakamura",
    role: "Frontend Engineer",
    text: "I've tried every component library. Cnippet is the first one that feels like it was built by people who actually ship products. The TypeScript types alone saved me hours.",
  },
];

export function Testimonials() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex flex-col gap-2 px-4 pb-10">
        <p className="font-medium font-mono text-cnippet-orange text-sm">
          [from clients & developers]
        </p>
        <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
          Trusted by people
          <br />
          who actually ship things.
        </h2>
      </div>

      <div className="relative grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
        <FullWidthBorder className="top-0" />
        {testimonials.map((t, index) => (
          <div
            className={cn(
              "flex flex-col gap-4 border-b border-dashed p-6 transition-colors hover:bg-accent/20 sm:p-8",
              index % 3 !== 2 && "lg:border-r",
              index % 2 === 0 && "sm:border-r",
              index % 2 !== 0 && "sm:border-r-0",
              index % 2 === 0 && index % 3 === 2 && "lg:border-r-0",
              index >= testimonials.length - 3 && "lg:border-b-0",
              index >= testimonials.length - 2 && "sm:border-b-0",
            )}
            key={t.name}
          >
            <p className="flex-1 text-balance text-sm leading-relaxed">
              &ldquo;{t.text}&rdquo;
            </p>
            <div className="flex items-center gap-3 border-t border-dashed pt-4">
              <div className="h-8 w-8 shrink-0 overflow-hidden rounded-[2px]">
                <Facehash
                  enableBlink={false}
                  interactive={false}
                  name={t.name}
                  size={32}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{t.name}</span>
                <span className="font-mono text-xs">
                  <span className="text-cnippet-orange">{t.handle}</span>
                  <span className="text-muted-foreground"> · {t.role}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
        <FullWidthBorder className="bottom-0" />
      </div>
    </section>
  );
}

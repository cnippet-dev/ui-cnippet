import Image from "next/image";
import Link from "next/link";
import {
  codeSnippets,
  snippetLanguages,
} from "@/components/home/code-snippets";
import { ImplementationSection } from "@/components/home/implementation-section";
import { Footer } from "@/components/shared/footer";
import { SiteHeader } from "@/components/shared/header/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { highlightCode } from "@/lib/highlight-code";

const _items = [
  {
    number: "2",
    title: "accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "5",
    title: "alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "4",
    title: "avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "3",
    title: "badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "2",
    title: "breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "3",
    title: "button",
    url: "/ui/actions/button",
  },
  {
    number: "4",
    title: "checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "5",
    title: "dialog",
    url: "/ui/overlays/dialog",
  },
];

export default async function Home() {
  const highlightedSnippets: Record<string, string> = {};
  for (const [key, code] of Object.entries(codeSnippets)) {
    highlightedSnippets[key] = await highlightCode(
      code,
      snippetLanguages[key] ?? "tsx",
      { showLineNumbers: false },
    );
  }

  return (
    <>
      <SiteHeader />

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-20 sm:px-6 sm:py-28 md:py-40 lg:px-0">
          <div>
            <div className="">
              <div className="absolute inset-0 z-0 flex-none overflow-hidden bg-blue-500/30 [-webkit-mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] [mask:url(https://framerusercontent.com/images/0RjNkZYilrHi1gaLamPLmApzh4.svg)_alpha_repeat_top/31px_31px_add] dark:bg-neutral-800" />

              <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 text-center sm:space-y-6">
                <Badge className="rounded-full px-3 py-1 text-xs sm:text-sm">
                  Build Faster Than Ever
                </Badge>
                <h1 className="px-4 font-figtree font-medium text-3xl leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  Ship stunning interfaces faster with Cnippet UI.
                </h1>
                <p className="max-w-2xl px-4 text-base text-muted-foreground sm:text-lg md:text-xl">
                  Production-ready React components, smart animations &
                  insightful charts.
                </p>
                <div className="flex w-full flex-col gap-3 px-4 sm:w-auto sm:flex-row sm:gap-2 sm:px-0">
                  <Button
                    className="mx-auto w-fit rounded-full border-blue-700 bg-blue-800 px-6 py-2.5 text-white hover:bg-blue-800 sm:w-auto"
                    render={<Link href="/" />}
                  >
                    Get Started
                  </Button>
                  <Button
                    className="mx-auto w-fit px-6 py-2.5 sm:w-auto"
                    render={<Link href="/ui/actions/button" />}
                    variant="ghost"
                  >
                    Explore components
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h1 className="mb-3 font-figtree font-medium text-2xl sm:mb-4 sm:text-3xl md:text-4xl">
              Essential UI components
            </h1>
            <p className="max-w-xl text-muted-foreground text-sm sm:text-base">
              Build React interfaces faster with production-ready UI components.
              Perfectly integrated with Next.js. Custom Tailwind styling,
              zero-config setup.
            </p>
          </div>
          <div>
            <div className="">
              <div className="grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {_items.map((item, index) => (
                  <div key={`${item.title}-${index}`}>
                    <div className="space-y-3 text-center">
                      <Link
                        className="peer relative inline-flex overflow-hidden rounded-lg border transition-all hover:border-primary/50 sm:flex dark:border-zinc-700/80 dark:hover:border-zinc-600"
                        href={item.url}
                      >
                        <Image
                          alt={`${item.title} component preview`}
                          className="h-44 w-full object-cover sm:h-48 md:h-52"
                          height={1080}
                          loading="lazy"
                          src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1765176526/${item.title}.png`}
                          width={1920}
                        />
                      </Link>

                      <div className="[&_a]:peer-hover:underline">
                        <h2>
                          <Link
                            className="font-medium text-sm capitalize hover:underline sm:text-base"
                            href={item.url}
                          >
                            {item.title}
                          </Link>
                        </h2>
                        <p className="text-muted-foreground text-xs sm:text-[13px]">
                          {item.number} Components
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <div className="mb-10 text-center sm:mb-14">
            <h1 className="mb-3 font-figtree font-medium text-2xl sm:mb-4 sm:text-3xl md:text-4xl">
              Powerful & efficient UI components
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground text-sm sm:text-base">
              Here&apos;s what sets our components apart
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
            {[
              {
                description:
                  "Components maintained and updated regularly. No need for manual patches or worrying about outdated dependencies.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
                title: "Always Up-to-Date",
              },
              {
                description:
                  "Built with a modular, layered approach so you can use individual pieces or the full component library.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                ),
                title: "Layered Architecture",
              },
              {
                description:
                  "Optimized for speed with minimal bundle size. Every component is tree-shakeable and lightweight.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                  </svg>
                ),
                title: "Blazing Performance",
              },
              {
                description:
                  "Tailwind-first styling with sensible defaults. Override any style to match your brand perfectly.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                title: "Fully Customizable",
              },
              {
                description:
                  "WAI-ARIA compliant with keyboard navigation and screen reader support baked into every component.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ),
                title: "Accessible by Default",
              },
              {
                description:
                  "Seamless integration with Next.js App Router, Server Components, and the entire React ecosystem.",
                icon: (
                  <svg
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9m-9 9a9 9 0 0 1 9-9" />
                  </svg>
                ),
                title: "Next.js Optimized",
              },
            ].map((feature) => (
              <div className="space-y-3" key={feature.title}>
                <div className="text-foreground">{feature.icon}</div>
                <h3 className="font-figtree font-medium text-base sm:text-lg">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImplementationSection highlightedSnippets={highlightedSnippets} />

      <section className="border-b px-4 md:px-0">
        <div className="relative mx-auto max-w-6xl overflow-hidden border-neutral-200 border-x px-4 py-12 sm:px-6 md:py-16 lg:px-8 dark:border-neutral-800">
          <div className="mb-10 text-center sm:mb-14">
            <h1 className="mb-3 font-figtree font-medium text-2xl text-foreground sm:mb-4 sm:text-3xl md:text-4xl">
              Developers love building with Cnippet UI
            </h1>
            <p className="mx-auto max-w-xl text-muted-foreground text-sm sm:text-base">
              Here&apos;s what developers say about our components
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                avatar: "AK",
                company: "Vercel",
                name: "Alex Kim",
                quote:
                  "Switching from Radix to Base UI felt daunting, but Cnippet UI made the migration seamless. The components are rock-solid and fully accessible out of the box.",
                role: "Frontend Engineer",
              },
              {
                avatar: "MR",
                company: "Linear",
                name: "Maria Rodriguez",
                quote:
                  "The copy-paste approach is genius. We own every line of code, and the Tailwind-first styling fits perfectly into our existing design system.",
                role: "Design Engineer",
              },
              {
                avatar: "DP",
                company: "Stripe",
                name: "Daniel Park",
                quote:
                  "The layered architecture — primitives, particles, and atoms — lets us pick exactly the right abstraction level for each use case.",
                role: "Staff Engineer",
              },
              {
                avatar: "SN",
                company: "Supabase",
                name: "Sophie Nguyen",
                quote:
                  "We replaced our entire component library with Cnippet UI in a weekend. The CLI makes adding components as easy as running a single command.",
                role: "Full-Stack Developer",
              },
              {
                avatar: "JT",
                company: "Resend",
                name: "James Torres",
                quote:
                  "Like shadcn/ui but built on Base UI — that's exactly what we needed. The accessibility and keyboard navigation work flawlessly.",
                role: "Product Engineer",
              },
              {
                avatar: "LW",
                company: "Cal.com",
                name: "Lisa Wang",
                quote:
                  "The documentation is excellent and every component is AI-friendly. Our team can reason about and modify components with confidence.",
                role: "Lead Developer",
              },
            ].map((testimonial) => (
              <div
                className="rounded-xl border border-neutral-200 bg-white p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/60"
                key={testimonial.name}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-medium text-foreground text-sm dark:bg-neutral-700 dark:text-white">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="mb-4 text-muted-foreground text-sm leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex gap-0.5 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      className="size-4"
                      fill="currentColor"
                      key={`star-${testimonial.name}-${i}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

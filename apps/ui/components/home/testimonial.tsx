import { BorderBottomWithDots } from "../grid-design";

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

function _Badge({
  badgeText,
  badgeLink,
  badgeLinkText,
  position,
}: {
  badgeText: string;
  badgeLink?: string;
  badgeLinkText?: string;
  position?: "center" | "left" | "right";
}) {
  return (
    <div
      className={`relative mr-auto w-fit bg-foreground/5 p-1 ${position === "center" ? "mx-auto" : position === "left" ? "mr-auto" : "ml-auto"} `}
    >
      <div
        aria-hidden="true"
        className="absolute top-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute top-1 right-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1 left-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div
        aria-hidden="true"
        className="absolute right-1 bottom-1 size-0.75 rounded-full bg-foreground/20"
      />
      <div className="relative flex h-fit items-center gap-2 px-3">
        <span className="text-sm text-title">{badgeText}</span>
        {badgeLink && (
          <>
            <span className="block h-3 w-px bg-foreground/5" />
            <a className="text-primary text-sm" href={badgeLink}>
              {badgeLinkText}
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section>
      <div className="relative">
        <section className="px-4 md:px-0">
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
                  className="rounded-xl border border-neutral-200 bg-neutral-100 p-5 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900/60"
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
        <BorderBottomWithDots />
      </div>
    </section>
  );
}

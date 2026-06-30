import Link from "next/link";
import { FullWidthBorder } from "@/components/layout/full-width-border";

const posts = [
  {
    category: "Case Study",
    date: "Jun 2025",
    description:
      "From a leaky multi-step form to a 40% better conversion rate — what we changed, why we changed it, and the Next.js patterns that made it possible.",
    href: "/blog/saas-onboarding-rebuild",
    title: "How we rebuilt a SaaS onboarding flow in 5 weeks",
  },
  {
    category: "Component Design",
    date: "May 2025",
    description:
      "Why every cnippet component is copy-paste instead of an npm install — and what that means for your codebase ownership long-term.",
    href: "/blog/copy-paste-components",
    title: "The case for owning your component code",
  },
  {
    category: "Next.js",
    date: "Apr 2025",
    description:
      "Auth, CMS, email, analytics, and payments — the patterns we've settled on after shipping dozens of Next.js projects for clients.",
    href: "/blog/nextjs-production-lessons",
    title: "Everything we've learned building production Next.js apps",
  },
];

export function Blogs() {
  return (
    <section className="relative pt-12">
      <FullWidthBorder className="top-0" />
      <div className="flex items-end justify-between gap-4 px-4 pb-10">
        <div className="flex flex-col gap-2">
          <p className="font-medium font-mono text-cnippet-orange text-sm">
            [from the blog]
          </p>
          <h2 className="w-full max-w-4xl text-pretty font-f37-stout text-4xl sm:text-3xl md:text-balance md:text-4xl">
            Thinking out loud
            <br />
            about building for the web.
          </h2>
        </div>
        <Link
          className="hidden shrink-0 rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground md:inline-flex"
          href="/blog"
        >
          View all posts →
        </Link>
      </div>

      <div className="relative grid gap-0 lg:grid-cols-3">
        <FullWidthBorder className="top-0" />
        {posts.map((post, index) => (
          <Link
            className={`group flex flex-col gap-4 border-b border-dashed p-6 pb-8 transition-colors hover:bg-accent/20 sm:p-8 sm:pb-10 lg:border-b-0 ${
              index < posts.length - 1 ? "lg:border-r" : ""
            }`}
            href={post.href}
            key={post.title}
          >
            <div className="flex items-center justify-between">
              <span className="rounded-[2px] bg-cnippet-orange/10 px-2 py-0.5 font-mono text-cnippet-orange text-xs">
                {post.category}
              </span>
              <span className="font-mono text-muted-foreground/50 text-xs">
                {post.date}
              </span>
            </div>
            <h3 className="font-f37-stout text-lg leading-snug">
              {post.title}
            </h3>
            <p className="text-balance text-muted-foreground text-sm leading-relaxed">
              {post.description}
            </p>
            <span className="mt-auto font-mono text-muted-foreground text-xs transition-colors group-hover:text-foreground">
              Read more →
            </span>
          </Link>
        ))}
      </div>

      <div className="px-4 pt-4 md:hidden">
        <Link
          className="rounded-[2px] border border-dashed px-3 py-1.5 font-mono text-muted-foreground text-xs transition-colors hover:text-foreground"
          href="/blog"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}

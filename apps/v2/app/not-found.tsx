import { ArrowLeft } from "lucide-react";
import { PrefetchLink } from "@/components/prefetch-link";
import { Kicker } from "@/components/signal/kicker";
import { SectionTitle } from "@/components/signal/section";
import { SiteShell } from "@/components/site/site-shell";
import { Button } from "@/registry/default/ui/button";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative isolate flex flex-1 items-center justify-center overflow-hidden px-4 pt-[calc(var(--header-height)+7rem)] pb-28 md:rounded-t-canvas">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-dot-field"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grain" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center font-display font-semibold text-[clamp(10rem,32vw,24rem)] text-foreground/4 leading-none tracking-[-0.08em]"
        >
          404
        </span>

        <div className="flex max-w-md flex-col items-center text-center">
          <Kicker>error 404 — not found</Kicker>
          <SectionTitle className="mt-5">
            This page <em>shipped elsewhere.</em>
          </SectionTitle>
          <p className="mt-4 text-[16px] text-muted-foreground leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            <Button render={<PrefetchLink href="/" />} variant="outline">
              <ArrowLeft />
              Go home
            </Button>
            <Button render={<PrefetchLink href="/explore" />}>
              Browse components
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

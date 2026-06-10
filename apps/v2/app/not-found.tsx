import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/registry/default/ui/button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <div
        className={
          "grid grid-cols-1 [--gutter-width:2.5rem] md:-mx-4" +
          "md:grid-cols-[var(--gutter-width)_minmax(0,var(--breakpoint-xl))_var(--gutter-width)] lg:mx-auto"
        }
      >
        <div className="col-start-1 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />

        <main className="flex min-h-[calc(100svh-var(--header-height))] flex-col items-center justify-center gap-6 px-4 text-center">
          <p className="font-mono text-black/40 text-xs tracking-tighter dark:text-white/40">
            404
          </p>
          <h1 className="text-4xl tracking-tighter sm:text-5xl lg:text-6xl">
            Page not found.
          </h1>
          <p className="max-w-sm font-mono text-black/40 text-sm tracking-tighter dark:text-white/40">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center gap-3">
            <Button render={<Link href="/" />} variant="outline">
              Go home
            </Button>
            <Button render={<Link href="/explore" />}>Browse components</Button>
          </div>
        </main>

        <div className="col-start-3 row-span-full hidden border-x border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/7 md:block dark:[--pattern-fg:var(--color-white)]/8" />
      </div>
    </>
  );
}

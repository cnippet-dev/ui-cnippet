import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { DocsSidebar, type PageTree } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { DocsTopBar } from "@/components/docs-topbar";
import { PrefetchLink } from "@/components/prefetch-link";
import { Canvas } from "@/components/signal/canvas";
import { Kicker } from "@/components/signal/kicker";
import { SiteFooter } from "@/components/site/site-footer";

type Neighbour = { url: string; name?: ReactNode } | null | undefined;

type DocsPageProps = {
  actions?: ReactNode;
  children: ReactNode;
  description?: string;
  kicker: string;
  neighbours: { next?: Neighbour; previous?: Neighbour };
  title: ReactNode;
  toc?: { title?: ReactNode; url: string; depth: number }[];
  tree: PageTree;
};

/**
 * The Signal docs page: sidebar on the chrome, content on the canvas, TOC as a
 * rail inside the canvas. Shared by /docs, /ui and /motion.
 */
export function DocsPage({
  actions,
  children,
  description,
  kicker,
  neighbours,
  title,
  toc,
  tree,
}: DocsPageProps) {
  const hasToc = Boolean(toc && toc.length > 0);

  return (
    <>
      <DocsSidebar tree={tree} />

      {/* No overflow clip: the sticky topbar paints a chrome mask just
          outside the canvas to keep the rounded top while scrolling. */}
      <Canvas data-slot="docs">
        <DocsTopBar
          next={neighbours.next}
          previous={neighbours.previous}
          tree={tree}
        />

        <div className="grid min-w-0 flex-1 xl:grid-cols-[minmax(0,1fr)_15rem]">
          <article className="mx-auto flex w-full min-w-0 max-w-3xl flex-col px-5 pt-10 pb-16 sm:px-8 lg:pt-14">
            <header className="flex flex-col gap-3 border-b pb-8">
              <Kicker>{kicker}</Kicker>
              <h1 className="text-balance font-heading font-semibold text-[32px] leading-[1.1] tracking-[-0.035em] md:text-[40px]">
                {title}
              </h1>
              {description ? (
                <p className="text-pretty text-[16px] text-muted-foreground leading-relaxed md:text-[17px]">
                  {description}
                </p>
              ) : null}
              {actions ? (
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {actions}
                </div>
              ) : null}
            </header>

            <div className="w-full flex-1 pt-8 text-[15px]">{children}</div>

            <PrevNext
              next={neighbours.next ?? null}
              previous={neighbours.previous ?? null}
            />
          </article>

          {hasToc ? (
            <aside className="no-scrollbar sticky top-[calc(var(--header-height)+var(--docs-topbar-height))] hidden max-h-[calc(100svh-var(--header-height)-var(--docs-topbar-height))] self-start overflow-y-auto py-14 pe-6 xl:block">
              <DocsToc toc={toc ?? []} />
            </aside>
          ) : null}
        </div>

        <SiteFooter />
      </Canvas>
    </>
  );
}

function PrevNext({
  next,
  previous,
}: {
  next: Neighbour;
  previous: Neighbour;
}) {
  if (!next && !previous) return null;

  const card =
    "group/pn flex flex-1 flex-col gap-1 rounded-2xl border bg-frame px-4 py-3.5 transition-colors duration-150 hover:border-border-strong";

  return (
    <nav
      aria-label="Pagination"
      className="mt-16 grid gap-3 border-t pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <PrefetchLink className={card} href={previous.url}>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
            <ArrowLeft className="size-3 transition-transform duration-250 ease-out-expo group-hover/pn:-translate-x-0.5" />
            previous
          </span>
          <span className="font-medium text-[14px]">{previous.name}</span>
        </PrefetchLink>
      ) : (
        <span className="max-sm:hidden" />
      )}
      {next ? (
        <PrefetchLink className={`${card} items-end text-end`} href={next.url}>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-faint">
            next
            <ArrowRight className="size-3 transition-transform duration-250 ease-out-expo group-hover/pn:translate-x-0.5" />
          </span>
          <span className="font-medium text-[14px]">{next.name}</span>
        </PrefetchLink>
      ) : null}
    </nav>
  );
}

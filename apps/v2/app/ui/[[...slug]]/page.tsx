import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsSidebar } from "@/components/docs-sidebar";
import { DocsToc } from "@/components/docs-toc";
import { DocsTopBar } from "@/components/docs-topbar";
import { source } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/registry/default/ui/button";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const doc = page.data;

  if (!doc.title || !doc.description) notFound();

  const slug = params.slug?.join("/") ?? "";
  const url = `https://ui.cnippet.dev/ui/${slug}`;
  const fullTitle = `${doc.title} Component — Cnippet UI`;

  return {
    alternates: { canonical: url },
    description: doc.description,
    openGraph: {
      description: doc.description,
      title: fullTitle,
      url,
    },
    title: { absolute: fullTitle },
    twitter: {
      description: doc.description,
      title: fullTitle,
    },
  };
}

export default async function UIPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect("/explore");
  }

  const page = source.getPage(params.slug);
  if (!page) notFound();

  const doc = page.data;
  const rawContent = await page.data.getText("raw");
  const MDX = doc.body;
  const toc = doc.toc;
  const links = doc.links;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  return (
    <div
      className="flex flex-col text-[1.05rem] sm:text-[15px] xl:w-full"
      data-slot="docs"
    >
      <DocsTopBar next={neighbours.next} previous={neighbours.previous} />

      <div className="container-wrapper">
        <div className="grid min-w-0 items-start px-2 pt-(--docs-topbar-height) lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] xl:grid-cols-[var(--sidebar-width)_minmax(0,1fr)_18rem]">
          {/* Sidebar — col 1 */}
          <DocsSidebar tree={source.pageTree} />

          {/* Content — col 2 */}
          <div className="flex min-w-0 flex-1 flex-col xl:col-start-2">
            <div className="h-(--top-spacing) shrink-0" />
            <div className="mx-auto flex w-full min-w-0 max-w-2xl flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
              <div className="flex flex-col gap-2">
                <h1 className="scroll-m-20 font-medium text-4xl tracking-tight sm:text-3xl xl:text-4xl">
                  {doc.title}
                </h1>
                {doc.description && (
                  <p className="text-balance text-[1.05rem] text-muted-foreground sm:text-base">
                    {doc.description}
                  </p>
                )}
                {(links?.doc || rawContent) && (
                  <div className="flex items-center gap-2 pt-2">
                    {links?.doc && (
                      <Button
                        render={
                          <Link
                            href={links.doc}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <HugeiconsIcon
                              icon={LinkSquare02Icon}
                              strokeWidth={2.5}
                            />
                            API Reference
                          </Link>
                        }
                        size="xs"
                        variant="outline"
                      />
                    )}
                    {rawContent && <DocsCopyPage page={rawContent} />}
                  </div>
                )}
              </div>

              <div className="w-full flex-1">
                <MDX components={mdxComponents} />
              </div>
            </div>

            {/* Prev / next */}
            <div className="mx-auto flex h-16 w-full max-w-2xl items-center gap-2 border-t border-dashed px-4 md:px-0">
              {neighbours.previous && (
                <Link
                  className="inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-dashed px-3 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
                  href={neighbours.previous.url}
                >
                  <ArrowLeft className="size-3.5" />
                  {neighbours.previous.name}
                </Link>
              )}
              {neighbours.next && (
                <Link
                  className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-dashed px-3 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
                  href={neighbours.next.url}
                >
                  {neighbours.next.name}
                  <ArrowRight className="size-3.5" />
                </Link>
              )}
            </div>
          </div>

          {/* TOC — col 3 (xl only) */}
          <div className="sticky top-[calc(var(--header-height)+var(--docs-topbar-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--docs-topbar-height)-var(--footer-height))] flex-col gap-4 self-start overflow-hidden overscroll-none pb-8 xl:col-start-3 xl:flex">
            <div className="h-(--top-spacing) shrink-0" />
            {toc && toc.length > 0 && (
              <div className="no-scrollbar overflow-y-auto px-4">
                <DocsToc toc={toc} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

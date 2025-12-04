import {
  ArrowLeft02Icon,
  ArrowRight02Icon,
  LinkSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findNeighbour } from "fumadocs-core/page-tree";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsTableOfContents } from "@/components/docs-toc";
import { SiteFooter } from "@/components/site-footer";
import { docSource as source } from "@/lib/source";
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
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!doc.title || !doc.description) {
    notFound();
  }

  return {
    description: doc.description,
    title: `${doc.title} - cnippet ui`,
  };
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  const rawContent = await page.data.getText("raw");
  const MDX = doc.body;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  const links = doc.links;

  return (
    <div
      className="flex items-stretch border-l sm:text-[.9375rem] xl:w-full"
      data-slot="docs"
    >
      <div className="">
        <div className="-m-px border bg-background px-4 py-6 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] sm:px-6 lg:p-8 dark:before:shadow-[0_-1px_--theme(--color-white/8%)]">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h1 className="scroll-m-20 font-heading text-3xl xl:text-4xl">
                    {doc.title}
                  </h1>
                  {doc.description && (
                    <p className="text-muted-foreground sm:text-lg">
                      {doc.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 pt-4">
                  {links?.doc && (
                    <Button
                      render={
                        <Link href={links.doc} rel="noreferrer" target="_blank">
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
                  <DocsCopyPage page={rawContent} />
                </div>
              </div>
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <MDX components={mdxComponents} />
              </div>
            </div>
            <div className="hidden items-center gap-2 pt-8 sm:flex">
              {neighbours.previous && (
                <Button
                  className="shadow-none"
                  render={
                    <Link href={neighbours.previous.url}>
                      <HugeiconsIcon icon={ArrowLeft02Icon} strokeWidth={2} />{" "}
                      {neighbours.previous.name}
                    </Link>
                  }
                  variant="outline"
                />
              )}
              {neighbours.next && (
                <Button
                  className="ms-auto shadow-none"
                  render={
                    <Link href={neighbours.next.url}>
                      {neighbours.next.name}{" "}
                      <HugeiconsIcon icon={ArrowRight02Icon} strokeWidth={2} />
                    </Link>
                  }
                  variant="outline"
                />
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-6 lg:rounded-b-2xl lg:px-8">
          <SiteFooter />
        </div>
      </div>
      <div className="sticky top-(--header-height) z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-72 flex-col overflow-hidden overscroll-none xl:flex">
        <div className="no-scrollbar flex min-h-0 flex-col gap-2 overflow-y-auto py-2">
          <div className="h-(--top-spacing) shrink-0" />
          {doc.toc?.length ? <DocsTableOfContents toc={doc.toc} /> : null}
        </div>
      </div>
    </div>
  );
}

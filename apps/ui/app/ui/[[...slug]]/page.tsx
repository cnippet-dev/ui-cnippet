import { findNeighbour } from "fumadocs-core/page-tree";
import { notFound } from "next/navigation";
import { DocsTableOfContents } from "@/components/docs-toc";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";

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

  const pageUrl = `https://ui.cnippet.dev${page.url}`;
  const componentName = doc.title;

  return {
    alternates: {
      canonical: pageUrl,
    },
    description: doc.description,
    openGraph: {
      description: doc.description,
      siteName: "Cnippet UI",
      title: `${componentName} - Cnippet UI`,
      type: "article",
      url: pageUrl,
    },
    title: `${doc.title} - cnippet ui`,
    twitter: {
      card: "summary" as const,
      description: doc.description,
      title: `${componentName} - Cnippet UI`,
    },
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
  const _rawContent = await page.data.getText("raw");
  const MDX = doc.body;
  const _neighbours = await findNeighbour(source.pageTree, page.url);

  const _links = doc.links;

  return (
    <div
      className="flex items-stretch p-4 sm:text-[.9375rem] xl:w-full"
      data-slot="docs"
    >
      <div className="w-full overflow-hidden rounded-lg border bg-neutral-50 dark:bg-neutral-900/60">
        <div className="relative -m-px overflow-hidden pb-10 before:pointer-events-none before:absolute before:inset-0 md:border dark:before:shadow-[0_-1px_--theme(--color-white/8%)]">
          <div className="relative space-y-4 p-6">
            <h1 className="font-normal text-4xl">{doc.title}</h1>
            <div className="text-black/40 text-lg dark:text-white/40">
              {doc.description}
            </div>
          </div>

          <div className="mx-auto w-full max-w-3xl pt-8">
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              {/* <div className="flex flex-col gap-2">
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
                              <RiLinkM />
                              API Reference
                            </Link>
                          }
                          size="xs"
                          variant="outline"
                        />
                      )}
                      <DocsCopyPage page={rawContent} />
                    </div>
                  </div> */}
              <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
                <MDX components={mdxComponents} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-(--header-height) z-30 ms-auto hidden h-[calc(100svh-var(--header-height))] w-92 flex-col overflow-hidden overscroll-none xl:flex">
        <div className="no-scrollbar flex min-h-0 flex-col gap-2 overflow-y-auto py-2">
          <div className="h-(--top-spacing) shrink-0" />
          {doc.toc?.length ? <DocsTableOfContents toc={doc.toc} /> : null}
        </div>
      </div>
    </div>
  );
}

function _Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-7 w-full border-edge border-y lg:h-8",
        "bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 dark:[--pattern-fg:var(--color-white)]/10",
        "before:absolute before:right-[calc(100%+var(--gutter-width))] before:-z-1 before:h-7 before:w-screen before:border-border/50! before:border-edge before:border-y lg:before:h-10 dark:before:border-border",
        "after:absolute after:left-[calc(100%+var(--gutter-width))] after:-z-1 after:h-7 after:w-screen after:border-border/50! after:border-edge after:border-y lg:after:h-10 dark:after:border-border",
        className,
      )}
    />
  );
}

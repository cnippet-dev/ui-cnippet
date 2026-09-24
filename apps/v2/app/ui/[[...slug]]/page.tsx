import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findNeighbour } from "fumadocs-core/page-tree";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsPage } from "@/components/docs-page";
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
  const links = doc.links;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  return (
    <DocsPage
      actions={
        <>
          {links?.doc ? (
            <Button
              render={
                <a href={links.doc} rel="noreferrer" target="_blank">
                  <HugeiconsIcon icon={LinkSquare02Icon} strokeWidth={2.5} />
                  API Reference
                </a>
              }
              size="xs"
              variant="outline"
            />
          ) : null}
          {rawContent ? <DocsCopyPage page={rawContent} /> : null}
        </>
      }
      description={doc.description}
      kicker={params.slug[0]?.replace(/-/g, " ") ?? "components"}
      neighbours={neighbours}
      title={doc.title}
      toc={doc.toc}
      tree={source.pageTree}
    >
      <MDX components={mdxComponents} />
    </DocsPage>
  );
}

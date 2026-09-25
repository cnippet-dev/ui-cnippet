import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { findNeighbour } from "fumadocs-core/page-tree";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsPage } from "@/components/docs-page";
import { hasRegistryItem } from "@/lib/llm/page-to-markdown";
import { motionSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";
import { Button } from "@/registry/default/ui/button";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return motionSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = motionSource.getPage(params.slug);

  if (!page) notFound();

  const doc = page.data;

  if (!doc.title || !doc.description) notFound();

  const slug = params.slug?.join("/") ?? "";
  const url = `https://ui.cnippet.dev/motion/${slug}`;
  const fullTitle = `${doc.title} — Cnippet Motion`;

  return {
    alternates: { canonical: url, types: { "text/markdown": `${url}.md` } },
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

export default async function MotionPage(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = motionSource.getPage(params.slug);
  if (!page) notFound();

  const doc = page.data;
  const MDX = doc.body;
  const links = doc.links;
  const neighbours = await findNeighbour(motionSource.pageTree, page.url);
  const itemName = params.slug?.at(-1);
  const registryName =
    itemName && hasRegistryItem(itemName) ? itemName : undefined;

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
          <DocsCopyPage pageUrl={page.url} registryName={registryName} />
        </>
      }
      description={doc.description}
      kicker={params.slug?.[0]?.replace(/-/g, " ") ?? "motion"}
      neighbours={neighbours}
      title={doc.title}
      toc={doc.toc}
      tree={motionSource.pageTree}
    >
      <MDX components={mdxComponents} />
    </DocsPage>
  );
}

import { findNeighbour } from "fumadocs-core/page-tree";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsPage } from "@/components/docs-page";
import { docSource } from "@/lib/source";
import { mdxComponents } from "@/mdx-components";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return docSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = docSource.getPage(params.slug);
  if (!page) notFound();

  const slug = params.slug?.join("/") ?? "";
  const url = `https://ui.cnippet.dev/docs/${slug}`;

  return {
    alternates: { canonical: url, types: { "text/markdown": `${url}.md` } },
    description: page.data.description,
    openGraph: {
      description: page.data.description,
      title: `${page.data.title} — Cnippet UI`,
      url,
    },
    title: page.data.title,
    twitter: {
      description: page.data.description,
      title: `${page.data.title} — Cnippet UI`,
    },
  };
}

export default async function DocsRoute(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect("/docs/introduction");
  }

  const page = docSource.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const neighbours = await findNeighbour(docSource.pageTree, page.url);

  return (
    <DocsPage
      actions={<DocsCopyPage pageUrl={page.url} />}
      description={page.data.description}
      kicker="guides"
      neighbours={neighbours}
      title={page.data.title}
      toc={page.data.toc}
      tree={docSource.pageTree}
    >
      <MDX components={mdxComponents} />
    </DocsPage>
  );
}

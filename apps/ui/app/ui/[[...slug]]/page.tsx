import { findNeighbour } from "fumadocs-core/page-tree";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { notFound } from "next/navigation";
import { source } from "@/lib/source";
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
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <div className="flex items-center justify-between gap-4">
        <DocsTitle className="mb-0">{page.data.title}</DocsTitle>
        {/* <PageContextMenu markdown={markdown} /> */}
      </div>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={mdxComponents} />
      </DocsBody>
    </DocsPage>
  );
}

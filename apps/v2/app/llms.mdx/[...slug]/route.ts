import { getAllLlmPages, getLlmPage } from "@/lib/llm/llms";
import { pageToMarkdown } from "@/lib/llm/page-to-markdown";

// Served at `<page url>.md` through a rewrite in next.config.ts.

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLlmPages().map((page) => ({
    slug: page.url.split("/").filter(Boolean),
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const page = getLlmPage(slug);

  if (!page) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await pageToMarkdown(page), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}

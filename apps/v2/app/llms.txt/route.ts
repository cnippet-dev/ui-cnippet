import { buildLlmsTxt } from "@/lib/llm/llms";

export const revalidate = false;
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

import { buildLlmsFullTxt } from "@/lib/llm/llms";

export const revalidate = false;
export const dynamic = "force-static";

export async function GET() {
  return new Response(await buildLlmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

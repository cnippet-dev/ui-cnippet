import { highlightCode } from "@cnippet/ui/lib/highlight-code";
import { NextResponse } from "next/server";
import { getRegistryItem } from "@/lib/registry";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const item = await getRegistryItem(name);

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const code = item.files?.[0]?.content ?? "";
  const html = await highlightCode(code, "tsx");
  return NextResponse.json({ code, html });
}

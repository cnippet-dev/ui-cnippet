import { promises as fs } from "node:fs";
import path from "node:path";
import { highlightCode } from "@cnippet/ui/lib/highlight-code";
import { NextResponse } from "next/server";
import { fixImport } from "@/lib/fix-import";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const jsonPath = path.join(process.cwd(), "public", "r", `${name}.json`);

  let raw: string;
  try {
    raw = await fs.readFile(jsonPath, "utf-8");
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let registryItem: { files?: { content?: string }[] };
  try {
    registryItem = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { error: "Invalid registry file" },
      { status: 500 },
    );
  }

  const code = fixImport(registryItem.files?.[0]?.content ?? "");

  if (!code) {
    return NextResponse.json({ error: "No source available" }, { status: 404 });
  }

  let html: string | null = null;
  try { 
    html = await highlightCode(code, "tsx");
  } catch {
    // Fall back to raw code if highlighting fails
  }

  return NextResponse.json({ code, html });
}

import { promises as fs } from "node:fs";
import path from "node:path";
import { highlightCode } from "@cnippet/ui/lib/highlight-code";
import { NextResponse } from "next/server";
import { fixImport } from "@/lib/registry";
import { Index } from "@/registry/__index__";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const item = Index[name];

  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath: string | undefined = item.files?.[0]?.path;
  if (!filePath) {
    return NextResponse.json({ error: "No file" }, { status: 404 });
  }

  const absolutePath = path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);

  let code: string;
  try {
    code = await fs.readFile(absolutePath, "utf-8");
  } catch {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  code = fixImport(code);

  let html: string | null = null;
  try {
    html = await highlightCode(code, "tsx");
  } catch {
    // Return raw code even if highlighting fails
  }

  return NextResponse.json({ code, html });
}

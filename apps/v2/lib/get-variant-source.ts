"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { fixImport } from "@/lib/fix-import";
import { highlightCode } from "@/lib/highlight-code";

export async function getVariantSource(
  name: string,
): Promise<{ code: string; html: string | null }> {
  const jsonPath = path.join(process.cwd(), "public", "r", `${name}.json`);

  let raw: string;
  try {
    raw = await fs.readFile(jsonPath, "utf-8");
  } catch {
    return { code: "", html: null };
  }

  let registryItem: { files?: { content?: string }[] };
  try {
    registryItem = JSON.parse(raw);
  } catch {
    return { code: "", html: null };
  }

  const code = fixImport(registryItem.files?.[0]?.content ?? "");
  if (!code) return { code: "", html: null };

  let html: string | null = null;
  try {
    html = await highlightCode(code);
  } catch {
    // fall back to raw code display
  }

  return { code, html };
}

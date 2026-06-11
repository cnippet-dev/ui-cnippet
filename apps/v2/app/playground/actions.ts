"use server";

import fs from "node:fs";
import path from "node:path";

export async function getVariantSource(variantKey: string): Promise<string> {
  // Sanitize: only allow alphanumeric and hyphens
  if (!/^[a-z0-9-]+$/.test(variantKey)) return "";

  const filePath = path.join(
    process.cwd(),
    "registry",
    "default",
    "variants",
    `${variantKey}.tsx`,
  );

  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    return "";
  }
}

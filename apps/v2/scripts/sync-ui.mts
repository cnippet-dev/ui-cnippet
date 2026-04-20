import { promises as fs } from "node:fs";
import path from "node:path";

async function resolvePaths() {
  const cwd = process.cwd();
  const sourceRoot = path.join(cwd, "registry/default");
  const sourceDirs = {
    baseUi: path.join(sourceRoot, "base-ui"),
    hooks: path.join(sourceRoot, "hooks"),
    lib: path.join(sourceRoot, "lib"),
    ui: path.join(sourceRoot, "ui"),
  };
  // From apps/ui → ../../packages/ui/src/*
  const targetRoot = path.resolve(cwd, "../../packages/ui/src");
  const targetDirs = {
    baseUi: path.join(targetRoot, "base-ui"),
    hooks: path.join(targetRoot, "hooks"),
    lib: path.join(targetRoot, "lib"),
    ui: path.join(targetRoot, "components"),
  };
  return { sourceDirs, sourceRoot, targetDirs, targetRoot };
}

async function ensureDirExists(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyAndRewriteFile(from: string, to: string) {
  const content = await fs.readFile(from, "utf8");

  // Only rewrite TypeScript/JavaScript files
  if (/(\.tsx|\.ts|\.mts|\.cts|\.jsx|\.js)$/.test(from)) {
    const rewritten = rewriteImports(content);
    await fs.writeFile(to, rewritten, "utf8");
  } else {
    // Copy non-code files as-is
    await fs.copyFile(from, to);
  }
}

async function copyDirectoryRecursive(from: string, to: string) {
  await ensureDirExists(to);
  const entries = await fs.readdir(from, { withFileTypes: true });

  for (const entry of entries) {
    const fromPath = path.join(from, entry.name);
    const toPath = path.join(to, entry.name);

    if (entry.isDirectory()) {
      await copyDirectoryRecursive(fromPath, toPath);
    } else {
      await copyAndRewriteFile(fromPath, toPath);
    }
  }
}

async function copyRegistryTrees() {
  const { sourceRoot, sourceDirs, targetDirs } = await resolvePaths();

  // Validate root exists
  try {
    await fs.access(sourceRoot);
  } catch {
    throw new Error(`Source root not found: ${sourceRoot}`);
  }

  // For each subtree (ui, hooks, lib), copy if present
  for (const key of Object.keys(sourceDirs) as (keyof typeof sourceDirs)[]) {
    const from = sourceDirs[key];
    const to = targetDirs[key];
    try {
      await fs.access(from);
    } catch {
      // Skip silently if the subtree doesn't exist
      continue;
    }
    await copyDirectoryRecursive(from, to);
  }
}

function rewriteImports(code: string): string {
  let result = code;
  // Rewrite paths according to rules
  // "@/lib/*"        → "@cnippet/ui/lib/*"
  // "@/hooks/*"      → "@cnippet/ui/hooks/*"
  // "@/registry/default/ui/*" → "@cnippet/ui/components/*"
  // "@/registry/default/hooks/*" → "@cnippet/ui/hooks/*"
  // "@/registry/default/lib/*" → "@cnippet/ui/lib/*"
  result = result.replace(/(["'])@\/lib\//g, "$1@coss/ui/lib/");
  result = result.replace(/(["'])@\/hooks\//g, "$1@coss/ui/hooks/");
  result = result.replace(
    /(["'])@\/registry\/default\/ui\//g,
    "$1@coss/ui/components/",
  );
  result = result.replace(
    /(["'])@\/registry\/default\/hooks\//g,
    "$1@coss/ui/hooks/",
  );
  result = result.replace(
    /(["'])@\/registry\/default\/lib\//g,
    "$1@coss/ui/lib/",
  );
  return result;
}

async function invalidatePackageCache() {
  const { targetRoot } = await resolvePaths();
  const packageJsonPath = path.join(targetRoot, "../package.json");
  try {
    // Touch package.json to invalidate Next.js module cache
    const now = new Date();
    await fs.utimes(packageJsonPath, now, now);
  } catch {
    // Ignore if package.json doesn't exist or can't be touched
  }
}

try {
  console.log("📦 Propagating registry primitives → packages/ui/src …");
  const { sourceDirs, targetRoot } = await resolvePaths();
  console.log("├─ Sources:");
  console.log(`│  ├─ UI:      ${sourceDirs.ui}`);
  console.log(`│  ├─ Hooks:   ${sourceDirs.hooks}`);
  console.log(`│  ├─ Lib:    ${sourceDirs.lib}`);
  console.log(`│  └─ Base UI: ${sourceDirs.baseUi}`);
  console.log(`└─ Target root: ${targetRoot}`);

  await copyRegistryTrees();
  await invalidatePackageCache();

  console.log(
    "✅ UI primitives synced successfully! (imports rewritten during copy)",
  );
} catch (error) {
  console.error(error);
  process.exit(1);
}

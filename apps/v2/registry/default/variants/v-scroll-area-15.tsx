import { FileIcon, FolderIcon } from "lucide-react";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const files = [
  { isFolder: true, name: "app", path: "app/" },
  { isFolder: true, name: "components", path: "app/components/" },
  { isFolder: false, name: "layout.tsx", path: "app/layout.tsx" },
  { isFolder: false, name: "page.tsx", path: "app/page.tsx" },
  { isFolder: false, name: "globals.css", path: "app/globals.css" },
  { isFolder: true, name: "lib", path: "lib/" },
  { isFolder: false, name: "utils.ts", path: "lib/utils.ts" },
  { isFolder: false, name: "auth.ts", path: "lib/auth.ts" },
  { isFolder: true, name: "public", path: "public/" },
  { isFolder: false, name: "favicon.ico", path: "public/favicon.ico" },
  { isFolder: false, name: "logo.svg", path: "public/logo.svg" },
  { isFolder: false, name: "next.config.ts", path: "next.config.ts" },
  { isFolder: false, name: "tailwind.config.ts", path: "tailwind.config.ts" },
  { isFolder: false, name: "package.json", path: "package.json" },
  { isFolder: false, name: "tsconfig.json", path: "tsconfig.json" },
];

export default function Particle() {
  return (
    <ScrollArea className="h-64 w-56 rounded-lg border" scrollFade>
      <div className="flex flex-col gap-0.5 p-2">
        {files.map(({ isFolder, name, path }) => {
          const Icon = isFolder ? FolderIcon : FileIcon;
          return (
            <button
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-start text-sm transition-colors hover:bg-accent"
              key={path}
              type="button"
            >
              <Icon aria-hidden="true" className="size-4 shrink-0 opacity-60" />
              <span className="truncate">{name}</span>
            </button>
          );
        })}
      </div>
    </ScrollArea>
  );
}

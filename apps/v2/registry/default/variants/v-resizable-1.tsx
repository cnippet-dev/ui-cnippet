// title: Code editor layout with nested resizable panels
import { FileCodeIcon, FileIcon, FolderIcon } from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

const FILES = [
  { depth: 0, icon: FolderIcon, name: "app" },
  { depth: 1, icon: FileCodeIcon, name: "layout.tsx" },
  { depth: 0, icon: FolderIcon, name: "lib" },
  { active: true, depth: 1, icon: FileCodeIcon, name: "retry.ts" },
  { depth: 1, icon: FileCodeIcon, name: "retry.test.ts" },
  { depth: 0, icon: FileIcon, name: "package.json" },
];

const CODE = `export async function retry<T>(fn: () => Promise<T>) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === 4) throw error;
      await sleep(Math.min(2 ** attempt * 500, 30_000));
    }
  }
}`;

export default function Particle() {
  return (
    <ResizablePanelGroup className="h-80 w-full max-w-2xl overflow-hidden rounded-xl border text-sm">
      <ResizablePanel collapsible defaultSize="26%" minSize="18%">
        <div className="flex h-full flex-col gap-0.5 overflow-auto p-2">
          <p className="px-2 py-1 font-medium text-muted-foreground text-xs">
            Explorer
          </p>
          {FILES.map((f) => (
            <div
              className={`flex items-center gap-1.5 rounded-md py-1 pe-2 ${f.active ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              key={f.name}
              style={{ paddingInlineStart: `${0.5 + f.depth}rem` }}
            >
              <f.icon aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{f.name}</span>
            </div>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="30%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="68%" minSize="25%">
            <div className="flex h-full flex-col">
              <div className="border-b px-3 py-1.5 text-muted-foreground text-xs">
                lib/retry.ts
              </div>
              <pre className="flex-1 overflow-auto p-3 font-mono text-xs leading-relaxed">
                {CODE}
              </pre>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="15%">
            <div className="flex h-full flex-col overflow-auto bg-muted/40 p-3 font-mono text-muted-foreground text-xs leading-relaxed">
              <span>$ bun test lib/retry.test.ts</span>
              <span className="text-success-foreground">✓ 6 passed</span>
              <span>Done in 412ms</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

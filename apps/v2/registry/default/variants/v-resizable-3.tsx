// title: Vertical panels with grip handle
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  return (
    <ResizablePanelGroup
      className="h-64 w-full max-w-md rounded-xl border"
      orientation="vertical"
    >
      <ResizablePanel defaultSize="35%" minSize="20%">
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          Header
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize="20%">
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

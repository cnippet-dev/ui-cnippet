// title: Two horizontal panels
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

export default function Particle() {
  return (
    <ResizablePanelGroup className="h-48 w-full max-w-md rounded-xl border">
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          One
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
          Two
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

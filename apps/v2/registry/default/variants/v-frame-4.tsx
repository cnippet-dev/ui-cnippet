import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame className="w-full max-w-sm" dense>
      <FrameHeader>
        <FrameTitle>Inventory Check</FrameTitle>
        <FrameDescription>Real-time stock monitoring</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="font-semibold text-sm">Warehouse A</h2>
        <p className="text-muted-foreground text-sm">
          Dense mode removes outer padding for a more compact appearance.
        </p>
      </FramePanel>
    </Frame>
  );
}

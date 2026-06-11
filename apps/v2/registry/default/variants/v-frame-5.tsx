import { SettingsIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame className="w-full max-w-md">
      <FrameHeader className="flex-row items-center justify-between">
        <div>
          <FrameTitle>Workspace settings</FrameTitle>
          <FrameDescription>Manage your workspace preferences</FrameDescription>
        </div>
        <Button aria-label="Open settings" size="icon" variant="ghost">
          <SettingsIcon aria-hidden="true" />
        </Button>
      </FrameHeader>
      <FramePanel>
        <p className="text-muted-foreground text-sm">
          Configure integrations, billing, and team permissions from the
          settings panel.
        </p>
      </FramePanel>
    </Frame>
  );
}

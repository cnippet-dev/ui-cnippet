import { LightbulbIcon, XIcon } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";

import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="border-0 shadow-none" variant="info">
            <LightbulbIcon />
            <AlertTitle>New: Advanced Analytics</AlertTitle>
            <AlertAction className="flex items-start justify-start">
              <Button
                className="text-muted-foreground hover:text-foreground -mt-1 -mr-2 size-7 p-0 hover:bg-transparent"
                size="xs"
                variant="ghost"
              >
                <XIcon className="size-3.5" />
              </Button>
            </AlertAction>
            <AlertDescription>
              We&apos;ve just released a new dashboard for tracking your
              team&apos;s performance.
              <Button
                className="text-info mr-auto h-auto p-0 underline"
                size="sm"
                variant="link"
              >
                Explore features
              </Button>
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}

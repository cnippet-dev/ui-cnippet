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
                className="-mt-1 -mr-2 size-7 p-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
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
                className="mr-auto h-auto p-0 text-info underline"
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

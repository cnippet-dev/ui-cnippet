import { AlertTriangleIcon, CircleCheckIcon } from "lucide-react";
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
        <FramePanel className="p-0!">
          <Alert
            className="rounded-none border-0 shadow-none"
            variant="success"
          >
            <CircleCheckIcon />
            <AlertTitle>Deployment Successful</AlertTitle>
            <AlertDescription>
              Your application has been successfully deployed to the production
              environment.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="p-0!">
          <Alert
            className="rounded-none border-0 shadow-none"
            variant="warning"
          >
            <AlertTriangleIcon className="text-yellow-500" />
            <AlertTitle>Resource Limit Reached</AlertTitle>
            <AlertAction>
              <Button size="xs">Verify</Button>
            </AlertAction>
            <AlertDescription>
              Your current plan has reached its resource limits. Consider
              upgrading to a higher tier.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}

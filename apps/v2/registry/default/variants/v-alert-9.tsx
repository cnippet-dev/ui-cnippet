import { ShieldCheckIcon } from "lucide-react";
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
          <Alert className="border-0 shadow-none">
            <ShieldCheckIcon className="text-emerald-500" />
            <AlertTitle>Security Update</AlertTitle>
            <AlertAction>
              <Button size="xs" variant="outline">
                Dismiss
              </Button>
              <Button size="xs">Update</Button>
            </AlertAction>
            <AlertDescription>
              Update your password and enable 2FA to improve your account
              security.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}

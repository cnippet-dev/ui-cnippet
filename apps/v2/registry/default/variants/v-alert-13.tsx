import { HardDriveIcon } from "lucide-react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

export function Pattern() {
  const used = 9.1;
  const limit = 10;
  const pct = Math.round((used / limit) * 100);

  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="p-0!">
          <Alert
            className="rounded-none border-0 shadow-none"
            variant="warning"
          >
            <HardDriveIcon className="text-yellow-500" />
            <AlertTitle>Storage almost full</AlertTitle>
            <AlertAction>
              <Button size="xs">Upgrade</Button>
            </AlertAction>
            <AlertDescription>
              <span>
                You&apos;ve used{" "}
                <strong>
                  {used} GB of {limit} GB
                </strong>{" "}
                ({pct}%).
              </span>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-yellow-100 dark:bg-yellow-900/40">
                <div
                  className="h-full rounded-full bg-yellow-500 transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}

"use client";

import { DownloadIcon, PackageCheckIcon } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

export function Pattern() {
  const [updating, setUpdating] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="p-0!">
          <Alert
            className="rounded-none border-0 shadow-none"
            variant={done ? "success" : "info"}
          >
            {done ? <PackageCheckIcon /> : <DownloadIcon />}
            <AlertTitle>
              {done ? "You're up to date" : "Update available — v4.2.0"}
            </AlertTitle>
            {!done && (
              <AlertAction>
                <Button disabled={updating} onClick={handleUpdate} size="xs">
                  {updating ? "Updating…" : "Update now"}
                </Button>
              </AlertAction>
            )}
            <AlertDescription>
              {done
                ? "cnippet@4.2.0 is now installed. Restart your dev server to apply the changes."
                : "Includes performance improvements, 3 new components, and bug fixes."}
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  );
}

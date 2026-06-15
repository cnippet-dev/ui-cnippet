"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Frame,
  FrameDescription,
  FrameFooter,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

export function Pattern() {
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return (
      <Frame className="w-full max-w-sm">
        <FramePanel className="flex flex-col items-center gap-2 py-6 text-center">
          <span className="text-2xl">✓</span>
          <p className="font-medium text-sm">Account deleted</p>
          <p className="text-muted-foreground text-xs">
            Your data has been permanently removed.
          </p>
        </FramePanel>
      </Frame>
    );
  }

  return (
    <Frame className="w-full max-w-sm border-destructive/40">
      <FrameHeader>
        <FrameTitle className="text-destructive">Delete account</FrameTitle>
        <FrameDescription>
          This action is permanent and cannot be undone. All your data will be
          removed immediately.
        </FrameDescription>
      </FrameHeader>
      <FramePanel>
        <p className="text-muted-foreground text-sm">
          Type <span className="font-semibold text-foreground">DELETE</span> in
          the field below to confirm.
        </p>
        <input
          className="mt-3 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-destructive"
          placeholder="DELETE"
          type="text"
        />
      </FramePanel>
      <FrameFooter className="flex justify-end gap-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button
          onClick={() => setConfirmed(true)}
          type="button"
          variant="destructive"
        >
          Delete account
        </Button>
      </FrameFooter>
    </Frame>
  );
}

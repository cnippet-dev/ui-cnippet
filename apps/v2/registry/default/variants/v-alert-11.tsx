// title: Dismissible announcement banner with CTA
"use client";

import { ArrowRightIcon, MegaphoneIcon, XIcon } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="w-full max-w-2xl">
      <Alert variant="info">
        <MegaphoneIcon />
        <AlertTitle>Introducing Cnippet Pro</AlertTitle>
        <AlertAction className="flex items-start">
          <Button
            aria-label="Dismiss"
            className="-mt-1 -mr-1 size-7 text-muted-foreground"
            onClick={() => setVisible(false)}
            size="xs"
            variant="ghost"
          >
            <XIcon className="size-3.5" />
          </Button>
        </AlertAction>
        <AlertDescription>
          Unlock premium components, templates, and priority support.{" "}
          <Button
            className="mr-auto h-auto p-0 underline underline-offset-2"
            size="sm"
            variant="link"
          >
            Learn more
            <ArrowRightIcon className="size-3" />
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}

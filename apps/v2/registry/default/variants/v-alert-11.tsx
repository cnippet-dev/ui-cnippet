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
      <Alert className="border-violet-200 bg-violet-50 dark:border-violet-800 dark:bg-violet-950/40">
        <MegaphoneIcon className="text-violet-600 dark:text-violet-400" />
        <AlertTitle className="text-violet-900 dark:text-violet-100">
          Introducing Cnippet Pro
        </AlertTitle>
        <AlertAction className="flex items-start">
          <Button
            className="-mt-1 -mr-1 size-7 text-violet-500 hover:bg-violet-100 dark:hover:bg-violet-900"
            onClick={() => setVisible(false)}
            size="xs"
            variant="ghost"
          >
            <XIcon className="size-3.5" />
          </Button>
        </AlertAction>
        <AlertDescription className="text-violet-700 dark:text-violet-300">
          Unlock premium components, templates, and priority support.{" "}
          <Button
            className="h-auto p-0 text-violet-700 underline underline-offset-2 dark:text-violet-300"
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

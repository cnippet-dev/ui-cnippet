"use client";

import { CookieIcon } from "lucide-react";
import { useState } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full max-w-lg">
      <Alert className="shadow-md">
        <CookieIcon />
        <AlertTitle>We use cookies</AlertTitle>
        <AlertDescription className="inline-auto">
          We use cookies to personalize content, analyze traffic, and improve
          your experience. By continuing, you agree to our{" "}
          <a
            className="underline underline-offset-2 hover:text-foreground"
            href="#"
          >
            cookie policy
          </a>
          .
        </AlertDescription>
        <AlertAction className="mt-1">
          <Button
            onClick={() => setDismissed(true)}
            size="xs"
            variant="outline"
          >
            Decline
          </Button>
          <Button onClick={() => setDismissed(true)} size="xs">
            Accept All
          </Button>
        </AlertAction>
      </Alert>
    </div>
  );
}

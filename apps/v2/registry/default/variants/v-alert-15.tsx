"use client";

import { MailIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/registry/default/ui/alert";
import { Button } from "@/registry/default/ui/button";

export function Pattern() {
  const [sent, setSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleResend = () => {
    setSent(true);
    setCountdown(60);
  };

  return (
    <div className="w-full max-w-lg">
      <Alert>
        <MailIcon />
        <AlertTitle>Verify your email address</AlertTitle>
        <AlertAction>
          <Button
            disabled={countdown > 0}
            onClick={handleResend}
            size="xs"
            variant="outline"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
          </Button>
        </AlertAction>
        <AlertDescription>
          {sent
            ? "A new verification email has been sent to your inbox."
            : "We sent a confirmation link to hello@example.com. Check your inbox and click the link to activate your account."}
        </AlertDescription>
      </Alert>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

const SESSION_SECONDS = 10;

export function Pattern() {
  const [active, setActive] = useState(false);
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const toastIdRef = useRef<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearSession = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (toastIdRef.current) toastManager.close(toastIdRef.current);
    toastIdRef.current = null;
    intervalRef.current = null;
    setActive(false);
    setRemaining(SESSION_SECONDS);
  }, []);

  const renewSession = () => {
    clearSession();
    toastManager.add({
      description: "You're good to go for another 30 minutes.",
      title: "Session renewed",
      type: "success",
    });
  };

  const startWarning = () => {
    if (active) return;
    setActive(true);
    setRemaining(SESSION_SECONDS);

    const id = toastManager.add({
      actionProps: {
        children: "Renew session",
        onClick: renewSession,
      },
      description: `Session expires in ${SESSION_SECONDS}s. Renew to stay logged in.`,
      timeout: 0,
      title: "Session expiring soon",
      type: "warning",
    });
    toastIdRef.current = id;

    let secs = SESSION_SECONDS;
    intervalRef.current = setInterval(() => {
      secs -= 1;
      setRemaining(secs);
      if (secs <= 0) {
        clearSession();
        toastManager.add({
          description: "Please sign in again to continue.",
          title: "Session expired",
          type: "error",
        });
      }
    }, 1000);
  };

  useEffect(() => () => clearSession(), [clearSession]);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button disabled={active} onClick={startWarning} variant="outline">
        {active
          ? `Session expires in ${remaining}s…`
          : "Simulate session warning"}
      </Button>
      {active && (
        <Button onClick={renewSession} size="sm" variant="ghost">
          Renew session now
        </Button>
      )}
    </div>
  );
}

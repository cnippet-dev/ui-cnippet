"use client";

import { useRef, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";
import { toastManager } from "@/registry/default/ui/toast";

type DeployState = "idle" | "running";

const steps = [
  {
    delay: 0,
    description: "Compiling and bundling your project…",
    timeout: 0,
    title: "Building",
    type: "loading" as const,
  },
  {
    delay: 2500,
    description: "All 48 tests passed with no failures.",
    timeout: 3500,
    title: "Tests passed",
    type: "success" as const,
  },
  {
    delay: 5000,
    description: "Live at https://acme.vercel.app",
    timeout: 6000,
    title: "Deployed to production",
    type: "success" as const,
  },
];

export function Pattern() {
  const [state, setState] = useState<DeployState>("idle");
  const activeIdRef = useRef<string | null>(null);

  function deploy() {
    if (state === "running") return;
    setState("running");

    steps.forEach(({ delay, timeout, ...toast }, i) => {
      setTimeout(() => {
        if (activeIdRef.current) {
          toastManager.close(activeIdRef.current);
          activeIdRef.current = null;
        }
        activeIdRef.current = toastManager.add({ ...toast, timeout });
        if (i === steps.length - 1) {
          setTimeout(() => setState("idle"), 1000);
        }
      }, delay);
    });
  }

  return (
    <Button disabled={state === "running"} onClick={deploy} variant="outline">
      {state === "running" ? (
        <>
          <Spinner />
          Deploying…
        </>
      ) : (
        "Deploy to production"
      )}
    </Button>
  );
}

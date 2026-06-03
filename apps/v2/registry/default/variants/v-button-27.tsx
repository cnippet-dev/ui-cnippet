"use client";

import { CheckIcon, CloudUploadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";

type State = "idle" | "loading" | "success";

export function Pattern() {
  const [state, setState] = useState<State>("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 2000);
    }, 1800);
  };

  return (
    <Button
      disabled={state === "loading"}
      loading={state === "loading"}
      onClick={handleClick}
      variant={state === "success" ? "outline" : "default"}
    >
      {state === "success" ? (
        <>
          <CheckIcon className="size-4 text-emerald-500" />
          Saved
        </>
      ) : (
        <>
          <CloudUploadIcon className="size-4" />
          {state === "loading" ? "Saving…" : "Save Changes"}
        </>
      )}
    </Button>
  );
}

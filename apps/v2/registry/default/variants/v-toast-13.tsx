"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

type ExportState = "idle" | "running";

export function Pattern() {
  const [state, setState] = useState<ExportState>("idle");

  const runExport = () => {
    if (state === "running") return;
    setState("running");

    const id = toastManager.add({
      description: "Preparing your CSV file…",
      timeout: 0,
      title: "Exporting data",
      type: "loading",
    });

    setTimeout(() => {
      toastManager.close(id);
      toastManager.add({
        actionProps: {
          children: "Download",
          onClick: () => {
            toastManager.add({
              description: "report-2025-q1.csv saved to your downloads.",
              title: "File saved",
              type: "success",
            });
          },
        },
        description: "1,842 rows · report-2025-q1.csv",
        timeout: 8000,
        title: "Export ready",
        type: "success",
      });
      setState("idle");
    }, 2800);
  };

  return (
    <Button
      disabled={state === "running"}
      onClick={runExport}
      variant="outline"
    >
      {state === "running" ? "Exporting…" : "Export to CSV"}
    </Button>
  );
}

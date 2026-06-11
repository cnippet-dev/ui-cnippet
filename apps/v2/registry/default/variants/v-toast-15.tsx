"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

type SaveState = "clean" | "dirty" | "saving";

export function Pattern() {
  const [saveState, setSaveState] = useState<SaveState>("clean");
  const [content, setContent] = useState(
    "Project Alpha\n\nThis is the project description. Click below to make changes and see the unsaved changes toast appear.",
  );
  const toastIdRef = { current: null as string | null };

  const makeChange = () => {
    if (saveState === "dirty") return;
    setContent((c) => `${c} Updated.`);
    setSaveState("dirty");

    const id = toastManager.add({
      actionProps: {
        children: "Save now",
        onClick: () => save(id),
      },
      description: "Your recent edits haven't been saved yet.",
      timeout: 0,
      title: "Unsaved changes",
      type: "warning",
    });
    toastIdRef.current = id;
  };

  const save = (id?: string) => {
    const toastId = id ?? toastIdRef.current;
    if (toastId) toastManager.close(toastId);
    setSaveState("saving");
    setTimeout(() => {
      setSaveState("clean");
      toastManager.add({
        description: "All changes have been saved to the server.",
        title: "Document saved",
        type: "success",
      });
    }, 900);
  };

  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <div className="min-h-24 rounded-lg border border-input bg-background p-3 text-foreground/80 text-sm leading-relaxed">
        {content}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex-1"
          disabled={saveState !== "clean"}
          onClick={makeChange}
          variant="outline"
        >
          Edit document
        </Button>
        <Button
          className="flex-1"
          disabled={saveState !== "dirty"}
          loading={saveState === "saving"}
          onClick={() => save()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

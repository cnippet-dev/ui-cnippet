"use client";

import { UploadCloudIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

type Status = "idle" | "uploading" | "done";

export default function Particle() {
  const [status, setStatus] = useState<Status>("idle");

  function handleUpload() {
    setStatus("uploading");
    setTimeout(() => setStatus("done"), 2500);
  }

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
          {status === "uploading" ? (
            <Spinner className="size-5 text-primary" />
          ) : (
            <UploadCloudIcon
              aria-hidden="true"
              className={`size-5 ${status === "done" ? "text-green-500" : "text-muted-foreground"}`}
            />
          )}
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">
            {status === "idle" && "Ready to upload"}
            {status === "uploading" && "Uploading report.pdf…"}
            {status === "done" && "Upload complete"}
          </p>
          <p className="text-muted-foreground text-xs">
            {status === "idle" && "Max file size 25 MB"}
            {status === "uploading" && "Please wait"}
            {status === "done" && "report.pdf · 4.2 MB"}
          </p>
        </div>
      </div>
      <Button
        className="w-full"
        disabled={status === "uploading" || status === "done"}
        onClick={handleUpload}
        variant={status === "done" ? "outline" : "default"}
      >
        {status === "uploading" && (
          <Spinner
            aria-hidden="true"
            className="size-4"
            data-icon="inline-start"
          />
        )}
        {status === "idle" && "Upload File"}
        {status === "uploading" && "Uploading…"}
        {status === "done" && "Uploaded"}
      </Button>
    </div>
  );
}

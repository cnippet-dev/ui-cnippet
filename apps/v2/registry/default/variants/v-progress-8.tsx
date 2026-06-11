"use client";

import {
  CheckCircle2Icon,
  FileIcon,
  Loader2Icon,
  XCircleIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
} from "@/registry/default/ui/progress";

type FileStatus = "uploading" | "done" | "error";

type UploadFile = {
  id: string;
  name: string;
  size: string;
  status: FileStatus;
  progress: number;
};

const initialFiles: UploadFile[] = [
  {
    id: "1",
    name: "design-system.fig",
    progress: 100,
    size: "4.2 MB",
    status: "done",
  },
  {
    id: "2",
    name: "brand-assets.zip",
    progress: 67,
    size: "12.8 MB",
    status: "uploading",
  },
  {
    id: "3",
    name: "prototype-v3.mp4",
    progress: 23,
    size: "38.5 MB",
    status: "uploading",
  },
  {
    id: "4",
    name: "corrupted-file.pdf",
    progress: 41,
    size: "1.1 MB",
    status: "error",
  },
];

const statusIcon: Record<FileStatus, React.ReactNode> = {
  done: <CheckCircle2Icon className="size-4 text-success" />,
  error: <XCircleIcon className="size-4 text-destructive" />,
  uploading: (
    <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
  ),
};

const indicatorColor: Record<FileStatus, string> = {
  done: "**:data-[slot=progress-indicator]:bg-success",
  error: "**:data-[slot=progress-indicator]:bg-destructive",
  uploading: "",
};

export function Pattern() {
  const [files, setFiles] = useState<UploadFile[]>(initialFiles);

  useEffect(() => {
    const timer = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.status !== "uploading") return f;
          const next = Math.min(f.progress + Math.random() * 8, 100);
          return {
            ...f,
            progress: next,
            status: next >= 100 ? "done" : "uploading",
          };
        }),
      );
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Uploading files</p>
        <span className="text-muted-foreground text-xs">
          {files.filter((f) => f.status === "done").length} / {files.length}{" "}
          done
        </span>
      </div>
      {files.map((file) => (
        <div className="flex items-start gap-3" key={file.id}>
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-muted/50">
            <FileIcon className="size-3.5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-medium text-sm">{file.name}</span>
              {statusIcon[file.status]}
            </div>
            <Progress
              className={indicatorColor[file.status]}
              value={Math.round(file.progress)}
            >
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <div className="flex items-center justify-between text-muted-foreground text-xs">
              <span>{file.size}</span>
              <span className="tabular-nums">
                {file.status === "error"
                  ? "Failed"
                  : `${Math.round(file.progress)}%`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

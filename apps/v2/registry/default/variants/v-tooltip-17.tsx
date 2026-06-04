import {
  CheckCircle2Icon,
  CircleIcon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type StepStatus = "done" | "running" | "pending" | "failed";

type PipelineStep = {
  name: string;
  status: StepStatus;
  duration: string;
  detail: string;
};

const steps: PipelineStep[] = [
  {
    detail: "All 248 unit tests passed in 14 s.",
    duration: "14 s",
    name: "Test",
    status: "done",
  },
  {
    detail: "TypeScript compiled without errors; bundle size 142 kB.",
    duration: "22 s",
    name: "Build",
    status: "done",
  },
  {
    detail: "Docker image pushed to registry as v2.4.1.",
    duration: "31 s",
    name: "Publish",
    status: "done",
  },
  {
    detail: "Rolling update in progress — 3 of 5 pods updated.",
    duration: "~45 s",
    name: "Deploy",
    status: "running",
  },
  {
    detail: "Smoke tests will run once all pods are healthy.",
    duration: "—",
    name: "Verify",
    status: "pending",
  },
];

const statusIcon: Record<StepStatus, React.ReactElement> = {
  done: <CheckCircle2Icon className="size-5 text-emerald-500" />,
  failed: <XCircleIcon className="size-5 text-red-500" />,
  pending: <CircleIcon className="size-5 text-muted-foreground" />,
  running: <LoaderIcon className="size-5 animate-spin text-blue-500" />,
};

const statusLabel: Record<StepStatus, string> = {
  done: "Completed",
  failed: "Failed",
  pending: "Waiting",
  running: "In progress",
};

export function Pattern() {
  return (
    <div className="flex items-center gap-1 rounded-xl border bg-card px-5 py-4">
      <TooltipProvider>
        {steps.map(({ name, status, duration, detail }, index) => (
          <div className="flex items-center gap-1" key={name}>
            {index > 0 && (
              <div
                className={`h-px w-8 ${
                  status === "done" ? "bg-emerald-500" : "bg-border"
                }`}
              />
            )}
            <Tooltip>
              <TooltipTrigger className="flex cursor-default flex-col items-center gap-1">
                {statusIcon[status]}
                <span className="text-muted-foreground text-xs">{name}</span>
              </TooltipTrigger>
              <TooltipContent className="p-2.5">
                <p className="font-medium">{name}</p>
                <p className="text-muted-foreground">{statusLabel[status]}</p>
                <p className="text-muted-foreground">Duration: {duration}</p>
                <p className="mt-1 max-w-48 text-muted-foreground">{detail}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </TooltipProvider>
    </div>
  );
}

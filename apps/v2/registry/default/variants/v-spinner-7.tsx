import { Spinner } from "@/registry/default/ui/spinner";

export function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-3">
      <div className="flex items-center gap-2">
        <Spinner className="size-3.5" />
        <span className="text-muted-foreground text-sm">
          Checking availability...
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner className="size-3.5 text-success" />
        <span className="text-sm">
          <span className="font-medium text-success">Connected</span>
          <span className="text-muted-foreground"> — syncing data</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Spinner className="size-3.5 text-warning" />
        <span className="text-sm">
          <span className="font-medium text-warning">Reconnecting</span>
          <span className="text-muted-foreground"> — attempt 3 of 5</span>
        </span>
      </div>
    </div>
  );
}

import { Label } from "@cnippet/ui/components/label";
import { Skeleton } from "@cnippet/ui/components/skeleton";
import { Switch } from "@cnippet/ui/components/switch";

export default function SwitchPreview() {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
        <Skeleton className="flex h-5 w-9 items-center rounded-full px-0.5">
          <div className="size-4 rounded-full bg-neutral-300 dark:bg-neutral-900" />
        </Skeleton>
        <Skeleton className="h-4 w-28" />
      </div>

      <div className="absolute inset-0 w-48 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Label>
          <Switch defaultChecked tabIndex={-1} />
          Airplane mode
        </Label>
      </div>
    </div>
  );
}

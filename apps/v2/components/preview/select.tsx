import {
  Select,
  SelectTrigger,
  SelectValue,
} from "@cnippet/ui/components/select";
import { Skeleton } from "@cnippet/ui/components/skeleton";

const timezones = [
  { label: "Pacific Time (PT)", value: "america/los_angeles" },
  { label: "Eastern Time (ET)", value: "america/new_york" },
];

export default function SelectPreview() {
  return (
    <div className="relative w-52">
      <Skeleton className="flex h-9 w-52 items-center justify-between rounded-lg px-3 transition-opacity duration-300 group-hover:opacity-0">
        <div className="h-1.5 w-28 rounded-md bg-neutral-300 dark:bg-neutral-900" />
        <div className="size-2.5 rounded-sm bg-neutral-300 dark:bg-neutral-900" />
      </Skeleton>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Select defaultValue={timezones[0]} items={timezones}>
          <SelectTrigger aria-label="Timezone" tabIndex={-1}>
            <SelectValue />
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
}

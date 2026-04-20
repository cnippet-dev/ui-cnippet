import { Badge } from "@cnippet/ui/components/badge";
import { Skeleton } from "@cnippet/ui/components/skeleton";

export default function BadgePreview() {
  return (
    <div className="relative">
      <Skeleton className="flex h-6 w-24 items-center justify-center rounded-full transition-opacity duration-300 group-hover:opacity-0">
        <div className="size-2.5 rounded-full bg-neutral-400 dark:bg-white" />
        <div className="ml-2 h-1 w-16 rounded-full bg-neutral-300 dark:bg-white/50" />
      </Skeleton>

      <Badge
        className="absolute inset-0 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        variant="info"
      >
        <span className="ms-px size-2.5 rounded-full! bg-[currentColor]" />{" "}
        Badge
      </Badge>
    </div>
  );
}

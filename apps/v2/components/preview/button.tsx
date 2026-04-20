import { Button } from "@cnippet/ui/components/button";
import { Skeleton } from "@cnippet/ui/components/skeleton";

export default function ButtonPreview() {
  return (
    <div className="relative">
      <Skeleton className="flex h-9 w-20 items-center justify-center rounded-md px-3 transition-opacity duration-300 group-hover:opacity-0">
        <div className="h-1.5 w-full rounded-md bg-neutral-300 dark:bg-neutral-900" />
      </Skeleton>

      <div className="absolute inset-0 w-56 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Button className="w-20 rounded-md" size="lg">
          Button
        </Button>
      </div>
    </div>
  );
}

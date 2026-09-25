import { Input } from "@cnippet/ui/components/input";
import { Skeleton } from "@cnippet/ui/components/skeleton";

export default function InputPreview() {
  return (
    <div className="relative w-52">
      <Skeleton className="flex h-9 w-52 items-center rounded-lg px-3 transition-opacity duration-300 group-hover:opacity-0">
        <div className="h-1.5 w-24 rounded-md bg-neutral-300 dark:bg-neutral-900" />
      </Skeleton>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Input
          aria-label="Email"
          placeholder="you@example.com"
          tabIndex={-1}
          type="email"
        />
      </div>
    </div>
  );
}

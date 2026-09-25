import { Skeleton } from "@cnippet/ui/components/skeleton";
import { Slider } from "@cnippet/ui/components/slider";

export default function SliderPreview() {
  return (
    <div className="relative w-48">
      <div className="relative flex h-5 items-center transition-opacity duration-300 group-hover:opacity-0">
        <Skeleton className="h-1 w-full rounded-full" />
        <div className="absolute left-0 h-1 w-3/5 rounded-full bg-neutral-300 dark:bg-neutral-800" />
        <Skeleton className="absolute left-[calc(60%-0.5rem)] size-4 rounded-full" />
      </div>

      <div className="absolute inset-0 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Slider aria-label="Volume" defaultValue={60} />
      </div>
    </div>
  );
}

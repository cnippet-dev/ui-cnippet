import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
export default function CheckboxPreview() {
  return (
    <div className="relative">
      <div className="flex items-center gap-2 transition-opacity duration-300 group-hover:opacity-0">
        <Checkbox />

        <Skeleton className="h-4 w-40" />
      </div>
      <div className="absolute inset-0 w-56 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Label className="text-xs">
          <Checkbox />
          Accept terms and conditions
        </Label>
      </div>
    </div>
  );
}

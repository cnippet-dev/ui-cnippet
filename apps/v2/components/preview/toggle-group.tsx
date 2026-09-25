import { Skeleton } from "@cnippet/ui/components/skeleton";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@cnippet/ui/components/toggle-group";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export default function ToggleGroupPreview() {
  return (
    <div className="relative">
      <div className="flex gap-1 transition-opacity duration-300 group-hover:opacity-0">
        {["bold", "italic", "underline"].map((key, i) => (
          <Skeleton
            className="flex size-9 items-center justify-center rounded-lg"
            key={key}
          >
            <div
              className={
                i === 0
                  ? "size-3 rounded-sm bg-neutral-400/70 dark:bg-neutral-700"
                  : "size-3 rounded-sm bg-neutral-300 dark:bg-neutral-900"
              }
            />
          </Skeleton>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <ToggleGroup defaultValue={["bold"]}>
          <ToggleGroupItem aria-label="Bold" tabIndex={-1} value="bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem aria-label="Italic" tabIndex={-1} value="italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem
            aria-label="Underline"
            tabIndex={-1}
            value="underline"
          >
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}

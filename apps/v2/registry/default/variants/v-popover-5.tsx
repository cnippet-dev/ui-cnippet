import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const sides = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const;

export function Pattern() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {sides.map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button className="w-full capitalize" variant="outline" />}
          >
            {side.replace("-", " ")}
          </PopoverTrigger>
          <PopoverContent className="w-40" side={side}>
            <p>Popover on {side.replace("-", " ")}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}

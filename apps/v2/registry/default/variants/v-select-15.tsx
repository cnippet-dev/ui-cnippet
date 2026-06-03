import type { LucideIcon } from "lucide-react";
import {
  ArrowDownAZIcon,
  ArrowUpAZIcon,
  CalendarArrowDownIcon,
  CalendarArrowUpIcon,
  SparklesIcon,
} from "lucide-react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type SortItem = { Icon: LucideIcon; label: string; value: string };

const sortOptions: SortItem[] = [
  { Icon: SparklesIcon, label: "Relevance", value: "relevance" },
  { Icon: ArrowDownAZIcon, label: "Name A–Z", value: "name-asc" },
  { Icon: ArrowUpAZIcon, label: "Name Z–A", value: "name-desc" },
  { Icon: CalendarArrowDownIcon, label: "Newest first", value: "date-desc" },
  { Icon: CalendarArrowUpIcon, label: "Oldest first", value: "date-asc" },
];

const placeholder = { label: "Sort by", value: null };
const allItems = [placeholder, ...sortOptions];

export default function Particle() {
  return (
    <Select defaultValue={sortOptions[0]} items={allItems}>
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {sortOptions.map((item) => {
          const { Icon, label, value } = item;
          return (
            <SelectItem key={value} value={item}>
              <span className="flex items-center gap-2">
                <Icon aria-hidden="true" className="size-4" />
                {label}
              </span>
            </SelectItem>
          );
        })}
      </SelectPopup>
    </Select>
  );
}

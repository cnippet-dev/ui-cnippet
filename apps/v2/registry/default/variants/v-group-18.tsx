import { SearchIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const categories = [
  { label: "All", value: "all" },
  { label: "Articles", value: "articles" },
  { label: "People", value: "people" },
  { label: "Files", value: "files" },
];

export default function Particle() {
  return (
    <Group aria-label="Search with category filter">
      <Select defaultValue="all" items={categories}>
        <SelectTrigger className="w-fit min-w-none">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {categories.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <GroupSeparator />
      <Input
        aria-label="Search"
        className="min-w-48"
        placeholder="Search…"
        type="search"
      />
      <GroupSeparator />
      <Button aria-label="Search" size="icon" variant="outline">
        <SearchIcon aria-hidden="true" />
      </Button>
    </Group>
  );
}

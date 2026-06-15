import {
  Select,
  SelectGroup,
  SelectGroupLabel,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const categoryGroups = [
  {
    items: [
      { label: "React", value: "react" },
      { label: "Vue", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
    label: "Frontend",
  },
  {
    items: [
      { label: "Node.js", value: "nodejs" },
      { label: "Python", value: "python" },
      { label: "Go", value: "go" },
      { label: "Rust", value: "rust" },
    ],
    label: "Backend",
  },
  {
    items: [
      { label: "React Native", value: "react-native" },
      { label: "Flutter", value: "flutter" },
      { label: "Swift", value: "swift" },
    ],
    label: "Mobile",
  },
];

const placeholder = { label: "Select a framework", value: null };
const allItems = [placeholder, ...categoryGroups.flatMap((g) => g.items)];

export default function Component() {
  return (
    <Select items={allItems}>
      <SelectTrigger className="w-52">
        <SelectValue />
      </SelectTrigger>
      <SelectPopup>
        {categoryGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectGroupLabel>{group.label}</SelectGroupLabel>
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectPopup>
    </Select>
  );
}

import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const settings = [
  {
    checked: true,
    description: "Save changes automatically",
    id: "auto-save",
    label: "Auto-save",
  },
  {
    checked: true,
    description: "Highlight spelling errors",
    id: "spell-check",
    label: "Spell check",
  },
  {
    checked: false,
    description: "Show line numbers in editor",
    id: "line-numbers",
    label: "Line numbers",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-md">
      <p className="mb-3 font-medium text-sm">Editor Preferences</p>
      <Separator />
      <div className="flex flex-col">
        {settings.map((setting) => (
          <label
            className="flex cursor-pointer items-center justify-between border-b py-3 last:border-b-0"
            htmlFor={setting.id}
            key={setting.id}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-medium text-sm">{setting.label}</span>
              <span className="text-muted-foreground text-xs">
                {setting.description}
              </span>
            </div>
            <Switch
              defaultChecked={setting.checked}
              id={setting.id}
              size="sm"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

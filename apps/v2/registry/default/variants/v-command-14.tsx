"use client";

import { CheckIcon, MoonIcon, SunIcon, SunMediumIcon } from "lucide-react";
import { Fragment, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
} from "@/registry/default/ui/command";

type Option = { icon: React.ReactNode; label: string; value: string };
type OptionGroup = { items: Option[]; label: string; value: string };

const optionGroups: OptionGroup[] = [
  {
    items: [
      { icon: <SunIcon className="size-4" />, label: "Light", value: "light" },
      { icon: <MoonIcon className="size-4" />, label: "Dark", value: "dark" },
      {
        icon: <SunMediumIcon className="size-4" />,
        label: "System",
        value: "system",
      },
    ],
    label: "Theme",
    value: "theme",
  },
  {
    items: [
      {
        icon: <span className="size-4 rounded-full bg-violet-500" />,
        label: "Violet",
        value: "violet",
      },
      {
        icon: <span className="size-4 rounded-full bg-blue-500" />,
        label: "Blue",
        value: "blue",
      },
      {
        icon: <span className="size-4 rounded-full bg-emerald-500" />,
        label: "Green",
        value: "green",
      },
      {
        icon: <span className="size-4 rounded-full bg-rose-500" />,
        label: "Rose",
        value: "rose",
      },
      {
        icon: <span className="size-4 rounded-full bg-orange-500" />,
        label: "Orange",
        value: "orange",
      },
    ],
    label: "Accent Color",
    value: "accent",
  },
];

export default function Particle() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [accent, setAccent] = useState("violet");

  const handleSelect = (group: string, value: string) => {
    if (group === "theme") setTheme(value);
    else setAccent(value);
    setOpen(false);
  };

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Appearance settings
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={optionGroups}>
          <CommandInput placeholder="Search appearance..." />
          <CommandPanel>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandList>
              {(group: OptionGroup, i: number) => (
                <Fragment key={group.value}>
                  {i > 0 && <CommandSeparator />}
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.label}</CommandGroupLabel>
                    <CommandCollection>
                      {(opt: Option) => {
                        const isActive =
                          group.value === "theme"
                            ? theme === opt.value
                            : accent === opt.value;
                        return (
                          <CommandItem
                            className="gap-2"
                            key={opt.value}
                            onSelect={() =>
                              handleSelect(group.value, opt.value)
                            }
                            value={`${group.value}-${opt.value}`}
                          >
                            {opt.icon}
                            <span className="flex-1">{opt.label}</span>
                            {isActive && (
                              <CheckIcon className="size-4 text-primary" />
                            )}
                          </CommandItem>
                        );
                      }}
                    </CommandCollection>
                  </CommandGroup>
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

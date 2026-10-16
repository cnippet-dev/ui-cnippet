"use client";

import { PlusIcon, TagIcon } from "lucide-react";
import { useState } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/default/ui/combobox";

interface Category {
  label: string;
  value: string;
  creatable?: boolean;
}

const initialCategories: Category[] = [
  { label: "Software", value: "software" },
  { label: "Hardware", value: "hardware" },
  { label: "Travel", value: "travel" },
  { label: "Meals & entertainment", value: "meals" },
  { label: "Office supplies", value: "office" },
  { label: "Marketing", value: "marketing" },
];

function toValue(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Particle() {
  const [categories, setCategories] = useState(initialCategories);
  const [selected, setSelected] = useState<Category | null>(null);
  const [query, setQuery] = useState("");

  const added = categories.length - initialCategories.length;
  const trimmed = query.trim();
  const exists = categories.some(
    (c) => c.label.toLowerCase() === trimmed.toLowerCase(),
  );
  const items =
    trimmed && !exists
      ? [
          ...categories,
          { creatable: true, label: trimmed, value: toValue(trimmed) },
        ]
      : categories;

  function handleValueChange(next: Category | null) {
    if (next?.creatable) {
      const created = { label: next.label, value: next.value };
      setCategories((prev) => [...prev, created]);
      setSelected(created);
      return;
    }
    setSelected(next);
  }

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      <Combobox
        autoHighlight
        inputValue={query}
        isItemEqualToValue={(item, value) => item.value === value.value}
        items={items}
        onInputValueChange={setQuery}
        onValueChange={(v) => handleValueChange(v as Category | null)}
        value={selected}
      >
        <ComboboxInput
          aria-label="Expense category"
          placeholder="Pick or create a category..."
          startAddon={<TagIcon />}
        />
        <ComboboxPopup>
          <ComboboxEmpty>Type to create a category.</ComboboxEmpty>
          <ComboboxList>
            {(category: Category) =>
              category.creatable ? (
                <ComboboxItem key="__create" value={category}>
                  <div className="flex items-center gap-2">
                    <PlusIcon className="size-4 text-muted-foreground" />
                    <span>
                      Create{" "}
                      <span className="font-medium">“{category.label}”</span>
                    </span>
                  </div>
                </ComboboxItem>
              ) : (
                <ComboboxItem key={category.value} value={category}>
                  {category.label}
                </ComboboxItem>
              )
            }
          </ComboboxList>
        </ComboboxPopup>
      </Combobox>
      <p className="text-muted-foreground text-xs">
        {added > 0
          ? `${added} new ${added === 1 ? "category" : "categories"} added to this workspace.`
          : "Can't find it? Type a name and press Enter to create it."}
      </p>
    </div>
  );
}

"use client";

import { UserIcon } from "lucide-react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxValue,
} from "@/registry/default/ui/combobox";
import { Field, FieldLabel } from "@/registry/default/ui/field";

interface Item {
  label: string;
  value: string;
}

const people: Item[] = [
  { label: "Maya Patel", value: "maya" },
  { label: "Jordan Lee", value: "jordan" },
  { label: "Sarah Chen", value: "sarah" },
  { label: "Marco Rossi", value: "marco" },
  { label: "Emma Wilson", value: "emma" },
];

const labels: Item[] = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Design", value: "design" },
  { label: "Docs", value: "docs" },
  { label: "Performance", value: "performance" },
];

function Options({ empty }: { empty: string }) {
  return (
    <ComboboxPopup>
      <ComboboxEmpty>{empty}</ComboboxEmpty>
      <ComboboxList>
        {(item: Item) => (
          <ComboboxItem key={item.value} value={item}>
            {item.label}
          </ComboboxItem>
        )}
      </ComboboxList>
    </ComboboxPopup>
  );
}

export default function Particle() {
  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>Assignee</FieldLabel>
        <Combobox defaultValue={people[0]} items={people}>
          <ComboboxInput
            aria-label="Assignee"
            placeholder="Search people…"
            showClear
            startAddon={<UserIcon />}
          />
          <Options empty="No one found." />
        </Combobox>
      </Field>
      <Field>
        <FieldLabel>Labels</FieldLabel>
        <Combobox defaultValue={[labels[0], labels[2]]} items={labels} multiple>
          <ComboboxChips>
            <ComboboxValue>
              {(value: Item[]) => (
                <>
                  {value.map((item) => (
                    <ComboboxChip aria-label={item.label} key={item.value}>
                      {item.label}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    aria-label="Labels"
                    placeholder={value.length > 0 ? undefined : "Add labels…"}
                  />
                </>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <Options empty="No labels found." />
        </Combobox>
      </Field>
      <Field>
        <FieldLabel>Small</FieldLabel>
        <Combobox items={people}>
          <ComboboxInput
            aria-label="Reviewer"
            placeholder="Reviewer"
            size="sm"
          />
          <Options empty="No one found." />
        </Combobox>
      </Field>
      <Field disabled>
        <FieldLabel>Disabled</FieldLabel>
        <Combobox defaultValue={people[1]} disabled items={people}>
          <ComboboxInput aria-label="Owner" />
          <Options empty="No one found." />
        </Combobox>
      </Field>
    </div>
  );
}

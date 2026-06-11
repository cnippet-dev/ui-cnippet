"use client";

import { Fragment } from "react";
import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteSeparator,
} from "@/registry/default/ui/autocomplete";

type Skill = {
  id: string;
  label: string;
  category: "Language" | "Framework" | "Tool";
};
type SkillGroup = { value: string; items: Skill[] };

const skills: Skill[] = [
  { category: "Language", id: "ts", label: "TypeScript" },
  { category: "Language", id: "rust", label: "Rust" },
  { category: "Language", id: "go", label: "Go" },
  { category: "Language", id: "python", label: "Python" },
  { category: "Language", id: "java", label: "Java" },
  { category: "Framework", id: "nextjs", label: "Next.js" },
  { category: "Framework", id: "remix", label: "Remix" },
  { category: "Framework", id: "fastapi", label: "FastAPI" },
  { category: "Framework", id: "spring", label: "Spring Boot" },
  { category: "Framework", id: "trpc", label: "tRPC" },
  { category: "Tool", id: "docker", label: "Docker" },
  { category: "Tool", id: "k8s", label: "Kubernetes" },
  { category: "Tool", id: "gha", label: "GitHub Actions" },
  { category: "Tool", id: "terraform", label: "Terraform" },
  { category: "Tool", id: "grafana", label: "Grafana" },
];

function groupSkills(data: Skill[]): SkillGroup[] {
  const order: Array<Skill["category"]> = ["Language", "Framework", "Tool"];
  return order.map((cat) => ({
    items: data.filter((s) => s.category === cat),
    value: cat,
  }));
}

const grouped = groupSkills(skills);

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <label className="font-medium text-sm">Skill</label>
      <Autocomplete items={grouped}>
        <AutocompleteInput placeholder="Search skills…" showClear showTrigger />
        <AutocompletePopup>
          <AutocompleteEmpty>No skills found.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: SkillGroup) => (
              <Fragment key={group.value}>
                <AutocompleteGroup items={group.items}>
                  <AutocompleteGroupLabel>
                    {group.value}s
                  </AutocompleteGroupLabel>
                  <AutocompleteCollection>
                    {(skill: Skill) => (
                      <AutocompleteItem key={skill.id} value={skill}>
                        {skill.label}
                      </AutocompleteItem>
                    )}
                  </AutocompleteCollection>
                </AutocompleteGroup>
                {group.value !== "Tool" && <AutocompleteSeparator />}
              </Fragment>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}

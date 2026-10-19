// title: Skills with suggested tags
"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Label } from "@/registry/default/ui/label";
import { TagInput } from "@/registry/default/ui/tag-input";

const SUGGESTED = [
  "React",
  "TypeScript",
  "Figma",
  "Accessibility",
  "Design systems",
  "Motion",
];

export default function Particle() {
  const [skills, setSkills] = useState(["React", "Tailwind CSS"]);
  const suggestions = SUGGESTED.filter(
    (s) => !skills.some((k) => k.toLowerCase() === s.toLowerCase()),
  );

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <Label htmlFor="profile-skills">Skills</Label>
      <TagInput
        id="profile-skills"
        onValueChange={setSkills}
        placeholder="Add a skill"
        value={skills}
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="me-1 text-muted-foreground text-xs">Suggested</span>
          {suggestions.map((s) => (
            <Button
              key={s}
              onClick={() => setSkills([...skills, s])}
              size="xs"
              variant="outline"
            >
              <PlusIcon aria-hidden="true" />
              {s}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card } from "@/registry/default/ui/card";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";
import { Label } from "../ui/label";

export function Pattern() {
  const [selected, setSelected] = useState("r-1");

  return (
    <RadioGroup onValueChange={setSelected} value={selected}>
      <Card
        className={`flex flex-row items-start gap-2 rounded-lg p-3 transition-colors ${selected === "r-1" ? "bg-primary/20" : ""}`}
      >
        <Radio id="r-1" value="r-1" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="r-1">Free</Label>
          <p className="text-muted-foreground text-xs">
            Basic features for personal use.
          </p>
        </div>
      </Card>
      <Card
        className={`flex flex-row items-start gap-2 rounded-lg p-3 transition-colors ${selected === "r-2" ? "bg-primary/20" : ""}`}
      >
        <Radio id="r-2" value="r-2" />
        <div className="flex flex-col gap-1">
          <Label htmlFor="r-2">Pro</Label>
          <p className="text-muted-foreground text-xs">
            Advanced tools for professionals.
          </p>
        </div>
      </Card>
    </RadioGroup>
  );
}

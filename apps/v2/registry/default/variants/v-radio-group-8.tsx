"use client";

import { MessageIcon } from "@hugeicons/core-free-icons";
import { Mail, MessageSquareCheck, Phone } from "lucide-react";
import { useState } from "react";
import { Card } from "@/registry/default/ui/card";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";
import { Label } from "../ui/label";

export function Pattern() {
  const [selected, setSelected] = useState("r-1");

  return (
    <RadioGroup onValueChange={setSelected} value={selected}>
      <Card
        className={`flex items-start justify-between rounded-lg flex-row p-3 gap-20 transition-colors ${selected === "r-1" ? "bg-primary/20" : ""}`}
      >
        <div className="flex flex-row gap-2">
          <Mail className="size-4" />
          <Label htmlFor="r-1">Email</Label>
        </div>
        <Radio id="r-1" value="r-1" />
      </Card>
      <Card
        className={`flex items-start justify-between rounded-lg flex-row p-3 gap-2 transition-colors ${selected === "r-2" ? "bg-primary/20" : ""}`}
      >
        <div className="flex flex-row gap-2">
          <Phone className="size-4" />
          <Label htmlFor="r-2">Phone</Label>
        </div>
        <Radio id="r-2" value="r-2" />
      </Card>
      <Card
        className={`flex items-start justify-between rounded-lg flex-row p-3 gap-2 transition-colors ${selected === "r-3" ? "bg-primary/20" : ""}`}
      >
        <div className="flex flex-row gap-2">
          <MessageSquareCheck className="size-4" />
          <Label htmlFor="r-3">Message</Label>
        </div>
        <Radio id="r-3" value="r-3" />
      </Card>
    </RadioGroup>
  );
}

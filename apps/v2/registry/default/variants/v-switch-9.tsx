"use client";

import { ShieldCheckIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/registry/default/ui/badge";
import {
  Card,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  CardDescription,
} from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const cookieCategories = [
  {
    defaultChecked: true,
    description: "Required for the website to function. Cannot be disabled.",
    disabled: true,
    id: "necessary",
    title: "Strictly Necessary",
  },
  {
    defaultChecked: true,
    description: "Help us understand how visitors interact with our site.",
    disabled: false,
    id: "analytics",
    title: "Analytics & Performance",
  },
  {
    defaultChecked: false,
    description: "Used to deliver personalised ads relevant to you.",
    disabled: false,
    id: "marketing",
    title: "Marketing & Targeting",
  },
  {
    defaultChecked: false,
    description: "Remember your preferences and customise your experience.",
    disabled: false,
    id: "personalization",
    title: "Personalization",
  },
];

export function Pattern() {
  const [consent, setConsent] = useState<Record<string, boolean>>(
    Object.fromEntries(
      cookieCategories.map((c) => [c.id, c.defaultChecked]),
    ),
  );

  const activeCount = Object.values(consent).filter(Boolean).length;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="border-b">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ShieldCheckIcon className="size-4" />
          </div>
          <div>
            <CardTitle>Cookie Preferences</CardTitle>
            <CardDescription>
              {activeCount} of {cookieCategories.length} categories enabled
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardPanel className="p-0">
        {cookieCategories.map((category, index) => (
          <div key={category.id}>
            <label
              className="flex cursor-pointer items-start justify-between gap-4 px-6 py-4"
              htmlFor={category.id}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{category.title}</span>
                  {category.disabled ? (
                    <Badge size="sm" variant="success">
                      Always On
                    </Badge>
                  ) : consent[category.id] ? (
                    <Badge size="sm" variant="info">
                      Active
                    </Badge>
                  ) : (
                    <Badge size="sm" variant="outline">
                      Off
                    </Badge>
                  )}
                </div>
                <span className="text-muted-foreground text-xs">
                  {category.description}
                </span>
              </div>
              <Switch
                checked={consent[category.id]}
                disabled={category.disabled}
                id={category.id}
                onCheckedChange={(val) =>
                  setConsent((prev) => ({ ...prev, [category.id]: val }))
                }
                size="sm"
              />
            </label>
            {index < cookieCategories.length - 1 && <Separator />}
          </div>
        ))}
      </CardPanel>

      <CardFooter className="border-t bg-muted/30">
        <p className="text-muted-foreground text-xs">
          Your preferences are saved locally and can be updated at any time.
        </p>
      </CardFooter>
    </Card>
  );
}

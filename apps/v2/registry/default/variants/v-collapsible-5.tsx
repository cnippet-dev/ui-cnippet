"use client";

import { Settings2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group";

export function Pattern() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-54 w-full max-w-xs">
      <Card>
        <CardHeader>
          <CardTitle>Unit Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <Collapsible
            className="flex flex-col gap-3"
            onOpenChange={setIsOpen}
            open={isOpen}
          >
            <div className="flex items-end gap-2">
              <Field className="flex-1">
                <FieldLabel className="sr-only">Base Price</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    defaultValue="19.00"
                    placeholder="0.00"
                    type="number"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>$</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <CollapsibleTrigger
                render={
                  <Button className="shrink-0" size="icon" variant="outline" />
                }
              >
                <Settings2Icon aria-hidden="true" className="size-3.5" />
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <Field>
                <FieldLabel>Tax Rate (%)</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    defaultValue="15"
                    placeholder="0"
                    type="number"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel>Discount (%)</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    defaultValue="0"
                    placeholder="0"
                    type="number"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </div>
  );
}

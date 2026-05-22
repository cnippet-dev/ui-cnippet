"use client";

import { addDays, format, isSameDay } from "date-fns";
import { CalendarIcon, ClipboardListIcon } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Calendar } from "@/registry/default/ui/calendar";
import {
  Popover,
  PopoverPopup,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const ASSIGNEES = [
  { id: 1, initials: "AP", name: "Alice Park" },
  { id: 2, initials: "BT", name: "Ben Torres" },
  { id: 3, initials: "CK", name: "Celia Kim" },
];

const ORIGINAL_DEADLINE = addDays(new Date(), 5);

export default function Particle() {
  const [deadline, setDeadline] = useState<Date>(ORIGINAL_DEADLINE);
  const [pending, setPending] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const isRescheduled = !isSameDay(deadline, ORIGINAL_DEADLINE);

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setPending(deadline);
    setOpen(isOpen);
  };

  const handleApply = () => {
    if (pending) setDeadline(pending);
    setSaved(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setPending(deadline);
    setOpen(false);
  };

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-start gap-3 border-b pb-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <ClipboardListIcon
            aria-hidden="true"
            className="size-4 text-primary"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm">Design System Audit</p>
            {isRescheduled && (
              <Badge size="sm" variant="warning">
                Rescheduled
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground text-xs">Acme Corp · Sprint 4</p>
        </div>
      </div>

      <div className="space-y-1">
        <p className="font-medium text-muted-foreground text-xs">Assignees</p>
        <div className="flex items-center gap-1.5">
          {ASSIGNEES.map((a) => (
            <Avatar className="size-7 ring-2 ring-background" key={a.id}>
              <AvatarFallback className="text-[10px]">
                {a.initials}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="font-medium text-muted-foreground text-xs">Due date</p>
        <Popover onOpenChange={handleOpenChange} open={open}>
          <PopoverTrigger
            render={
              <Button className="w-full justify-start" variant="outline" />
            }
          >
            <CalendarIcon aria-hidden="true" />
            {format(deadline, "EEE, MMM dd, yyyy")}
          </PopoverTrigger>
          <PopoverPopup>
            <Calendar
              defaultMonth={pending}
              disabled={{ before: new Date() }}
              mode="single"
              onSelect={setPending}
              selected={pending}
            />
            <div className="flex items-center justify-end gap-2 border-t p-3">
              <Button onClick={handleCancel} size="sm" variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={
                  !pending || (!!pending && isSameDay(pending, deadline))
                }
                onClick={handleApply}
                size="sm"
              >
                Apply
              </Button>
            </div>
          </PopoverPopup>
        </Popover>
        {isRescheduled && (
          <p className="text-muted-foreground text-xs">
            Original:{" "}
            <span className="line-through">
              {format(ORIGINAL_DEADLINE, "MMM dd, yyyy")}
            </span>
          </p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={saved || !isRescheduled}
        onClick={() => setSaved(true)}
      >
        {saved ? "Changes Saved" : "Save Changes"}
      </Button>
    </div>
  );
}

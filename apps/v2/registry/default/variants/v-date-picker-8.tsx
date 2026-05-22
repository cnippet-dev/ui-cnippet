"use client";

import { format } from "date-fns";
import { CalendarIcon, UsersIcon } from "lucide-react";
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

const TEAM = [
  { busyOn: [1, 3], id: 1, name: "Alice Park", role: "Design" },
  { busyOn: [2, 4], id: 2, name: "Ben Torres", role: "Engineering" },
  { busyOn: [1, 5], id: 3, name: "Celia Kim", role: "Product" },
  { busyOn: [3], id: 4, name: "Dan Moss", role: "Engineering" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export default function Particle() {
  const [date, setDate] = useState<Date | undefined>();

  const freeCount = date
    ? TEAM.filter((m) => !m.busyOn.includes(date.getDay())).length
    : 0;

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border bg-background p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <UsersIcon
          aria-hidden="true"
          className="size-4 text-muted-foreground"
        />
        <div>
          <h3 className="font-semibold text-sm">Schedule a Meeting</h3>
          <p className="text-muted-foreground text-xs">
            Pick a date to check team availability
          </p>
        </div>
      </div>

      <Popover>
        <PopoverTrigger
          render={<Button className="w-full justify-start" variant="outline" />}
        >
          <CalendarIcon aria-hidden="true" />
          {date ? format(date, "EEE, MMM dd, yyyy") : "Pick a date"}
        </PopoverTrigger>
        <PopoverPopup>
          <Calendar
            disabled={[{ dayOfWeek: [0, 6] }, { before: new Date() }]}
            mode="single"
            onSelect={setDate}
            selected={date}
          />
        </PopoverPopup>
      </Popover>

      {date ? (
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs">
            {freeCount} of {TEAM.length} available on {format(date, "MMM dd")}
          </p>
          {TEAM.map((member) => {
            const isBusy = member.busyOn.includes(date.getDay());
            return (
              <div className="flex items-center gap-3" key={member.id}>
                <Avatar className="size-8">
                  <AvatarFallback className="text-xs">
                    {initials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">{member.name}</p>
                  <p className="text-muted-foreground text-xs">{member.role}</p>
                </div>
                <Badge variant={isBusy ? "warning" : "success"}>
                  {isBusy ? "Busy" : "Free"}
                </Badge>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 py-4">
          {TEAM.map((member) => (
            <Avatar className="size-8 ring-2 ring-background" key={member.id}>
              <AvatarFallback className="text-xs">
                {initials(member.name)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      )}

      <Button className="w-full" disabled={!date || freeCount === 0}>
        {date && freeCount > 0
          ? `Send invite · ${format(date, "MMM dd")}`
          : date && freeCount === 0
            ? "No one available"
            : "Send Invite"}
      </Button>
    </div>
  );
}

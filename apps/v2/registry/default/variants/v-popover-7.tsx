"use client";

import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { Badge } from "@/registry/default/ui/badge";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export function Pattern() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Static reference time for the "last deployed" example
  const referenceTime = new Date(now.getTime() - 1000 * 60 * 120); // 2 hours ago

  return (
    <div className="flex min-h-25 items-center justify-center">
      <p className="text-muted-foreground text-sm">
        Last deployed{" "}
        <Popover>
          <PopoverTrigger
            render={
              <button className="cursor-default text-foreground underline decoration-1 decoration-dashed underline-offset-4 outline-hidden" />
            }
          >
            {formatDistanceToNow(referenceTime, { addSuffix: true })}
          </PopoverTrigger>
          <PopoverContent align="start" className="w-auto max-w-86 gap-0 p-0">
            <p className="border-b px-2 py-1 font-medium text-foreground">
              {formatDistanceToNow(referenceTime, { addSuffix: true })}
            </p>
            <div className="px-2 py-1.5">
              <table>
                <tbody>
                  <tr>
                    <td className="pr-4 pb-1.5">
                      <Badge variant="outline">UTC</Badge>
                    </td>
                    <td className="pr-6 pb-1.5">
                      {format(referenceTime, "MMM d, yyyy")}
                    </td>
                    <td className="pb-1.5 text-muted-foreground">
                      {format(referenceTime, "hh:mm:ss a")}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4">
                      <span className="rounded bg-muted px-1.5 py-0.5 font-medium">
                        {Intl.DateTimeFormat()
                          .resolvedOptions()
                          .timeZone.split("/")
                          .pop()
                          ?.replace("_", " ") || "Local"}
                      </span>
                    </td>
                    <td className="pr-6">{format(now, "MMM d, yyyy")}</td>
                    <td className="w-28 text-muted-foreground">
                      {format(now, "hh:mm:ss a")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </PopoverContent>
        </Popover>{" "}
        by CI/CD pipeline.
      </p>
    </div>
  );
}

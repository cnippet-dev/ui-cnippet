"use client";

import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";
import { Slider } from "@/registry/default/ui/slider";
import { Switch } from "@/registry/default/ui/switch";

export function Pattern() {
  const [volume, setVolume] = useState([75]);

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button size="icon" variant="outline" />}>
          <SettingsIcon aria-hidden="true" />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 gap-0 p-0">
          <div className="border-b p-3">
            <h4 className="m-0 font-medium">Quick Settings</h4>
            <p className="text-muted-foreground">Adjust your preferences.</p>
          </div>
          <div className="space-y-3 p-3 pb-4">
            <div className="flex items-center justify-between">
              <label htmlFor="qs-dark">Dark Mode</label>
              <Switch id="qs-dark" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="qs-notif">Notifications</label>
              <Switch defaultChecked id="qs-notif" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label>Volume</label>
                <span className="text-muted-foreground">{volume[0]}%</span>
              </div>
              <Slider
                max={100}
                onValueChange={(v) => setVolume(v as number[])}
                step={1}
                value={volume}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

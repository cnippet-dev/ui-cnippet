"use client";

import {
  MicIcon,
  MicOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  PhoneOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/registry/default/ui/toolbar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

export function Pattern() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenOn, setScreenOn] = useState(false);

  return (
    <TooltipProvider>
      <Toolbar>
        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
                  onClick={() => setMicOn((v) => !v)}
                  render={
                    <Button
                      size="icon"
                      variant={micOn ? "ghost" : "destructive"}
                    />
                  }
                >
                  {micOn ? <MicIcon /> : <MicOffIcon />}
                </ToolbarButton>
              }
            />
            <TooltipContent>{micOn ? "Mute" : "Unmute"}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label={camOn ? "Turn off camera" : "Turn on camera"}
                  onClick={() => setCamOn((v) => !v)}
                  render={
                    <Button
                      size="icon"
                      variant={camOn ? "ghost" : "destructive"}
                    />
                  }
                >
                  {camOn ? <VideoIcon /> : <VideoOffIcon />}
                </ToolbarButton>
              }
            />
            <TooltipContent>
              {camOn ? "Stop video" : "Start video"}
            </TooltipContent>
          </Tooltip>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <Tooltip>
            <TooltipTrigger
              render={
                <ToolbarButton
                  aria-label={screenOn ? "Stop sharing" : "Share screen"}
                  onClick={() => setScreenOn((v) => !v)}
                  render={
                    <Button
                      size="icon"
                      variant={screenOn ? "secondary" : "ghost"}
                    />
                  }
                >
                  {screenOn ? <MonitorOffIcon /> : <MonitorIcon />}
                </ToolbarButton>
              }
            />
            <TooltipContent>
              {screenOn ? "Stop sharing" : "Share screen"}
            </TooltipContent>
          </Tooltip>
        </ToolbarGroup>

        <ToolbarSeparator />

        <ToolbarGroup>
          <ToolbarButton render={<Button size="sm" variant="destructive" />}>
            <PhoneOffIcon className="size-3.5" />
            Leave
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
    </TooltipProvider>
  );
}

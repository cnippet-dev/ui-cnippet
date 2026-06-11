"use client";

import {
  BellIcon,
  BellOffIcon,
  MailIcon,
  MessageSquareIcon,
  MonitorIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const channels = [
  {
    description: "Receive updates directly to your inbox",
    icon: MailIcon,
    id: "channel-email",
    label: "Email",
  },
  {
    description: "Alerts sent to your registered phone",
    icon: SmartphoneIcon,
    id: "channel-sms",
    label: "SMS",
  },
  {
    description: "Banner alerts while using the app",
    icon: MonitorIcon,
    id: "channel-in-app",
    label: "In-app",
  },
  {
    description: "Notifications pushed to your device",
    icon: MessageSquareIcon,
    id: "channel-push",
    label: "Push",
  },
];

export function Pattern() {
  const [globalEnabled, setGlobalEnabled] = useState(true);
  const [channelState, setChannelState] = useState<Record<string, boolean>>({
    "channel-email": true,
    "channel-in-app": true,
    "channel-push": false,
    "channel-sms": false,
  });

  const toggle = (id: string, val: boolean) =>
    setChannelState((prev) => ({ ...prev, [id]: val }));

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="border-b">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                globalEnabled
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {globalEnabled ? (
                <BellIcon className="size-4" />
              ) : (
                <BellOffIcon className="size-4" />
              )}
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                {globalEnabled ? "Receiving alerts" : "All alerts paused"}
              </CardDescription>
            </div>
          </div>
          <Switch
            checked={globalEnabled}
            id="global-notifications"
            onCheckedChange={setGlobalEnabled}
          />
        </div>
      </CardHeader>

      <CardPanel className="p-0">
        <div
          className={`transition-opacity ${globalEnabled ? "opacity-100" : "pointer-events-none opacity-40"}`}
        >
          <p className="px-5 pt-4 pb-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">
            Delivery channels
          </p>
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const isActive = globalEnabled && channelState[channel.id];
            return (
              <div key={channel.id}>
                <label
                  className="flex cursor-pointer items-center gap-3 px-5 py-3"
                  htmlFor={channel.id}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      isActive
                        ? "border-primary/20 bg-primary/8 text-primary"
                        : "border-border bg-muted/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm">{channel.label}</p>
                    <p className="truncate text-muted-foreground text-xs">
                      {channel.description}
                    </p>
                  </div>
                  <Switch
                    checked={channelState[channel.id]}
                    id={channel.id}
                    onCheckedChange={(val) => toggle(channel.id, val)}
                    size="sm"
                  />
                </label>
                {index < channels.length - 1 && <Separator className="ml-16" />}
              </div>
            );
          })}
        </div>
      </CardPanel>
    </Card>
  );
}

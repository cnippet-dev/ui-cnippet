"use client";

import {
  EyeIcon,
  MapPinIcon,
  MicIcon,
  ShieldIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useState } from "react";
import { Separator } from "@/registry/default/ui/separator";
import { Switch } from "@/registry/default/ui/switch";

const settings = [
  {
    id: "location",
    Icon: MapPinIcon,
    label: "Location Services",
    description: "Allow apps to access your location",
  },
  {
    id: "camera",
    Icon: SmartphoneIcon,
    label: "Camera & Microphone",
    description: "Grant access to media devices",
  },
  {
    id: "microphone",
    Icon: MicIcon,
    label: "Microphone Only",
    description: "Used for voice features",
  },
  {
    id: "activity",
    Icon: EyeIcon,
    label: "Activity Tracking",
    description: "Help improve your experience",
  },
  {
    id: "ads",
    Icon: ShieldIcon,
    label: "Personalised Ads",
    description: "See relevant advertisements",
  },
];

export default function Particle() {
  const [values, setValues] = useState<Record<string, boolean>>({
    location: true,
    camera: false,
    microphone: false,
    activity: true,
    ads: false,
  });

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border">
      <div className="border-b px-4 py-3">
        <p className="font-semibold text-sm">Privacy Settings</p>
      </div>
      <div className="divide-y">
        {settings.map(({ id, Icon, label, description }, i) => (
          <div key={id}>
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon aria-hidden="true" className="size-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
              </div>
              <Switch
                checked={values[id]}
                onCheckedChange={(v) =>
                  setValues((prev) => ({ ...prev, [id]: v }))
                }
                size="sm"
              />
            </div>
            {i === 2 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}

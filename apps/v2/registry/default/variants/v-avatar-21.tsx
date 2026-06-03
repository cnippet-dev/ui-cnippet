import { LinkIcon, MapPinIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Frame, FramePanel } from "@/registry/default/ui/frame";
import { Separator } from "@/registry/default/ui/separator";

const stats = [
  { label: "Repos", value: "142" },
  { label: "Followers", value: "8.4k" },
  { label: "Following", value: "91" },
];

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Frame>
        <FramePanel>
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar className="size-20 ring-2 ring-background ring-offset-2 ring-offset-muted">
              <AvatarImage
                alt="Jordan Blake"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&dpr=2&q=80"
              />
              <AvatarFallback className="text-xl">JB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-semibold text-base">Jordan Blake</span>
                <Badge size="sm" variant="success">
                  Pro
                </Badge>
              </div>
              <span className="text-muted-foreground text-sm">
                @jordanblake
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Building open-source tools for developers. TypeScript enthusiast
              and design systems advocate.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <MapPinIcon className="size-3" />
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1">
                <LinkIcon className="size-3" />
                jordanblake.dev
              </span>
            </div>
          </div>
          <Separator className="my-3" />
          <div className="grid grid-cols-3 divide-x text-center">
            {stats.map((s) => (
              <div className="flex flex-col py-1" key={s.label}>
                <span className="font-semibold text-sm">{s.value}</span>
                <span className="text-muted-foreground text-xs">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Button className="flex-1" size="sm">
              Follow
            </Button>
            <Button className="flex-1" size="sm" variant="outline">
              Message
            </Button>
          </div>
        </FramePanel>
      </Frame>
    </div>
  );
}

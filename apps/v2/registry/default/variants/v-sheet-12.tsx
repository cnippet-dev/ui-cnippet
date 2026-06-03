import {
  BoxIcon,
  CircuitBoardIcon,
  GlobeIcon,
  LinkIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetPanel,
  SheetPopup,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const stats = [
  { label: "Repos", value: "42" },
  { label: "Followers", value: "1.2k" },
  { label: "Stars", value: "8.4k" },
];

const links = [
  { Icon: GlobeIcon, label: "example.com" },
  { Icon: BoxIcon, label: "@margaret_dev" },
  { Icon: CircuitBoardIcon, label: "margaret-welsh" },
];

export default function Particle() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <LinkIcon aria-hidden="true" />
        View Profile
      </SheetTrigger>
      <SheetPopup>
        <SheetPanel className="space-y-5">
          <div className="flex items-start gap-4 pt-2">
            <Avatar className="size-16">
              <AvatarImage
                alt="Margaret Welsh"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&h=128&dpr=2&q=80"
              />
              <AvatarFallback>MW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">Margaret Welsh</p>
              <p className="text-muted-foreground text-sm">@margaret-welsh</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="secondary">Design Engineer</Badge>
                <Badge variant="outline">Open Source</Badge>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Building design systems and component libraries. Passionate about
            accessibility and developer experience. Previously at Vercel.
          </p>

          <Separator />

          <div className="flex items-center justify-around text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="font-semibold">{value}</p>
                <p className="text-muted-foreground text-xs">{label}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-2">
            {links.map(({ Icon, label }) => (
              <div
                className="flex items-center gap-2 text-muted-foreground text-sm"
                key={label}
              >
                <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </SheetPanel>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Button className="flex-1">Follow</Button>
            <SheetClose render={<Button className="flex-1" variant="outline" />}>
              Close
            </SheetClose>
          </div>
        </div>
      </SheetPopup>
    </Sheet>
  );
}

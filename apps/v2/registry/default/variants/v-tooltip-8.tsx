import { PlusIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const members = [
  {
    initials: "SC",
    name: "Sarah Chen",
    role: "Lead Designer",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&dpr=2&q=80",
  },
  {
    initials: "MK",
    name: "Marcus Kim",
    role: "Frontend Engineer",
    src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=64&h=64&dpr=2&q=80",
  },
  {
    initials: "AJ",
    name: "Aisha Johnson",
    role: "Product Manager",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&dpr=2&q=80",
  },
  {
    initials: "LR",
    name: "Liam Rivera",
    role: "Backend Engineer",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=64&h=64&dpr=2&q=80",
  },
  {
    initials: "PW",
    name: "Priya Wang",
    role: "QA Engineer",
    src: "",
  },
] as const;

const overflow = ["Nina Patel", "Omar Hassan", "Lea Müller"];

export function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <TooltipProvider>
        <div className="flex items-center">
          {members.map((member, i) => (
            <Tooltip key={member.name}>
              <TooltipTrigger
                className="focus-visible:outline-none"
                style={{ zIndex: members.length - i }}
              >
                <Avatar className="-ml-2.5 size-9 ring-2 ring-background transition-transform first:ml-0 hover:z-10 hover:-translate-y-1">
                  {member.src && (
                    <AvatarImage alt={member.name} src={member.src} />
                  )}
                  <AvatarFallback className="text-xs">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent className="px-3 py-2">
                <p className="font-medium">{member.name}</p>
                <p className="text-muted-foreground">{member.role}</p>
              </TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger className="-ml-2.5 focus-visible:outline-none">
              <div className="flex size-9 items-center justify-center rounded-full bg-muted font-medium text-muted-foreground text-xs ring-2 ring-background transition-colors hover:bg-muted/80">
                +{overflow.length}
              </div>
            </TooltipTrigger>
            <TooltipContent className="px-3 py-2">
              <p className="mb-1 font-medium">{overflow.length} more members</p>
              <div className="space-y-0.5">
                {overflow.map((name) => (
                  <p className="text-muted-foreground" key={name}>
                    {name}
                  </p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className="-ml-2 focus-visible:outline-none">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-border border-dashed bg-background text-muted-foreground transition-colors hover:bg-muted">
                <PlusIcon className="size-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Add member</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

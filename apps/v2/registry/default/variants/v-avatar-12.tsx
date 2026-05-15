import { UserPlusIcon } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export function Pattern() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex space-x-[-0.6rem]">
        <Avatar className="ring-2 ring-background">
          <AvatarImage
            alt="sarah@example.com"
            className="grayscale"
            src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar className="ring-2 ring-background">
          <AvatarImage
            alt="@maxleiter"
            className="grayscale"
            src="https://github.com/maxleiter.png"
          />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar className="ring-2 ring-background">
          <AvatarImage
            alt="@evilrabbit"
            className="grayscale"
            src="https://github.com/evilrabbit.png"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <button
          aria-label="Add collaborator"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground ring-2 ring-background hover:bg-accent hover:text-accent-foreground"
        >
          <UserPlusIcon aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="space-y-0.5">
        <h3 className="font-medium text-sm">No active collaborators</h3>
        <p className="text-muted-foreground text-xs">
          Invite teammates to start working together.
        </p>
      </div>
    </div>
  );
}

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame>
      <FramePanel className="flex items-center gap-2 p-2!">
        <div className="flex space-x-[-0.6rem]">
          <Avatar className="size-7 ring-2 ring-background">
            <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7 ring-2 ring-background">
            <AvatarImage
              alt="@maxleiter"
              src="https://github.com/maxleiter.png"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7 ring-2 ring-background">
            <AvatarImage
              alt="@evilrabbit"
              src="https://github.com/evilrabbit.png"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
          <Avatar className="size-7 ring-2 ring-background">
            <AvatarImage alt="@leerob" src="https://github.com/leerob.png" />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
        </div>

        <p className="me-1.5 text-muted-foreground text-xs">
          Joined by <span className="font-semibold text-foreground">500+</span>{" "}
          developers.
        </p>
      </FramePanel>
    </Frame>
  );
}

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export function Pattern() {
  return (
    <div className="flex space-x-[-0.6rem]">
      <Avatar className="ring-2 ring-background">
        <AvatarImage
          alt="Sarah Chen"
          src="https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarImage
          alt="Michael Rodriguez"
          src="https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarImage
          alt="Emma Wilson"
          src="https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>EW</AvatarFallback>
      </Avatar>
      <Avatar className="ring-2 ring-background">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  );
}

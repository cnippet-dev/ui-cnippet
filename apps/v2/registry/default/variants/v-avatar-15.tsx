import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export function Pattern() {
  return (
    <div className="relative w-fit">
      <Avatar className="animate-pulse ring-2 ring-green-500 ring-offset-2 ring-offset-background">
        <AvatarImage
          alt="Alex Johnson"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      <span className="absolute -right-1 -bottom-1 size-3 rounded-full border-2 border-background bg-green-500" />
    </div>
  );
}

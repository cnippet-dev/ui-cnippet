import { Separator } from "@/registry/default/ui/separator";

const links = ["Privacy", "Terms", "Cookies", "Status", "Contact"];

export default function Particle() {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground text-xs">
      {links.map((link, i) => (
        <div className="flex items-center gap-2" key={link}>
          {i > 0 && <Separator className="h-3" orientation="vertical" />}
          <button
            className="transition-colors hover:text-foreground"
            type="button"
          >
            {link}
          </button>
        </div>
      ))}
    </div>
  );
}

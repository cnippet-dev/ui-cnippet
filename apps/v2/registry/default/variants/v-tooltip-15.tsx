import {
  BarChart2Icon,
  FileTextIcon,
  HomeIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type NavItem = {
  icon: React.ElementType;
  label: string;
  description: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  {
    active: true,
    description: "Your workspace overview",
    icon: HomeIcon,
    label: "Home",
  },
  {
    description: "Visitor and revenue analytics",
    icon: BarChart2Icon,
    label: "Analytics",
  },
  {
    description: "Manage team members and roles",
    icon: UsersIcon,
    label: "Team",
  },
  {
    description: "Create and edit documents",
    icon: FileTextIcon,
    label: "Docs",
  },
  {
    description: "App preferences and integrations",
    icon: SettingsIcon,
    label: "Settings",
  },
];

export function Pattern() {
  return (
    <div className="flex min-h-40 items-start">
      <TooltipProvider>
        <nav className="flex flex-col items-center gap-1 rounded-xl border bg-card p-1.5">
          {navItems.map(({ icon: Icon, label, description, active }) => (
            <Tooltip key={label}>
              <TooltipTrigger
                render={
                  <Button
                    aria-label={label}
                    className={active ? "bg-accent text-accent-foreground" : ""}
                    size="icon"
                    variant="ghost"
                  />
                }
              >
                <Icon className="size-4" />
              </TooltipTrigger>
              <TooltipContent className="p-2.5" side="right">
                <p className="font-medium">{label}</p>
                <p className="text-muted-foreground">{description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
}

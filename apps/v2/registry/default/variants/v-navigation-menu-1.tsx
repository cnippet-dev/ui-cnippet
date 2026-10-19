// title: Marketing mega menu with icon cards and a featured link
import {
  BarChart3Icon,
  BookOpenIcon,
  type LucideIcon,
  MailIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/registry/default/ui/navigation-menu";

type Entry = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

const PRODUCTS: Entry[] = [
  {
    description: "Dashboards and funnels in real time.",
    href: "#analytics",
    icon: BarChart3Icon,
    title: "Analytics",
  },
  {
    description: "Trigger flows from any event.",
    href: "#automations",
    icon: WorkflowIcon,
    title: "Automations",
  },
  {
    description: "Campaigns that send themselves.",
    href: "#email",
    icon: MailIcon,
    title: "Email",
  },
  {
    description: "SSO, audit logs and roles.",
    href: "#security",
    icon: ShieldCheckIcon,
    title: "Security",
  },
];

const RESOURCES: Entry[] = [
  {
    description: "Guides and API reference.",
    href: "#docs",
    icon: BookOpenIcon,
    title: "Documentation",
  },
  {
    description: "Product news and stories.",
    href: "#blog",
    icon: NewspaperIcon,
    title: "Blog",
  },
  {
    description: "What shipped this week.",
    href: "#changelog",
    icon: ZapIcon,
    title: "Changelog",
  },
];

function EntryLink({ entry }: { entry: Entry }) {
  return (
    <NavigationMenuLink className="flex-row gap-3" href={entry.href}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background">
        <entry.icon aria-hidden="true" className="size-4 opacity-80" />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-medium">{entry.title}</span>
        <span className="text-muted-foreground text-xs">
          {entry.description}
        </span>
      </span>
    </NavigationMenuLink>
  );
}

export default function Particle() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-[30rem] sm:grid-cols-2">
              {PRODUCTS.map((entry) => (
                <li key={entry.title}>
                  <EntryLink entry={entry} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-2 sm:w-[32rem] sm:grid-cols-[1fr_12rem]">
              <ul className="grid gap-1">
                {RESOURCES.map((entry) => (
                  <li key={entry.title}>
                    <EntryLink entry={entry} />
                  </li>
                ))}
              </ul>
              <NavigationMenuLink
                className="justify-end gap-1 bg-muted/60 p-4"
                href="#state-of-ui"
              >
                <span className="text-muted-foreground text-xs">Report</span>
                <span className="font-medium">State of UI 2026</span>
                <span className="text-muted-foreground text-xs">
                  What 4,000 teams told us about their design systems.
                </span>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#pricing" variant="trigger">
            Pricing
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

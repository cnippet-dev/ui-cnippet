"use client";

import {
  BellIcon,
  ChartBarIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";
import { type ReactElement, useState } from "react";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import { Item, ItemMedia, ItemTitle } from "@/registry/default/ui/item";

type NavItem = {
  id: string;
  name: string;
  icon: ReactElement;
  items?: NavItem[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboardIcon />,
    id: "dashboard",
    items: [
      {
        icon: <ChartBarIcon />,
        id: "analytics",
        items: [
          {
            icon: <FileTextIcon aria-hidden="true" />,
            id: "real-time",
            name: "Real-time",
          },
          {
            icon: <FileTextIcon aria-hidden="true" />,
            id: "historical",
            name: "Historical",
          },
        ],
        name: "Analytics",
      },
      {
        icon: <MessageSquareIcon aria-hidden="true" />,
        id: "reports",
        name: "Reports",
      },
    ],
    name: "Dashboard",
  },
  {
    icon: <UserIcon aria-hidden="true" />,
    id: "team",
    items: [
      {
        icon: <UserIcon aria-hidden="true" />,
        id: "members",
        name: "Members",
      },
      {
        icon: <ShieldIcon aria-hidden="true" />,
        id: "permissions",
        name: "Permissions",
      },
    ],
    name: "Team",
  },
  {
    icon: <CreditCardIcon aria-hidden="true" />,
    id: "billing",
    name: "Billing",
  },
  {
    icon: <SettingsIcon aria-hidden="true" />,
    id: "settings",
    name: "Settings",
  },
  {
    icon: <BellIcon aria-hidden="true" />,
    id: "notifications",
    name: "Notifications",
  },
];

function NavMenuItem({
  item,
  level = 0,
  selectedId,
  onSelect,
}: {
  item: NavItem;
  level?: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const isFolder = !!item.items && item.items.length > 0;
  const isSelected = selectedId === item.id;

  if (isFolder) {
    return (
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger
          nativeButton={false}
          render={
            <Item
              className="group/item cursor-pointer py-1.25 hover:bg-accent data-[state=open]:bg-accent"
              size="xs"
              style={{ paddingLeft: `${level * 12 + 8}px` }}
            />
          }
        >
          <ItemMedia variant="icon">
            <div className="size-3.5 text-muted-foreground group-hover/item:text-foreground">
              {item.icon}
            </div>
          </ItemMedia>
          <ItemTitle className="text-sm data-[state=open]/collapsible:font-semibold">
            {item.name}
          </ItemTitle>
          <ChevronRightIcon
            aria-hidden="true"
            className="ml-auto size-4 in-data-open:rotate-90 text-muted-foreground transition-transform"
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden pt-0.5 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-0.5">
            {item.items?.map((child) => (
              <NavMenuItem
                item={child}
                key={child.id}
                level={level + 1}
                onSelect={onSelect}
                selectedId={selectedId}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Item
      className="group/item cursor-pointer py-1.25 hover:bg-accent data-[active=true]:bg-accent data-[active=true]:text-foreground"
      data-active={isSelected}
      onClick={() => onSelect(item.id)}
      size="xs"
      style={{ paddingLeft: `${level * 12 + 8}px` }}
    >
      <ItemMedia variant="icon">
        <div className="size-3.5 text-muted-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground">
          {item.icon}
        </div>
      </ItemMedia>
      <ItemTitle className="text-sm">{item.name}</ItemTitle>
    </Item>
  );
}

export function Pattern() {
  const [selectedId, setSelectedId] = useState<string | null>("real-time");

  return (
    <div className="min-h-64 w-full max-w-56">
      <Card className="p-0">
        <CardContent className="p-1">
          <div className="flex flex-col gap-0/5">
            {navItems.map((item) => (
              <NavMenuItem
                item={item}
                key={item.id}
                onSelect={setSelectedId}
                selectedId={selectedId}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

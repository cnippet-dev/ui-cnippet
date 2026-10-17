import {
  CalendarArrowUpIcon,
  CalendarClockIcon,
  CheckIcon,
  CopyIcon,
  HelpCircleIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/registry/default/ui/context-menu";

const EVENTS = [
  { id: "e1", time: "09:30 – 10:00", title: "Design review" },
  { id: "e2", time: "11:00 – 12:00", title: "Sprint planning" },
  { id: "e3", time: "14:30 – 15:00", title: "1:1 with Celia" },
];

export function ContextMenuGroups() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-background p-3 shadow-xs/5">
      <div className="mb-3 flex items-baseline justify-between px-1">
        <p className="font-semibold text-sm">Thursday</p>
        <p className="text-muted-foreground text-xs">
          <span className="pointer-fine:inline hidden">
            Right-click an event
          </span>
          <span className="pointer-coarse:inline hidden">
            Long-press an event
          </span>
        </p>
      </div>
      <div className="space-y-1.5">
        {EVENTS.map((event) => (
          <ContextMenu key={event.id}>
            <ContextMenuTrigger className="flex w-full items-center gap-3 rounded-lg border-primary border-s-2 bg-muted/60 px-3 py-2 text-start">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-sm">{event.title}</p>
                <p className="text-muted-foreground text-xs">{event.time}</p>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuGroup>
                <ContextMenuLabel>Event</ContextMenuLabel>
                <ContextMenuItem>
                  <PencilIcon />
                  Edit
                  <ContextMenuShortcut>E</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <CopyIcon />
                  Duplicate
                  <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem>
                  <LinkIcon />
                  Copy link
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuLabel>Respond</ContextMenuLabel>
                <ContextMenuItem>
                  <CheckIcon />
                  Going
                </ContextMenuItem>
                <ContextMenuItem>
                  <HelpCircleIcon />
                  Maybe
                </ContextMenuItem>
                <ContextMenuItem>
                  <XIcon />
                  Not going
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuLabel>Move</ContextMenuLabel>
                <ContextMenuItem>
                  <CalendarClockIcon />
                  Tomorrow
                </ContextMenuItem>
                <ContextMenuItem>
                  <CalendarArrowUpIcon />
                  Next week
                </ContextMenuItem>
              </ContextMenuGroup>
              <ContextMenuSeparator />
              <ContextMenuGroup>
                <ContextMenuItem variant="destructive">
                  <TrashIcon />
                  Delete event
                  <ContextMenuShortcut>⌫</ContextMenuShortcut>
                </ContextMenuItem>
              </ContextMenuGroup>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}

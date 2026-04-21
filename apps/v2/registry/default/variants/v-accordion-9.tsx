import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/default/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const users = [
  {
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80",
    content:
      "Alex has full administrative access to the platform, including billing management, user provisioning, and security configurations.",
    email: "alex@apple.com",
    id: "1",
    initials: "AJ",
    name: "Alex Johnson",
    role: "Admin",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80",
    content:
      "Sarah has read-only access to projects and reports. She cannot modify settings or invite new members.",
    email: "sarah@openai.com",
    id: "2",
    initials: "SC",
    name: "Sarah Chen",
    role: "Viewer",
  },
  {
    avatar:
      "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?w=96&h=96&dpr=2&q=80",
    content:
      "Michael is part of the design team and has permissions to edit projects, manage assets, and update design system components.",
    email: "michael@meta.com",
    id: "3",
    initials: "MR",
    name: "Michael Rodriguez",
    role: "Editor",
  },
];

export function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        {users.map((user) => (
          <FramePanel key={user.id}>
            <Accordion
              className="border-none"
              defaultValue={["1"]}
              multiple={false}
            >
              <AccordionItem
                className="border-none bg-transparent p-0 **:data-[slot=accordion-content]:p-0!"
                value={user.id}
              >
                <AccordionTrigger className="items-center px-1 py-1 hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8 border">
                      <AvatarImage alt={user.name} src={user.avatar} />
                      <AvatarFallback className="text-xs">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="inline-flex items-center gap-2">
                      <span className="font-semibold text-foreground/90 tracking-tight">
                        {user.name}
                      </span>
                      <Badge
                        size="sm"
                        variant={
                          user.role === "Admin" ? "success" : "secondary"
                        }
                      >
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="py-0 pl-11 text-muted-foreground">
                  {user.content}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </FramePanel>
        ))}
      </Frame>
    </div>
  );
}

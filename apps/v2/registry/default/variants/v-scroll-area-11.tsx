import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const messages = [
  {
    id: 1,
    initials: "A",
    text: "Hey! Are we still on for the review meeting today?",
    time: "9:41 AM",
    user: "Alice",
  },
  {
    id: 2,
    initials: "B",
    text: "Yes, I'll be there. Just finishing up some PRs.",
    time: "9:43 AM",
    user: "Bob",
  },
  {
    id: 3,
    initials: "A",
    text: "Perfect. I've prepared the design handoff notes.",
    time: "9:44 AM",
    user: "Alice",
  },
  {
    id: 4,
    initials: "C",
    text: "Can we push it 30 minutes? My call ends at 2:30.",
    time: "9:47 AM",
    user: "Carol",
  },
  {
    id: 5,
    initials: "B",
    text: "Works for me.",
    time: "9:48 AM",
    user: "Bob",
  },
  {
    id: 6,
    initials: "A",
    text: "Sure! Updated the calendar invite.",
    time: "9:49 AM",
    user: "Alice",
  },
  {
    id: 7,
    initials: "C",
    text: "Thanks! See you all then.",
    time: "9:50 AM",
    user: "Carol",
  },
  {
    id: 8,
    initials: "B",
    text: "One more thing — should we demo the new dashboard too?",
    time: "9:52 AM",
    user: "Bob",
  },
];

export default function Particle() {
  return (
    <ScrollArea className="h-72 w-full max-w-sm rounded-lg border">
      <div className="flex flex-col gap-4 p-4">
        {messages.map(({ id, initials, text, time, user }) => (
          <div className="flex items-start gap-3" key={id}>
            <Avatar className="size-7 shrink-0">
              <AvatarFallback className="text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-sm">{user}</span>
                <span className="text-muted-foreground text-xs">{time}</span>
              </div>
              <p className="text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

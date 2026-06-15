import { ScrollArea } from "@/registry/default/ui/scroll-area";

const statuses = ["To Do", "In Progress", "Done"] as const;

const cards: { id: number; title: string; tag: (typeof statuses)[number] }[] = [
  { id: 1, tag: "To Do", title: "Update API documentation" },
  { id: 2, tag: "To Do", title: "Design onboarding flow" },
  { id: 3, tag: "To Do", title: "Write unit tests for auth" },
  { id: 4, tag: "In Progress", title: "Refactor dashboard layout" },
  { id: 5, tag: "In Progress", title: "Integrate analytics SDK" },
  { id: 6, tag: "Done", title: "Fix mobile nav bug" },
  { id: 7, tag: "Done", title: "Set up CI pipeline" },
  { id: 8, tag: "Done", title: "Deploy staging environment" },
];

const tagColor: Record<(typeof statuses)[number], string> = {
  Done: "bg-green-500/10 text-green-700 dark:text-green-400",
  "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  "To Do": "bg-muted text-muted-foreground",
};

export default function Particle() {
  return (
    <ScrollArea className="h-80 w-72 rounded-lg border">
      <div className="space-y-2 p-3">
        <p className="font-medium text-sm">Backlog</p>
        {cards.map((card) => (
          <div
            className="rounded-lg border bg-background p-3 shadow-xs"
            key={card.id}
          >
            <p className="text-sm">{card.title}</p>
            <span
              className={`mt-1.5 inline-block rounded px-1.5 py-0.5 font-medium text-xs ${tagColor[card.tag]}`}
            >
              {card.tag}
            </span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

//biome-ignore-all lint/suspicious/noAssignInExpressions:<>
import { ScrollArea } from "@/registry/default/ui/scroll-area";

const contacts = [
  { name: "Alice Brown", role: "Designer" },
  { name: "Aaron Chen", role: "Engineer" },
  { name: "Bob Davis", role: "Product" },
  { name: "Beth Evans", role: "Engineer" },
  { name: "Charlie Fox", role: "Marketing" },
  { name: "Chris Grant", role: "Sales" },
  { name: "Diana Hall", role: "Engineer" },
  { name: "David Irons", role: "Designer" },
  { name: "Elena James", role: "Engineer" },
  { name: "Frank King", role: "Product" },
  { name: "Grace Lee", role: "Engineer" },
  { name: "Henry Moon", role: "Sales" },
];

const grouped = contacts.reduce<Record<string, typeof contacts>>(
  (acc, contact) => {
    const letter = contact.name[0] ?? "#";
    (acc[letter] ??= []).push(contact);
    return acc;
  },
  {},
);

export default function Particle() {
  return (
    <ScrollArea className="h-72 w-full max-w-xs rounded-lg border">
      <div className="p-2">
        {Object.entries(grouped).map(([letter, items]) => (
          <div key={letter}>
            <p className="sticky top-0 bg-background px-2 py-1 font-semibold text-muted-foreground text-xs">
              {letter}
            </p>
            {items.map((c) => (
              <div
                className="flex items-center justify-between rounded-md px-2 py-1.5 hover:bg-muted"
                key={c.name}
              >
                <span className="text-sm">{c.name}</span>
                <span className="text-muted-foreground text-xs">{c.role}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

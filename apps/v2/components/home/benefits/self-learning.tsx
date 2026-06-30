import { Check, Command, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const defaultCards = [
  {
    className: "[grid-area:stack] hover:-translate-y-10",
    date: "Updated 2 hours ago",
    description:
      "Fully accessible button with variants: default, outline, ghost, destructive",
    icon: <Check className="size-4" />,
    title: "Button Component",
  },
  {
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1",
    date: "Updated 1 day ago",
    description:
      "Sortable, filterable data table with pagination and column management",
    icon: <Command className="size-4" />,
    title: "Data Table Component",
  },
  {
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    date: "Auto-updated 3 days ago",
    description:
      "Accessible dialog component with animations and keyboard navigation",
    icon: <Star className="size-4" />,
    title: "Dialog & Modal",
  },
];

export const SelfLearningGraphic = () => (
  <div className="fade-in-0 -ml-16 grid animate-in place-items-center opacity-100 duration-200 xl:-ml-48">
    {defaultCards.map((card) => (
      <div
        className={cn(
          "relative flex h-32 w-88 skew-y-[-8deg] select-none flex-col justify-between rounded border border-dashed bg-background p-3 font-mono transition-all duration-200",
          "after:absolute after:top-[-5%] after:-right-1 after:h-[110%] after:w-[20rem] after:bg-linear-to-l after:from-background after:via-transparent after:to-transparent after:content-['']",
          "bg-background-50 hover:border-foreground/20 hover:bg-background-50",
          "*:flex *:items-center *:gap-2",
          card.className,
        )}
        key={card.title}
      >
        <div className="text-cnippet-blue">
          {card.icon}
          <p className="font-medium text-[13px]">{card.title}</p>
        </div>
        <p className="line-clamp-2 text-balance font-normal text-[13px] text-primary/60">
          {card.description}
        </p>
        <p className="text-[10px] text-primary/40">{card.date}</p>
      </div>
    ))}
  </div>
);

import { StarIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@/registry/default/ui/tabs";

const repos = [
  {
    description: "Production-ready component library built with Base UI.",
    language: "TypeScript",
    name: "ui-cnippet",
    stars: 1204,
  },
  {
    description: "Opinionated Next.js starter with auth and Tailwind CSS.",
    language: "TypeScript",
    name: "next-starter",
    stars: 847,
  },
  {
    description: "Collection of reusable Tailwind CSS utility classes.",
    language: "CSS",
    name: "tailwind-utils",
    stars: 432,
  },
  {
    description: "Custom React hooks for common UI patterns.",
    language: "TypeScript",
    name: "hooks-lab",
    stars: 298,
  },
];

const langColor: Record<string, string> = {
  CSS: "bg-purple-500",
  TypeScript: "bg-blue-500",
};

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Tabs defaultValue="repositories">
        <TabsList variant="underline">
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab className="gap-1.5" value="repositories">
            Repositories
            <Badge size="sm" variant="secondary">
              24
            </Badge>
          </TabsTab>
          <TabsTab className="gap-1.5" value="stars">
            Stars
            <Badge size="sm" variant="secondary">
              108
            </Badge>
          </TabsTab>
          <TabsTab value="activity">Activity</TabsTab>
        </TabsList>

        <TabsPanel className="pt-4" value="overview">
          <p className="text-muted-foreground text-sm">
            Profile overview content goes here.
          </p>
        </TabsPanel>

        <TabsPanel className="pt-4" value="repositories">
          <div className="flex flex-col divide-y divide-border">
            {repos.map((repo) => (
              <div className="flex flex-col gap-1 py-3" key={repo.name}>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-blue-600 text-sm dark:text-blue-400">
                    {repo.name}
                  </span>
                  <Badge size="sm" variant="outline">
                    Public
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs">
                  {repo.description}
                </p>
                <div className="mt-1 flex items-center gap-3 text-muted-foreground text-xs">
                  <span className="flex items-center gap-1">
                    <span
                      className={`size-2.5 rounded-full ${langColor[repo.language] ?? "bg-muted"}`}
                    />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <StarIcon className="size-3" />
                    {repo.stars.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsPanel>

        <TabsPanel className="pt-4" value="stars">
          <p className="text-muted-foreground text-sm">
            Starred repositories appear here.
          </p>
        </TabsPanel>

        <TabsPanel className="pt-4" value="activity">
          <p className="text-muted-foreground text-sm">
            Recent activity feed goes here.
          </p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}

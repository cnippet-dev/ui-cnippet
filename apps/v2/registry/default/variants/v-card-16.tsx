import { GitBranch, GitForkIcon, StarIcon } from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Card, CardContent } from "@/registry/default/ui/card";

const repos = [
  {
    description: "A UI component library built with Base UI and Tailwind CSS.",
    forks: 248,
    langColor: "bg-blue-500",
    language: "TypeScript",
    name: "ui-cnippet",
    stars: 1_420,
  },
  {
    description: "Minimal blogging starter with MDX, Tailwind, and Next.js.",
    forks: 91,
    langColor: "bg-blue-500",
    language: "TypeScript",
    name: "next-blog-starter",
    stars: 673,
  },
  {
    description: "Lightweight state manager for React with zero boilerplate.",
    forks: 57,
    langColor: "bg-yellow-400",
    language: "JavaScript",
    name: "micro-store",
    stars: 312,
  },
];

function fmt(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

export function Pattern() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {repos.map((repo) => (
        <Card className="w-full" key={repo.name}>
          <CardContent className="flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <GitBranch className="size-4 shrink-0 text-muted-foreground" />
                <span className="font-semibold text-sm">{repo.name}</span>
              </div>
              <Badge size="sm" variant="secondary">
                Public
              </Badge>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {repo.description}
            </p>
            <div className="flex items-center gap-4 text-muted-foreground text-xs">
              <span className="flex items-center gap-1">
                <span className={`size-2.5 rounded-full ${repo.langColor}`} />
                {repo.language}
              </span>
              <span className="flex items-center gap-1">
                <StarIcon className="size-3" />
                {fmt(repo.stars)}
              </span>
              <span className="flex items-center gap-1">
                <GitForkIcon className="size-3" />
                {fmt(repo.forks)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

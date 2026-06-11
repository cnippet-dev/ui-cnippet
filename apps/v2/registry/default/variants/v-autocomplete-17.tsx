"use client";

import { StarIcon } from "lucide-react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

type Repo = {
  id: string;
  label: string;
  org: string;
  name: string;
  language: string;
  languageColor: string;
  stars: string;
  description: string;
};

const repos: Repo[] = [
  {
    description: "A JavaScript library for building user interfaces",
    id: "react",
    label: "facebook/react",
    language: "JavaScript",
    languageColor: "#f1e05a",
    name: "react",
    org: "facebook",
    stars: "228k",
  },
  {
    description: "The React Framework for the Web",
    id: "nextjs",
    label: "vercel/next.js",
    language: "TypeScript",
    languageColor: "#3178c6",
    name: "next.js",
    org: "vercel",
    stars: "127k",
  },
  {
    description: "Build faster websites with Astro",
    id: "astro",
    label: "withastro/astro",
    language: "TypeScript",
    languageColor: "#3178c6",
    name: "astro",
    org: "withastro",
    stars: "47k",
  },
  {
    description: "Rapidly build modern websites without leaving your HTML",
    id: "tailwind",
    label: "tailwindlabs/tailwindcss",
    language: "CSS",
    languageColor: "#563d7c",
    name: "tailwindcss",
    org: "tailwindlabs",
    stars: "83k",
  },
  {
    description: "Next-generation ORM for Node.js & TypeScript",
    id: "prisma",
    label: "prisma/prisma",
    language: "TypeScript",
    languageColor: "#3178c6",
    name: "prisma",
    org: "prisma",
    stars: "39k",
  },
  {
    description: "An extremely fast JavaScript runtime",
    id: "bun",
    label: "oven-sh/bun",
    language: "Zig",
    languageColor: "#ec915c",
    name: "bun",
    org: "oven-sh",
    stars: "73k",
  },
  {
    description: "A fast all-in-one JavaScript runtime",
    id: "deno",
    label: "denoland/deno",
    language: "Rust",
    languageColor: "#dea584",
    name: "deno",
    org: "denoland",
    stars: "97k",
  },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <label className="font-medium text-sm">Link repository</label>
      <Autocomplete items={repos}>
        <AutocompleteInput placeholder="Search repositories…" showClear />
        <AutocompletePopup>
          <AutocompleteEmpty>No repositories found.</AutocompleteEmpty>
          <AutocompleteList>
            {(repo: Repo) => (
              <AutocompleteItem key={repo.id} value={repo}>
                <div className="flex w-full flex-col gap-0.5 py-0.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium font-mono text-sm">
                      <span className="text-muted-foreground">{repo.org}/</span>
                      {repo.name}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-muted-foreground text-xs">
                      <StarIcon className="size-3" />
                      {repo.stars}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span className="text-muted-foreground text-xs">
                      {repo.language}
                    </span>
                    <span className="truncate text-muted-foreground text-xs">
                      · {repo.description}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}

"use client";

import { Loader2Icon, SearchIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from "@/registry/default/ui/combobox";

interface Repo {
  label: string;
  value: string;
  language: string;
  stars: string;
}

const allRepos: Repo[] = [
  {
    label: "facebook/react",
    language: "JavaScript",
    stars: "228k",
    value: "react",
  },
  {
    label: "vercel/next.js",
    language: "TypeScript",
    stars: "126k",
    value: "nextjs",
  },
  {
    label: "tailwindlabs/tailwindcss",
    language: "CSS",
    stars: "83k",
    value: "tailwindcss",
  },
  { label: "vitejs/vite", language: "TypeScript", stars: "68k", value: "vite" },
  { label: "vuejs/vue", language: "TypeScript", stars: "207k", value: "vue" },
  {
    label: "sveltejs/svelte",
    language: "TypeScript",
    stars: "79k",
    value: "svelte",
  },
  {
    label: "microsoft/typescript",
    language: "TypeScript",
    stars: "100k",
    value: "typescript",
  },
  {
    label: "prisma/prisma",
    language: "TypeScript",
    stars: "39k",
    value: "prisma",
  },
  { label: "trpc/trpc", language: "TypeScript", stars: "35k", value: "trpc" },
  {
    label: "radix-ui/primitives",
    language: "TypeScript",
    stars: "16k",
    value: "radix-ui",
  },
  {
    label: "pmndrs/zustand",
    language: "TypeScript",
    stars: "48k",
    value: "zustand",
  },
  {
    label: "tanstack/query",
    language: "TypeScript",
    stars: "42k",
    value: "tanstack-query",
  },
];

async function searchRepos(query: string): Promise<Repo[]> {
  await new Promise((r) => setTimeout(r, 400));
  if (!query) return allRepos.slice(0, 5);
  return allRepos.filter((r) =>
    r.label.toLowerCase().includes(query.toLowerCase()),
  );
}

export default function Particle() {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Repo[]>(allRepos.slice(0, 5));
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const data = await searchRepos(value);
      setResults(data);
      setLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  return (
    <Combobox items={results}>
      <ComboboxInput
        aria-label="Search repositories"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="Search repositories..."
        startAddon={
          loading ? <Loader2Icon className="animate-spin" /> : <SearchIcon />
        }
        value={inputValue}
      />
      <ComboboxPopup>
        <ComboboxEmpty>
          {loading ? "Searching..." : "No repositories found."}
        </ComboboxEmpty>
        <ComboboxList>
          {(repo: Repo) => (
            <ComboboxItem key={repo.value} value={repo}>
              <div className="flex w-full items-center justify-between gap-4">
                <span>{repo.label}</span>
                <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-xs">
                  <span>{repo.language}</span>
                  <span>★ {repo.stars}</span>
                </div>
              </div>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxPopup>
    </Combobox>
  );
}

import Link from "next/link";
import { MovingUsersFacehashes } from "@/components/home/moving-users-facehashes";
import { FullWidthBorder } from "@/components/layout/full-width-border";
import { cn } from "@/lib/utils";

function InstallCommand({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-2 rounded border border-dashed bg-background-100 px-4 py-3 font-mono text-sm dark:bg-background-200">
      <span className="select-none text-muted-foreground">$</span>
      <span>{command}</span>
    </div>
  );
}

const componentPreviews = [
  { name: "Button", type: "primary" },
  { name: "Badge", type: "badge" },
  { name: "Input", type: "input" },
  { name: "Card", type: "card" },
  { name: "Dialog", type: "secondary" },
  { name: "Select", type: "select" },
  { name: "Tabs", type: "tabs" },
  { name: "Tooltip", type: "tooltip" },
] as const;

export const Install = () => (
  <section
    className="relative flex flex-col gap-6 md:h-[calc(100vh-20px)] md:gap-12"
    suppressHydrationWarning
  >
    <FullWidthBorder className="top-0" />
    <div className="flex w-full flex-1 flex-col-reverse justify-stretch gap-0 lg:flex-row">
      {/* Component preview */}
      <div className="flex h-full w-full flex-1 items-center justify-center border-dashed pt-4 lg:border-r dark:bg-background-100">
        <div className="flex flex-col items-center gap-6 p-8 text-center">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {componentPreviews.map((item) => (
              <div
                className="flex flex-col gap-2 rounded border border-dashed p-3"
                key={item.name}
              >
                <p className="font-mono text-[10px] text-muted-foreground">
                  {item.name}
                </p>
                {item.type === "primary" && (
                  <div className="rounded-[2px] bg-primary px-3 py-1.5 text-center text-primary-foreground text-xs">
                    Click me
                  </div>
                )}
                {item.type === "secondary" && (
                  <div className="rounded-[2px] border px-3 py-1.5 text-center text-xs">
                    Open dialog
                  </div>
                )}
                {item.type === "badge" && (
                  <div className="inline-flex w-fit rounded-full bg-cnippet-orange/10 px-2 py-0.5 font-medium text-[10px] text-cnippet-orange">
                    New
                  </div>
                )}
                {item.type === "input" && (
                  <div className="rounded-[2px] border px-3 py-1.5 text-muted-foreground text-xs">
                    Type here...
                  </div>
                )}
                {item.type === "card" && (
                  <div className="rounded border p-2 text-xs">Card title</div>
                )}
                {item.type === "select" && (
                  <div className="flex items-center justify-between rounded-[2px] border px-3 py-1.5 text-muted-foreground text-xs">
                    <span>Pick option</span>
                    <span>▾</span>
                  </div>
                )}
                {item.type === "tabs" && (
                  <div className="flex gap-1">
                    <div className="rounded-[2px] bg-primary px-2 py-0.5 text-[10px] text-primary-foreground">
                      Tab 1
                    </div>
                    <div className="rounded-[2px] border px-2 py-0.5 text-[10px]">
                      Tab 2
                    </div>
                  </div>
                )}
                {item.type === "tooltip" && (
                  <div className="relative flex justify-center">
                    <div className="rounded-[2px] border px-2 py-1 text-[10px]">
                      Hover me
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="font-mono text-muted-foreground text-xs">
            live component preview
          </p>
        </div>
      </div>

      {/* Text + install */}
      <div
        className={cn(
          "relative flex flex-col justify-center gap-4 px-4 py-16 lg:w-1/2 lg:px-8 xl:px-12",
        )}
      >
        <div className="flex items-center gap-3">
          <MovingUsersFacehashes />
          <p className="font-mono text-primary/70 text-xs">
            [React · Next.js · Vite · Remix · Astro]
          </p>
        </div>
        <h2 className="w-full max-w-3xl text-pretty font-f37-stout text-4xl md:text-balance md:text-4xl">
          Add any component to your app in one command.
        </h2>
        <p className="w-5/6 max-w-3xl text-pretty text-primary/70">
          Not a separate package. Not a generic library. Components that live in
          your codebase and you own completely.
        </p>
        <div className="mt-6 flex flex-col gap-2 lg:w-5/6">
          <InstallCommand command="npx cnippet@latest init" />
          <InstallCommand command="npx cnippet@latest add button" />
          <InstallCommand command="npx cnippet@latest add data-table" />
        </div>
        <div className="mt-6 flex w-full flex-row gap-3 md:max-w-[75%] md:gap-6 lg:max-w-full lg:items-center">
          <Link
            className="inline-flex h-12 items-center justify-center rounded-[2px] border border-transparent bg-primary px-6 font-medium text-md text-primary-foreground transition-colors hover:bg-primary/90 lg:w-62.5"
            href="/docs/introduction"
          >
            Get started
          </Link>
          <Link
            className="inline-flex h-12 items-center justify-center rounded-[2px] px-4 font-medium text-md transition-colors hover:bg-accent hover:text-accent-foreground"
            href="/explore"
          >
            Browse components
          </Link>
        </div>
      </div>
    </div>
    <FullWidthBorder className="bottom-0" />
  </section>
);

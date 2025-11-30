import { Icons } from "@cnippet/components/icons";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cache } from "react";
import { CodeBlockCommand } from "@/components/code-block-command";
import { ComponentSource } from "@/components/component-source";
import { CopyRegistry } from "@/components/copy-registry";
import { getRegistryItem } from "@/lib/registry";
import { Index } from "@/registry/__index__";
import { Button } from "@/registry/default/ui/button";
import { Sheet, SheetPopup, SheetTrigger } from "@/registry/default/ui/sheet";

import { ParticleCardContainer } from "./particle-card-container";

const getCachedRegistryItem = cache(async (name: string) => {
  return await getRegistryItem(name);
});

function ParticleRenderer({ name }: { name: string }) {
  const item = Index[name];
  const Component = item?.component;

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component {name} not found
      </p>
    );
  }

  return <Component currentPage={1} totalPages={10} totalResults={100} />;
}

export async function ParticleCard({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const cossuiUrl = process.env.NEXT_PUBLIC_APP_URL || "https://coss.com/ui";

  const particle = await getCachedRegistryItem(name);

  if (!particle) {
    return null;
  }

  return (
    <ParticleCardContainer
      className={className}
      footer={
        <>
          <p className="flex flex-1 gap-1 truncate text-muted-foreground text-xs">
            <HugeiconsIcon
              className="size-3 h-[1lh] shrink-0"
              icon={InformationCircleIcon}
              strokeWidth={2}
            />
            <span className="truncate">{particle.description}</span>
          </p>
          <div className="flex items-center gap-1.5">
            {process.env.NODE_ENV === "development" && (
              <Button
                className="text-xs"
                disabled
                size="sm"
                title="Particle name"
                variant="outline"
              >
                {particle.name}
              </Button>
            )}
            <CopyRegistry
              value={`${cossuiUrl}/r/${name}.json`}
              variant="outline"
            />
            <Sheet>
              <SheetTrigger
                render={
                  <Button className="text-xs" size="sm" variant="outline" />
                }
              >
                View code
              </SheetTrigger>
              <SheetPopup
                className="bg-sidebar duration-200 data-ending-style:translate-x-8 data-starting-style:translate-x-8 data-ending-style:opacity-0 data-starting-style:opacity-0 sm:max-w-3xl"
                showCloseButton={false}
              >
                <div className="flex flex-1 flex-col overflow-hidden p-6">
                  <div>
                    <h2 className="mb-4 font-heading text-xl">Installation</h2>
                    <figure data-rehype-pretty-code-figure>
                      <CodeBlockCommand
                        __bun__={`bunx --bun shadcn@latest add @coss/${name}`}
                        __npm__={`npx shadcn@latest add @coss/${name}`}
                        __pnpm__={`pnpm dlx shadcn@latest add @coss/${name}`}
                        __yarn__={`yarn dlx shadcn@latest add @coss/${name}`}
                      />
                    </figure>
                  </div>
                  <div className="flex h-full flex-1 flex-col overflow-hidden">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="mt-6 mb-4 font-heading text-xl">Code</h2>
                      <Button
                        render={
                          <a
                            href={`https://v0.dev/chat/api/open?url=${encodeURIComponent(`${cossuiUrl}/r/${name}.json`)}`}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            Open in<span className="sr-only">v0</span>
                            <Icons.v0 className="size-5" />
                          </a>
                        }
                        variant="outline"
                      />
                    </div>
                    <ComponentSource
                      className="*:data-rehype-pretty-code-figure:no-scrollbar h-full overflow-hidden *:data-rehype-pretty-code-figure:mt-0 *:data-rehype-pretty-code-figure:max-h-full *:data-rehype-pretty-code-figure:overflow-y-auto"
                      collapsible={false}
                      name={name}
                    />
                  </div>
                </div>
              </SheetPopup>
            </Sheet>
          </div>
        </>
      }
    >
      <div data-particle data-slot="preview">
        <ParticleRenderer name={name} />
      </div>
    </ParticleCardContainer>
  );
}

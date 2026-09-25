import { Skeleton } from "@cnippet/ui/components/skeleton";
import { Tabs, TabsList, TabsTab } from "@cnippet/ui/components/tabs";

export default function TabsPreview() {
  return (
    <div className="relative">
      <Skeleton className="flex h-9 w-56 items-center gap-1 rounded-lg p-1 transition-opacity duration-300 group-hover:opacity-0">
        <div className="flex h-full flex-1 items-center justify-center rounded-md bg-neutral-300/70 dark:bg-neutral-900">
          <div className="h-1.5 w-8 rounded-md bg-neutral-400/60 dark:bg-neutral-700" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="h-1.5 w-8 rounded-md bg-neutral-300 dark:bg-neutral-900" />
        </div>
        <div className="flex flex-1 justify-center">
          <div className="h-1.5 w-8 rounded-md bg-neutral-300 dark:bg-neutral-900" />
        </div>
      </Skeleton>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTab tabIndex={-1} value="overview">
              Overview
            </TabsTab>
            <TabsTab tabIndex={-1} value="usage">
              Usage
            </TabsTab>
            <TabsTab tabIndex={-1} value="api">
              API
            </TabsTab>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}

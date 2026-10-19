// title: With collapsible panel
import { ChevronRightIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Frame,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from "@/registry/default/ui/frame";

export function Pattern() {
  return (
    <Frame className="w-full">
      <Collapsible className="group/collapsible" defaultOpen>
        <CollapsibleTrigger className="w-full">
          <FrameHeader className="flex grow flex-row items-center justify-between gap-2">
            <FrameTitle>Agent instructions</FrameTitle>
            <ChevronRightIcon className="size-4 text-muted-foreground transition-transform duration-200 group-data-open/collapsible:rotate-90" />
          </FrameHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <FramePanel>
            <p className="text-muted-foreground text-sm">
              Answer the question from the uploaded files and the knowledge
              base. Cite a source for every claim.
            </p>
          </FramePanel>
        </CollapsibleContent>
      </Collapsible>
    </Frame>
  );
}

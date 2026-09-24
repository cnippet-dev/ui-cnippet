import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PrefetchLink } from "@/components/prefetch-link";
import {
  Frame,
  FrameHeader,
  FrameMeta,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { SignalSection } from "@/components/signal/section";
import { Button } from "@/registry/default/ui/button";
import { AccordionPreview } from "./preview/accordion";
import AlertPreview from "./preview/alert";
import AvatarPreview from "./preview/avatar";
import BadgePreview from "./preview/badge";
import BreadcrumbPreview from "./preview/breadcrumb";
import ButtonPreview from "./preview/button";
import CheckboxPreview from "./preview/checkbox";
import DialogPreview from "./preview/dialog";

// Ordered for visual rhythm — the most recognizable, high-signal components
// lead; supporting ones follow.
const items = [
  {
    number: "2",
    preview: <ButtonPreview />,
    title: "Button",
    url: "/ui/actions/button",
  },
  {
    number: "3",
    preview: <BadgePreview />,
    title: "Badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "3",
    preview: <AvatarPreview />,
    title: "Avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "5",
    preview: <DialogPreview />,
    title: "Dialog",
    url: "/ui/overlays/dialog",
  },
  {
    number: "3",
    preview: <AccordionPreview />,
    title: "Accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "3",
    preview: <AlertPreview />,
    title: "Alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "2",
    preview: <BreadcrumbPreview />,
    title: "Breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "4",
    preview: <CheckboxPreview />,
    title: "Checkbox",
    url: "/ui/forms/checkbox",
  },
];

export default function Components() {
  return (
    <SignalSection
      actions={
        <Button
          className="group/all"
          render={<PrefetchLink href="/explore" />}
          variant="outline"
        >
          View all 97
          <ArrowRight className="transition-transform duration-250 ease-out-expo group-hover/all:translate-x-0.5" />
        </Button>
      }
      id="components"
      index="03"
      kicker="components"
      lead="Buttons, dialogs, tables, forms and more — accessible, themeable, and live below. Eight of ninety-seven."
      title={
        <>
          Production-ready, <em>out of the box.</em>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Frame
            className="group transition-transform duration-250 ease-out-expo hover:-translate-y-px"
            key={item.title}
            spotlight
          >
            <FrameHeader>
              <FrameTitle>
                <PrefetchLink
                  className="outline-none before:absolute before:inset-0 before:z-10 before:rounded-2xl focus-visible:before:ring-2 focus-visible:before:ring-ring"
                  href={item.url}
                >
                  {item.title}
                </PrefetchLink>
              </FrameTitle>
              <FrameMeta className="flex items-center gap-1">
                {item.number} variants
                <ArrowUpRight className="size-3 opacity-0 transition-all duration-250 ease-out-expo group-hover:opacity-100" />
              </FrameMeta>
            </FrameHeader>
            <FramePanel className="pointer-events-none flex h-52 items-center justify-center bg-dots p-6">
              <div className="transition-transform duration-500 ease-out-expo group-hover:scale-[1.04]">
                {item.preview}
              </div>
            </FramePanel>
          </Frame>
        ))}
      </div>
    </SignalSection>
  );
}

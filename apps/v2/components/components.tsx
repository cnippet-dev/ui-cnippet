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
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";
import { AccordionPreview } from "./preview/accordion";
import AlertPreview from "./preview/alert";
import AvatarPreview from "./preview/avatar";
import BadgePreview from "./preview/badge";
import BreadcrumbPreview from "./preview/breadcrumb";
import ButtonPreview from "./preview/button";
import CheckboxPreview from "./preview/checkbox";
import DialogPreview from "./preview/dialog";
import InputPreview from "./preview/input";
import ProgressPreview from "./preview/progress";
import RadioGroupPreview from "./preview/radio-group";
import SelectPreview from "./preview/select";
import SliderPreview from "./preview/slider";
import SwitchPreview from "./preview/switch";
import TabsPreview from "./preview/tabs";
import ToggleGroupPreview from "./preview/toggle-group";

// Ordered for visual rhythm — the most recognizable, high-signal components
// lead; supporting ones follow. `number` is the variant count in
// registry/default/variants.
const items = [
  {
    number: "30",
    preview: <ButtonPreview />,
    title: "Button",
    url: "/ui/actions/button",
  },
  {
    number: "17",
    preview: <BadgePreview />,
    title: "Badge",
    url: "/ui/feedback/badge",
  },
  {
    number: "21",
    preview: <AvatarPreview />,
    title: "Avatar",
    url: "/ui/media/avatar",
  },
  {
    number: "15",
    preview: <DialogPreview />,
    title: "Dialog",
    url: "/ui/overlays/dialog",
  },
  {
    number: "25",
    preview: <InputPreview />,
    title: "Input",
    url: "/ui/forms/input",
  },
  {
    number: "15",
    preview: <SelectPreview />,
    title: "Select",
    url: "/ui/pickers/select",
  },
  {
    number: "17",
    preview: <TabsPreview />,
    title: "Tabs",
    url: "/ui/navigation/tabs",
  },
  {
    number: "15",
    preview: <SwitchPreview />,
    title: "Switch",
    url: "/ui/actions/switch",
  },
  {
    number: "15",
    preview: <AccordionPreview />,
    title: "Accordion",
    url: "/ui/data/accordion",
  },
  {
    number: "15",
    preview: <AlertPreview />,
    title: "Alert",
    url: "/ui/feedback/alert",
  },
  {
    number: "15",
    preview: <SliderPreview />,
    title: "Slider",
    url: "/ui/forms/slider",
  },
  {
    number: "15",
    preview: <ProgressPreview />,
    title: "Progress",
    url: "/ui/feedback/progress",
  },
  {
    number: "15",
    preview: <BreadcrumbPreview />,
    title: "Breadcrumb",
    url: "/ui/navigation/breadcrumb",
  },
  {
    number: "15",
    preview: <CheckboxPreview />,
    title: "Checkbox",
    url: "/ui/forms/checkbox",
  },
  {
    number: "15",
    preview: <RadioGroupPreview />,
    title: "Radio Group",
    url: "/ui/forms/radio-group",
  },
  {
    number: "15",
    preview: <ToggleGroupPreview />,
    title: "Toggle Group",
    url: "/ui/actions/toggle-group",
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
      lead="Buttons, dialogs, tables, forms and more — accessible, themeable, and live below. Sixteen of ninety-seven."
      title={
        <>
          <span className="whitespace-nowrap">Production-ready,</span>{" "}
          <em>out of the box.</em>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Frame
            className={cn(
              "group transition-transform duration-250 ease-out-expo hover:-translate-y-px",
              // One column on phones: keep the first eight so the section
              // doesn't turn into a 4,000px scroll.
              i >= 8 && "max-sm:hidden",
            )}
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
            <FramePanel className="pointer-events-none flex h-40 flex-none items-center justify-center overflow-hidden bg-dots p-4 sm:h-52 sm:p-6">
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

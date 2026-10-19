// title: Showcase: variants, sizes, icons and states
import { BoldIcon, BookmarkIcon, ItalicIcon, StarIcon } from "lucide-react";
import { Toggle } from "@/registry/default/ui/toggle";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-[5rem_1fr] sm:items-center">
      <span className="text-muted-foreground text-xs">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

export default function Particle() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Row label="Variants">
        <Toggle aria-label="Toggle bold">
          <BoldIcon />
          Default
        </Toggle>
        <Toggle aria-label="Toggle italic" variant="outline">
          <ItalicIcon />
          Outline
        </Toggle>
      </Row>
      <Row label="Sizes">
        <Toggle size="sm" variant="outline">
          Small
        </Toggle>
        <Toggle variant="outline">Default</Toggle>
        <Toggle size="lg" variant="outline">
          Large
        </Toggle>
      </Row>
      <Row label="Icon only">
        <Toggle aria-label="Bold" variant="outline">
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Italic" variant="outline">
          <ItalicIcon />
        </Toggle>
        <Toggle aria-label="Favourite" defaultPressed variant="outline">
          <StarIcon />
        </Toggle>
      </Row>
      <Row label="States">
        <Toggle defaultPressed variant="outline">
          <BookmarkIcon />
          Pressed
        </Toggle>
        <Toggle disabled variant="outline">
          Disabled
        </Toggle>
      </Row>
    </div>
  );
}

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  LinkIcon,
  UnderlineIcon,
} from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Separator } from "@/registry/default/ui/separator";

export default function Particle() {
  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button aria-label="Bold" size="icon" variant="ghost">
        <BoldIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button aria-label="Italic" size="icon" variant="ghost">
        <ItalicIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button aria-label="Underline" size="icon" variant="ghost">
        <UnderlineIcon aria-hidden="true" className="size-4" />
      </Button>
      <Separator className="mx-1 h-5" orientation="vertical" />
      <Button aria-label="Align left" size="icon" variant="ghost">
        <AlignLeftIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button aria-label="Align center" size="icon" variant="ghost">
        <AlignCenterIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button aria-label="Align right" size="icon" variant="ghost">
        <AlignRightIcon aria-hidden="true" className="size-4" />
      </Button>
      <Separator className="mx-1 h-5" orientation="vertical" />
      <Button aria-label="Insert link" size="icon" variant="ghost">
        <LinkIcon aria-hidden="true" className="size-4" />
      </Button>
    </div>
  );
}

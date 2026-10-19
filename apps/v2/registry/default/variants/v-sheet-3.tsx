// title: Side Sheets
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

export default function Particle() {
  return (
    <div className="flex flex-wrap gap-2">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Right
        </SheetTrigger>
        <SheetPopup showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>Right</SheetTitle>
            <SheetDescription>Right side of the screen.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <p>
              Comments, activity and details open from the right so the page
              stays in view.
            </p>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Left
        </SheetTrigger>
        <SheetPopup showCloseButton={false} side="left">
          <SheetHeader>
            <SheetTitle>Left</SheetTitle>
            <SheetDescription>Left side of the screen.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <p>
              Primary navigation slides in from the left on smaller screens.
            </p>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Top
        </SheetTrigger>
        <SheetPopup showCloseButton={false} side="top">
          <SheetHeader>
            <SheetTitle>Top</SheetTitle>
            <SheetDescription>Top of the screen.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <p>
              Announcements and search can drop down from the top of the screen.
            </p>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Open Bottom
        </SheetTrigger>
        <SheetPopup showCloseButton={false} side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom</SheetTitle>
            <SheetDescription>Bottom of the screen.</SheetDescription>
          </SheetHeader>
          <SheetPanel>
            <p>
              On mobile, quick actions and filters rise from the bottom edge.
            </p>
          </SheetPanel>
        </SheetPopup>
      </Sheet>
    </div>
  );
}

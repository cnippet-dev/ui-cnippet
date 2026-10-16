//biome-ignore-all lint/suspicious/noArrayIndexKey: <>
import { Button } from "@/registry/default/ui/button";
import { ScrollArea } from "@/registry/default/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

const TERMS = [
  [
    "Accounts",
    "You are responsible for keeping your login details safe and for all activity on your account.",
  ],
  [
    "Acceptable use",
    "Don't use the service to break the law, send spam or interfere with other customers.",
  ],
  [
    "Billing",
    "Paid plans renew automatically each billing period until you cancel from your settings.",
  ],
  [
    "Your content",
    "You own what you upload. We only use it to run and improve the service for you.",
  ],
  [
    "Privacy",
    "Our privacy policy explains what we collect, why we collect it and how long we keep it.",
  ],
  [
    "Availability",
    "We aim for 99.9% uptime and post planned maintenance at least 48 hours in advance.",
  ],
  [
    "Third-party services",
    "Integrations you connect are governed by their own terms, not these ones.",
  ],
  [
    "Cancellation",
    "You can cancel at any time. Your data stays available to export for 30 days.",
  ],
  [
    "Termination",
    "We may suspend accounts that break these terms, and will tell you why when we can.",
  ],
  [
    "Changes",
    "We'll email you at least 30 days before any change that affects your rights.",
  ],
] as const;

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          Scrollable Sheet
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-0 space-y-0">
          <SheetHeader>
            <SheetTitle>Terms of service</SheetTitle>
            <SheetDescription>
              Last updated October 1, 2026. Scroll to read all sections.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-230px)] flex-1 grow">
            <div className="space-y-4 px-4">
              {TERMS.map(([heading, body], i) => (
                <div className="space-y-1" key={heading}>
                  <p className="font-medium text-sm">
                    {i + 1}. {heading}
                  </p>
                  <p className="text-muted-foreground text-sm">{body}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose render={<Button variant="outline" />}>
              Cancel
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

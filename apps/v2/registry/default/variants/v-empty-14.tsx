import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

function InboxIllustration() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="120"
      viewBox="0 0 180 120"
      width="180"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Inbox tray */}
      <rect
        className="fill-background stroke-border"
        height="72"
        rx="8"
        strokeWidth="1.5"
        width="120"
        x="30"
        y="28"
      />
      {/* Tray bottom shelf */}
      <rect
        className="fill-muted dark:fill-muted/50"
        height="20"
        rx="0"
        width="120"
        x="30"
        y="80"
      />
      <rect
        className="fill-muted dark:fill-muted/50"
        height="8"
        rx="0"
        width="120"
        x="30"
        y="92"
      />
      <path
        className="fill-muted dark:fill-muted/50"
        d="M30 92 Q30 100 38 100 H142 Q150 100 150 92"
      />

      {/* Envelope 1 - back */}
      <rect
        className="fill-muted/60 stroke-border/60"
        height="30"
        rx="4"
        strokeWidth="1"
        width="80"
        x="50"
        y="38"
      />
      <path
        className="stroke-border/40"
        d="M50 42 L90 58 L130 42"
        fill="none"
        strokeWidth="1"
      />

      {/* Envelope 2 - front */}
      <rect
        className="fill-background stroke-border"
        height="30"
        rx="4"
        strokeWidth="1.5"
        width="80"
        x="50"
        y="46"
      />
      <path
        className="stroke-muted-foreground/30"
        d="M50 50 L90 66 L130 50"
        fill="none"
        strokeWidth="1.5"
      />

      {/* Decorative dots */}
      <circle className="fill-primary/15" cx="22" cy="60" r="3" />
      <circle className="fill-muted-foreground/10" cx="160" cy="44" r="2" />
      <circle className="fill-muted-foreground/10" cx="164" cy="80" r="2.5" />
    </svg>
  );
}

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia>
            <InboxIllustration />
          </EmptyMedia>
          <EmptyTitle>Inbox zero</EmptyTitle>
          <EmptyDescription>
            You&apos;re all caught up. No new messages waiting for you.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">Compose message</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

function CalendarIllustration() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="140"
      viewBox="0 0 160 140"
      width="160"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Calendar body */}
      <rect
        className="fill-background stroke-border"
        height="96"
        rx="10"
        strokeWidth="1.5"
        width="112"
        x="24"
        y="28"
      />

      {/* Calendar header bar */}
      <rect
        className="fill-muted dark:fill-muted/60"
        height="24"
        rx="10"
        width="112"
        x="24"
        y="28"
      />
      <rect
        className="fill-muted dark:fill-muted/60"
        height="10"
        width="112"
        x="24"
        y="42"
      />

      {/* Calendar hooks */}
      <line
        className="stroke-muted-foreground/30"
        strokeLinecap="round"
        strokeWidth="3"
        x1="56"
        x2="56"
        y1="20"
        y2="36"
      />
      <line
        className="stroke-muted-foreground/30"
        strokeLinecap="round"
        strokeWidth="3"
        x1="104"
        x2="104"
        y1="20"
        y2="36"
      />

      {/* Day dots - row 1 */}
      <circle className="fill-muted-foreground/10" cx="48" cy="68" r="4" />
      <circle className="fill-muted-foreground/10" cx="68" cy="68" r="4" />
      <circle className="fill-muted-foreground/10" cx="88" cy="68" r="4" />
      <circle className="fill-muted-foreground/10" cx="108" cy="68" r="4" />

      {/* Day dots - row 2 */}
      <circle className="fill-muted-foreground/10" cx="48" cy="86" r="4" />
      <circle className="fill-muted-foreground/10" cx="68" cy="86" r="4" />
      <circle className="fill-primary/25" cx="88" cy="86" r="4" />
      <circle className="fill-primary" cx="88" cy="86" r="2" />
      <circle className="fill-muted-foreground/10" cx="108" cy="86" r="4" />

      {/* Day dots - row 3 */}
      <circle className="fill-muted-foreground/10" cx="48" cy="104" r="4" />
      <circle className="fill-muted-foreground/10" cx="68" cy="104" r="4" />
      <circle className="fill-muted-foreground/10" cx="88" cy="104" r="4" />
      <circle className="fill-muted-foreground/10" cx="108" cy="104" r="4" />

      {/* Floating decoration */}
      <circle className="fill-muted-foreground/10" cx="14" cy="70" r="2" />
      <circle className="fill-primary/10" cx="148" cy="56" r="2.5" />
      <circle className="fill-muted-foreground/8" cx="146" cy="100" r="1.5" />
    </svg>
  );
}

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia>
            <CalendarIllustration />
          </EmptyMedia>
          <EmptyTitle>No upcoming events</EmptyTitle>
          <EmptyDescription>
            Your schedule is clear. Create an event to get started.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create event</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

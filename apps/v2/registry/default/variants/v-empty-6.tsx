import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

function AutomationIllustration() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="120"
      viewBox="0 0 200 120"
      width="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left connection line with arrow */}
      <path
        className="stroke-muted-foreground/30"
        d="M30 60 L68 60"
        markerEnd="url(#arrowhead)"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <polygon
        className="fill-muted-foreground/30"
        points="66,56 74,60 66,64"
      />

      {/* Toggle body */}
      <rect
        className="fill-primary/5 stroke-primary/60 dark:fill-primary/10"
        height="36"
        rx="18"
        strokeWidth="2"
        width="56"
        x="76"
        y="42"
      />
      {/* Toggle circle */}
      <circle className="fill-primary/40" cx="94" cy="60" r="12" />
      <circle className="fill-primary" cx="94" cy="60" r="6" />

      {/* Right connection line */}
      <path
        className="stroke-muted-foreground/30"
        d="M134 60 Q150 60 158 48"
        fill="none"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle className="fill-muted-foreground/20" cx="162" cy="44" r="3" />

      {/* Bottom right connection */}
      <path
        className="stroke-muted-foreground/30"
        d="M134 60 Q150 60 158 72"
        fill="none"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle className="fill-muted-foreground/20" cx="162" cy="76" r="3" />

      {/* Decorative dots */}
      <circle className="fill-muted-foreground/20" cx="22" cy="60" r="2" />
      <circle className="fill-muted-foreground/15" cx="174" cy="44" r="2" />
      <circle className="fill-muted-foreground/15" cx="174" cy="76" r="2" />
    </svg>
  );
}

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia>
            <AutomationIllustration />
          </EmptyMedia>
          <EmptyTitle>No automations yet</EmptyTitle>
          <EmptyDescription>
            Hook up your favorite tools and let the automation magic begin.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create new automation</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

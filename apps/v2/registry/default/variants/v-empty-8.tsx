import { Button } from "@/registry/default/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

function CreditCardIllustration() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="130"
      viewBox="0 0 200 130"
      width="200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow card behind */}
      <rect
        className="fill-muted/50 dark:fill-muted/25"
        height="78"
        rx="10"
        transform="rotate(6 108 51)"
        width="120"
        x="48"
        y="12"
      />
      {/* Main card */}
      <rect
        className="fill-background stroke-border"
        height="82"
        rx="10"
        strokeWidth="1.5"
        width="128"
        x="36"
        y="18"
      />
      {/* Chip */}
      <rect
        className="fill-muted-foreground/15 stroke-muted-foreground/20"
        height="16"
        rx="3"
        strokeWidth="1"
        width="22"
        x="52"
        y="38"
      />
      {/* Chip lines */}
      <line
        className="stroke-muted-foreground/15"
        strokeWidth="0.8"
        x1="52"
        x2="74"
        y1="46"
        y2="46"
      />
      <line
        className="stroke-muted-foreground/15"
        strokeWidth="0.8"
        x1="63"
        x2="63"
        y1="38"
        y2="54"
      />
      {/* Contactless icon */}
      <g className="stroke-muted-foreground/20" fill="none" strokeWidth="1.5">
        <path d="M84 42 Q87 46 84 50" strokeLinecap="round" />
        <path d="M88 40 Q92 46 88 52" strokeLinecap="round" />
        <path d="M92 38 Q97 46 92 54" strokeLinecap="round" />
      </g>
      {/* Card number dots */}
      <g className="fill-muted-foreground/20">
        <circle cx="56" cy="68" r="2" />
        <circle cx="64" cy="68" r="2" />
        <circle cx="72" cy="68" r="2" />
        <circle cx="80" cy="68" r="2" />
      </g>
      <g className="fill-muted-foreground/15">
        <circle cx="94" cy="68" r="2" />
        <circle cx="102" cy="68" r="2" />
        <circle cx="110" cy="68" r="2" />
        <circle cx="118" cy="68" r="2" />
      </g>
      {/* Bottom info lines */}
      <rect
        className="fill-muted-foreground/12"
        height="3"
        rx="1.5"
        width="40"
        x="52"
        y="80"
      />
      <rect
        className="fill-muted-foreground/12"
        height="3"
        rx="1.5"
        width="28"
        x="120"
        y="80"
      />
      {/* Card network logo placeholder */}
      <circle className="fill-muted-foreground/8" cx="140" cy="88" r="6" />
      <circle className="fill-muted-foreground/12" cx="150" cy="88" r="6" />
      {/* Floating decorative elements */}
      <circle className="fill-primary/10" cx="26" cy="50" r="3" />s
      <circle className="fill-primary/10" cx="180" cy="40" r="2" />
      <path
        className="fill-muted-foreground/10"
        d="M174 70 L178 66 L178 74 Z"
      />
    </svg>
  );
}

export function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-12">
        <EmptyHeader>
          <EmptyMedia>
            <CreditCardIllustration />
          </EmptyMedia>
          <EmptyTitle>No payment methods</EmptyTitle>
          <EmptyDescription>
            Add a payment method to start making transactions securely.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Add payment method</Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}

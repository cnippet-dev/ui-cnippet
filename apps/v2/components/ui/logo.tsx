import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function Logo({ className }: Props) {
  return (
    <svg
      className={cn("size-5", className)}
      fill="none"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cnippet Logo</title>
      <rect
        fill="currentColor"
        height="35"
        opacity="1"
        rx="2"
        width="35"
        x="10"
        y="10"
      />
      <rect
        fill="currentColor"
        height="35"
        opacity="0.6"
        rx="2"
        width="35"
        x="55"
        y="10"
      />
      <rect
        fill="currentColor"
        height="35"
        opacity="0.6"
        rx="2"
        width="35"
        x="10"
        y="55"
      />
      <rect
        fill="currentColor"
        height="35"
        opacity="0.3"
        rx="2"
        width="35"
        x="55"
        y="55"
      />
    </svg>
  );
}

export function LogoText({ className }: Props) {
  return (
    <span
      className={cn(
        "flex items-center gap-1 pb-[3px] font-f37-stout text-[24px] text-primary leading-[24px]",
        className,
      )}
    >
      <Logo className="mt-1 h-4.5" />
      cnippet ui
    </span>
  );
}

export function LogoTextSVG({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none flex items-end justify-center font-f37-stout text-[120px] leading-none tracking-tight",
        className,
      )}
    >
      cnippet ui
    </div>
  );
}

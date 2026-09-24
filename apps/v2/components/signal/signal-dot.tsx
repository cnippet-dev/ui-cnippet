import { cn } from "@/lib/utils";

/** Marks something live, new or active. The only looping motion in Signal. */
export function SignalDot({
  className,
  pulse = false,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative inline-flex size-1.5 shrink-0", className)}
    >
      {pulse ? (
        <span className="absolute inset-0 rounded-full bg-signal motion-safe:animate-signal-ping" />
      ) : null}
      <span className="relative inline-flex size-1.5 rounded-full bg-signal" />
    </span>
  );
}

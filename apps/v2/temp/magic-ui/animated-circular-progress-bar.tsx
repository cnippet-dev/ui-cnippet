import { cn } from "@/lib/utils";

interface AnimatedCircularProgressBarProps {
  max?: number;
  min?: number;
  value: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor: string;
  className?: string;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor,
  className,
}: AnimatedCircularProgressBarProps) {
  const circumference = 2 * Math.PI * 45;
  const percentPx = circumference / 100;
  const currentPercent = Math.round(((value - min) / (max - min)) * 100);

  return (
    <div
      className={cn("relative size-40 font-semibold text-2xl", className)}
      style={
        {
          "--circle-size": "100px",
          "--circumference": circumference,
          "--delay": "0s",
          "--gap-percent": "5",
          "--offset-factor": "0",
          "--percent-to-deg": "3.6deg",
          "--percent-to-px": `${percentPx}px`,
          "--transition-length": "1s",
          "--transition-step": "200ms",
          transform: "translateZ(0)",
        } as React.CSSProperties
      }
    >
      <svg
        className="size-full"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        {currentPercent <= 90 && currentPercent >= 0 && (
          <circle
            className="opacity-100"
            cx="50"
            cy="50"
            r="45"
            strokeDashoffset="0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="10"
            style={
              {
                "--offset-factor-secondary": "calc(1 - var(--offset-factor))",
                "--stroke-percent": 90 - currentPercent,
                stroke: gaugeSecondaryColor,
                strokeDasharray:
                  "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
                transform:
                  "rotate(calc(1turn - 90deg - (var(--gap-percent) * var(--percent-to-deg) * var(--offset-factor-secondary)))) scaleY(-1)",
                transformOrigin:
                  "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
                transition: "all var(--transition-length) ease var(--delay)",
              } as React.CSSProperties
            }
          />
        )}
        <circle
          className="opacity-100"
          cx="50"
          cy="50"
          r="45"
          strokeDashoffset="0"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
          style={
            {
              "--stroke-percent": currentPercent,
              stroke: gaugePrimaryColor,
              strokeDasharray:
                "calc(var(--stroke-percent) * var(--percent-to-px)) var(--circumference)",
              transform:
                "rotate(calc(-90deg + var(--gap-percent) * var(--offset-factor) * var(--percent-to-deg)))",
              transformOrigin:
                "calc(var(--circle-size) / 2) calc(var(--circle-size) / 2)",
              transition:
                "var(--transition-length) ease var(--delay),stroke var(--transition-length) ease var(--delay)",
              transitionProperty: "stroke-dasharray,transform",
            } as React.CSSProperties
          }
        />
      </svg>
      <span
        className="fade-in absolute inset-0 m-auto size-fit animate-in delay-(--delay) duration-(--transition-length) ease-linear"
        data-current-value={currentPercent}
      >
        {currentPercent}
      </span>
    </div>
  );
}

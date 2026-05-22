import { type ReactElement, useId } from "react";

type BacklightProps = {
  children?: ReactElement;
  className?: string;
  blur?: number;
};

export function Backlight({ blur = 20, children, className }: BacklightProps) {
  const id = useId();

  return (
    <div className={className}>
      <svg aria-hidden="true" height="0" width="0">
        <filter height="200%" id={id} width="200%" x="-50%" y="-50%">
          <feGaussianBlur
            in="SourceGraphic"
            result="blurred"
            stdDeviation={blur}
          />
          <feColorMatrix in="blurred" type="saturate" values="4" />
          <feComposite in="SourceGraphic" operator="over" />
        </filter>
      </svg>

      <div style={{ filter: `url(#${id})` }}>{children}</div>
    </div>
  );
}

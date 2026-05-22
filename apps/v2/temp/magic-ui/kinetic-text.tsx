import type React from "react";

import { cn } from "@/lib/utils";

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
};

export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    "--hover-padding": "calc(1em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties;

  return (
    <Tag
      {...rest}
      className={cn("flex flex-wrap font-[300]", className)}
      style={mergedStyle}
    >
      {text.split("").map((letter, i) => (
        <span
          aria-hidden="true"
          className="[-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,_-webkit-text-stroke-color_0.4s,_padding_0.4s] [will-change:font-weight,-webkit-text-stroke-width,padding] hover:font-[900] has-[+span+span:hover]:font-[400] has-[+span:hover]:font-[600] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] hover:[padding-inline:var(--hover-padding)] has-[+span:hover]:[padding-inline:var(--hover-padding)] [:hover+&]:font-[600] [:hover+&]:[padding-inline:var(--hover-padding)] [:hover+span+&]:font-[400]"
          key={i}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

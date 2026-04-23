"use client";

import type { SVGProps } from "react";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { Frame, FramePanel } from "@/registry/default/ui/frame";

const MastercardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="7" cy="12" fill="#EB001B" r="7" />
    <circle cx="17" cy="12" fill="#F79E1B" r="7" />
    <path
      d="M12 17.5C13.5 16.2 14.5 14.2 14.5 12C14.5 9.8 13.5 7.8 12 6.5C10.5 7.8 9.5 9.8 9.5 12C9.5 14.2 10.5 16.2 12 17.5Z"
      fill="#FF5F00"
    />
  </svg>
);

export function Pattern() {
  return (
    <div className="mx-auto w-full max-w-xs">
      <Frame className="w-full">
        <FramePanel>
          <div className="flex size-10 items-center justify-center rounded-lg border border-border bg-background p-1.5 shadow-black/5 shadow-xs">
            <MastercardIcon className="size-full" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-medium text-sm">
              Mastercard ending in 8888
            </span>
            <span className="text-muted-foreground text-xs">Expires 09/25</span>
          </div>
        </FramePanel>
        <Checkbox
          className="absolute top-5 right-5 size-5 rounded-full"
          defaultChecked
          id="mastercard"
        />
      </Frame>
    </div>
  );
}

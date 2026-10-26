"use client";

import { useRef } from "react";
import { ContainerScroll } from "@/registry/default/motion/container-scroll";

const messages = [
  { from: "them", text: "Is the 8:30 table still free?" },
  { from: "me", text: "Yes! Booked for two." },
  { from: "them", text: "Perfect, see you there 🎉" },
];

export default function ContainerScrollMobileApp() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-96 w-full overflow-y-auto px-4"
      ref={containerRef}
    >
      <div className="h-48" />
      <ContainerScroll
        cardClassName="max-w-[260px] rounded-[2.5rem] p-2"
        containerRef={containerRef}
        header={
          <h3 className="font-bold text-2xl text-foreground tracking-tight">
            Bookings, right in your pocket
          </h3>
        }
        rotate={[35, 0]}
        scale={[0.9, 1]}
      >
        <div className="flex h-[420px] flex-col gap-2 rounded-[2rem] p-4 pt-10">
          {messages.map((m) => (
            <p
              className={
                m.from === "me"
                  ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-foreground px-3 py-2 text-background text-sm"
                  : "max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-foreground text-sm"
              }
              key={m.text}
            >
              {m.text}
            </p>
          ))}
        </div>
      </ContainerScroll>
      <div className="h-48" />
    </div>
  );
}

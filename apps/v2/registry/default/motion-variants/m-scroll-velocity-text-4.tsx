"use client";

import {
  BoxIcon,
  CloudIcon,
  CpuIcon,
  DatabaseIcon,
  GlobeIcon,
  HexagonIcon,
  LayersIcon,
  ZapIcon,
} from "lucide-react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/registry/default/motion/scroll-velocity-text";

const logos = [
  { icon: HexagonIcon, name: "Hexa" },
  { icon: CloudIcon, name: "Nimbus" },
  { icon: ZapIcon, name: "Voltage" },
  { icon: LayersIcon, name: "Stacked" },
  { icon: DatabaseIcon, name: "Ledger" },
  { icon: GlobeIcon, name: "Orbital" },
  { icon: CpuIcon, name: "Corelab" },
  { icon: BoxIcon, name: "Parcel" },
];

export default function ScrollVelocityLogos() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 overflow-hidden py-8">
      <p className="text-muted-foreground text-sm">
        Trusted by 4,000+ product teams
      </p>
      <ScrollVelocityContainer className="w-full">
        <ScrollVelocityRow baseVelocity={2}>
          {logos.map(({ icon: Icon, name }) => (
            <span
              className="mx-8 inline-flex items-center gap-2 font-semibold text-foreground/60 text-xl"
              key={name}
            >
              <Icon aria-hidden="true" className="size-6" />
              {name}
            </span>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
}

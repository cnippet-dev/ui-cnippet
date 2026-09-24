import { Check } from "lucide-react";
import { Frame, FramePanel } from "@/components/signal/frame";
import { SignalSection } from "@/components/signal/section";
import { CodeAnalyseIcon, CommandIcon, PrototypeIcon } from "../icons";

const ARGUMENTS = [
  {
    bullets: [
      "No compiled bundle, no version to upgrade around",
      "Edit, rename, or delete any component freely",
      "Every component ships as readable source",
    ],
    icon: CodeAnalyseIcon,
    meta: "source",
    title: "Own the code",
  },
  {
    bullets: [
      "Base UI primitives for correct ARIA and focus",
      "Full keyboard and screen-reader support",
      "Style with your own Tailwind classes",
    ],
    icon: CommandIcon,
    meta: "a11y",
    title: "Accessible by default",
  },
  {
    bullets: [
      "97 components, 40+ motion variants",
      "A growing library of copy-paste blocks",
      "MIT licensed, free forever",
    ],
    icon: PrototypeIcon,
    meta: "scope",
    title: "A complete toolkit",
  },
];

export function Why() {
  return (
    <SignalSection
      id="why"
      index="01"
      kicker="principles"
      lead="No package to install, no runtime to fight. Just well-built source that drops into your project and stays out of your way."
      title={
        <>
          Built to be <em>yours,</em> not rented.
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        {ARGUMENTS.map((argument) => (
          <Frame key={argument.title} spotlight>
            <FramePanel className="flex flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl border bg-frame text-foreground shadow-xs/4">
                  <argument.icon className="size-5" />
                </span>
                <span className="font-mono text-[11px] text-faint">
                  {`// ${argument.meta}`}
                </span>
              </div>
              <h3 className="mt-8 font-display font-semibold text-[20px] tracking-[-0.03em]">
                {argument.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {argument.bullets.map((bullet) => (
                  <li
                    className="flex gap-2.5 text-[14px] text-muted-foreground leading-relaxed"
                    key={bullet}
                  >
                    <Check className="mt-1 size-3.5 shrink-0 text-signal" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </FramePanel>
          </Frame>
        ))}
      </div>
    </SignalSection>
  );
}

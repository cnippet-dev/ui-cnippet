import { Section, SectionBody, SectionHeader } from "@/components/home/section";
import { CodeAnalyseIcon, CommandIcon, PrototypeIcon } from "../icons";

const ARGUMENTS = [
  {
    bullets: [
      "No compiled bundle, no version to upgrade around",
      "Edit, rename, or delete any component freely",
      "No breaking change you didn't see coming",
      "Every component ships as readable source, not a black box",
    ],
    icon: CodeAnalyseIcon,
    title: "Own the code",
  },
  {
    bullets: [
      "Base UI primitives for correct ARIA and keyboard behavior",
      "Full keyboard and screen-reader support out of the box",
      "Style with your own Tailwind classes",
    ],
    icon: CommandIcon,
    title: "Accessible by default",
  },
  {
    bullets: [
      "97 components, 40+ motion variants",
      "A growing library of copy-paste blocks",
      "MIT licensed, free forever",
    ],
    icon: PrototypeIcon,
    title: "A full toolkit",
  },
];

export function Why() {
  return (
    <Section id="why">
      <SectionHeader
        index="01"
        meta="[for developers]"
        title="Three reasons to build here"
      />

      <SectionBody className="p-0 sm:p-0">
        <div className="grid divide-y divide-dashed lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {ARGUMENTS.map((argument) => (
            <div className="px-5 py-10 sm:px-8 sm:py-12" key={argument.title}>
              <argument.icon className="size-6 text-cnippet-accent" />
              <h3 className="mt-4 mb-4 font-f37-stout text-xl leading-tight">
                {argument.title}
              </h3>
              <ul className="space-y-2.5">
                {argument.bullets.map((bullet) => (
                  <li
                    className="flex gap-2 text-[14px] text-muted-foreground leading-relaxed"
                    key={bullet}
                  >
                    <span className="text-cnippet-accent">·</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionBody>
    </Section>
  );
}

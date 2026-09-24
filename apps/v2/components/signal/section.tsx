import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Kicker } from "./kicker";
import { Rule } from "./rule";

/** Horizontal gutter + max width shared by every Signal section. */
export const CONTAINER =
  "mx-auto w-full max-w-(--container) px-4 sm:px-6 lg:px-8";

type SignalSectionProps = {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  id: string;
  index?: string;
  kicker: string;
  lead?: ReactNode;
  rule?: boolean;
  title: ReactNode;
};

/**
 * A homepage section: node rule → `// 03 — kicker` → display title → lead →
 * content. Titles may carry one `<em>` voice phrase.
 */
export function SignalSection({
  actions,
  children,
  className,
  id,
  index,
  kicker,
  lead,
  rule = true,
  title,
}: SignalSectionProps) {
  return (
    <section className="scroll-mt-(--header-height)" id={id}>
      {rule ? <Rule /> : null}
      <div className={cn(CONTAINER, "py-16 md:py-24", className)}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <Kicker index={index}>{kicker}</Kicker>
            <SectionTitle>{title}</SectionTitle>
            {lead ? (
              <p className="max-w-xl text-[16px] text-muted-foreground leading-relaxed md:text-[17px]">
                {lead}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
        {children ? <div className="mt-12 md:mt-14">{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-balance font-display font-semibold text-[34px] text-ink leading-[1.05] tracking-[-0.045em] md:text-[46px] [&_em]:font-normal [&_em]:font-serif [&_em]:tracking-[-0.01em]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

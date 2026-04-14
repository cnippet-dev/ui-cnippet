import Link from "next/link";
import { cn } from "@/lib/utils";

type Sponsor = {
  name: string;
  href: string;
  logo: React.ComponentType<{ className?: string }>;
};

export default function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="relative after:absolute after:bottom-0 after:-left-[100vw] after:h-px after:w-[200vw] after:bg-gray-950/5 dark:after:bg-white/10">
      <ul className="flex flex-col gap-2 divide-y divide-gray-950/5 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-5 sm:divide-y-0 dark:divide-white/10 dark:[--pattern-fg:var(--color-white)]/10">
        {sponsors.map((sponsor, _index) => (
          <li
            className={cn(
              "flex sm:border-separate sm:border-gray-950/5 sm:border-x sm:dark:border-white/10",
            )}
            key={sponsor.href}
          >
            <Link
              className="flex w-full items-center justify-center gap-3 bg-background px-6 py-6 transition-colors hover:bg-gray-100 sm:px-8 sm:py-8 dark:hover:bg-zinc-900"
              href={sponsor.href}
              rel="noopener sponsored"
              target="_blank"
            >
              <sponsor.logo className="size-8 shrink-0" />
              <p className="text-lg">{sponsor.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

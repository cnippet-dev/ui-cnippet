import { ScrambleHover } from "@/registry/default/motion/scramble-hover";

const links = ["Features", "Pricing", "Changelog", "Docs", "Blog"];

export default function ScrambleHoverNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <ScrambleHover
            className="font-medium text-muted-foreground text-sm transition-colors hover:text-foreground"
            key={link}
            maxIterations={8}
            scrambleSpeed={40}
          >
            {link}
          </ScrambleHover>
        ))}
      </nav>
    </div>
  );
}

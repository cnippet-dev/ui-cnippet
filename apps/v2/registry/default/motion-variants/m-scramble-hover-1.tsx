import { ScrambleHover } from "@/registry/default/motion/scramble-hover";

const links = ["Features", "Pricing", "Changelog", "Docs", "Blog"];

export default function ScrambleHoverNav() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <nav className="flex items-center gap-6">
        {links.map((link) => (
          <ScrambleHover
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            key={link}
            scrambleSpeed={40}
            maxIterations={8}
          >
            {link}
          </ScrambleHover>
        ))}
      </nav>
    </div>
  );
}

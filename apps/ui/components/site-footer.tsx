import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-0.5">
      <p>
        <Link className="font-heading text-lg" href="/">
          cnippet.dev <span className="text-muted-foreground/64">ui</span>
        </Link>
      </p>
      <p className="text-muted-foreground text-sm">
        Built with 💙 by{" "}
        <a
          className="font-medium underline-offset-4 hover:underline"
          href="https://deepak.cnippet.dev"
          rel="noopener noreferrer"
          target="_blank"
        >
          Deepak
        </a>
      </p>
    </footer>
  );
}

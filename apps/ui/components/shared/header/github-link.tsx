import { RiGithubFill } from "@remixicon/react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Button } from "@/registry/default/ui/button";

export function GitHubLink() {
  return (
    <Button
      className="relative hidden h-8 shadow-none max-sm:w-8 md:flex"
      render={
        <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
          <RiGithubFill className="size-5 text-muted-foreground" />
        </Link>
      }
      size="sm"
      variant="ghost"
    />
  );
}

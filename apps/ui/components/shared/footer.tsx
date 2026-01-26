"use client";

import { RiMoonClearFill, RiSunLine } from "@remixicon/react";
import { Blocks, CodeXml, Handshake, Scale, Webhook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/registry/default/ui/button";

const columns = [
  {
    links: [
      {
        href: "/docs/components",
        Icon: Blocks,
        name: "Components",
      },
      {
        href: "/docs",
        Icon: CodeXml,
        name: "Documentation",
      },
      {
        href: "/docs/changelog",
        Icon: Webhook,
        name: "Changelog",
      },
      {
        href: "https://github.com/cnippet-dev",
        Icon: CodeXml,
        name: "GitHub",
      },
    ],
    title: "Product",
  },
  {
    links: [
      {
        href: "/docs/installation",
        Icon: Blocks,
        name: "Get Started",
      },
      {
        href: "/docs/templates",
        Icon: CodeXml,
        name: "Templates",
      },
      {
        href: "/docs/examples",
        Icon: Webhook,
        name: "Examples",
      },
    ],
    title: "Resources",
  },
  {
    links: [
      {
        href: "/legal/privacy",
        Icon: Scale,
        name: "Privacy Policy",
      },
      {
        href: "/legal/terms",
        Icon: Handshake,
        name: "Terms of Service",
      },
    ],
    title: "Legal",
  },
];

const socialLinks = [
  {
    href: "https://x.com/cnippetui",
    name: "Twitter",
  },
  {
    href: "https://github.com/cnippet-dev",
    name: "GitHub",
  },
  {
    href: "https://discord.gg/cnippet",
    name: "Discord",
  },
];

export function FooterDemo() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <div className="px-4 md:px-0">
      <div className="mx-auto max-w-6xl border-x px-4 pt-20 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              aria-label="Home"
              className="flex items-center gap-2 text-2xl"
              href="/"
            >
              <Image
                alt="Cnippet UI Logo"
                className="size-10"
                height={600}
                src={
                  resolvedTheme === "dark"
                    ? "/images/logo-dark.png"
                    : "/images/logo-light.png"
                }
                width={500}
              />
              cnippet{" "}
              <span className="text-muted-foreground/72 hover:text-muted-foreground">
                ui
              </span>
            </Link>
            <p className="text-foreground/60 text-sm">
              Beautiful, accessible React components for modern landing pages.
            </p>

            <p className="mt-3.5 font-light text-foreground/55 text-sm">
              {socialLinks.map((link, index) => (
                <React.Fragment key={link.name}>
                  <a
                    className="hover:text-foreground/90"
                    href={link.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.name}
                  </a>
                  {index < socialLinks.length - 1 && " • "}
                </React.Fragment>
              ))}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:col-span-8 lg:mt-0 lg:justify-items-end">
            {columns.map(({ title, links }) => (
              <div className="last:mt-12 md:last:mt-0" key={title}>
                <h3 className="font-semibold text-sm">{title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ name, Icon, href }) => (
                    <li key={name}>
                      <a
                        className="group text-foreground/60 text-sm transition-all hover:text-foreground/90"
                        href={href || "#"}
                      >
                        <Icon className="mr-1.5 inline h-4 stroke-2 stroke-foreground/60 transition-all group-hover:stroke-foreground/90" />
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t pt-6 pb-8">
          <p className="text-foreground/55 text-xs">Cnippet UI © 2026</p>
          <Button
            className="relative size-8"
            onClick={toggleTheme}
            size="icon"
            title="Toggle theme"
            variant="ghost"
          >
            {resolvedTheme === "dark" ? (
              <RiMoonClearFill className="size-4 text-muted-foreground" />
            ) : (
              <RiSunLine className="size-4 text-muted-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

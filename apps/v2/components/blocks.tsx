import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Frame,
  FrameHeader,
  FrameMeta,
  FramePanel,
  FrameTitle,
} from "@/components/signal/frame";
import { SignalSection } from "@/components/signal/section";
import { Button } from "@/registry/default/ui/button";

const BLOCKS_URL = "https://blocks.cnippet.dev/?ref=ui.cnippet.dev";

// Mirrors the section list (and counts) on blocks.cnippet.dev — each title
// has a matching preview image on Cloudinary.
const blocks = [
  { number: "8", title: "hero" },
  { number: "5", title: "feature" },
  { number: "4", title: "pricing" },
  { number: "4", title: "testimonial" },
  { number: "6", title: "blog" },
  { label: "FAQ", number: "5", title: "faq" },
  { number: "4", title: "contact" },
  { number: "7", title: "footer" },
];

export default function Blocks() {
  return (
    <SignalSection
      actions={
        <Button
          render={
            <Link
              aria-label="Explore blocks"
              href={BLOCKS_URL}
              rel="noopener"
              target="_blank"
            />
          }
          variant="outline"
        >
          Explore blocks
          <ArrowUpRight />
        </Button>
      }
      id="blocks"
      index="05"
      kicker="blocks"
      lead="Hero, pricing, blog, contact — entire sections assembled from the same primitives. Copy one in and start editing."
      title={
        <>
          From components to <em>complete pages.</em>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((item) => (
          <Frame
            className="group transition-transform duration-250 ease-out-expo hover:-translate-y-px"
            key={item.title}
            spotlight
          >
            <FrameHeader>
              <FrameTitle className="capitalize">
                <a
                  className="outline-none before:absolute before:inset-0 before:z-10 before:rounded-2xl focus-visible:before:ring-2 focus-visible:before:ring-ring"
                  href={`https://blocks.cnippet.dev/sections/${item.title}`}
                  rel="noopener"
                  target="_blank"
                >
                  {item.label ?? item.title}
                </a>
              </FrameTitle>
              <FrameMeta>{item.number} blocks</FrameMeta>
            </FrameHeader>
            <FramePanel>
              <Image
                alt={`${item.title} block preview`}
                className="aspect-video w-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
                height={1080}
                loading="lazy"
                src={`https://res.cloudinary.com/dcxm3ccir/image/upload/v1770126024/${item.title}.png`}
                width={1920}
              />
              <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex size-7 translate-y-1 items-center justify-center rounded-lg bg-background/90 opacity-0 shadow-xs backdrop-blur transition-all duration-250 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="size-3.5" />
              </span>
            </FramePanel>
          </Frame>
        ))}
      </div>
    </SignalSection>
  );
}

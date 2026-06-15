import { ExternalLinkIcon, LinkIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

const links = [
  {
    description:
      "Open Graph metadata, favicon, and canonical URL for the component docs.",
    label: "ui.cnippet.dev",
    url: "ui.cnippet.dev",
  },
  {
    description:
      "The Base UI React primitives used under the hood for PreviewCard.",
    label: "base-ui.com/react/components/preview-card",
    url: "base-ui.com",
  },
];

export default function Particle() {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        References
      </p>
      {links.map(({ label, url, description }) => (
        <PreviewCard key={url}>
          <PreviewCardTrigger className="flex cursor-pointer items-center gap-1.5 text-primary underline-offset-4 hover:underline">
            <LinkIcon className="size-3 shrink-0" />
            <span className="truncate">{label}</span>
            <ExternalLinkIcon className="size-3 shrink-0 text-muted-foreground" />
          </PreviewCardTrigger>
          <PreviewCardPopup>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex size-6 shrink-0 items-center justify-center rounded bg-muted">
                  <LinkIcon className="size-3 text-muted-foreground" />
                </div>
                <p className="font-medium text-xs">{url}</p>
              </div>
              <p className="text-muted-foreground text-xs">{description}</p>
            </div>
          </PreviewCardPopup>
        </PreviewCard>
      ))}
    </div>
  );
}

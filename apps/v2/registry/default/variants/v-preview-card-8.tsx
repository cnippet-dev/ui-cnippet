import { HashIcon } from "lucide-react";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

const tags = ["design-systems", "tailwindcss", "accessibility", "react"];

export default function Particle() {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <PreviewCard key={tag}>
          <PreviewCardTrigger className="flex cursor-pointer items-center gap-1 rounded-full border bg-muted/50 px-2.5 py-1 text-muted-foreground text-xs hover:bg-muted">
            <HashIcon className="size-3" />
            {tag}
          </PreviewCardTrigger>
          <PreviewCardPopup>
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-sm">#{tag}</p>
              <p className="text-muted-foreground text-xs">
                Browse all posts tagged with{" "}
                <span className="font-medium text-foreground">#{tag}</span>.
              </p>
              <div className="flex gap-3 text-muted-foreground text-xs">
                <span>
                  <strong className="text-foreground">
                    {Math.floor(Math.random() * 900 + 100)}
                  </strong>{" "}
                  posts
                </span>
                <span>
                  <strong className="text-foreground">
                    {Math.floor(Math.random() * 5000 + 500)}
                  </strong>{" "}
                  followers
                </span>
              </div>
            </div>
          </PreviewCardPopup>
        </PreviewCard>
      ))}
    </div>
  );
}

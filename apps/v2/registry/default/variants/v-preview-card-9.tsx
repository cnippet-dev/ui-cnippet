import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

export default function Particle() {
  return (
    <p className="text-sm">
      We recommend the{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-pointer font-medium text-primary underline underline-offset-4">
          Arc Flow Pro Headphones
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div className="h-28 w-full rounded-md bg-muted" />
            <div>
              <p className="font-semibold text-sm">Arc Flow Pro Headphones</p>
              <p className="mt-0.5 font-semibold text-lg">$249.00</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon className="size-3 fill-current" key={i} />
              ))}
              <span className="text-muted-foreground">(412 reviews)</span>
            </div>
            <Button className="w-full" size="sm">
              <ShoppingCartIcon className="size-3.5" />
              Add to cart
            </Button>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      for remote work setups.
    </p>
  );
}

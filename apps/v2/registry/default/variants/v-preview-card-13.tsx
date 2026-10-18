import { Badge } from "@/registry/default/ui/badge";
import {
  PreviewCard,
  PreviewCardPopup,
  PreviewCardTrigger,
} from "@/registry/default/ui/preview-card";

const relatedTerms = ["Retry", "Request key", "Side effect"];

export function Pattern() {
  return (
    <p className="max-w-sm text-sm">
      Make every payment endpoint{" "}
      <PreviewCard>
        <PreviewCardTrigger className="cursor-help font-medium underline decoration-dotted underline-offset-4">
          idempotent
        </PreviewCardTrigger>
        <PreviewCardPopup>
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <h4 className="font-semibold text-sm">Idempotent</h4>
                <span className="text-muted-foreground text-xs italic">
                  adjective
                </span>
              </div>
              <p className="font-mono text-muted-foreground text-xs">
                /ˌaɪ.dəmˈpoʊ.tənt/
              </p>
            </div>
            <p className="text-sm">
              An operation that gives the same result no matter how many times
              it runs. Retrying a request never charges a customer twice.
            </p>
            <div className="flex flex-wrap gap-1">
              {relatedTerms.map((term) => (
                <Badge key={term} size="sm" variant="outline">
                  {term}
                </Badge>
              ))}
            </div>
          </div>
        </PreviewCardPopup>
      </PreviewCard>{" "}
      so a dropped connection can be retried safely.
    </p>
  );
}

import {
  ArrowRightIcon,
  CrownIcon,
  ImageIcon,
  PaletteIcon,
  PlugIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

type Feature = {
  icon: React.ElementType;
  label: string;
  description: string;
  pro: boolean;
};

const features: Feature[] = [
  {
    description: "Automate repetitive tasks",
    icon: ZapIcon,
    label: "Automations",
    pro: false,
  },
  {
    description: "Browse and insert media",
    icon: ImageIcon,
    label: "Media Library",
    pro: false,
  },
  {
    description: "Build custom color themes",
    icon: PaletteIcon,
    label: "Custom Themes",
    pro: true,
  },
  {
    description: "Connect third-party tools",
    icon: PlugIcon,
    label: "Integrations",
    pro: true,
  },
  {
    description: "Generate content with AI",
    icon: SparklesIcon,
    label: "AI Assist",
    pro: true,
  },
];

export function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <TooltipProvider>
        <div className="flex items-center gap-1 rounded-lg border bg-background p-1 shadow-xs">
          {features.map(({ icon: Icon, label, description, pro }) => (
            <Tooltip key={label}>
              <TooltipTrigger
                render={
                  <Button
                    aria-label={label}
                    className={pro ? "opacity-40" : ""}
                    size="icon"
                    variant="ghost"
                  />
                }
              >
                <Icon aria-hidden="true" className="size-4" />
              </TooltipTrigger>
              <TooltipContent className={pro ? "p-3" : undefined}>
                {pro ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{label}</span>
                      <Badge className="gap-1" size="xs" variant="outline">
                        <CrownIcon aria-hidden="true" className="size-2.5" />
                        Pro
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{description}.</p>
                    <a
                      className="flex items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
                      href="#"
                    >
                      Upgrade to Pro
                      <ArrowRightIcon aria-hidden="true" className="size-3" />
                    </a>
                  </div>
                ) : (
                  label
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

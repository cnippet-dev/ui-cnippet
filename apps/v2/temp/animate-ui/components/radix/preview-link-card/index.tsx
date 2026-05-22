import { cn } from "@workspace/ui/lib/utils";
import {
  PreviewLinkCardContent as PreviewLinkCardContentPrimitive,
  type PreviewLinkCardContentProps as PreviewLinkCardContentPrimitiveProps,
  PreviewLinkCardImage as PreviewLinkCardImagePrimitive,
  type PreviewLinkCardImageProps as PreviewLinkCardImagePrimitiveProps,
  PreviewLinkCardPortal as PreviewLinkCardPortalPrimitive,
  PreviewLinkCard as PreviewLinkCardPrimitive,
  type PreviewLinkCardProps as PreviewLinkCardPrimitiveProps,
  PreviewLinkCardTrigger as PreviewLinkCardTriggerPrimitive,
  type PreviewLinkCardTriggerProps as PreviewLinkCardTriggerPrimitiveProps,
} from "@/registry/primitives/radix/preview-link-card";

type PreviewLinkCardProps = PreviewLinkCardPrimitiveProps;

function PreviewLinkCard(props: PreviewLinkCardProps) {
  return <PreviewLinkCardPrimitive {...props} />;
}

type PreviewLinkCardTriggerProps = PreviewLinkCardTriggerPrimitiveProps;

function PreviewLinkCardTrigger(props: PreviewLinkCardTriggerProps) {
  return <PreviewLinkCardTriggerPrimitive {...props} />;
}

type PreviewLinkCardContentProps = PreviewLinkCardContentPrimitiveProps;

function PreviewLinkCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: PreviewLinkCardContentProps) {
  return (
    <PreviewLinkCardPortalPrimitive>
      <PreviewLinkCardContentPrimitive
        align={align}
        className={cn(
          "z-50 origin-(--radix-hover-card-content-transform-origin) overflow-hidden rounded-md border shadow-md outline-hidden",
          className,
        )}
        sideOffset={sideOffset}
        {...props}
      />
    </PreviewLinkCardPortalPrimitive>
  );
}

type PreviewLinkCardImageProps = PreviewLinkCardImagePrimitiveProps;

function PreviewLinkCardImage(props: PreviewLinkCardImageProps) {
  return <PreviewLinkCardImagePrimitive {...props} />;
}

export {
  PreviewLinkCard,
  PreviewLinkCardContent,
  type PreviewLinkCardContentProps,
  PreviewLinkCardImage,
  type PreviewLinkCardImageProps,
  type PreviewLinkCardProps,
  PreviewLinkCardTrigger,
  type PreviewLinkCardTriggerProps,
};

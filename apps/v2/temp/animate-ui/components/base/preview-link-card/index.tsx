import { cn } from "@workspace/ui/lib/utils";
import {
  PreviewLinkCardBackdrop as PreviewLinkCardBackdropPrimitive,
  type PreviewLinkCardBackdropProps as PreviewLinkCardBackdropPrimitiveProps,
  PreviewLinkCardImage as PreviewLinkCardImagePrimitive,
  type PreviewLinkCardImageProps as PreviewLinkCardImagePrimitiveProps,
  PreviewLinkCardPopup as PreviewLinkCardPopupPrimitive,
  type PreviewLinkCardPopupProps as PreviewLinkCardPopupPrimitiveProps,
  PreviewLinkCardPortal as PreviewLinkCardPortalPrimitive,
  PreviewLinkCardPositioner as PreviewLinkCardPositionerPrimitive,
  type PreviewLinkCardPositionerProps as PreviewLinkCardPositionerPrimitiveProps,
  PreviewLinkCard as PreviewLinkCardPrimitive,
  type PreviewLinkCardProps as PreviewLinkCardPrimitiveProps,
  PreviewLinkCardTrigger as PreviewLinkCardTriggerPrimitive,
  type PreviewLinkCardTriggerProps as PreviewLinkCardTriggerPrimitiveProps,
} from "@/registry/primitives/base/preview-link-card";

type PreviewLinkCardProps = PreviewLinkCardPrimitiveProps;

function PreviewLinkCard(props: PreviewLinkCardProps) {
  return <PreviewLinkCardPrimitive {...props} />;
}

type PreviewLinkCardTriggerProps = PreviewLinkCardTriggerPrimitiveProps;

function PreviewLinkCardTrigger(props: PreviewLinkCardTriggerProps) {
  return <PreviewLinkCardTriggerPrimitive {...props} />;
}

type PreviewLinkCardPanelProps = PreviewLinkCardPositionerPrimitiveProps &
  PreviewLinkCardPopupPrimitiveProps;

function PreviewLinkCardPanel({
  className,
  align = "center",
  sideOffset = 4,
  style,
  children,
  ...props
}: PreviewLinkCardPanelProps) {
  return (
    <PreviewLinkCardPortalPrimitive>
      <PreviewLinkCardPositionerPrimitive
        align={align}
        className="z-50"
        sideOffset={sideOffset}
        {...props}
      >
        <PreviewLinkCardPopupPrimitive
          className={cn(
            "origin-(--transform-origin) overflow-hidden rounded-md border shadow-md outline-hidden",
            className,
          )}
          style={style}
        >
          {children}
        </PreviewLinkCardPopupPrimitive>
      </PreviewLinkCardPositionerPrimitive>
    </PreviewLinkCardPortalPrimitive>
  );
}

type PreviewLinkCardBackdropProps = PreviewLinkCardBackdropPrimitiveProps;

function PreviewLinkCardBackdrop(props: PreviewLinkCardBackdropProps) {
  return <PreviewLinkCardBackdropPrimitive {...props} />;
}

type PreviewLinkCardImageProps = PreviewLinkCardImagePrimitiveProps;

function PreviewLinkCardImage(props: PreviewLinkCardImageProps) {
  return <PreviewLinkCardImagePrimitive {...props} />;
}

export {
  PreviewLinkCard,
  PreviewLinkCardBackdrop,
  type PreviewLinkCardBackdropProps,
  PreviewLinkCardImage,
  type PreviewLinkCardImageProps,
  PreviewLinkCardPanel,
  type PreviewLinkCardPanelProps,
  type PreviewLinkCardProps,
  PreviewLinkCardTrigger,
  type PreviewLinkCardTriggerProps,
};
